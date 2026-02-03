import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  lat: number;
  lng: number;
  timestamp: number;
  speed: number | null;
}

interface RunningStats {
  distanceKm: number;
  durationSeconds: number;
  currentSpeedKmh: number;
  avgSpeedKmh: number;
  maxSpeedKmh: number;
  paceMinKm: number; // minutes per km
  avgPaceMinKm: number;
}

interface RunningTrackerState {
  isSupported: boolean;
  isTracking: boolean;
  isPaused: boolean;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unknown';
  stats: RunningStats;
  positions: Position[];
  error: string | null;
}

// Haversine formula to calculate distance between two GPS coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useRunningTracker() {
  const [state, setState] = useState<RunningTrackerState>({
    isSupported: false,
    isTracking: false,
    isPaused: false,
    permissionStatus: 'unknown',
    stats: {
      distanceKm: 0,
      durationSeconds: 0,
      currentSpeedKmh: 0,
      avgSpeedKmh: 0,
      maxSpeedKmh: 0,
      paceMinKm: 0,
      avgPaceMinKm: 0,
    },
    positions: [],
    error: null,
  });

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const positionsRef = useRef<Position[]>([]);
  const maxSpeedRef = useRef<number>(0);

  // Check if geolocation is supported
  useEffect(() => {
    const isSupported = 'geolocation' in navigator;
    setState(prev => ({ ...prev, isSupported }));

    if (isSupported) {
      navigator.permissions?.query({ name: 'geolocation' }).then(result => {
        setState(prev => ({ 
          ...prev, 
          permissionStatus: result.state as 'prompt' | 'granted' | 'denied'
        }));
        
        result.onchange = () => {
          setState(prev => ({ 
            ...prev, 
            permissionStatus: result.state as 'prompt' | 'granted' | 'denied'
          }));
        };
      }).catch(() => {
        setState(prev => ({ ...prev, permissionStatus: 'unknown' }));
      });
    }
  }, []);

  const updateStats = useCallback(() => {
    const positions = positionsRef.current;
    if (positions.length < 2) return;

    // Calculate total distance
    let totalDistance = 0;
    for (let i = 1; i < positions.length; i++) {
      const dist = calculateDistance(
        positions[i - 1].lat, positions[i - 1].lng,
        positions[i].lat, positions[i].lng
      );
      // Filter out GPS noise (ignore if jump is > 100m in 1 second)
      if (dist < 0.1) {
        totalDistance += dist;
      }
    }

    // Calculate current speed from GPS
    const lastPos = positions[positions.length - 1];
    let currentSpeed = 0;
    if (lastPos.speed !== null && lastPos.speed >= 0) {
      currentSpeed = lastPos.speed * 3.6; // Convert m/s to km/h
    } else if (positions.length >= 2) {
      const prevPos = positions[positions.length - 2];
      const timeDiff = (lastPos.timestamp - prevPos.timestamp) / 1000;
      if (timeDiff > 0) {
        const dist = calculateDistance(prevPos.lat, prevPos.lng, lastPos.lat, lastPos.lng);
        currentSpeed = (dist / timeDiff) * 3600;
      }
    }

    // Update max speed
    if (currentSpeed > maxSpeedRef.current && currentSpeed < 50) { // Cap at 50 km/h to filter GPS errors
      maxSpeedRef.current = currentSpeed;
    }

    // Calculate duration
    const now = Date.now();
    const duration = Math.floor((now - startTimeRef.current - pausedTimeRef.current) / 1000);

    // Calculate average speed
    const avgSpeed = duration > 0 ? (totalDistance / duration) * 3600 : 0;

    // Calculate pace (min/km)
    const currentPace = currentSpeed > 0.5 ? 60 / currentSpeed : 0;
    const avgPace = avgSpeed > 0.5 ? 60 / avgSpeed : 0;

    setState(prev => ({
      ...prev,
      stats: {
        distanceKm: totalDistance,
        durationSeconds: duration,
        currentSpeedKmh: Math.min(currentSpeed, 50),
        avgSpeedKmh: avgSpeed,
        maxSpeedKmh: maxSpeedRef.current,
        paceMinKm: currentPace,
        avgPaceMinKm: avgPace,
      },
      positions: [...positions],
    }));
  }, []);

  const handlePositionSuccess = useCallback((position: GeolocationPosition) => {
    const newPosition: Position = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      timestamp: position.timestamp,
      speed: position.coords.speed,
    };

    positionsRef.current.push(newPosition);
    updateStats();
  }, [updateStats]);

  const handlePositionError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = 'Unable to get location';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location permission denied';
        setState(prev => ({ ...prev, permissionStatus: 'denied' }));
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location unavailable';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out';
        break;
    }
    setState(prev => ({ ...prev, error: errorMessage }));
  }, []);

  const startTracking = useCallback(async () => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Geolocation not supported' }));
      return false;
    }

    // Reset state for new run
    positionsRef.current = [];
    maxSpeedRef.current = 0;
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;

    setState(prev => ({
      ...prev,
      isTracking: true,
      isPaused: false,
      error: null,
      stats: {
        distanceKm: 0,
        durationSeconds: 0,
        currentSpeedKmh: 0,
        avgSpeedKmh: 0,
        maxSpeedKmh: 0,
        paceMinKm: 0,
        avgPaceMinKm: 0,
      },
      positions: [],
    }));

    // Start watching position
    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePositionSuccess,
      handlePositionError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Start timer for duration updates
    timerRef.current = setInterval(() => {
      updateStats();
    }, 1000);

    return true;
  }, [state.isSupported, handlePositionSuccess, handlePositionError, updateStats]);

  const pauseTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeTracking = useCallback(() => {
    const pauseStart = Date.now();
    
    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePositionSuccess,
      handlePositionError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    timerRef.current = setInterval(() => {
      updateStats();
    }, 1000);

    pausedTimeRef.current += Date.now() - pauseStart;
    setState(prev => ({ ...prev, isPaused: false }));
  }, [handlePositionSuccess, handlePositionError, updateStats]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const finalStats = { ...state.stats };
    const finalPositions = [...positionsRef.current];

    setState(prev => ({
      ...prev,
      isTracking: false,
      isPaused: false,
    }));

    return {
      stats: finalStats,
      positions: finalPositions,
      startTime: new Date(startTimeRef.current),
      endTime: new Date(),
    };
  }, [state.stats]);

  const resetTracking = useCallback(() => {
    positionsRef.current = [];
    maxSpeedRef.current = 0;
    setState(prev => ({
      ...prev,
      stats: {
        distanceKm: 0,
        durationSeconds: 0,
        currentSpeedKmh: 0,
        avgSpeedKmh: 0,
        maxSpeedKmh: 0,
        paceMinKm: 0,
        avgPaceMinKm: 0,
      },
      positions: [],
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    ...state,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
    resetTracking,
  };
}
