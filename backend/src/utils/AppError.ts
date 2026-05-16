/**
 * Classe personalizzata per gestire gli errori dell'applicazione.
 * Permette di specificare lo status code e se l'errore è "operazionale" 
 * (ovvero previsto, come un 404 o un 401).
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
