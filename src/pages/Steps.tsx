import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStepLogs } from '@/hooks/useStepLogs';
import { useStepDetector } from '@/hooks/useStepDetector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Footprints, Target, Flame, Trophy, TrendingUp, Play, Pause, Smartphone } from 'lucide-react';

const Steps = () => {
  const navigate = useNavigate();
  const { getTodayLog, addSteps, updateGoal, getWeeklyData, getWeeklyStats, getCurrentStreak, loading } = useStepLogs();
  const stepDetector = useStepDetector();
  
  const [steps, setSteps] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [stepsDialogOpen, setStepsDialogOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [lastSavedSteps, setLastSavedSteps] = useState(0);

  const todayLog = getTodayLog();
  const currentSteps = (todayLog?.steps || 0) + stepDetector.steps;
  const currentGoal = todayLog?.goal || 10000;
  const progress = Math.min((currentSteps / currentGoal) * 100, 100);
  const weeklyData = getWeeklyData();
  const weeklyStats = getWeeklyStats();
  const streak = getCurrentStreak();

  // Estimate calories burned (approx 0.04 cal per step)
  const caloriesBurned = Math.round(currentSteps * 0.04);
  // Estimate distance (approx 0.0008 km per step)
  const distanceKm = (currentSteps * 0.0008).toFixed(2);

  // Auto-save steps periodically when tracking
  useEffect(() => {
    if (stepDetector.isTracking && stepDetector.steps > lastSavedSteps) {
      const saveInterval = setInterval(async () => {
        const stepsToSave = stepDetector.steps - lastSavedSteps;
        if (stepsToSave > 0) {
          await addSteps(stepsToSave, currentGoal);
          setLastSavedSteps(stepDetector.steps);
        }
      }, 30000); // Save every 30 seconds

      return () => clearInterval(saveInterval);
    }
  }, [stepDetector.isTracking, stepDetector.steps, lastSavedSteps, addSteps, currentGoal]);

  // Save steps when stopping tracking
  const handleStopTracking = async () => {
    stepDetector.stopTracking();
    const stepsToSave = stepDetector.steps - lastSavedSteps;
    if (stepsToSave > 0) {
      await addSteps(stepsToSave, currentGoal);
      setLastSavedSteps(stepDetector.steps);
    }
  };

  const handleStartTracking = async () => {
    const started = await stepDetector.startTracking();
    if (!started && stepDetector.permissionStatus === 'denied') {
      // Show message about permission denied
    }
  };

  const handleAddSteps = async () => {
    if (!steps) return;
    await addSteps(parseInt(steps), currentGoal);
    setSteps('');
    setStepsDialogOpen(false);
  };

  const handleUpdateGoal = async () => {
    if (!goalInput) return;
    await updateGoal(parseInt(goalInput));
    setGoalInput('');
    setGoalDialogOpen(false);
  };

  const quickAddSteps = async (amount: number) => {
    await addSteps(amount, currentGoal);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Step Counter</h1>
          </div>
          <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Target className="w-4 h-4 mr-1" /> Set Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Daily Step Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  type="number"
                  placeholder="e.g., 10000"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                />
                <div className="flex gap-2 flex-wrap">
                  {[5000, 8000, 10000, 12000, 15000].map(g => (
                    <Button key={g} variant="outline" size="sm" onClick={() => setGoalInput(g.toString())}>
                      {g.toLocaleString()}
                    </Button>
                  ))}
                </div>
                <Button onClick={handleUpdateGoal} className="w-full">
                  Save Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Main Progress Card */}
        <Card className="bg-energy-gradient text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Footprints className="w-8 h-8" />
              </div>
              <div className="flex items-center gap-2">
                {stepDetector.isTracking && (
                  <div className="flex items-center gap-1 bg-primary-foreground/20 px-3 py-1 rounded-full animate-pulse">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm">Tracking</span>
                  </div>
                )}
                {progress >= 100 && (
                  <div className="flex items-center gap-2 bg-primary-foreground/20 px-3 py-1 rounded-full">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">Goal Achieved!</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-5xl font-bold">{currentSteps.toLocaleString()}</p>
              <p className="text-primary-foreground/80">of {currentGoal.toLocaleString()} steps</p>
            </div>

            <Progress value={progress} className="h-3 bg-primary-foreground/20" />
            
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <p className="text-primary-foreground/80">Distance</p>
                <p className="font-semibold">{distanceKm} km</p>
              </div>
              <div>
                <p className="text-primary-foreground/80">Calories</p>
                <p className="font-semibold">{caloriesBurned} kcal</p>
              </div>
              <div>
                <p className="text-primary-foreground/80">Remaining</p>
                <p className="font-semibold">{Math.max(0, currentGoal - currentSteps).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Detection Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Auto Step Detection</p>
                <p className="text-sm text-muted-foreground">
                  {!stepDetector.isSupported 
                    ? 'Not supported on this device'
                    : stepDetector.permissionStatus === 'denied'
                    ? 'Motion permission denied'
                    : stepDetector.isTracking 
                    ? `Detected: ${stepDetector.steps} steps`
                    : 'Tap to start tracking'}
                </p>
              </div>
              {stepDetector.isSupported && stepDetector.permissionStatus !== 'denied' && (
                <Button
                  variant={stepDetector.isTracking ? 'destructive' : 'default'}
                  size="lg"
                  className="w-14 h-14 rounded-full p-0"
                  onClick={stepDetector.isTracking ? handleStopTracking : handleStartTracking}
                >
                  {stepDetector.isTracking ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
              )}
            </div>
            {stepDetector.permissionStatus === 'prompt' && !stepDetector.isTracking && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                You'll be asked to allow motion sensor access
              </p>
            )}
          </CardContent>
        </Card>

        {/* Manual Entry Section */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Or add steps manually:</p>
          
          {/* Quick Add Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[500, 1000, 2000, 5000].map(amount => (
              <Button 
                key={amount} 
                variant="outline" 
                className="flex flex-col h-16"
                onClick={() => quickAddSteps(amount)}
              >
                <span className="text-xs text-muted-foreground">+</span>
                <span className="font-semibold">{amount}</span>
              </Button>
            ))}
          </div>

          {/* Custom Add */}
          <Dialog open={stepsDialogOpen} onOpenChange={setStepsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus className="w-5 h-5 mr-2" /> Custom Amount
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Your Steps</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  type="number"
                  placeholder="Enter step count"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                />
                <Button onClick={handleAddSteps} className="w-full">
                  Add Steps
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{weeklyStats.totalSteps.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Weekly Steps</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Flame className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end h-32 gap-1">
              {weeklyData.map((day) => {
                const height = day.goal > 0 ? Math.max((day.steps / day.goal) * 100, 5) : 5;
                const achieved = day.steps >= day.goal;
                return (
                  <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex-1 flex items-end">
                      <div 
                        className={`w-full rounded-t transition-all ${
                          day.isToday 
                            ? 'bg-primary' 
                            : achieved 
                              ? 'bg-accent' 
                              : 'bg-muted'
                        }`}
                        style={{ height: `${Math.min(height, 100)}%` }}
                      />
                    </div>
                    <span className={`text-xs ${day.isToday ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                      {day.dayName}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-accent rounded" />
                <span>Goal Met</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted rounded" />
                <span>In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average daily steps</span>
              <span className="font-semibold">{weeklyStats.averageSteps.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days with activity</span>
              <span className="font-semibold">{weeklyStats.daysWithSteps} / 7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Goals achieved</span>
              <span className="font-semibold">{weeklyStats.goalsAchieved} days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Steps;
