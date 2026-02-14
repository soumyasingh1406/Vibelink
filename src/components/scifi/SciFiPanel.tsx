"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming utils exists, if not I'll handle it.

interface SciFiPanelProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "holo" | "danger";
    title?: string;
}

export const SciFiPanel = ({ children, className, variant = "default", title }: SciFiPanelProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "relative group p-6 backdrop-blur-xl border border-white/10 overflow-hidden",
                "bg-[#140a2d]/60", // Dark purple/navy tint
                "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
                "hover:shadow-[0_8px_32px_0_rgba(138,43,226,0.3)]",
                "transition-all duration-300",
                // Clip path logic would be better in CSS class but inline for now to ensure it works
                // We'll use the .holo-shape class from globals.css if available, or custom styles
                "holo-shape",
                className
            )}
        >
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Header if title exists */}
            {title && (
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                    <div className="w-2 h-2 bg-cyan-400 animate-pulse rounded-full" />
                    <h3 className="text-cyan-400 font-orbitron tracking-widest uppercase text-sm font-bold glow-text">
                        {title}
                    </h3>
                </div>
            )}

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
