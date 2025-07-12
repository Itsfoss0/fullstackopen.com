export interface DiagnosesType {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientType {
  id: string;
  name: string;
  occupation: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = Omit<PatientType, "id">;

export interface ErrorResponse {
  error: string;
}
export type PrivatePatientInfo = Omit<PatientType, "ssn">;
