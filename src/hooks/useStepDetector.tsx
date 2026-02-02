import { useState, useEffect, useCallback, useRef } from 'react';

interface StepDetectorState {
  isSupported: boolean;
  isTracking: boolean;
  steps: number;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unknown';
}

// Step detection algorithm parameters
const ACCELERATION_THRESHOLD = 1.2; // Minimum acceleration to count as step
const STEP_DELAY_MS = 250; // Minimum time between steps (prevents double counting)
const SMOOTHING_FACTOR = 0.8; // For low-pass filter

export function useStepDetector() {
  const [state, setState] = useState<StepDetectorState>({
    isSupported: false,
    isTracking: false,
    steps: 0,
    permissionStatus: 'unknown',
  });

  const lastStepTime = useRef<number>(0);
  const lastAcceleration = useRef<number>(0);
  const smoothedAcceleration = useRef<number>(0);
  const isAboveThreshold = useRef<boolean>(false);
  const stepsRef = useRef<number>(0);

  // Check if device motion is supported
  useEffect(() => {
    const isSupported = 'DeviceMotionEvent' in window;
    setState(prev => ({ ...prev, isSupported }));

    // Check permission status for iOS 13+
    if (isSupported && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      setState(prev => ({ ...prev, permissionStatus: 'prompt' }));
    } else if (isSupported) {
      setState(prev => ({ ...prev, permissionStatus: 'granted' }));
    }
  }, []);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const { accelerationIncludingGravity } = event;
    if (!accelerationIncludingGravity) return;

    const { x, y, z } = accelerationIncludingGravity;
    if (x === null || y === null || z === null) return;

    // Calculate total acceleration magnitude
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    
    // Apply low-pass filter to smooth out noise
    smoothedAcceleration.current = 
      SMOOTHING_FACTOR * smoothedAcceleration.current + 
      (1 - SMOOTHING_FACTOR) * acceleration;

    // Detect step using peak detection
    const now = Date.now();
    const normalizedAccel = smoothedAcceleration.current / 9.81; // Normalize to g-force

    // Step detection: look for acceleration spike followed by dip
    if (normalizedAccel > ACCELERATION_THRESHOLD && !isAboveThreshold.current) {
      isAboveThreshold.current = true;
    } else if (normalizedAccel < ACCELERATION_THRESHOLD && isAboveThreshold.current) {
      isAboveThreshold.current = false;
      
      // Check if enough time has passed since last step
      if (now - lastStepTime.current > STEP_DELAY_MS) {
        lastStepTime.current = now;
        stepsRef.current += 1;
        setState(prev => ({ ...prev, steps: stepsRef.current }));
      }
    }

    lastAcceleration.current = acceleration;
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    // For iOS 13+ devices that require explicit permission
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        setState(prev => ({ 
          ...prev, 
          permissionStatus: permission as 'granted' | 'denied' 
        }));
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting motion permission:', error);
        setState(prev => ({ ...prev, permissionStatus: 'denied' }));
        return false;
      }
    }
    return true;
  };

  const startTracking = async () => {
    if (!state.isSupported) {
      console.warn('Device motion not supported');
      return false;
    }

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return false;
    }

    window.addEventListener('devicemotion', handleMotion);
    setState(prev => ({ ...prev, isTracking: true }));
    return true;
  };

  const stopTracking = () => {
    window.removeEventListener('devicemotion', handleMotion);
    setState(prev => ({ ...prev, isTracking: false }));
  };

  const resetSteps = () => {
    stepsRef.current = 0;
    setState(prev => ({ ...prev, steps: 0 }));
  };

  const getSteps = () => stepsRef.current;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [handleMotion]);

  return {
    ...state,
    startTracking,
    stopTracking,
    resetSteps,
    getSteps,
    requestPermission,
  };
}
