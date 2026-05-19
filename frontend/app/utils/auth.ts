import { redirect } from "react-router";
import type { User } from "@coremongo/shared";

export async function checkAuth(): Promise<User> {
    const token = localStorage.getItem("coremongo_token");
    if (!token) {
        throw redirect("/login");
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Sessione scaduta");
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        localStorage.removeItem("coremongo_token");
        throw redirect("/login");
    }
}

export async function redirectIfAuthenticated() {
    const token = localStorage.getItem("coremongo_token");

    if (token) {
        // Opzionale: qui potresti aggiungere una logica per verificare
        // se il token non sia palesemente scaduto prima di reindirizzare.
        throw redirect("/admin"); // Rimanda alla home se il token esiste
    }

    return null;
}