import { Request, Response } from 'express';
import { v4 } from 'uuid';
import patients from '../data/patientData';
import Patient from '../utils/interfaces/patient.interface';
import toNewPatientEntry from '../utils/Validator/patientdata.validator';

type NonSensitiveDiaryEntry = Omit<Patient, 'ssn' | 'entries'>;
export type TypePatientBody = Omit<Patient, 'id' | 'entries'>;

const getAllPatient = (_req: Request, res: Response) => {
  const allPatients = patients;
  const notSensitiveData: NonSensitiveDiaryEntry[] = allPatients.map(
    (patient) => {
      const { id, name, dateOfBirth, gender, occupation } = patient;
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      };
    }
  );
  res.json(notSensitiveData);
};
const addNewPatient = (
  req: Request<undefined, undefined, TypePatientBody>,
  res: Response
) => {
  try {
    const data = toNewPatientEntry(req.body);
    console.log(data);
    const newPatient = { ...data, id: v4() };
    patients.push(newPatient);
    res.status(201).json(newPatient);
  } catch (error) {
    res.json(error);
  }
};

const getPatientById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const allPatients = patients;
  const getPatient = allPatients.find((pa) => pa.id === id);
  res.status(200).json(getPatient);
};

export default {
  getAllPatient,
  addNewPatient,
  getPatientById
};
