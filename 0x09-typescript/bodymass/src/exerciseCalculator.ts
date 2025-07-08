/*
 * You should exercise more
 * This functions finds out
 * how often you should exercise
 *
 */

import { ExerciseResponse } from "./types";
import { parseExerciseDays } from "./utils";

const sumOfArray = (items: number[]): number => {
  let total = 0;

  for (const val of items) {
    total += val;
  }
  return total;
};

export const calculateExercises = (
  exerciseDays: number[],
  target: number
): ExerciseResponse => {
  const periodLength = exerciseDays.length;
  const trainingDays = exerciseDays.filter((day) => day > 0).length;
  const average = sumOfArray(exerciseDays) / 7;
  const success = average >= target;
  const rating = average >= 2 ? 3 : 1;
  const ratingDescription = rating > 1 ? "Good work" : "You could do better";

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

if (require.main === module) {
  const args = process.argv.slice(2);

  try {
    const exerciseDays = parseExerciseDays(args);
    console.log(calculateExercises(exerciseDays, exerciseDays[0]));
  } catch (error) {
    let errorMessage = "An error occured: ";

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    console.log(errorMessage);
  }
}
