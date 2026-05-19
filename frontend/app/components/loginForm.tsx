import { Form, Link, useNavigation, useActionData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

export function LoginForm() {
    const navigation = useNavigation();
    const actionData = useActionData() as { error?: string; fieldErrors?: Record<string, string> };
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Bentornato su CoreMongo
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Oppure{" "}
                        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            registrati gratuitamente
                        </Link>
                    </p>
                </div>

                {/* Gestione Errore con Animazione */}
                <AnimatePresence mode="wait">
                    {actionData?.error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
                        >
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 font-medium">{actionData.error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Form method="post" className="mt-8 space-y-6" noValidate>
                    <div className="space-y-4">
                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`block w-full px-4 py-3 border ${actionData?.fieldErrors?.email ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm`}
                                placeholder="nome@esempio.it"
                            />
                            {actionData?.fieldErrors?.email && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{actionData.fieldErrors.email}</p>
                            )}
                        </div>
                        <div className="group">
                            <label htmlFor="password" readonly className="block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`block w-full px-4 py-3 border ${actionData?.fieldErrors?.password ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm`}
                                placeholder="••••••••"
                            />
                            {actionData?.fieldErrors?.password && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{actionData.fieldErrors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all cursor-pointer"
                            />
                            <span className="ml-2 block text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ricordami</span>
                        </label>
                        <Link to="/forgot-password" size="sm" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                            Password dimenticata?
                        </Link>
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="w-full"
                        >
                            Accedi
                        </Button>
                    </motion.div>
                </Form>
            </motion.div>
        </div>
    );
}