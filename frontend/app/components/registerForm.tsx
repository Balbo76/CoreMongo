import { Form, Link, useNavigation, useActionData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

export function RegisterForm() {
    const navigation = useNavigation();
    const actionData = useActionData() as { 
        error?: string; 
        success?: string;
        fieldErrors?: Record<string, string> 
    };
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
                        Crea un account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Oppure{" "}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            accedi al tuo profilo
                        </Link>
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {actionData?.error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
                        >
                            <p className="text-sm text-red-700 font-medium">{actionData.error}</p>
                        </motion.div>
                    )}
                    {actionData?.success && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md"
                        >
                            <p className="text-sm text-green-700 font-medium">{actionData.success}</p>
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
                                placeholder="Minimo 8 caratteri, 1 maiuscola, 1 numero"
                            />
                            {actionData?.fieldErrors?.password && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{actionData.fieldErrors.password}</p>
                            )}
                        </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="w-full"
                        >
                            Registrati
                        </Button>
                    </motion.div>
                </Form>
            </motion.div>
        </div>
    );
}
