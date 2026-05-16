import { redirect, type ClientActionFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import { LoginForm } from "../components/loginForm";
import { redirectIfAuthenticated } from "..//utils/auth";
import { TopBar } from '../components/topBar';
import { loginSchema } from "@atlasscale/shared";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login" },
        { name: "description", content: "" },
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
    const result = loginSchema.safeParse({ email, password });
    
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || "Credenziali non valide" };
        }

        const data = await response.json();
        localStorage.setItem("atlasscale_token", data.token);
        return redirect("/admin");
    } catch (e) {
        return { error: "Errore di connessione al server" };
    }
}

export default function Login() {
    return (
        <>
            <TopBar />
            <LoginForm />
        </>
    );
}
