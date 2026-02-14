"use client";

import { motion } from "framer-motion";

export const HexagonCore = () => {
    return (
        <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full animate-pulse" />

            {/* Layer 1: Outer Ring (Slowest) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute w-full h-full border-[1px] border-purple-500/30"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full glow-cyan" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-magenta-500 rounded-full glow-pink" />
            </motion.div>

            {/* Layer 2: Middle Ring (Medium Speed, Counter-Clockwise) */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute w-[80%] h-[80%] border-[2px] border-cyan-400/40 border-dashed"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            />

            {/* Layer 3: Inner Solid Ring (Fastest) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute w-[60%] h-[60%] border-[4px] border-magenta-500/60"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
                <div className="absolute w-full h-full bg-magenta-500/10 backdrop-blur-sm" />
            </motion.div>

            {/* Center Core */}
            <div className="absolute w-[30%] h-[30%] bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.8)] animate-pulse">
                <div className="w-[80%] h-[80%] bg-[#0a0514] rounded-full flex items-center justify-center border border-cyan-400">
                    <span className="font-orbitron text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
                        CORE
                    </span>
                </div>
            </div>

            {/* Orbiting Particles */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute w-[90%] h-[90%] rounded-full border border-transparent"
            >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]" />
            </motion.div>
        </div>
    );
};
