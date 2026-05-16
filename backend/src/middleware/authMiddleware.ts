import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estendiamo l'interfaccia Request per includere l'utente
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Recupera il token dall'header Authorization
    // Il formato standard è: "Bearer <token>"
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Accesso negato. Token mancante." });
    }

    try {
        // 2. Verifica il token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
            email: string;
        };

        // 3. Inserisce i dati decodificati nella richiesta
        req.user = decoded;

        // 4. Passa al prossimo middleware o alla rotta finale
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token non valido o scaduto." });
    }
};