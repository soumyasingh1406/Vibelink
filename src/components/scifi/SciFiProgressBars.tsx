"use client";

import { motion } from "framer-motion";

export const SciFiProgressBars = () => {
    const bars = [
        { label: "SYSTEM INTEGRITY", color: "from-purple-500 to-cyan-500", width: "92%" },
        { label: "SHIELD STATUS", color: "from-cyan-400 to-green-400", width: "78%" },
        { label: "ENERGY OUTPUT", color: "from-magenta-500 to-red-500", width: "64%" },
    ];

    return (
        <div className="space-y-6 w-full">
            {bars.map((bar, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-orbitron tracking-widest text-cyan-300/80 uppercase">
                        <span>{bar.label}</span>
                        <span>{bar.width}</span>
                    </div>
                    <div className="h-2 bg-white/10 overflow-hidden relative skew-x-[-20deg]">
                        {/* Animated Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: bar.width }}
                            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${bar.color} shadow-[0_0_10px_currentColor] relative`}
                        >
                            {/* Shine Effect */}
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-10 bg-white/50 blur-md skew-x-[20deg]"
                            />
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
};
