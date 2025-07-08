import { BmiArguments } from "./types";

export const parseArguments = (args: string[]): BmiArguments => {
  if (args.length < 4) {
    throw new Error("Not enough arguments provided");
  }

  if (args.length > 5) {
    throw new Error("Too many arguments provided");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers");
  }
};

/**
 *
 * Parse days of exercises as an array
 * of numbers
 */

export const parseExerciseDays = (args: string[] | number[]): number[] => {
  const exerciseDays = [];

  for (const item of args) {
    if (!isNaN(Number(item))) {
      exerciseDays.push(Number(item));
    } else {
      throw new Error(`'${item}' is not a valid number`);
    }
  }

  return exerciseDays;
};
