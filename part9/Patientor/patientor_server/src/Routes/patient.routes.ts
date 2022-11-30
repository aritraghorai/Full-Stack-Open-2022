import express from 'express';
import patientService from '../Services/patient.service';
import entresRouter from './entries.route';

const router = express.Router();

router
  .get('/', patientService.getAllPatient)
  .post('/', patientService.addNewPatient);

router.use('/:id/entries', entresRouter);

router.get('/:id', patientService.getPatientById);

export default router;
