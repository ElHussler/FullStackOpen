type BmiResult = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese'

function calculateBmi(heightInCentimeters: number, weight: number): BmiResult {
  const heightInMeters: number = (heightInCentimeters / 100)
  const bmi: number = (weight / (heightInMeters * heightInMeters));

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
  console.log(calculateBmi(173, 82));
}
catch (error: unknown) {
  let errorMessage: string = 'An error occurred.'

  if (error instanceof Error) {
    errorMessage += ` ${error.message}.`
  }

  console.log(errorMessage); 
}