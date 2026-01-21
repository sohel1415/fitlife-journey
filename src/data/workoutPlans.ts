export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationWeeks: number;
  daysPerWeek: number;
  estimatedDurationMins: number;
  targetMuscles: string[];
  exercises: string[]; // exercise ids
  icon: string;
}

export const workoutPlans: WorkoutPlan[] = [
  // BEGINNER PLANS
  {
    id: 'beginner-full-body',
    name: 'Full Body Starter',
    description: 'Perfect for beginners. Build a solid foundation with simple, effective exercises.',
    difficulty: 'beginner',
    durationWeeks: 4,
    daysPerWeek: 3,
    estimatedDurationMins: 25,
    targetMuscles: ['Full Body'],
    exercises: ['squats', 'push-ups', 'plank', 'lunges', 'glute-bridges', 'crunches', 'jumping-jacks'],
    icon: '🌟'
  },
  {
    id: 'beginner-cardio',
    name: 'Cardio Kickstart',
    description: 'Get your heart pumping and burn calories with this beginner-friendly cardio routine.',
    difficulty: 'beginner',
    durationWeeks: 4,
    daysPerWeek: 3,
    estimatedDurationMins: 20,
    targetMuscles: ['Full Body', 'Cardio'],
    exercises: ['jumping-jacks', 'high-knees', 'butt-kicks', 'squats', 'mountain-climbers'],
    icon: '❤️'
  },
  {
    id: 'beginner-core',
    name: 'Core Foundation',
    description: 'Strengthen your core and improve posture with these essential exercises.',
    difficulty: 'beginner',
    durationWeeks: 4,
    daysPerWeek: 3,
    estimatedDurationMins: 15,
    targetMuscles: ['Core', 'Abs', 'Lower Back'],
    exercises: ['plank', 'crunches', 'dead-bug', 'glute-bridges', 'superman-hold'],
    icon: '🎯'
  },

  // INTERMEDIATE PLANS
  {
    id: 'intermediate-strength',
    name: 'Strength Builder',
    description: 'Build muscle and increase strength with this comprehensive program.',
    difficulty: 'intermediate',
    durationWeeks: 6,
    daysPerWeek: 4,
    estimatedDurationMins: 40,
    targetMuscles: ['Chest', 'Back', 'Legs', 'Arms'],
    exercises: ['push-ups', 'diamond-push-ups', 'inverted-rows', 'squats', 'jump-squats', 'lunges', 'tricep-dips', 'bicycle-crunches'],
    icon: '💪'
  },
  {
    id: 'intermediate-hiit',
    name: 'HIIT Blast',
    description: 'High-intensity intervals to maximize calorie burn and improve conditioning.',
    difficulty: 'intermediate',
    durationWeeks: 4,
    daysPerWeek: 4,
    estimatedDurationMins: 30,
    targetMuscles: ['Full Body', 'Cardio'],
    exercises: ['burpees', 'mountain-climbers', 'jump-squats', 'high-knees', 'skaters', 'plank', 'russian-twists'],
    icon: '🔥'
  },
  {
    id: 'intermediate-upper-body',
    name: 'Upper Body Sculpt',
    description: 'Focus on chest, back, shoulders, and arms for a defined upper body.',
    difficulty: 'intermediate',
    durationWeeks: 6,
    daysPerWeek: 4,
    estimatedDurationMins: 35,
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
    exercises: ['push-ups', 'wide-push-ups', 'diamond-push-ups', 'pike-push-ups', 'inverted-rows', 'tricep-dips', 'shoulder-press', 'bicep-curls'],
    icon: '🏋️'
  },

  // ADVANCED PLANS
  {
    id: 'advanced-athlete',
    name: 'Athlete Performance',
    description: 'Elite-level training for maximum strength, power, and endurance.',
    difficulty: 'advanced',
    durationWeeks: 8,
    daysPerWeek: 5,
    estimatedDurationMins: 50,
    targetMuscles: ['Full Body', 'Power', 'Endurance'],
    exercises: ['burpees', 'pull-ups', 'decline-push-ups', 'bulgarian-split-squats', 'box-jumps', 'v-ups', 'handstand-hold', 'turkish-get-up'],
    icon: '🏆'
  },
  {
    id: 'advanced-shred',
    name: 'Ultimate Shred',
    description: 'Intense program combining strength and cardio for maximum fat burning.',
    difficulty: 'advanced',
    durationWeeks: 6,
    daysPerWeek: 5,
    estimatedDurationMins: 45,
    targetMuscles: ['Full Body', 'Fat Loss'],
    exercises: ['burpees', 'mountain-climbers', 'box-jumps', 'pull-ups', 'chin-ups', 'jump-squats', 'skaters', 'v-ups', 'sprawls'],
    icon: '⚡'
  },
  {
    id: 'advanced-calisthenics',
    name: 'Calisthenics Master',
    description: 'Master bodyweight exercises and build impressive functional strength.',
    difficulty: 'advanced',
    durationWeeks: 8,
    daysPerWeek: 5,
    estimatedDurationMins: 55,
    targetMuscles: ['Full Body', 'Strength', 'Skill'],
    exercises: ['pull-ups', 'chin-ups', 'decline-push-ups', 'pike-push-ups', 'handstand-hold', 'bulgarian-split-squats', 'v-ups', 'bear-crawls', 'turkish-get-up'],
    icon: '🎖️'
  }
];

export const getWorkoutPlansByDifficulty = (difficulty: WorkoutPlan['difficulty']) =>
  workoutPlans.filter(p => p.difficulty === difficulty);

export const getWorkoutPlanById = (id: string) =>
  workoutPlans.find(p => p.id === id);
