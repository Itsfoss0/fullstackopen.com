import express from "express";
import cors from "cors";
import probesRouter from "./routes/probesRouter.router";
const PORT: number = 3001;

const app: express.Application = express();

const allowedOrigins: string[] = [
  "http://localhost:5173",
  "http://localhost:5174",
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use("/api/_/", probesRouter);

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
