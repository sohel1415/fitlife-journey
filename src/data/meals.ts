export interface Meal {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  diet_type: 'veg' | 'non-veg' | 'vegan';
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fitness_goal: string[];
  ingredients: string[];
  instructions: string[];
  prep_time_mins: number;
}

export const meals: Meal[] = [
  // BREAKFAST - Weight Loss
  {
    id: 'breakfast-1',
    name: 'Greek Yogurt Parfait',
    description: 'Creamy Greek yogurt layered with fresh berries and a sprinkle of granola',
    category: 'breakfast',
    diet_type: 'veg',
    calories: 280,
    protein_g: 20,
    carbs_g: 35,
    fat_g: 8,
    fitness_goal: ['lose_weight', 'stay_fit'],
    ingredients: ['Greek yogurt (200g)', 'Mixed berries (100g)', 'Granola (30g)', 'Honey (1 tsp)'],
    instructions: ['Layer yogurt in a bowl', 'Add mixed berries', 'Top with granola', 'Drizzle honey'],
    prep_time_mins: 5
  },
  {
    id: 'breakfast-2',
    name: 'Egg White Omelette',
    description: 'Fluffy egg white omelette loaded with vegetables',
    category: 'breakfast',
    diet_type: 'veg',
    calories: 180,
    protein_g: 24,
    carbs_g: 8,
    fat_g: 4,
    fitness_goal: ['lose_weight', 'build_muscle'],
    ingredients: ['Egg whites (4)', 'Spinach (50g)', 'Bell peppers (50g)', 'Onion (30g)', 'Salt & pepper'],
    instructions: ['Whisk egg whites', 'Sauté vegetables', 'Pour egg whites over veggies', 'Cook until set, fold and serve'],
    prep_time_mins: 10
  },
  {
    id: 'breakfast-3',
    name: 'Overnight Oats',
    description: 'Creamy overnight oats with chia seeds and banana',
    category: 'breakfast',
    diet_type: 'vegan',
    calories: 350,
    protein_g: 12,
    carbs_g: 55,
    fat_g: 10,
    fitness_goal: ['stay_fit', 'gain_weight'],
    ingredients: ['Rolled oats (60g)', 'Almond milk (200ml)', 'Chia seeds (15g)', 'Banana (1)', 'Maple syrup (1 tbsp)'],
    instructions: ['Mix oats, milk, and chia seeds', 'Refrigerate overnight', 'Top with sliced banana', 'Drizzle maple syrup'],
    prep_time_mins: 5
  },
  // BREAKFAST - Muscle Building
  {
    id: 'breakfast-4',
    name: 'Protein Pancakes',
    description: 'Fluffy pancakes packed with protein for muscle recovery',
    category: 'breakfast',
    diet_type: 'veg',
    calories: 420,
    protein_g: 35,
    carbs_g: 45,
    fat_g: 12,
    fitness_goal: ['build_muscle', 'gain_weight'],
    ingredients: ['Protein powder (30g)', 'Oats (50g)', 'Egg (1)', 'Banana (1)', 'Milk (100ml)'],
    instructions: ['Blend all ingredients', 'Pour batter on hot pan', 'Cook until bubbles form', 'Flip and cook through'],
    prep_time_mins: 15
  },
  {
    id: 'breakfast-5',
    name: 'Scrambled Eggs with Avocado Toast',
    description: 'Classic scrambled eggs served with creamy avocado on whole grain toast',
    category: 'breakfast',
    diet_type: 'veg',
    calories: 450,
    protein_g: 22,
    carbs_g: 35,
    fat_g: 28,
    fitness_goal: ['build_muscle', 'stay_fit', 'gain_weight'],
    ingredients: ['Eggs (3)', 'Avocado (1/2)', 'Whole grain bread (2 slices)', 'Salt & pepper', 'Olive oil'],
    instructions: ['Toast bread slices', 'Mash avocado and spread on toast', 'Scramble eggs in olive oil', 'Serve eggs alongside toast'],
    prep_time_mins: 10
  },
  
  // LUNCH OPTIONS
  {
    id: 'lunch-1',
    name: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens with grilled chicken breast and light vinaigrette',
    category: 'lunch',
    diet_type: 'non-veg',
    calories: 380,
    protein_g: 42,
    carbs_g: 15,
    fat_g: 18,
    fitness_goal: ['lose_weight', 'build_muscle'],
    ingredients: ['Chicken breast (150g)', 'Mixed greens (100g)', 'Cherry tomatoes (50g)', 'Cucumber (50g)', 'Olive oil dressing'],
    instructions: ['Grill seasoned chicken breast', 'Prepare salad with greens and vegetables', 'Slice chicken and place on salad', 'Drizzle with dressing'],
    prep_time_mins: 20
  },
  {
    id: 'lunch-2',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing',
    category: 'lunch',
    diet_type: 'vegan',
    calories: 420,
    protein_g: 15,
    carbs_g: 55,
    fat_g: 18,
    fitness_goal: ['stay_fit', 'lose_weight'],
    ingredients: ['Quinoa (100g cooked)', 'Chickpeas (80g)', 'Roasted sweet potato (100g)', 'Kale (50g)', 'Tahini (2 tbsp)'],
    instructions: ['Cook quinoa as directed', 'Roast sweet potato cubes', 'Massage kale with olive oil', 'Assemble bowl and drizzle tahini'],
    prep_time_mins: 30
  },
  {
    id: 'lunch-3',
    name: 'Turkey Wrap',
    description: 'Whole wheat wrap filled with lean turkey and fresh vegetables',
    category: 'lunch',
    diet_type: 'non-veg',
    calories: 350,
    protein_g: 30,
    carbs_g: 32,
    fat_g: 12,
    fitness_goal: ['lose_weight', 'stay_fit'],
    ingredients: ['Whole wheat wrap (1)', 'Turkey breast (100g)', 'Lettuce', 'Tomato', 'Mustard'],
    instructions: ['Lay out wrap', 'Layer turkey and vegetables', 'Add mustard', 'Roll tightly'],
    prep_time_mins: 10
  },
  {
    id: 'lunch-4',
    name: 'Salmon Rice Bowl',
    description: 'Grilled salmon over brown rice with steamed vegetables',
    category: 'lunch',
    diet_type: 'non-veg',
    calories: 520,
    protein_g: 38,
    carbs_g: 45,
    fat_g: 22,
    fitness_goal: ['build_muscle', 'gain_weight'],
    ingredients: ['Salmon fillet (150g)', 'Brown rice (150g cooked)', 'Broccoli (100g)', 'Soy sauce', 'Sesame seeds'],
    instructions: ['Cook brown rice', 'Grill salmon with seasoning', 'Steam broccoli', 'Assemble bowl and garnish'],
    prep_time_mins: 25
  },
  {
    id: 'lunch-5',
    name: 'Lentil Soup',
    description: 'Hearty lentil soup packed with vegetables and spices',
    category: 'lunch',
    diet_type: 'vegan',
    calories: 320,
    protein_g: 18,
    carbs_g: 48,
    fat_g: 6,
    fitness_goal: ['lose_weight', 'stay_fit'],
    ingredients: ['Red lentils (100g)', 'Carrots (50g)', 'Celery (30g)', 'Onion (50g)', 'Vegetable broth (400ml)'],
    instructions: ['Sauté onion, carrots, and celery', 'Add lentils and broth', 'Simmer until lentils are soft', 'Season and serve'],
    prep_time_mins: 35
  },
  
  // DINNER OPTIONS
  {
    id: 'dinner-1',
    name: 'Grilled Fish with Vegetables',
    description: 'Lean grilled fish served with a medley of roasted vegetables',
    category: 'dinner',
    diet_type: 'non-veg',
    calories: 340,
    protein_g: 35,
    carbs_g: 20,
    fat_g: 14,
    fitness_goal: ['lose_weight', 'build_muscle'],
    ingredients: ['White fish fillet (150g)', 'Zucchini (80g)', 'Bell peppers (80g)', 'Olive oil', 'Lemon'],
    instructions: ['Season fish with lemon and herbs', 'Grill until cooked through', 'Roast vegetables with olive oil', 'Serve together'],
    prep_time_mins: 25
  },
  {
    id: 'dinner-2',
    name: 'Chicken Stir Fry',
    description: 'Quick chicken stir fry with colorful vegetables in light sauce',
    category: 'dinner',
    diet_type: 'non-veg',
    calories: 380,
    protein_g: 38,
    carbs_g: 25,
    fat_g: 15,
    fitness_goal: ['build_muscle', 'stay_fit'],
    ingredients: ['Chicken breast (150g)', 'Broccoli (80g)', 'Snap peas (50g)', 'Soy sauce', 'Garlic'],
    instructions: ['Slice chicken and stir fry', 'Add vegetables and garlic', 'Pour in soy sauce', 'Cook until vegetables are tender-crisp'],
    prep_time_mins: 20
  },
  {
    id: 'dinner-3',
    name: 'Vegetable Curry',
    description: 'Aromatic vegetable curry with chickpeas and coconut milk',
    category: 'dinner',
    diet_type: 'vegan',
    calories: 380,
    protein_g: 14,
    carbs_g: 45,
    fat_g: 18,
    fitness_goal: ['stay_fit', 'gain_weight'],
    ingredients: ['Chickpeas (150g)', 'Coconut milk (200ml)', 'Mixed vegetables (200g)', 'Curry powder', 'Rice (150g cooked)'],
    instructions: ['Sauté vegetables with curry powder', 'Add chickpeas and coconut milk', 'Simmer until thickened', 'Serve over rice'],
    prep_time_mins: 30
  },
  {
    id: 'dinner-4',
    name: 'Lean Beef with Sweet Potato',
    description: 'Grilled lean beef steak with baked sweet potato',
    category: 'dinner',
    diet_type: 'non-veg',
    calories: 480,
    protein_g: 42,
    carbs_g: 35,
    fat_g: 18,
    fitness_goal: ['build_muscle', 'gain_weight'],
    ingredients: ['Lean beef steak (150g)', 'Sweet potato (200g)', 'Asparagus (100g)', 'Olive oil', 'Herbs'],
    instructions: ['Bake sweet potato until soft', 'Grill steak to preference', 'Sauté asparagus', 'Plate and serve'],
    prep_time_mins: 40
  },
  {
    id: 'dinner-5',
    name: 'Tofu Stir Fry',
    description: 'Crispy tofu with vegetables in a savory ginger sauce',
    category: 'dinner',
    diet_type: 'vegan',
    calories: 320,
    protein_g: 22,
    carbs_g: 28,
    fat_g: 16,
    fitness_goal: ['lose_weight', 'stay_fit'],
    ingredients: ['Firm tofu (200g)', 'Bok choy (100g)', 'Mushrooms (80g)', 'Ginger', 'Soy sauce'],
    instructions: ['Press and cube tofu', 'Pan fry until crispy', 'Add vegetables and ginger', 'Finish with soy sauce'],
    prep_time_mins: 25
  },
  
  // SNACKS
  {
    id: 'snack-1',
    name: 'Protein Smoothie',
    description: 'Creamy protein smoothie with banana and peanut butter',
    category: 'snack',
    diet_type: 'veg',
    calories: 320,
    protein_g: 28,
    carbs_g: 30,
    fat_g: 12,
    fitness_goal: ['build_muscle', 'gain_weight'],
    ingredients: ['Protein powder (30g)', 'Banana (1)', 'Peanut butter (1 tbsp)', 'Milk (250ml)'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately'],
    prep_time_mins: 5
  },
  {
    id: 'snack-2',
    name: 'Mixed Nuts',
    description: 'Heart-healthy mix of almonds, walnuts, and cashews',
    category: 'snack',
    diet_type: 'vegan',
    calories: 200,
    protein_g: 6,
    carbs_g: 8,
    fat_g: 18,
    fitness_goal: ['stay_fit', 'build_muscle', 'gain_weight'],
    ingredients: ['Almonds (15g)', 'Walnuts (15g)', 'Cashews (10g)'],
    instructions: ['Mix nuts together', 'Portion into small container', 'Enjoy as needed'],
    prep_time_mins: 1
  },
  {
    id: 'snack-3',
    name: 'Apple with Almond Butter',
    description: 'Fresh apple slices with creamy almond butter',
    category: 'snack',
    diet_type: 'vegan',
    calories: 220,
    protein_g: 5,
    carbs_g: 28,
    fat_g: 12,
    fitness_goal: ['stay_fit', 'lose_weight'],
    ingredients: ['Apple (1 medium)', 'Almond butter (2 tbsp)'],
    instructions: ['Slice apple', 'Serve with almond butter for dipping'],
    prep_time_mins: 2
  },
  {
    id: 'snack-4',
    name: 'Cottage Cheese with Berries',
    description: 'High protein cottage cheese topped with fresh berries',
    category: 'snack',
    diet_type: 'veg',
    calories: 180,
    protein_g: 20,
    carbs_g: 15,
    fat_g: 4,
    fitness_goal: ['lose_weight', 'build_muscle'],
    ingredients: ['Cottage cheese (150g)', 'Mixed berries (80g)'],
    instructions: ['Spoon cottage cheese into bowl', 'Top with fresh berries'],
    prep_time_mins: 2
  },
  {
    id: 'snack-5',
    name: 'Boiled Eggs',
    description: 'Simple and protein-packed hard boiled eggs',
    category: 'snack',
    diet_type: 'veg',
    calories: 140,
    protein_g: 12,
    carbs_g: 1,
    fat_g: 10,
    fitness_goal: ['build_muscle', 'lose_weight'],
    ingredients: ['Eggs (2)', 'Salt', 'Pepper'],
    instructions: ['Boil eggs for 10-12 minutes', 'Cool in ice water', 'Peel and season'],
    prep_time_mins: 15
  },
  {
    id: 'snack-6',
    name: 'Hummus with Vegetables',
    description: 'Creamy hummus served with fresh vegetable sticks',
    category: 'snack',
    diet_type: 'vegan',
    calories: 180,
    protein_g: 8,
    carbs_g: 20,
    fat_g: 9,
    fitness_goal: ['lose_weight', 'stay_fit'],
    ingredients: ['Hummus (100g)', 'Carrot sticks', 'Cucumber sticks', 'Bell pepper strips'],
    instructions: ['Portion hummus into bowl', 'Cut vegetables into sticks', 'Arrange and serve'],
    prep_time_mins: 5
  }
];

export const getMealsByCategory = (category: string) => 
  meals.filter(meal => meal.category === category);

export const getMealsByGoal = (goal: string) => 
  meals.filter(meal => meal.fitness_goal.includes(goal));

export const getMealsByDietType = (dietType: string) => 
  meals.filter(meal => meal.diet_type === dietType);
