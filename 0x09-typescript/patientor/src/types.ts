import * as z from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface DiagnosesType {
  code: string;
  name: string;
  latin?: string;
}

/*
export interface PatientType {
  id: string;
  name: string;
  occupation: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
}
*/

export const NewPatientSchemaZod = z.object({
  name: z.string(),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.enum(Gender),
  ssn: z.string(),
});

// export type NewPatient = Omit<PatientType, "id">;

export type NewPatient = z.infer<typeof NewPatientSchemaZod>;
export interface PatientType extends NewPatient {
  id: string;
}

export interface ErrorResponse {
  error: string;
}
export type PrivatePatientInfo = Omit<PatientType, "ssn">;
