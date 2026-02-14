"use client";

import React from 'react';

interface TimerProps {
    timeLeft: number;
    totalTime: number;
    label?: string;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime, label = "TIME REMAINING" }) => {
    const progress = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
    const isCritical = timeLeft <= 10;

    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
            <div className="flex justify-between w-full text-xs font-bold tracking-widest text-cyan-400">
                <span>{label}</span>
                <span className={isCritical ? "text-red-500 animate-pulse" : "text-white"}>
                    {timeLeft}s
                </span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-linear ${isCritical ? 'bg-red-500' : 'bg-cyan-500'
                        }`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
