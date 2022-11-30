import { Request, Response } from 'express';
import { v4 } from 'uuid';
import patients from '../data/patientData';
import Entry from '../utils/interfaces/entry.interface';

const addNewEntry = (
  req: Request<{ id: string }, null, Entry>,
  res: Response
) => {
  const id = req.params.id;
  const patient = patients.find((pa) => pa.id === id);
  const newEntry = { ...req.body, id: v4() };
  patient?.entries?.push(newEntry);
  res.json(patient);
};

export default {
  addNewEntry
};
