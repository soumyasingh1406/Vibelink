"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const RadarScanner = () => {
    const [blips, setBlips] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate random blips
        const newBlips = Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 80 + 10,
            delay: Math.random() * 2,
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBlips(newBlips);
    }, []);

    return (
        <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-black/40 rounded-full border-2 border-green-500/30 overflow-hidden shadow-[0_0_20px_rgba(0,255,136,0.2)]">
            {/* Grid & Concentric Circles */}
            <div className="absolute inset-0 rounded-full border-[150px] border-transparent opacity-20 bg-[radial-gradient(circle,transparent_0%,green_100%)]" />
            <div className="absolute inset-[15%] rounded-full border border-green-500/30" />
            <div className="absolute inset-[35%] rounded-full border border-green-500/30" />
            <div className="absolute inset-[55%] rounded-full border border-green-500/30" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49%,green_50%,transparent_51%),linear-gradient(90deg,transparent_49%,green_50%,transparent_51%)] opacity-10" />

            {/* Sweep Animation */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,255,136,0.5)_360deg)] opacity-30 origin-center"
                style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 0)" }} // Adjust clip path if needed, or use simple quadrant
            />
            {/** Simple sweep line */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute top-0 left-1/2 w-[50%] h-[50%] origin-bottom-left bg-gradient-to-t from-transparent to-green-400/50"
                style={{ transformOrigin: "bottom left" }}
            />


            {/* Blips */}
            {blips.map((blip) => (
                <motion.div
                    key={blip.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 0], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: blip.delay, ease: "linear" }}
                    className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_red]"
                    style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
                />
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            </div>
        </div>
    );
};
