import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calculator } from 'lucide-react';

const BMICalculator = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // Convert cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      setBmi(w / (h * h));
    }
  };

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-warning' };
    if (bmi < 25) return { label: 'Normal', color: 'text-accent' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-warning' };
    return { label: 'Obese', color: 'text-destructive' };
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">BMI Calculator</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calculate Your BMI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Height (cm)</label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Weight (kg)</label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
              />
            </div>
            <Button onClick={calculateBMI} className="w-full">
              Calculate
            </Button>

            {bmi && (
              <div className="text-center pt-6">
                <p className="text-muted-foreground mb-2">Your BMI</p>
                <p className="text-5xl font-bold text-primary">{bmi.toFixed(1)}</p>
                <p className={`text-lg font-semibold mt-2 ${category?.color}`}>
                  {category?.label}
                </p>
                <div className="mt-6 text-sm text-muted-foreground space-y-1">
                  <p>Underweight: &lt; 18.5</p>
                  <p>Normal: 18.5 - 24.9</p>
                  <p>Overweight: 25 - 29.9</p>
                  <p>Obese: ≥ 30</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BMICalculator;
