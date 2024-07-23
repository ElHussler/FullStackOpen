interface BmiInputs {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): BmiInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }
  else {
    throw new Error('Provided values were not numbers');
  }
};

type BmiResult = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese';

function calculateBmi(heightInCentimeters: number, weight: number): BmiResult {
  const heightInMeters: number =
    (heightInCentimeters / 100);
  const bmi: number =
    (weight / (heightInMeters * heightInMeters));

  if (bmi < 18.5)
    return 'Underweight';
  else if (bmi >= 18.5 && bmi < 25)
    return 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi < 30)
    return 'Overweight';
  else if (bmi >= 30)
    return 'Obese';
  else
    throw new Error('Invalid BMI');
}

try {
  if (process.argv[1] && process.argv[1] === 'bmiCalculator.ts') {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  }
}
catch (error: unknown) {
  let errorMessage: string = 'An error occurred.';

  if (error instanceof Error) {
    errorMessage += ` ${error.message}.`;
  }

  console.log(errorMessage); 
}

export default calculateBmi;