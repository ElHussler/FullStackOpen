export type Description = 'BAD' | 'OK' | 'GOOD';

export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  target: number,
  average: number,
  rating: number,
  ratingDescription: Description,
}

interface ExerciseInput {
  target: number,
  dailyExerciseHours: number[]
}

const parseExercises = (): ExerciseInput => {
  const args = process.argv.slice(2).map(Number);

  if (args.length < 2) throw new Error('Input must contain at least a target number of hours and one day of exercise.');

  for (const arg of args) {
    if (isNaN(arg)) {
      throw new Error('All inputs must be valid numbers.');
    }
  }

  const targetHours: number = args[0];

  const exerciseDays: number[] = args.slice(1);

  return {
    target: targetHours,
    dailyExerciseHours: exerciseDays
  };
};

function calculateExercises(dailyExerciseHours: number[], target: number): Result {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(day => day > 0).length;
  const totalHours: number = dailyExerciseHours.reduce(((partialSum, currentValue) => partialSum+currentValue), 0);
  const average: number = (totalHours / periodLength);
  const success: boolean = (average >= target);
  
  let rating: number = 0;
  const percentageAchieved: number = (average / target);

  if (percentageAchieved <= 0.33) {
    rating = 1;
  }
  else if (percentageAchieved > 0.33 && percentageAchieved <= 0.66) {
    rating = 2;
  }
  else if (percentageAchieved > 0.66) {
    rating = 3;
  }

  let ratingDescription: Description;

  switch (rating) {
    case 1:
      ratingDescription = 'BAD';
      break;
    case 2:
      ratingDescription = 'OK';
      break;
    case 3:
      ratingDescription = 'GOOD';
      break;
    default:
      throw new Error('Something broke!');
  }

  return {
    periodLength,
    trainingDays,
    success,
    target,
    average,
    rating,
    ratingDescription
  } as Result;
}

try {  
  if (process.argv[1] && process.argv[1] === 'exerciseCalculator.ts') {
    const { dailyExerciseHours, target } = parseExercises();
    console.log(calculateExercises(dailyExerciseHours, target));
  }
}
catch (error: unknown) {
  let errorMessage: string = 'An error occurred.';

  if (error instanceof Error) {
    errorMessage += ` ${error.message}.`;
  }

  console.log(errorMessage); 
}

export default calculateExercises;