import express, { Request, Response } from 'express';
import cors from 'cors';
import patientRoutes from './Routes/patient.routes';
import diagnosesRoutes from './Routes/diagnoses.routes';

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientRoutes);

app.listen(4000, () => {
  console.log('Server is running');
});
