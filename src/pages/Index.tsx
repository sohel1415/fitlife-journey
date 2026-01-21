import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, Dumbbell, Heart, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-energy-gradient absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                <Flame className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FitTrack Pro
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your personal fitness companion. Track workouts, monitor progress, and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate('/exercises')}
              >
                Browse Exercises
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Dumbbell className="w-8 h-8" />}
            title="Workout Plans"
            description="Beginner to advanced programs tailored to your fitness level"
            color="bg-primary"
          />
          <FeatureCard 
            icon={<Heart className="w-8 h-8" />}
            title="50+ Exercises"
            description="Detailed instructions and animations for every movement"
            color="bg-accent"
          />
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8" />}
            title="Progress Tracking"
            description="Monitor your weight, workouts, and achievements"
            color="bg-secondary"
          />
          <FeatureCard 
            icon={<Flame className="w-8 h-8" />}
            title="BMI Calculator"
            description="Track your body metrics and health indicators"
            color="bg-primary"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands of users who have already started their fitness journey with FitTrack Pro.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8"
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
  <div className="bg-card rounded-xl p-6 border border-border fitness-card">
    <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4 text-primary-foreground`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
