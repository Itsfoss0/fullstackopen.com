/*
 * Calculate the BMI of person
 * given the weight and height
 *
 */

import { parseArguments } from "./utils";
import { BmiResponse } from "./types";

export const calculateBmi = (height: number, weight: number): BmiResponse => {
  const heightSI = height / 100;
  const bmi = weight / (heightSI * heightSI);

  let bmiStatus: string;

  if (bmi < 18.5) {
    bmiStatus = `Underweight!  your BMI is at ${bmi}`;
    console.log(bmiStatus);
  } else if (bmi < 24.9) {
    bmiStatus = `Normal range at ${bmi} keep exercising`;
    console.log(bmiStatus);
  } else if (bmi < 29.9) {
    bmiStatus = `Overweight at ${bmi} consider some exercises`;
    console.log(bmiStatus);
  } else {
    bmiStatus = `Obese! ${bmi}  doesn't look good on you. Get some help`;
    console.log(bmiStatus);
  }

  return {
    height,
    weight,
    bmi: bmiStatus,
  };
};

if (require.main === module) {
  const { weight, height } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
}
