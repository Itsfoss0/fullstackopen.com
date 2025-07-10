import { Request, Response } from "express";

export const ping = (_req: Request, res: Response) => {
  return res.send({ status: "ok", message: "pong" });
};


