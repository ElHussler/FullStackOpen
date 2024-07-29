import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, Patient, PatientNonSensitive } from "../types";

const patients: Patient[] = patientData;

const getNonSensitivePatientData = (): PatientNonSensitive[] => {
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
  addPatient
};