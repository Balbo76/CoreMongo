import { z } from 'zod';

/**
 * Schema per la validazione del Login.
 * Verifica che l'email sia valida e che la password sia presente.
 */
export const loginSchema = z.object({
  email: z.string()
    .min(1, "L'email è obbligatoria")
    .email("Formato email non valido"),
  password: z.string()
    .min(1, "La password è obbligatoria")
});

/**
 * Schema per la validazione della Registrazione.
 * Include regole più stringenti per la sicurezza della password.
 */
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

// Esportiamo anche i tipi derivati dagli schemi per usarli nel codice TypeScript
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
