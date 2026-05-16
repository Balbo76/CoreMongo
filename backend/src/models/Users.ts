import { Schema, model, InferSchemaType } from 'mongoose';

// 1. Definiamo lo schema con le validazioni di MongoDB
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'L\'email è obbligatoria'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La password è obbligatoria'],
        minlength: [6, 'La password deve essere di almeno 6 caratteri']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 2. Estraiamo il tipo TypeScript automaticamente dallo schema
// Questo evita di dover scrivere l'interfaccia a mano!
export type IUser = InferSchemaType<typeof userSchema>;

// 3. Creiamo e esportiamo il Modello
export const User = model<IUser>('User', userSchema);