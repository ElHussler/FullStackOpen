import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, Patient, NonSensitivePatient } from "../types";

const patients: Patient[] = patientData;

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return undefined;
  }
  return patient;
};

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatientData,
  getPatientById,
  addPatient
};