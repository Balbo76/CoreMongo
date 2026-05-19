import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from '../src/routes/Auth';
import { globalErrorHandler } from '../src/middleware/errorHandler';
import { User } from '../src/models/Users';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(globalErrorHandler);

beforeAll(async () => {
    // Usiamo il database reale in Docker ma su una collezione/db di test dedicato
    // Il nome dell'host è 'mongo' come definito nel compose.yaml
    const uri = process.env.MONGO_URI_TEST || 'mongodb://admin:pass@mongo:27017/coremongo_test?authSource=admin';
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('Auth Integration Tests', () => {
    it('should register a new user successfully', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'Password123'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Utente creato con successo!');

        const user = await User.findOne({ email: 'test@example.com' });
        expect(user).toBeDefined();
        expect(user?.email).toBe('test@example.com');
    });

    it('should not register a user with an existing email', async () => {
        // Create initial user
        await User.create({
            email: 'duplicate@example.com',
            password: 'hashedpassword'
        });

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'duplicate@example.com',
                password: 'Password123'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Questa email è già registrata');
    });

    it('should validate invalid email format', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalid-email',
                password: 'Password123'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Errore di validazione');
        expect(response.body.errors).toBeDefined();
    });
});
