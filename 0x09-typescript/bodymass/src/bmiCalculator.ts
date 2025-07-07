/*
 * Calculate the BMI of person
 * given the weight and height
 *
 */

import { parseArguments } from "./utils";

const calculateBmi = (height: number, weight: number) => {
  const heightSI = height / 100;
  const bmi = weight / (heightSI * heightSI);
  if (bmi < 18.5) {
    console.log(`Underweight!  your BMI is at ${bmi}`);
  } else if (bmi < 24.9) {
    console.log(`Normal range at ${bmi} keep exercising`);
  } else if (bmi < 29.9) {
    console.log(`Overweight at ${bmi} consider some exercises`);
  } else {
    console.log(`Obese! ${bmi}  doesn't look good on you. Get some help`);
  }
};

const { weight, height } = parseArguments(process.argv);
console.log(calculateBmi(height, weight));
