import { useOutletContext } from "react-router";
import type { User } from "@coremongo/shared";

export default function Profile() {
    const { user } = useOutletContext<{ user: User }>();

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dettagli Account</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32" />
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6">
                        <div className="h-24 w-24 bg-white p-2 rounded-full shadow-lg">
                            <div className="h-full w-full bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500 border border-gray-100">
                                {user.email[0].toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Indirizzo Email</label>
                            <p className="text-lg font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ruolo Utente</label>
                            <p className="text-lg font-medium">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-bold uppercase">
                  {user.role}
                </span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Data Registrazione</label>
                            <p className="text-lg font-medium text-gray-900">
                                {new Date(user.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status Database</label>
                            <p className="text-sm font-mono text-green-600 flex items-center gap-1">
                                <span className="h-2 w-2 bg-green-500 rounded-full" /> Connesso via MongoDB
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}