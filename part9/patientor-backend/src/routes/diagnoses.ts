import express from 'express';
import { getAll } from '../services/diagnosesService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Diagnosis[] = getAll();
  res.send(diagnoses);
});

export default router;
