import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

// Tipando corretamente a função validate
export const validate = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body); // Valida o corpo da requisição
    next(); // Se a validação passar, chama o próximo middleware
  } catch (error) {
    if (error instanceof ZodError) {
      // Caso o erro seja um ZodError, retorna um erro 400
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else {
      // Caso seja outro tipo de erro, retorna um erro 500
      res.status(500).json({ message: "Server error", error });
    }
  }
};
