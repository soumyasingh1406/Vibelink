"use client";

import { motion } from "framer-motion";

export const SciFiGauges = () => {
    return (
        <div className="flex justify-around items-center gap-4">
            {/* Gauge 1 */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-500/50"
                />
                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-500/50"
                />

                <div className="text-center z-10">
                    <div className="text-xl font-bold font-orbitron text-white">87%</div>
                    <div className="text-[10px] text-cyan-400 uppercase tracking-wider">Load</div>
                </div>
            </div>

            {/* Gauge 2 */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-l-2 border-magenta-500/50"
                />
                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-b-2 border-r-2 border-cyan-400/50"
                />

                <div className="text-center z-10">
                    <div className="text-xl font-bold font-orbitron text-white">42°</div>
                    <div className="text-[10px] text-magenta-400 uppercase tracking-wider">Temp</div>
                </div>
            </div>
        </div>
    );
};
