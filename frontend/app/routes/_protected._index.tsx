import { useOutletContext } from "react-router";
import type { User } from "@coremongo/shared";
import { Card } from "../components/ui/Card";

export default function AdminIndex() {
    const { user } = useOutletContext<{ user: User }>();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500 mt-2">Benvenuto, {user.email}!</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Utenti" description="Gestione account" className="bg-white border-blue-100">
                    <div className="text-3xl font-bold text-blue-600">1</div>
                </Card>
                <Card title="Server" description="Stato infrastruttura" className="bg-white border-green-100">
                    <div className="text-3xl font-bold text-green-600">Online</div>
                </Card>
                <Card title="Log" description="Attività recente" className="bg-white border-amber-100">
                    <div className="text-3xl font-bold text-amber-600">0</div>
                </Card>
            </div>
        </div>
    );
}
