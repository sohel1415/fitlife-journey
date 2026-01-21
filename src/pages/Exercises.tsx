import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercises, categories } from '@/data/exercises';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Exercises = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.targetMuscles.some(m => m.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !selectedCategory || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Exercise Library</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4">
          <Badge 
            variant={!selectedCategory ? "default" : "outline"}
            className="cursor-pointer shrink-0"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge 
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className="cursor-pointer shrink-0"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </Badge>
          ))}
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="fitness-card cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exercise.targetMuscles.join(', ')}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {exercise.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedExercise.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedExercise.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Target Muscles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.targetMuscles.map((muscle) => (
                      <Badge key={muscle} variant="secondary">{muscle}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Equipment</h4>
                  <p className="text-muted-foreground">{selectedExercise.equipment}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="space-y-2">
                    {selectedExercise.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-4 text-sm">
                  {selectedExercise.sets && (
                    <div>
                      <span className="text-muted-foreground">Sets:</span> <strong>{selectedExercise.sets}</strong>
                    </div>
                  )}
                  {selectedExercise.reps && (
                    <div>
                      <span className="text-muted-foreground">Reps:</span> <strong>{selectedExercise.reps}</strong>
                    </div>
                  )}
                  {selectedExercise.durationSeconds && (
                    <div>
                      <span className="text-muted-foreground">Duration:</span> <strong>{selectedExercise.durationSeconds}s</strong>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Exercises;
