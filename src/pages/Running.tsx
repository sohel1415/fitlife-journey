import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRunningTracker } from '@/hooks/useRunningTracker';
import { useRunningLogs } from '@/hooks/useRunningLogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft, Play, Pause, Square, MapPin, Timer, Gauge, 
  TrendingUp, Flame, Route, Clock, Zap, History, Trash2
} from 'lucide-react';

const Running = () => {
  const navigate = useNavigate();
  const tracker = useRunningTracker();
  const { addLog, getWeeklyStats, getRecentRuns, deleteLog, loading } = useRunningLogs();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [runToSave, setRunToSave] = useState<any>(null);

  const weeklyStats = getWeeklyStats();
  const recentRuns = getRecentRuns();

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPace = (paceMinKm: number) => {
    if (paceMinKm <= 0 || paceMinKm > 30) return '--:--';
    const mins = Math.floor(paceMinKm);
    const secs = Math.round((paceMinKm - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    await tracker.startTracking();
  };

  const handlePauseResume = () => {
    if (tracker.isPaused) {
      tracker.resumeTracking();
    } else {
      tracker.pauseTracking();
    }
  };

  const handleStop = () => {
    const result = tracker.stopTracking();
    if (result.stats.distanceKm > 0.01 || result.stats.durationSeconds > 10) {
      setRunToSave(result);
      setShowSaveDialog(true);
    }
  };

  const handleSaveRun = async () => {
    if (!runToSave) return;

    // Estimate calories (approx 60 cal per km for running)
    const caloriesBurned = Math.round(runToSave.stats.distanceKm * 60);

    await addLog({
      distance_km: runToSave.stats.distanceKm,
      duration_seconds: runToSave.stats.durationSeconds,
      avg_speed_kmh: runToSave.stats.avgSpeedKmh,
      max_speed_kmh: runToSave.stats.maxSpeedKmh,
      avg_pace_min_km: runToSave.stats.avgPaceMinKm,
      calories_burned: caloriesBurned,
      start_time: runToSave.startTime,
      end_time: runToSave.endTime,
      route_data: runToSave.positions.length > 0 ? { positions: runToSave.positions } : null,
    });

    setShowSaveDialog(false);
    setRunToSave(null);
    tracker.resetTracking();
  };

  const handleDiscardRun = () => {
    setShowSaveDialog(false);
    setRunToSave(null);
    tracker.resetTracking();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Running Tracker</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Main Tracking Card */}
        <Card className={`${tracker.isTracking ? 'bg-energy-gradient text-primary-foreground' : ''}`}>
          <CardContent className="p-6">
            {/* Status indicator */}
            {tracker.isTracking && (
              <div className="flex justify-center mb-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${tracker.isPaused ? 'bg-yellow-500/20' : 'bg-primary-foreground/20 animate-pulse'}`}>
                  <div className={`w-3 h-3 rounded-full ${tracker.isPaused ? 'bg-yellow-400' : 'bg-green-400'}`} />
                  <span className="font-medium">{tracker.isPaused ? 'Paused' : 'Tracking'}</span>
                </div>
              </div>
            )}

            {/* Main Stats Display */}
            <div className="text-center mb-6">
              <p className="text-5xl font-bold font-mono">
                {tracker.stats.distanceKm.toFixed(2)}
              </p>
              <p className={`text-lg ${tracker.isTracking ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                kilometers
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Timer className={`w-5 h-5 mx-auto mb-1 ${tracker.isTracking ? '' : 'text-primary'}`} />
                <p className="text-xl font-bold font-mono">
                  {formatDuration(tracker.stats.durationSeconds)}
                </p>
                <p className={`text-xs ${tracker.isTracking ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  Duration
                </p>
              </div>
              <div className="text-center">
                <Gauge className={`w-5 h-5 mx-auto mb-1 ${tracker.isTracking ? '' : 'text-primary'}`} />
                <p className="text-xl font-bold">
                  {tracker.stats.currentSpeedKmh.toFixed(1)}
                </p>
                <p className={`text-xs ${tracker.isTracking ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  km/h
                </p>
              </div>
              <div className="text-center">
                <Clock className={`w-5 h-5 mx-auto mb-1 ${tracker.isTracking ? '' : 'text-primary'}`} />
                <p className="text-xl font-bold font-mono">
                  {formatPace(tracker.stats.paceMinKm)}
                </p>
                <p className={`text-xs ${tracker.isTracking ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  min/km
                </p>
              </div>
            </div>

            {/* Control Buttons */}
            {!tracker.isTracking ? (
              <Button 
                onClick={handleStart} 
                className="w-full h-14 text-lg"
                disabled={!tracker.isSupported || tracker.permissionStatus === 'denied'}
              >
                <Play className="w-6 h-6 mr-2" />
                Start Run
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={handlePauseResume}
                  variant="outline"
                  className="flex-1 h-14 text-lg bg-primary-foreground/20 border-primary-foreground/30 hover:bg-primary-foreground/30"
                >
                  {tracker.isPaused ? (
                    <>
                      <Play className="w-6 h-6 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-6 h-6 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleStop}
                  variant="destructive"
                  className="flex-1 h-14 text-lg"
                >
                  <Square className="w-6 h-6 mr-2" />
                  Stop
                </Button>
              </div>
            )}

            {/* Permission/Support Messages */}
            {!tracker.isSupported && (
              <p className="text-center text-sm text-destructive mt-4">
                GPS not supported on this device
              </p>
            )}
            {tracker.permissionStatus === 'denied' && (
              <p className="text-center text-sm text-destructive mt-4">
                Location permission denied. Please enable it in settings.
              </p>
            )}
            {tracker.error && (
              <p className="text-center text-sm text-destructive mt-4">
                {tracker.error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Additional Stats when tracking */}
        {tracker.isTracking && (
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="text-xl font-bold">{tracker.stats.avgSpeedKmh.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Avg Speed (km/h)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xl font-bold">{tracker.stats.maxSpeedKmh.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Max Speed (km/h)</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Weekly Stats */}
        {!tracker.isTracking && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Route className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{weeklyStats.totalDistance.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">km this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Flame className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-2xl font-bold">{weeklyStats.totalRuns}</p>
                  <p className="text-sm text-muted-foreground">runs this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Runs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Runs
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentRuns.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No runs yet. Start your first run!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentRuns.map(run => (
                      <div 
                        key={run.id} 
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {Number(run.distance_km).toFixed(2)} km
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(run.start_time).toLocaleDateString()} • {formatDuration(run.duration_seconds)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right mr-2">
                            <p className="text-sm font-medium">
                              {formatPace(Number(run.avg_pace_min_km))} /km
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {run.calories_burned} kcal
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteLog(run.id)}
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Save Run Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Complete! 🏃</DialogTitle>
          </DialogHeader>
          {runToSave && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{runToSave.stats.distanceKm.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">km</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold font-mono">
                    {formatDuration(runToSave.stats.durationSeconds)}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">
                    {formatPace(runToSave.stats.avgPaceMinKm)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Pace</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">
                    {runToSave.stats.avgSpeedKmh.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg km/h</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleDiscardRun} className="flex-1">
                  Discard
                </Button>
                <Button onClick={handleSaveRun} className="flex-1">
                  Save Run
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Running;
