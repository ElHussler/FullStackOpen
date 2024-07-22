type Description = 'BAD' | 'OK' | 'GOOD';

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  target: number,
  average: number,
  rating: number,
  ratingDescription: Description,
};

function calculateExercises(dailyExerciseHours: number[], target: number): Result {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(day => day > 0).length;
  const totalHours: number = dailyExerciseHours.reduce(((partialSum, currentValue) => partialSum+currentValue), 0);
  const average: number = (totalHours / periodLength);
  const success: boolean = (average >= target);
  
  let rating: number;
  let percentageAchieved: number = (average / target);

  if (percentageAchieved <= 0.33) {
    rating = 1;
  }
  else if (percentageAchieved > 0.33 && percentageAchieved <= 0.66) {
    rating = 2;
  }
  else if (percentageAchieved > 0.66) {
    rating = 3;
  }

  let ratingDescription: Description = null;

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
};

try {
  console.log(calculateExercises([1,2,3,0,0,0,4], 1.4));
}
catch (error: unknown) {
  let errorMessage: string = 'An error occurred.';

  if (error instanceof Error) {
    errorMessage += ` ${error.message}.`;
  };

  console.log(errorMessage); 
};