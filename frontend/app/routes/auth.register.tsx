import { type ClientActionFunctionArgs } from "react-router";
import { RegisterForm } from "../components/registerForm";
import { redirectIfAuthenticated } from "../utils/auth";
import { TopBar } from '../components/topBar';
import { registerSchema } from "@coremongo/shared";

export function meta() {
    return [
        { title: "Registrazione - CoreMongo" },
        { name: "description", content: "Crea un nuovo account su CoreMongo" },
    ];
}

export async function clientLoader() {
    await redirectIfAuthenticated();
    return null;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Validazione Client-Side con Zod (Shared)
    const result = registerSchema.safeParse({ email, password });
    
    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return { 
            fieldErrors: {
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0]
            }
        };
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message || "Errore durante la registrazione" };
        }

        return { success: "Account creato! Reindirizzamento al login..." };
    } catch {
        return { error: "Errore di connessione al server" };
    }
}

export default function Register() {
    return (
        <>
            <TopBar />
            <RegisterForm />
        </>
    );
}
