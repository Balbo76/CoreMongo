import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(1, "L'email è obbligatoria")
    .email("Formato email non valido"),
  password: z.string()
    .min(1, "La password è obbligatoria")
});

export const registerSchema = z.object({
  email: z.string()
    .min(1, "L'email è obbligatoria")
    .email("Formato email non valido"),
  password: z.string()
    .min(8, "La password deve essere di almeno 8 caratteri")
    .regex(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
    .regex(/[a-z]/, "La password deve contenere almeno una lettera minuscola")
    .regex(/[0-9]/, "La password deve contenere almeno un numero"),
  role: z.enum(['user', 'admin']).optional().default('user')
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}
