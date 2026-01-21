import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutPlanById } from '@/data/workoutPlans';
import { getExerciseById } from '@/data/exercises';
import { useWorkoutLogs } from '@/hooks/useWorkoutLogs';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, SkipForward, Check, X } from 'lucide-react';

const ActiveWorkout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addLog } = useWorkoutLogs();
  
  const plan = planId ? getWorkoutPlanById(planId) : null;
  const exerciseList = plan?.exercises.map(id => getExerciseById(id)).filter(Boolean) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const currentExercise = exerciseList[currentIndex];
  const restTime = 30; // 30 seconds rest

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (isResting && prev <= 1) {
            setIsResting(false);
            return currentExercise?.durationSeconds || 0;
          }
          return prev - 1;
        });
        setTotalTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isResting, currentExercise]);

  const startExercise = () => {
    setTimer(currentExercise?.durationSeconds || 45);
    setIsRunning(true);
  };

  const completeExercise = useCallback(() => {
    if (currentExercise) {
      setCompletedExercises(prev => [...prev, currentExercise.id]);
    }
    
    if (currentIndex < exerciseList.length - 1) {
      setIsResting(true);
      setTimer(restTime);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, restTime * 1000);
    } else {
      // Workout complete
      finishWorkout();
    }
  }, [currentExercise, currentIndex, exerciseList.length]);

  const skipExercise = () => {
    if (currentIndex < exerciseList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsResting(false);
      setTimer(0);
      setIsRunning(false);
    } else {
      finishWorkout();
    }
  };

  const finishWorkout = async () => {
    if (user) {
      await addLog({
        workout_plan_id: planId || null,
        exercises_completed: completedExercises,
        duration_seconds: totalTime,
        calories_burned: Math.round(totalTime * 0.15), // Rough estimate
        notes: null,
      });
    }
    navigate('/dashboard');
  };

  if (!plan || exerciseList.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Workout not found</p>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / exerciseList.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="w-5 h-5" />
          </Button>
          <span className="font-medium">{currentIndex + 1} / {exerciseList.length}</span>
          <Button variant="ghost" size="sm" onClick={finishWorkout}>
            Finish
          </Button>
        </div>
        <Progress value={progress} className="mt-2" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {isResting ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Rest Time</h2>
            <div className="text-7xl font-bold text-primary mb-4">{timer}</div>
            <p className="text-muted-foreground mb-8">Next: {exerciseList[currentIndex + 1]?.name}</p>
            <Button onClick={() => { setIsResting(false); setCurrentIndex(prev => prev + 1); }}>
              Skip Rest
            </Button>
          </div>
        ) : currentExercise ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{currentExercise.name}</h2>
            <p className="text-muted-foreground mb-6">
              {currentExercise.targetMuscles.join(', ')}
            </p>

            {/* Timer or Reps Display */}
            <Card className="mb-8">
              <CardContent className="py-12">
                {currentExercise.durationSeconds ? (
                  <div className="text-7xl font-bold text-primary">
                    {isRunning ? timer : currentExercise.durationSeconds}
                    <span className="text-2xl text-muted-foreground ml-2">sec</span>
                  </div>
                ) : (
                  <div className="text-5xl font-bold">
                    {currentExercise.sets} × {currentExercise.reps}
                    <p className="text-lg text-muted-foreground mt-2">sets × reps</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {currentExercise.durationSeconds && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-16 h-16 rounded-full"
                  onClick={() => setIsRunning(!isRunning)}
                >
                  {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
              )}
              <Button
                size="lg"
                className="w-16 h-16 rounded-full bg-primary"
                onClick={completeExercise}
              >
                <Check className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full"
                onClick={skipExercise}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-left">
              <h3 className="font-semibold mb-3">Instructions</h3>
              <ol className="space-y-2">
                {currentExercise.instructions.slice(0, 3).map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 bg-muted rounded-full flex items-center justify-center shrink-0 text-xs">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ActiveWorkout;
