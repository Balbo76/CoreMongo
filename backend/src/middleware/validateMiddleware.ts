import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

/**
 * Middleware per validare il body di una richiesta utilizzando uno schema Zod.
 * In caso di errore, restituisce un messaggio chiaro al client.
 */
export const validate = (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Errore di validazione',
          errors: error.issues
        });
      }
      return res.status(500).json({ message: "Errore interno durante la validazione" });
    }
  };
