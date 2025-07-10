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

export type PrivatePatientInfo = Omit<PatientType, "ssn">;
