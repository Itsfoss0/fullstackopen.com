import patientData from "../data/patients";
import { PrivatePatientInfo, PatientType, ErrorResponse } from "../types";
import { Response, Request } from "express";
import { parseNewPatientEntry } from "../utils/parsers.util";
import { v4 as uuid } from "uuid";

const getPatientInfoWithoutPrivateFields = (): PrivatePatientInfo[] => {
  return patientData.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getAllPatients = (
  _req: Request,
  res: Response<PrivatePatientInfo[] | ErrorResponse>
) => {
  try {
    const patients: PrivatePatientInfo[] = getPatientInfoWithoutPrivateFields();
    return res.send(patients);
  } catch (error) {
    let errorMessage = "An error occured: ";

    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(503).json({ error: errorMessage });
  }
};

const addPatient = (
  req: Request,
  res: Response<PatientType | ErrorResponse>
) => {
  try {
    const patient = parseNewPatientEntry(req.body);
    const newPatient = {
      ...patient,
      id: uuid(),
    };

    patientData.push(newPatient);
    return res.status(201).json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "An Error occured: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
};

export default {
  getAllPatients,
  addPatient,
};
