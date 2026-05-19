import { useLoaderData, redirect } from "react-router";
import { checkAuth } from "../utils/auth";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import type { User } from "@coremongo/shared";

export async function clientLoader() {
    const user = await checkAuth();
    if (!user) {
        return redirect("/login");
    }
    return { user };
}

export default function ProtectedRoute() {
    const { user } = useLoaderData() as { user: User };

    return <DashboardLayout user={user} />;
}