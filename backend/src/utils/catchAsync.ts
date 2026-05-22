import { Request, Response, NextFunction } from 'express';

/**
 * Wrapper per funzioni asincrone che elimina la necessità di try/catch nelle rotte.
 * Cattura gli errori e li passa automaticamente al middleware di errore globale tramite next().
 */
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
