import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useMeals } from '@/hooks/useMeals';
import { Meal } from '@/data/meals';
import { BottomNav } from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  UtensilsCrossed, 
  Flame, 
  Clock, 
  Leaf, 
  Drumstick,
  Wheat,
  Plus,
  Check,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Diet = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const { getMealsByCategory, logMeal, getTodaysCalories, getTodaysMeals } = useMeals();
  
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [dietFilter, setDietFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('breakfast');

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

  const todaysCalories = getTodaysCalories();
  const todaysMeals = getTodaysMeals();
  const targetCalories = getTargetCalories(profile?.fitness_goal);

  const categories = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snack', label: 'Snacks', icon: '🍎' },
  ];

  const dietTypes = [
    { id: 'all', label: 'All', icon: null },
    { id: 'veg', label: 'Veg', icon: <Leaf className="w-4 h-4" /> },
    { id: 'non-veg', label: 'Non-Veg', icon: <Drumstick className="w-4 h-4" /> },
    { id: 'vegan', label: 'Vegan', icon: <Wheat className="w-4 h-4" /> },
  ];

  const handleLogMeal = async (meal: Meal) => {
    await logMeal(meal, activeTab);
    setSelectedMeal(null);
  };

  const filteredMeals = getMealsByCategory(activeTab, profile?.fitness_goal)
    .filter(meal => dietFilter === 'all' || meal.diet_type === dietFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-energy-gradient p-6 pb-8 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground mb-4">Daily Diet Plan</h1>
        
        {/* Calories Summary */}
        <Card className="bg-card/95 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Calories</p>
                  <p className="text-2xl font-bold">{todaysCalories}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="text-lg font-semibold">{targetCalories} cal</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${Math.min((todaysCalories / targetCalories) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Today's Logged Meals */}
        {todaysMeals.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Today's Meals</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {todaysMeals.map((log) => (
                <Card key={log.id} className="flex-shrink-0 min-w-[140px]">
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate">{log.meal_name}</p>
                    <p className="text-xs text-muted-foreground">{log.calories} cal</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Diet Type Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {dietTypes.map((type) => (
            <Button
              key={type.id}
              variant={dietFilter === type.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDietFilter(type.id)}
              className="flex-shrink-0"
            >
              {type.icon}
              <span className="ml-1">{type.label}</span>
            </Button>
          ))}
        </div>

        {/* Meal Categories Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-4">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="space-y-3">
              {filteredMeals.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No meals found for your filters
                  </CardContent>
                </Card>
              ) : (
                filteredMeals.map((meal) => (
                  <MealCard 
                    key={meal.id} 
                    meal={meal} 
                    onClick={() => setSelectedMeal(meal)}
                  />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Meal Detail Dialog */}
      <Dialog open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)}>
        <DialogContent className="max-w-md max-h-[90vh]">
          {selectedMeal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedMeal.name}</DialogTitle>
                <DialogDescription>{selectedMeal.description}</DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[60vh] pr-4">
                {/* Nutrition */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <NutritionBadge label="Calories" value={`${selectedMeal.calories}`} color="bg-accent" />
                  <NutritionBadge label="Protein" value={`${selectedMeal.protein_g}g`} color="bg-primary" />
                  <NutritionBadge label="Carbs" value={`${selectedMeal.carbs_g}g`} color="bg-secondary" />
                  <NutritionBadge label="Fat" value={`${selectedMeal.fat_g}g`} color="bg-muted" />
                </div>

                {/* Meta */}
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedMeal.prep_time_mins} min
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedMeal.diet_type}
                  </Badge>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="space-y-1">
                    {selectedMeal.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="space-y-2">
                    {selectedMeal.instructions.map((step, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </ScrollArea>

              <Button onClick={() => handleLogMeal(selectedMeal)} className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Log This Meal
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

const MealCard = ({ meal, onClick }: { meal: Meal; onClick: () => void }) => (
  <Card className="cursor-pointer fitness-card" onClick={onClick}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{meal.name}</h3>
            {meal.diet_type === 'veg' && <Leaf className="w-4 h-4 text-green-500" />}
            {meal.diet_type === 'vegan' && <Wheat className="w-4 h-4 text-green-600" />}
            {meal.diet_type === 'non-veg' && <Drumstick className="w-4 h-4 text-orange-500" />}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{meal.description}</p>
          <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-accent" />
              {meal.calories} cal
            </span>
            <span>{meal.protein_g}g protein</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {meal.prep_time_mins}m
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </CardContent>
  </Card>
);

const NutritionBadge = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className={cn("rounded-lg p-2 text-center", color)}>
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs opacity-80">{label}</p>
  </div>
);

const getTargetCalories = (fitnessGoal: string | null | undefined): number => {
  switch (fitnessGoal) {
    case 'lose_weight':
      return 1800;
    case 'build_muscle':
    case 'gain_weight':
      return 2500;
    case 'stay_fit':
    default:
      return 2000;
  }
};

export default Diet;
