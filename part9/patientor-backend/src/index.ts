import express from 'express';
import cors from 'cors';
import diagnosisRouter from '../src/routes/diagnoses';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('ping endpoint called!');
  res.send('pong');  
});

app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
});