import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variant?: "default" | "interactive";
    glowColor?: "purple" | "cyan" | "pink" | "none";
}

export function GlassCard({
    className,
    children,
    variant = "default",
    glowColor = "none",
    ...props
}: GlassCardProps) {
    // Holographic Base Styles
    // - holo-shape: clip-path for cut corners
    // - backdrop-blur: glass effect
    // - border: subtle tech border
    const baseStyles = "relative bg-[#0a0f1e]/80 backdrop-blur-xl border-l border-r border-white/10 transition-all duration-300 holo-shape";

    const glowMap = {
        purple: "shadow-[0_0_20px_rgba(189,0,255,0.15)] border-t border-b border-holo-purple/30",
        cyan: "shadow-[0_0_20px_rgba(0,243,255,0.15)] border-t border-b border-holo-blue/30",
        pink: "shadow-[0_0_20px_rgba(255,0,153,0.15)] border-t border-b border-holo-pink/30",
        none: "shadow-none border-t border-b border-white/5",
    };

    const accentColorMap = {
        purple: "bg-holo-purple",
        cyan: "bg-holo-blue",
        pink: "bg-holo-pink",
        none: "bg-white/20"
    };

    const interactiveStyles =
        variant === "interactive"
            ? "cursor-pointer hover:bg-white/5 hover:scale-[1.01]"
            : "";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(baseStyles, glowMap[glowColor], interactiveStyles, className)}
            {...props}
        >
            {/* Tech Decoration: Corner Brackets */}
            <div className={`absolute top-0 left-0 w-8 h-[2px] ${accentColorMap[glowColor]} opacity-70`} />
            <div className={`absolute top-0 left-0 w-[2px] h-8 ${accentColorMap[glowColor]} opacity-70`} />

            <div className={`absolute bottom-0 right-0 w-8 h-[2px] ${accentColorMap[glowColor]} opacity-70`} />
            <div className={`absolute bottom-0 right-0 w-[2px] h-8 ${accentColorMap[glowColor]} opacity-70`} />

            {/* Tech Decoration: Random ID or Label - REMOVED for clean look and purity */}\n

            {/* Inner Grid Overlay */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-1">
                {children}
            </div>
        </motion.div>
    );
}
