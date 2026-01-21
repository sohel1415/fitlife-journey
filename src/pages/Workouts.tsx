import { useNavigate } from 'react-router-dom';
import { workoutPlans } from '@/data/workoutPlans';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Clock, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Workouts = () => {
  const navigate = useNavigate();
  const difficulties = ['beginner', 'intermediate', 'advanced'] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Workout Plans</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {difficulties.map((difficulty) => {
          const plans = workoutPlans.filter(p => p.difficulty === difficulty);
          return (
            <div key={difficulty}>
              <h2 className="text-lg font-semibold capitalize mb-4 flex items-center gap-2">
                <DifficultyBadge difficulty={difficulty} />
                {difficulty}
              </h2>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className="fitness-card cursor-pointer"
                    onClick={() => navigate(`/workout/${plan.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{plan.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {plan.estimatedDurationMins} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {plan.daysPerWeek}x/week
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {plan.exercises.length} exercises
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    beginner: 'bg-accent text-accent-foreground',
    intermediate: 'bg-warning text-warning-foreground',
    advanced: 'bg-destructive text-destructive-foreground',
  };
  return (
    <Badge className={colors[difficulty as keyof typeof colors]}>
      {difficulty}
    </Badge>
  );
};

export default Workouts;
