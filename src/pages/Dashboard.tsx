import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useWorkoutLogs } from '@/hooks/useWorkoutLogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { Flame, Dumbbell, TrendingUp, Clock, Trophy, ChevronRight, BookOpen, UtensilsCrossed, Footprints, MapPin } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const { getWeeklyStats, getCurrentStreak } = useWorkoutLogs();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const weeklyStats = getWeeklyStats();
  const streak = getCurrentStreak();
  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-energy-gradient p-6 pb-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80">{greeting}</p>
            <h1 className="text-2xl font-bold text-primary-foreground">
              {profile?.full_name || 'Athlete'}
            </h1>
          </div>
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Flame className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>

        {/* Streak Card */}
        <Card className="bg-card/95 backdrop-blur">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{streak} days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-lg font-semibold">{weeklyStats.workoutsCompleted} workouts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            icon={<Clock className="w-5 h-5" />}
            label="Total Time"
            value={formatDuration(weeklyStats.totalDuration)}
            color="bg-primary"
          />
          <StatCard 
            icon={<Flame className="w-5 h-5" />}
            label="Calories"
            value={`${weeklyStats.totalCalories}`}
            color="bg-accent"
          />
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="space-y-3 mb-6">
          <ActionCard 
            icon={<Dumbbell className="w-6 h-6" />}
            title="Start Workout"
            subtitle="Choose from our workout plans"
            onClick={() => navigate('/workouts')}
          />
          <ActionCard 
            icon={<BookOpen className="w-6 h-6" />}
            title="Exercise Library"
            subtitle="Browse 50+ exercises with instructions"
            onClick={() => navigate('/exercises')}
          />
          <ActionCard 
            icon={<UtensilsCrossed className="w-6 h-6" />}
            title="Diet Suggestions"
            subtitle="View personalized meal recommendations"
            onClick={() => navigate('/diet')}
          />
          <ActionCard 
            icon={<Footprints className="w-6 h-6" />}
            title="Step Counter"
            subtitle="Track your daily walking steps"
            onClick={() => navigate('/steps')}
          />
          <ActionCard 
            icon={<MapPin className="w-6 h-6" />}
            title="Running Tracker"
            subtitle="Track speed, distance, pace & more"
            onClick={() => navigate('/running')}
          />
          <ActionCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Track Progress"
            subtitle="Log your weight and measurements"
            onClick={() => navigate('/progress')}
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) => (
  <Card>
    <CardContent className="p-4">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-2 text-primary-foreground`}>
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const ActionCard = ({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick: () => void }) => (
  <Card className="cursor-pointer fitness-card" onClick={onClick}>
    <CardContent className="p-4 flex items-center">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </CardContent>
  </Card>
);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
};

export default Dashboard;
