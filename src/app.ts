import express, { Request, Response } from "express";
import connectDB from "./utils/db";

import authRoutes from './routes/authRoutes'

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Todo List API");
});

export default app;
