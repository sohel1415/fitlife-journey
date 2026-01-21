export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  category: 'chest' | 'back' | 'legs' | 'arms' | 'core' | 'cardio' | 'full_body' | 'shoulders';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  equipment: string;
  durationSeconds?: number;
  reps?: number;
  sets?: number;
  imageUrl?: string;
}

export const exercises: Exercise[] = [
  // CHEST EXERCISES
  {
    id: 'push-ups',
    name: 'Push-Ups',
    description: 'Classic bodyweight exercise for chest, shoulders, and triceps.',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Keep your core tight and body in a straight line',
      'Push back up to starting position',
      'Exhale as you push up, inhale as you lower down'
    ],
    category: 'chest',
    difficulty: 'beginner',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'None',
    reps: 15,
    sets: 3
  },
  {
    id: 'wide-push-ups',
    name: 'Wide Push-Ups',
    description: 'Variation targeting outer chest muscles.',
    instructions: [
      'Place hands wider than shoulder-width apart',
      'Lower your chest toward the ground',
      'Keep elbows at 45-degree angle',
      'Push back up with control',
      'Maintain a straight body line throughout'
    ],
    category: 'chest',
    difficulty: 'beginner',
    targetMuscles: ['Outer Chest', 'Shoulders'],
    equipment: 'None',
    reps: 12,
    sets: 3
  },
  {
    id: 'diamond-push-ups',
    name: 'Diamond Push-Ups',
    description: 'Advanced push-up targeting triceps and inner chest.',
    instructions: [
      'Form a diamond shape with your hands under your chest',
      'Lower your body keeping elbows close to sides',
      'Push back up focusing on tricep engagement',
      'Keep core tight throughout the movement',
      'Modify on knees if needed'
    ],
    category: 'chest',
    difficulty: 'intermediate',
    targetMuscles: ['Triceps', 'Inner Chest'],
    equipment: 'None',
    reps: 10,
    sets: 3
  },
  {
    id: 'incline-push-ups',
    name: 'Incline Push-Ups',
    description: 'Beginner-friendly push-up with hands elevated.',
    instructions: [
      'Place hands on a bench or elevated surface',
      'Keep body in a straight line from head to heels',
      'Lower chest toward the bench',
      'Push back up to starting position',
      'Great for building up to regular push-ups'
    ],
    category: 'chest',
    difficulty: 'beginner',
    targetMuscles: ['Lower Chest', 'Shoulders', 'Triceps'],
    equipment: 'Bench or elevated surface',
    reps: 15,
    sets: 3
  },
  {
    id: 'decline-push-ups',
    name: 'Decline Push-Ups',
    description: 'Advanced push-up with feet elevated for upper chest focus.',
    instructions: [
      'Place feet on a bench or elevated surface',
      'Hands on the ground shoulder-width apart',
      'Lower your chest toward the floor',
      'Push back up with control',
      'Keep core engaged throughout'
    ],
    category: 'chest',
    difficulty: 'advanced',
    targetMuscles: ['Upper Chest', 'Shoulders', 'Triceps'],
    equipment: 'Bench or elevated surface',
    reps: 12,
    sets: 3
  },

  // BACK EXERCISES
  {
    id: 'superman-hold',
    name: 'Superman Hold',
    description: 'Strengthens lower back and posterior chain.',
    instructions: [
      'Lie face down on the floor',
      'Extend arms overhead and legs straight back',
      'Lift arms, chest, and legs off the ground simultaneously',
      'Hold the position squeezing your back muscles',
      'Lower with control and repeat'
    ],
    category: 'back',
    difficulty: 'beginner',
    targetMuscles: ['Lower Back', 'Glutes', 'Hamstrings'],
    equipment: 'None',
    durationSeconds: 30,
    sets: 3
  },
  {
    id: 'reverse-snow-angels',
    name: 'Reverse Snow Angels',
    description: 'Great for upper back and shoulder mobility.',
    instructions: [
      'Lie face down with arms at your sides',
      'Lift chest slightly off the ground',
      'Move arms in a wide arc from sides to overhead',
      'Return arms to sides with control',
      'Keep shoulders squeezed throughout'
    ],
    category: 'back',
    difficulty: 'beginner',
    targetMuscles: ['Upper Back', 'Rear Deltoids', 'Rhomboids'],
    equipment: 'None',
    reps: 12,
    sets: 3
  },
  {
    id: 'inverted-rows',
    name: 'Inverted Rows',
    description: 'Bodyweight row using a bar or table.',
    instructions: [
      'Lie under a bar or sturdy table edge',
      'Grip the bar with hands shoulder-width apart',
      'Pull your chest up to the bar',
      'Lower yourself with control',
      'Keep body straight throughout'
    ],
    category: 'back',
    difficulty: 'intermediate',
    targetMuscles: ['Lats', 'Rhomboids', 'Biceps'],
    equipment: 'Bar or sturdy table',
    reps: 10,
    sets: 3
  },
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    description: 'The ultimate upper body pulling exercise.',
    instructions: [
      'Hang from a bar with palms facing away',
      'Pull yourself up until chin clears the bar',
      'Lower yourself with control',
      'Engage your lats throughout the movement',
      'Avoid swinging or kipping'
    ],
    category: 'back',
    difficulty: 'advanced',
    targetMuscles: ['Lats', 'Biceps', 'Upper Back'],
    equipment: 'Pull-up bar',
    reps: 8,
    sets: 3
  },
  {
    id: 'chin-ups',
    name: 'Chin-Ups',
    description: 'Pull-up variation with more bicep emphasis.',
    instructions: [
      'Hang from a bar with palms facing toward you',
      'Pull yourself up until chin clears the bar',
      'Lower yourself with control',
      'Keep core engaged throughout',
      'Squeeze biceps at the top'
    ],
    category: 'back',
    difficulty: 'advanced',
    targetMuscles: ['Biceps', 'Lats', 'Forearms'],
    equipment: 'Pull-up bar',
    reps: 8,
    sets: 3
  },

  // LEG EXERCISES
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    description: 'Fundamental leg exercise for overall lower body strength.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your knees tracking over your toes',
      'Go as low as comfortable while keeping chest up',
      'Push through your heels to stand back up'
    ],
    category: 'legs',
    difficulty: 'beginner',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: 'None',
    reps: 20,
    sets: 3
  },
  {
    id: 'lunges',
    name: 'Forward Lunges',
    description: 'Unilateral leg exercise for balance and strength.',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg, lowering your hips',
      'Both knees should bend to about 90 degrees',
      'Push back to starting position',
      'Alternate legs with each rep'
    ],
    category: 'legs',
    difficulty: 'beginner',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: 'None',
    reps: 12,
    sets: 3
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    description: 'Explosive squat variation for power development.',
    instructions: [
      'Start in a squat position',
      'Explode upward, jumping as high as possible',
      'Land softly back into a squat',
      'Immediately repeat the movement',
      'Keep core tight throughout'
    ],
    category: 'legs',
    difficulty: 'intermediate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: 'None',
    reps: 15,
    sets: 3
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    description: 'Isometric hold for quad endurance.',
    instructions: [
      'Stand with back against a wall',
      'Slide down until thighs are parallel to ground',
      'Keep knees at 90-degree angle',
      'Hold the position as long as possible',
      'Keep back flat against the wall'
    ],
    category: 'legs',
    difficulty: 'beginner',
    targetMuscles: ['Quadriceps', 'Glutes'],
    equipment: 'Wall',
    durationSeconds: 45,
    sets: 3
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    description: 'Isolation exercise for calf development.',
    instructions: [
      'Stand on edge of a step with heels hanging off',
      'Rise up onto your toes as high as possible',
      'Hold briefly at the top',
      'Lower heels below the step level',
      'Repeat with control'
    ],
    category: 'legs',
    difficulty: 'beginner',
    targetMuscles: ['Calves'],
    equipment: 'Step or raised platform',
    reps: 20,
    sets: 3
  },
  {
    id: 'bulgarian-split-squats',
    name: 'Bulgarian Split Squats',
    description: 'Advanced single-leg squat for strength and balance.',
    instructions: [
      'Stand facing away from a bench',
      'Place one foot on the bench behind you',
      'Lower into a lunge position',
      'Keep front knee tracking over toes',
      'Push through front heel to stand'
    ],
    category: 'legs',
    difficulty: 'advanced',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: 'Bench',
    reps: 10,
    sets: 3
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    description: 'Hip extension exercise targeting glutes.',
    instructions: [
      'Lie on your back with knees bent',
      'Push through your heels to lift hips',
      'Squeeze glutes at the top',
      'Lower hips back down with control',
      'Keep core engaged throughout'
    ],
    category: 'legs',
    difficulty: 'beginner',
    targetMuscles: ['Glutes', 'Hamstrings', 'Lower Back'],
    equipment: 'None',
    reps: 15,
    sets: 3
  },

  // ARM EXERCISES
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    description: 'Bodyweight exercise for tricep development.',
    instructions: [
      'Place hands on a bench behind you',
      'Extend legs out in front',
      'Lower your body by bending elbows',
      'Go down until arms are at 90 degrees',
      'Push back up to starting position'
    ],
    category: 'arms',
    difficulty: 'beginner',
    targetMuscles: ['Triceps', 'Shoulders', 'Chest'],
    equipment: 'Bench or chair',
    reps: 12,
    sets: 3
  },
  {
    id: 'bicep-curls',
    name: 'Dumbbell Bicep Curls',
    description: 'Classic isolation exercise for biceps.',
    instructions: [
      'Stand with dumbbells at your sides',
      'Curl weights toward shoulders',
      'Keep elbows close to your body',
      'Squeeze biceps at the top',
      'Lower with control'
    ],
    category: 'arms',
    difficulty: 'beginner',
    targetMuscles: ['Biceps', 'Forearms'],
    equipment: 'Dumbbells',
    reps: 12,
    sets: 3
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    description: 'Bicep curl variation targeting brachialis.',
    instructions: [
      'Hold dumbbells with palms facing each other',
      'Curl weights toward shoulders',
      'Keep wrists neutral throughout',
      'Squeeze at the top',
      'Lower with control'
    ],
    category: 'arms',
    difficulty: 'beginner',
    targetMuscles: ['Biceps', 'Brachialis', 'Forearms'],
    equipment: 'Dumbbells',
    reps: 12,
    sets: 3
  },
  {
    id: 'tricep-kickbacks',
    name: 'Tricep Kickbacks',
    description: 'Isolation exercise for triceps.',
    instructions: [
      'Bend forward with dumbbell in hand',
      'Keep upper arm parallel to ground',
      'Extend forearm behind you',
      'Squeeze tricep at full extension',
      'Lower with control'
    ],
    category: 'arms',
    difficulty: 'beginner',
    targetMuscles: ['Triceps'],
    equipment: 'Dumbbell',
    reps: 12,
    sets: 3
  },
  {
    id: 'close-grip-push-ups',
    name: 'Close Grip Push-Ups',
    description: 'Push-up variation emphasizing triceps.',
    instructions: [
      'Start in push-up position with hands close together',
      'Keep elbows tucked close to body',
      'Lower chest toward hands',
      'Push back up focusing on triceps',
      'Maintain straight body line'
    ],
    category: 'arms',
    difficulty: 'intermediate',
    targetMuscles: ['Triceps', 'Chest', 'Shoulders'],
    equipment: 'None',
    reps: 10,
    sets: 3
  },

  // CORE EXERCISES
  {
    id: 'plank',
    name: 'Plank',
    description: 'Isometric core stability exercise.',
    instructions: [
      'Start in a forearm plank position',
      'Keep body in a straight line from head to heels',
      'Engage your core and glutes',
      'Don\'t let hips sag or pike up',
      'Hold for the prescribed duration'
    ],
    category: 'core',
    difficulty: 'beginner',
    targetMuscles: ['Core', 'Shoulders', 'Back'],
    equipment: 'None',
    durationSeconds: 45,
    sets: 3
  },
  {
    id: 'crunches',
    name: 'Crunches',
    description: 'Classic ab exercise for upper abs.',
    instructions: [
      'Lie on your back with knees bent',
      'Place hands behind your head',
      'Lift shoulders off the ground',
      'Focus on contracting your abs',
      'Lower back down with control'
    ],
    category: 'core',
    difficulty: 'beginner',
    targetMuscles: ['Upper Abs'],
    equipment: 'None',
    reps: 20,
    sets: 3
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    description: 'Dynamic ab exercise targeting obliques.',
    instructions: [
      'Lie on your back with hands behind head',
      'Lift shoulders and legs off ground',
      'Bring opposite elbow to opposite knee',
      'Alternate sides in a pedaling motion',
      'Keep lower back pressed to floor'
    ],
    category: 'core',
    difficulty: 'intermediate',
    targetMuscles: ['Obliques', 'Abs'],
    equipment: 'None',
    reps: 20,
    sets: 3
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    description: 'Dynamic core and cardio exercise.',
    instructions: [
      'Start in a high plank position',
      'Drive one knee toward your chest',
      'Quickly switch legs',
      'Keep hips low and core engaged',
      'Move as fast as possible with control'
    ],
    category: 'core',
    difficulty: 'intermediate',
    targetMuscles: ['Core', 'Hip Flexors', 'Shoulders'],
    equipment: 'None',
    durationSeconds: 30,
    sets: 3
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    description: 'Lower ab focused exercise.',
    instructions: [
      'Lie on your back with legs straight',
      'Place hands under your lower back for support',
      'Lift legs up to 90 degrees',
      'Lower legs slowly without touching ground',
      'Keep lower back pressed down'
    ],
    category: 'core',
    difficulty: 'intermediate',
    targetMuscles: ['Lower Abs', 'Hip Flexors'],
    equipment: 'None',
    reps: 15,
    sets: 3
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    description: 'Rotational core exercise for obliques.',
    instructions: [
      'Sit with knees bent, lean back slightly',
      'Keep feet off the ground if possible',
      'Twist torso side to side',
      'Touch the ground on each side',
      'Keep core engaged throughout'
    ],
    category: 'core',
    difficulty: 'intermediate',
    targetMuscles: ['Obliques', 'Abs'],
    equipment: 'None',
    reps: 20,
    sets: 3
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    description: 'Core stability exercise for coordination.',
    instructions: [
      'Lie on your back with arms and legs raised',
      'Lower opposite arm and leg toward ground',
      'Keep lower back pressed to floor',
      'Return to starting position',
      'Alternate sides with control'
    ],
    category: 'core',
    difficulty: 'beginner',
    targetMuscles: ['Core', 'Hip Flexors'],
    equipment: 'None',
    reps: 12,
    sets: 3
  },
  {
    id: 'v-ups',
    name: 'V-Ups',
    description: 'Advanced full ab exercise.',
    instructions: [
      'Lie flat on your back with arms overhead',
      'Simultaneously lift legs and upper body',
      'Reach hands toward your toes',
      'Form a V shape at the top',
      'Lower back down with control'
    ],
    category: 'core',
    difficulty: 'advanced',
    targetMuscles: ['Abs', 'Hip Flexors'],
    equipment: 'None',
    reps: 12,
    sets: 3
  },

  // CARDIO EXERCISES
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Classic full-body cardio exercise.',
    instructions: [
      'Start with feet together, arms at sides',
      'Jump feet out while raising arms overhead',
      'Jump back to starting position',
      'Keep a steady rhythm',
      'Land softly on the balls of your feet'
    ],
    category: 'cardio',
    difficulty: 'beginner',
    targetMuscles: ['Full Body'],
    equipment: 'None',
    durationSeconds: 45,
    sets: 3
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    description: 'Running in place with high knee drive.',
    instructions: [
      'Stand with feet hip-width apart',
      'Run in place driving knees up high',
      'Pump arms in running motion',
      'Stay on balls of your feet',
      'Move as quickly as possible'
    ],
    category: 'cardio',
    difficulty: 'beginner',
    targetMuscles: ['Legs', 'Core', 'Hip Flexors'],
    equipment: 'None',
    durationSeconds: 30,
    sets: 3
  },
  {
    id: 'burpees',
    name: 'Burpees',
    description: 'Full-body explosive cardio exercise.',
    instructions: [
      'Start standing, then squat down',
      'Place hands on floor and jump feet back to plank',
      'Perform a push-up (optional)',
      'Jump feet back to squat position',
      'Explode up with a jump and arms overhead'
    ],
    category: 'cardio',
    difficulty: 'advanced',
    targetMuscles: ['Full Body'],
    equipment: 'None',
    reps: 10,
    sets: 3
  },
  {
    id: 'butt-kicks',
    name: 'Butt Kicks',
    description: 'Running in place kicking heels to glutes.',
    instructions: [
      'Stand with feet hip-width apart',
      'Run in place kicking heels to butt',
      'Keep knees pointing down',
      'Pump arms in running motion',
      'Stay light on your feet'
    ],
    category: 'cardio',
    difficulty: 'beginner',
    targetMuscles: ['Hamstrings', 'Calves'],
    equipment: 'None',
    durationSeconds: 30,
    sets: 3
  },
  {
    id: 'skaters',
    name: 'Skaters',
    description: 'Lateral jumping exercise for cardio and balance.',
    instructions: [
      'Start on one leg',
      'Jump laterally to the opposite side',
      'Land on opposite foot',
      'Swing arms for momentum',
      'Continue alternating sides'
    ],
    category: 'cardio',
    difficulty: 'intermediate',
    targetMuscles: ['Legs', 'Glutes', 'Core'],
    equipment: 'None',
    durationSeconds: 30,
    sets: 3
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    description: 'Explosive plyometric jump onto a platform.',
    instructions: [
      'Stand facing a sturdy box or platform',
      'Swing arms and jump onto the box',
      'Land softly with both feet',
      'Stand up fully on top',
      'Step down and repeat'
    ],
    category: 'cardio',
    difficulty: 'advanced',
    targetMuscles: ['Legs', 'Glutes', 'Core'],
    equipment: 'Box or platform',
    reps: 10,
    sets: 3
  },

  // SHOULDER EXERCISES
  {
    id: 'pike-push-ups',
    name: 'Pike Push-Ups',
    description: 'Shoulder-focused push-up variation.',
    instructions: [
      'Start in downward dog position',
      'Bend elbows to lower head toward ground',
      'Push back up to starting position',
      'Keep hips high throughout',
      'Focus on shoulder engagement'
    ],
    category: 'shoulders',
    difficulty: 'intermediate',
    targetMuscles: ['Shoulders', 'Triceps'],
    equipment: 'None',
    reps: 10,
    sets: 3
  },
  {
    id: 'shoulder-press',
    name: 'Dumbbell Shoulder Press',
    description: 'Classic overhead pressing movement.',
    instructions: [
      'Hold dumbbells at shoulder height',
      'Press weights overhead until arms are straight',
      'Lower back to shoulder height',
      'Keep core engaged',
      'Don\'t arch your back'
    ],
    category: 'shoulders',
    difficulty: 'beginner',
    targetMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Dumbbells',
    reps: 12,
    sets: 3
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    description: 'Isolation exercise for side deltoids.',
    instructions: [
      'Stand with dumbbells at your sides',
      'Raise arms out to the sides to shoulder height',
      'Keep slight bend in elbows',
      'Lower with control',
      'Don\'t swing the weights'
    ],
    category: 'shoulders',
    difficulty: 'beginner',
    targetMuscles: ['Side Deltoids'],
    equipment: 'Dumbbells',
    reps: 12,
    sets: 3
  },
  {
    id: 'front-raises',
    name: 'Front Raises',
    description: 'Isolation exercise for front deltoids.',
    instructions: [
      'Stand with dumbbells in front of thighs',
      'Raise one or both arms to shoulder height',
      'Keep slight bend in elbows',
      'Lower with control',
      'Alternate arms or lift together'
    ],
    category: 'shoulders',
    difficulty: 'beginner',
    targetMuscles: ['Front Deltoids'],
    equipment: 'Dumbbells',
    reps: 12,
    sets: 3
  },
  {
    id: 'handstand-hold',
    name: 'Wall Handstand Hold',
    description: 'Advanced isometric shoulder exercise.',
    instructions: [
      'Kick up into a handstand against a wall',
      'Keep arms straight and core tight',
      'Stack shoulders, hips, and ankles',
      'Hold for prescribed duration',
      'Come down safely'
    ],
    category: 'shoulders',
    difficulty: 'advanced',
    targetMuscles: ['Shoulders', 'Core', 'Triceps'],
    equipment: 'Wall',
    durationSeconds: 30,
    sets: 3
  },

  // FULL BODY EXERCISES
  {
    id: 'bear-crawls',
    name: 'Bear Crawls',
    description: 'Full body crawling movement.',
    instructions: [
      'Start on all fours with knees slightly off ground',
      'Move opposite hand and foot forward together',
      'Keep hips low and core engaged',
      'Continue crawling forward',
      'Can also move backwards'
    ],
    category: 'full_body',
    difficulty: 'intermediate',
    targetMuscles: ['Core', 'Shoulders', 'Legs'],
    equipment: 'None',
    durationSeconds: 30,
    sets: 3
  },
  {
    id: 'inchworms',
    name: 'Inchworms',
    description: 'Full body mobility and strength exercise.',
    instructions: [
      'Start standing, bend forward to touch floor',
      'Walk hands out to plank position',
      'Perform a push-up (optional)',
      'Walk hands back toward feet',
      'Stand up and repeat'
    ],
    category: 'full_body',
    difficulty: 'beginner',
    targetMuscles: ['Core', 'Shoulders', 'Hamstrings'],
    equipment: 'None',
    reps: 8,
    sets: 3
  },
  {
    id: 'thruster',
    name: 'Dumbbell Thrusters',
    description: 'Compound squat to press movement.',
    instructions: [
      'Hold dumbbells at shoulder height',
      'Perform a squat',
      'As you stand, press weights overhead',
      'Lower weights back to shoulders',
      'Go directly into next squat'
    ],
    category: 'full_body',
    difficulty: 'intermediate',
    targetMuscles: ['Legs', 'Shoulders', 'Core'],
    equipment: 'Dumbbells',
    reps: 12,
    sets: 3
  },
  {
    id: 'turkish-get-up',
    name: 'Turkish Get-Up',
    description: 'Complex full body movement pattern.',
    instructions: [
      'Lie on back holding weight in one hand overhead',
      'Roll to elbow, then to hand',
      'Sweep leg through to kneeling',
      'Stand up keeping weight overhead',
      'Reverse the movement to lie back down'
    ],
    category: 'full_body',
    difficulty: 'advanced',
    targetMuscles: ['Core', 'Shoulders', 'Legs', 'Hip Stability'],
    equipment: 'Dumbbell or kettlebell',
    reps: 5,
    sets: 2
  },
  {
    id: 'sprawls',
    name: 'Sprawls',
    description: 'Burpee variation without the jump.',
    instructions: [
      'Start standing',
      'Drop down to a push-up position',
      'Let hips touch the ground briefly',
      'Push back up to plank',
      'Jump or step feet forward to stand'
    ],
    category: 'full_body',
    difficulty: 'intermediate',
    targetMuscles: ['Full Body'],
    equipment: 'None',
    reps: 12,
    sets: 3
  }
];

export const getExercisesByCategory = (category: Exercise['category']) => 
  exercises.filter(e => e.category === category);

export const getExercisesByDifficulty = (difficulty: Exercise['difficulty']) =>
  exercises.filter(e => e.difficulty === difficulty);

export const getExerciseById = (id: string) =>
  exercises.find(e => e.id === id);

export const categories = [
  { id: 'chest', name: 'Chest', icon: '💪' },
  { id: 'back', name: 'Back', icon: '🔙' },
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'arms', name: 'Arms', icon: '💪' },
  { id: 'core', name: 'Core', icon: '🎯' },
  { id: 'cardio', name: 'Cardio', icon: '❤️' },
  { id: 'shoulders', name: 'Shoulders', icon: '🏋️' },
  { id: 'full_body', name: 'Full Body', icon: '🔥' },
] as const;
