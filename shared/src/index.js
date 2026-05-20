"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .min(1, "L'email è obbligatoria")
        .email("Formato email non valido"),
    password: zod_1.z.string()
        .min(1, "La password è obbligatoria")
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string()
        .min(1, "L'email è obbligatoria")
        .email("Formato email non valido"),
    password: zod_1.z.string()
        .min(8, "La password deve essere di almeno 8 caratteri")
        .regex(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
        .regex(/[a-z]/, "La password deve contenere almeno una lettera minuscola")
        .regex(/[0-9]/, "La password deve contenere almeno un numero"),
    role: zod_1.z.enum(['user', 'admin']).optional().default('user')
});
