import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * Middleware per validare il body di una richiesta utilizzando uno schema Zod.
 * In caso di errore, restituisce un messaggio chiaro al client.
 */
export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          message: "Errore di validazione",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      return res.status(500).json({ message: "Errore interno durante la validazione" });
    }
  };
