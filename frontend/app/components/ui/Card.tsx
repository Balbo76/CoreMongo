import type { ReactNode } from "react";

interface CardProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function Card({ title, description, children, className = "" }: CardProps) {
    return (
        <section className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
            {(title || description) && (
                <div className="mb-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-700 font-mono underline decoration-blue-500">
                            {title}
                        </h3>
                    )}
                    {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
                </div>
            )}
            {children}
        </section>
    );
}
