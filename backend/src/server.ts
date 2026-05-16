import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import sanitize from 'mongo-sanitize';

import authRoutes from './routes/Auth';
import userRoutes from './routes/User';


dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet()); // Imposta vari header HTTP di sicurezza

// NoSQL Injection Prevention: Rimuove chiavi che iniziano con $ dagli input
app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  next();
});

// Rate Limiting: Previene attacchi brute-force e DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // Limita ogni IP a 100 richieste per finestra
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Troppe richieste da questo IP, riprova più tardi." }
});

// Applichiamo il limiter a tutte le rotte API
app.use('/api', limiter);

// Middleware di base
app.use(cors()); // Permette al frontend di comunicare con il backend
app.use(express.json()); // Permette di leggere i body delle richieste in JSON

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware di gestione errore globale (Deve essere l'ultimo)
import { globalErrorHandler } from './middleware/errorHandler';
app.use(globalErrorHandler);

// Rotta di test
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

// Connessione DB e Avvio
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('🍃 Connesso a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ Errore connessione DB:', err));
