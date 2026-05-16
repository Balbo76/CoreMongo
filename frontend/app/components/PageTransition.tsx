import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import type { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
    isLoading?: boolean;
}

export function PageTransition({ children, isLoading }: PageTransitionProps) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.2, 
                    ease: [0.2, 0, 0, 1] 
                }}
                className="p-10"
            >
                <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-300"}>
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
