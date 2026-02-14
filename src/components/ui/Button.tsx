"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "neon" | "danger";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    children?: React.ReactNode;
}

export function Button({
    className,
    variant = "primary",
    isLoading,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider";

    const variants: Record<ButtonVariant, string> = {
        primary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 border-0",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        neon: "bg-black/40 border border-neon-pink text-neon-pink shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:bg-neon-pink/10",
        danger: "bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500/20"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </motion.button>
    );
}
