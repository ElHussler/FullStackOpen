import patientData from '../../data/patients';
import { Patient, PatientNonSensitive } from "../types";

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

export default {
  getNonSensitivePatientData
};