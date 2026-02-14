"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const WaveformVisualizer = () => {
    const [scenarios, setScenarios] = useState<number[]>([]);

    useEffect(() => {
        setScenarios(Array.from({ length: 15 }).map(() => 0.8 + Math.random() * 0.5));
    }, []);

    if (scenarios.length === 0) return null; // or loading state

    return (
        <div className="flex items-end justify-between h-32 gap-1 w-full p-4">
            {scenarios.map((duration, i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: ["20%", "80%", "40%", "90%", "30%"],
                        backgroundColor: ["#8a2be2", "#ff00ff", "#00bfff", "#8a2be2"]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: duration,
                        ease: "easeInOut",
                        delay: i * 0.05
                    }}
                    className="flex-1 rounded-t-md shadow-[0_0_10px_currentColor]"
                />
            ))}
        </div>
    );
};
