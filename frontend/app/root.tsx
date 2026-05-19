import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import type { Route } from "./+types/root";
import { motion, AnimatePresence } from "framer-motion";
import { ToastProvider } from "./components/ToastContext";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased text-slate-900 bg-gray-50">
      {children}
      <ScrollRestoration />
      <Scripts />
      </body>
      </html>
  );
}

export default function App() {
  const location = useLocation();

  const isProtected = location.pathname.startsWith("/admin");
  const animationKey = isProtected ? "admin-layout" : location.pathname;

  return (
      <ToastProvider>
          <AnimatePresence>
            <motion.div
                key={animationKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
      </ToastProvider>
  );
}

export function HydrateFallback() {
  return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse text-blue-600 font-medium font-mono text-xl">
          CoreMongo OS is loading...
        </div>
      </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Si è verificato un errore inaspettato.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Errore";
    details =
        error.status === 404
            ? "La pagina che cerchi non esiste."
            : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <h1 className="text-5xl font-black text-red-600 mb-4">{message}</h1>
          <p className="text-slate-600 mb-6 font-medium">{details}</p>

          {stack && (
              <details className="mt-4 bg-slate-50 p-4 rounded-lg overflow-auto max-h-60 border border-slate-200">
                <summary className="text-xs font-bold text-slate-400 cursor-pointer uppercase">Stack Trace</summary>
                <pre className="mt-2 text-[10px] text-slate-500 leading-tight">
              <code>{stack}</code>
            </pre>
              </details>
          )}

          <button
              onClick={() => window.location.href = "/"}
              className="mt-8 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Torna alla Home
          </button>
        </div>
      </main>
  );
}