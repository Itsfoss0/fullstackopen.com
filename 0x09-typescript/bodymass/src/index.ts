import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { parseExerciseDays } from "./utils";
const PORT = 3003;

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  console.log(req.query);

  if (!height || !weight) {
    res.status(400).json({ error: "missing height or weight" });
    return;
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  res.json(bmi);
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      res.status(400).json({
        error: "parameters missing. Required `daily_exercises` and `target` ",
      });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const days = parseExerciseDays(daily_exercises);

    res.send(calculateExercises(days, Number(target)));
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: `An error occured ${error.message}` });
    }
  }
});

app.use((req, res) => {
  res.status(404).json({ error: `cannot ${req.method}  ${req.path}` });
  return;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
