import calculateBmi from './bmiCalculator';
import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  };

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