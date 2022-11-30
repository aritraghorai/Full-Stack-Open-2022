import { Request, Response } from 'express';
import diagonastic from '../data/diagnoses.json';
import Dianoses from '../utils/interfaces/diagnoses.interface';

const getAllDiagnoses = (_req: Request, res: Response) => {
  const allDiagonastic = diagonastic as Dianoses[];
  res.json(allDiagonastic);
};

export default {
  getAllDiagnoses
};
