import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeightLogs } from '@/hooks/useWeightLogs';
import { useWorkoutLogs } from '@/hooks/useWorkoutLogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Minus, Scale } from 'lucide-react';
import { format } from 'date-fns';

const Progress = () => {
  const navigate = useNavigate();
  const { logs: weightLogs, addLog } = useWeightLogs();
  const { logs: workoutLogs, getWeeklyStats, getCurrentStreak } = useWorkoutLogs();
  const [weight, setWeight] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddWeight = async () => {
    if (!weight) return;
    await addLog(parseFloat(weight));
    setWeight('');
    setDialogOpen(false);
  };

  const weeklyStats = getWeeklyStats();
  const streak = getCurrentStreak();

  const getWeightTrend = () => {
    if (weightLogs.length < 2) return null;
    const latest = Number(weightLogs[0].weight_kg);
    const previous = Number(weightLogs[1].weight_kg);
    return latest - previous;
  };

  const trend = getWeightTrend();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Progress</h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" /> Log Weight
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Your Weight</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  type="number"
                  placeholder="Weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  step="0.1"
                />
                <Button onClick={handleAddWeight} className="w-full">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">{streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-accent">{workoutLogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Workouts</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Weight Card */}
        {weightLogs.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Current Weight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">{Number(weightLogs[0].weight_kg).toFixed(1)}</span>
                <span className="text-muted-foreground mb-1">kg</span>
                {trend !== null && (
                  <span className={`flex items-center text-sm ml-auto ${trend < 0 ? 'text-accent' : trend > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {trend < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : trend > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <Minus className="w-4 h-4 mr-1" />}
                    {Math.abs(trend).toFixed(1)} kg
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weight History */}
        <Card>
          <CardHeader>
            <CardTitle>Weight History</CardTitle>
          </CardHeader>
          <CardContent>
            {weightLogs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No weight entries yet. Start tracking!
              </p>
            ) : (
              <div className="space-y-3">
                {weightLogs.slice(0, 10).map((log) => (
                  <div key={log.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">
                      {format(new Date(log.logged_at), 'MMM d, yyyy')}
                    </span>
                    <span className="font-semibold">{Number(log.weight_kg).toFixed(1)} kg</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {workoutLogs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No workouts logged yet. Start training!
              </p>
            ) : (
              <div className="space-y-3">
                {workoutLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">Workout</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(log.completed_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{Math.round((log.duration_seconds || 0) / 60)} min</p>
                      <p className="text-sm text-muted-foreground">{log.calories_burned || 0} cal</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Progress;
