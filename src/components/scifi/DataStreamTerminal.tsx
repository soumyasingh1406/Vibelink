"use client";

import { useEffect, useState } from "react";

const STRINGS = [
    "INITIALIZING SEQUENCE...",
    "LOADING DATA MODULES...",
    "ENCRYPTING CONNECTION...",
    "ESTABLISHING LINK...",
    "PING: 14ms",
    "PACKET LOSS: 0%",
    "SYSTEM OPTIMAL",
    "SCANNING SECTORS...",
    "ACCESS GRANTED",
    "UPLOADING TELEMETRY...",
    "CHECKING PERMISSIONS...",
    "KERNEL UPDATE REQUIRED...",
    "VULNERABILITY SCAN: CLEAN"
];

export const DataStreamTerminal = () => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLines(prev => {
                const newLines = [...prev, STRINGS[Math.floor(Math.random() * STRINGS.length)]];
                if (newLines.length > 8) newLines.shift();
                return newLines;
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs text-green-400/80 leading-relaxed overflow-hidden h-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#140a2d] pointer-events-none" />
            {lines.map((line, i) => (
                <div key={i} className="animate-pulse">
                    <span className="opacity-50 mr-2">{`> `}</span>
                    {line}
                </div>
            ))}
        </div>
    );
};
