import { Entry, Gender, NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: object.entries as Entry[]
    };
    
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEmpty = (param: string): boolean => {
  return param.length === 0;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name) || isEmpty(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || isEmpty(date) || !isDate(date)) {
    throw new Error('Incorrect or missing DOB');
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || isEmpty(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || isEmpty(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || isEmpty(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

export default toNewPatient;