export interface ExerciseResponse {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface BmiArguments {
  weight: number;
  height: number;
}
