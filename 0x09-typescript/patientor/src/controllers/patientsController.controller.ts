import patientData from "../data/patients";
import { PrivatePatientInfo } from "../types";
import { Response, Request } from "express";

const getPatientInfoWithoutPrivateFields = (): PrivatePatientInfo[] => {
  return patientData.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getAllPatients = (_req: Request, res: Response<PrivatePatientInfo[]>) => {
  const patients: PrivatePatientInfo[] = getPatientInfoWithoutPrivateFields();
  return res.send(patients);
};

export default {
  getAllPatients,
};
