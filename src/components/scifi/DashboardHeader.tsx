"use client";

import { motion } from "framer-motion";
import { User, Bell, Radio, Settings } from "lucide-react";
import { NeonButton } from "../ui/NeonButton"; // Assuming this exists from exploring lobby page

export const DashboardHeader = () => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 h-16 bg-[#0a0514]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 shadow-[0_4px_20px_rgba(138,43,226,0.2)]"
        >
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-45 border border-white/20 shadow-[0_0_15px_rgba(138,43,226,0.5)]">
                        <span className="transform -rotate-45 font-orbitron font-bold text-white text-lg">V</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse" />
                </div>
                <h1 className="text-2xl font-orbitron font-bold tracking-[4px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
                    VIBE<span className="text-cyan-400">LINK</span>
                </h1>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {['COMMAND', 'COMMUNICATIONS', 'NAVIGATION', 'SETTINGS'].map((item) => (
                    <button key={item} className="text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group">
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-red-400">LIVE</span>
                </div>

                <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5 text-purple-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full" />
                </button>

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </motion.header>
    );
};
