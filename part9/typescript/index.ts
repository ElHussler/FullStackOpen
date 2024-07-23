import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

function containsNaN(array: number[]) {
  return array.some(Number.isNaN);
}

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !target || !daily_exercises ) {
    return res.status(400).send({
      error: 'parameters missing'
    });
  }

  if ( isNaN(Number(target)) || !Array.isArray(daily_exercises) || containsNaN(daily_exercises.map(Number)) ) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(daily_exercises.map(Number), Number(target));

  return res.send(result);
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);

  const bmi = calculateBmi(heightNum, weightNum);

  return res.send({
    height: heightNum,
    weight: weightNum,
    bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
});