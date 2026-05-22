import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from '../src/routes/Auth';
import { globalErrorHandler } from '../src/middleware/errorHandler';
import { User } from '../src/models/Users';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(globalErrorHandler);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
}, 30000);

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
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
