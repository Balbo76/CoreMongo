import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

/**
 * Middleware globale per la gestione degli errori.
 * Intercetta ogni errore passato a next() e restituisce una risposta JSON standardizzata.
 */
export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // In ambiente di sviluppo vogliamo vedere tutti i dettagli
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // In produzione non mostriamo lo stack trace per sicurezza
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Errore di programmazione o sconosciuto: non vogliamo leak di informazioni
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Qualcosa è andato storto sul server.'
      });
    }
  }
};
