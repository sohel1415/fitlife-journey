import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, Dumbbell, Heart, TrendingUp, Footprints, MapPin } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col">
        <div className="bg-energy-gradient absolute inset-0 opacity-10" />
        <div className="relative flex-1 flex flex-col justify-center px-6 py-12">
          <div className="max-w-lg mx-auto w-full">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Flame className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              FitTrack Pro
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground text-center mb-8 px-2">
              Your personal fitness companion. Track workouts, monitor progress, and achieve your goals.
            </p>
            <div className="flex flex-col gap-3 px-2">
              <Button 
                size="lg" 
                className="w-full h-14 text-base font-semibold rounded-xl active:scale-[0.98] transition-transform"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full h-12 text-base rounded-xl active:scale-[0.98] transition-transform"
                onClick={() => navigate('/exercises')}
              >
                Browse Exercises
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-5 py-10 bg-muted/30">
        <h2 className="text-xl font-bold text-center mb-6">Everything You Need</h2>
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          <FeatureCard 
            icon={<Dumbbell className="w-6 h-6" />}
            title="Workouts"
            description="Beginner to advanced programs"
            color="bg-primary"
          />
          <FeatureCard 
            icon={<Heart className="w-6 h-6" />}
            title="50+ Exercises"
            description="Detailed instructions"
            color="bg-accent"
          />
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Progress"
            description="Track weight & metrics"
            color="bg-secondary"
          />
          <FeatureCard 
            icon={<MapPin className="w-6 h-6" />}
            title="Running"
            description="GPS speed & pace"
            color="bg-primary"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary text-secondary-foreground px-6 py-10">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform?</h2>
          <p className="text-sm opacity-90 mb-6">
            Join thousands who have started their fitness journey with FitTrack Pro.
          </p>
          <Button 
            size="lg" 
            className="w-full h-14 text-base font-semibold rounded-xl active:scale-[0.98] transition-transform"
            onClick={() => navigate('/auth')}
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) => (
  <div className="bg-card rounded-2xl p-4 border border-border active:scale-[0.97] transition-transform">
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3 text-primary-foreground`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default Index;