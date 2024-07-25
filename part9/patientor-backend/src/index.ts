import express from 'express';
import cors from 'cors';
import diagnosisRouter from '../src/routes/diagnoses';
import patientsRouter from '../src/routes/patients';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('ping endpoint called!');
  res.send('pong');  
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
});