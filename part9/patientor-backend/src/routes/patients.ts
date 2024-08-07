import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (!patient) {
    return res.status(404).send(`Patient not found`);
  }
  return res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let msg = 'An error occured.';
    
    if (error instanceof Error) {
      msg += ` ${error.message}`;
    }
    
    res.status(400).send(msg);  
  }
});

export default router;
