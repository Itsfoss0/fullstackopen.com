import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
