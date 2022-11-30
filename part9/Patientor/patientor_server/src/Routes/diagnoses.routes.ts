import express from 'express';
import diagnosesService from '../Services/diagnoses.service';

const router = express.Router();

router.get('/', diagnosesService.getAllDiagnoses);

export default router;
