import { TypePatientBody } from '../../Services/patient.service';
import gender from '../interfaces/gender.enum';

const toNewPatientEntry = (Object: TypePatientBody) => {
  return {
    name: parseString(Object.name) as string,
    dateOfBirth: parseString(Object.dateOfBirth) as string,
    ssn: parseString(Object.ssn) as string,
    gender: parseGender(Object.gender) as string,
    occupation: parseString(Object.occupation) as string
  };
};

const parseString = (text: unknown) => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string: ' + text);
  }
  return text;
};

const parseGender = (gen: unknown) => {
  if (!gen || !isString(gen) || !isValidGender(gen as string)) {
    throw new Error('Incorrect gender value: ' + gen);
  }
  return gen;
};

const isString = (text: unknown) => {
  return typeof text === 'string' || text instanceof String;
};

const isValidGender = (gen: string) => {
  return Object.keys(gender).includes(gen);
};

export default toNewPatientEntry;
