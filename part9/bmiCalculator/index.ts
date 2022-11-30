import express, { Application, Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExersize } from "./exerciseCalculator";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hi From Express");
});

app.get(
  "/bmi",
  (
    req: Request<null, null, null, { height: string; weight: string }>,
    res: Response
  ) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
      res.status(400).json({
        error: "malformatted parameters",
      });
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.status(200).json({
      height,
      weight,
      bmi,
    });
  }
);
app.post(
  "/exercises",
  (
    req: Request<null, null, { daily_exercises: number[]; target: number }>,
    res: Response
  ) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
      res.status(400).json({
        error: "malformatted parameters",
      });
    }
    const result = calculateExersize({ arr: daily_exercises, target });
    res.status(200).json(result);
  }
);

app.listen(4000, () => {
  console.log("Server is running");
});
