"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Settings, FileText, Share2, Users } from "lucide-react";

// --- Types & Data ---

const ROOM_DATA = [
    {
        id: 'Friendship',
        title: 'Friendship Room',
        desc: 'Find new friendships',
        participants: 23,
        gradient: 'from-[#ff69b4] to-[#6b5fff]',
        border: 'border-[#ff69b4]',
        glow: 'group-hover:shadow-[0_0_40px_rgba(255,105,180,0.4)]',
        color: '#ff69b4',
        image: '/logos/friendship.svg'
    },
    {
        id: 'Collaborators',
        title: 'Collaborators',
        desc: 'Build projects together',
        participants: 12,
        gradient: 'from-[#8b5cf6] to-[#3b82f6]',
        border: 'border-[#8b5cf6]',
        glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
        color: '#8b5cf6',
        image: '/logos/collaborators.svg'
    },
    {
        id: 'Mentors',
        title: 'Mentorship',
        desc: 'Guide & Grow',
        participants: 8,
        gradient: 'from-[#ff6b6b] to-[#ff69b4]',
        border: 'border-[#ff6b6b]',
        glow: 'group-hover:shadow-[0_0_40px_rgba(255,107,107,0.4)]',
        color: '#ff6b6b',
        image: '/logos/mentors.svg'
    },
    {
        id: 'Travel',
        title: 'Travel Buddies',
        desc: 'Plan your next journey',
        participants: 45,
        gradient: 'from-[#00d4ff] to-[#00ffaa]',
        border: 'border-[#00d4ff]',
        glow: 'group-hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]',
        color: '#00d4ff',
        image: '/logos/travel.svg'
    },
    {
        id: 'Gamers',
        title: 'Gamers Room',
        desc: 'Level up together',
        participants: 67,
        gradient: 'from-[#facc15] to-[#f97316]',
        border: 'border-[#facc15]',
        glow: 'group-hover:shadow-[0_0_40px_rgba(250,204,21,0.4)]',
        color: '#facc15',
        image: '/logos/gamers.svg'
    },
];

// --- Components ---

const GlowingIcon = ({ type, color }: { type: string, color: string }) => {
    // Abstract geometric icons
    return (
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed rounded-full opacity-30"
                style={{ borderColor: color }}
            />
            {type === 'Friendship' && (
                <div className="relative z-10 grid grid-cols-2 gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                </div>
            )}
            {/* Simple fallback shapes for other types for now, focusing on vibe */}
            {type !== 'Friendship' && type !== 'Gamers' && (
                <div className="relative z-10 w-8 h-8 rounded-lg rotate-45 flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}20, ${color}80)` }}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                </div>
            )}
            {type === 'Gamers' && (
                <div className="relative z-10 text-white font-bold text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    🎮
                </div>
            )}
            <div className="absolute inset-0 rounded-full blur-xl opacity-20" style={{ backgroundColor: color }} />
        </div>
    );
};

const RoomCard = ({ room, index, onJoin }: { room: typeof ROOM_DATA[0], index: number, onJoin: (id: string) => void }) => {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            whileHover={{ y: -20, scale: 1.02 }}
            className={`
                group relative w-[300px] h-[450px] rounded-[24px] 
                bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden
                flex flex-col items-center justify-between p-8
                transition-all duration-500 ease-out
                hover:border-opacity-50
            `}
            style={{
                boxShadow: `0 8px 32px 0 rgba(0,0,0,0.3)`
            }}
        >
            {/* Animated Gradient Border */}
            <div className={`absolute inset-0 rounded-[24px] p-[2px] bg-gradient-to-b ${room.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

            {/* Soft Glow Background */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b ${room.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700`} />

            <div className="flex flex-col items-center text-center w-full z-10">
                <div className="relative w-32 h-32 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] filter brightness-110"
                    />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg tracking-wide">{room.title}</h3>
                <p className="text-sm text-purple-200/60 font-medium tracking-wider uppercase mb-1">{room.participants} Participators</p>
                <p className="text-xs text-gray-400 font-light max-w-[80%]">{room.desc}</p>
            </div>

            <button
                onClick={() => onJoin(room.id)}
                className={`
                    relative w-full py-4 rounded-full 
                    bg-white/5 border border-white/10 overflow-hidden
                    text-white font-medium tracking-wider uppercase text-sm
                    transition-all duration-300
                    hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_${room.color}40]
                    group/btn
                `}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${room.gradient} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300`} />
                <span className="relative z-10">Join Room</span>
            </button>
        </motion.div>
    );
};

export default function LobbyPage() {
    const { user, setUser, logout } = useUser();
    const router = useRouter();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!user) router.push('/');
    }, [user, router]);

    const handleJoin = (themeId: string) => {
        const roomId = `${themeId}-${Math.random().toString(36).substring(2, 6)}`;
        router.push(`/room/${roomId}`);
    };

    if (!user) return null;

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0520] text-slate-200 font-sans selection:bg-pink-500/30">

            {/* --- COSMIC BACKGROUND --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Deep Gradient Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520] via-[#110a2e] to-[#1a0f3e]" />

                {/* Twinkling Stars */}
                {mounted && Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 'px',
                        }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
                    />
                ))}

                {/* Nebulas */}
                <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full"
                />
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="relative z-10 flex flex-col min-h-screen">

                {/* 1. HEADER */}
                <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 backdrop-blur-sm">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logos/logo.jpeg" alt="VibeLink Logo" className="w-16 h-16 object-contain mix-blend-screen drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
                        <span className="text-2xl font-bold tracking-tight text-white">VibeLink</span>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold tracking-widest text-red-400 uppercase">Live Rooms</span>
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-3 px-2 py-1 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-white shadow-black drop-shadow-md">{user.name}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[2px]">
                                <div className="w-full h-full rounded-full bg-[#0a0520] flex items-center justify-center text-lg">
                                    {user.avatar}
                                </div>
                            </div>
                        </button>

                        <AnimatePresence>
                            {showUserMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-[#1a0f3e]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                >
                                    <button onClick={() => logout()} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-300 hover:bg-white/5 transition-colors">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                {/* 2. MAIN LAYOUT */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                    {/* LEFT MAIN: Cards */}
                    <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center">
                        <div className="mb-12">
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4 drop-shadow-sm">
                                Welcome to <br /> Connection Rooms
                            </h1>
                            <p className="text-lg text-purple-200/60 max-w-xl">
                                Dive into a universe of interactions. Select a frequency to begin your journey.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-8 justify-center lg:justify-start pb-12">
                            {ROOM_DATA.map((room, index) => (
                                <RoomCard key={room.id} room={room} index={index} onJoin={handleJoin} />
                            ))}
                        </div>
                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="w-full lg:w-[350px] p-6 lg:border-l border-white/5 bg-[#1a0f3e]/30 backdrop-blur-sm z-20">
                        <div className="space-y-8 sticky top-6">

                            {/* Widget 1: Top Vibers */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-6 flex items-center gap-2">
                                    <Users size={14} /> Today's Top Vibers
                                </h3>
                                <div className="flex justify-between items-center px-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className={`w-12 h-12 rounded-full border-2 ${i === 1 ? 'border-pink-500 shadow-[0_0_15px_rgba(255,105,180,0.5)]' : 'border-white/10'} bg-black/50 overflow-hidden`}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-mono">User_{i}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Widget 2: Active Challenges */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-300 mb-2 flex items-center gap-2">
                                    <FileText size={14} /> Active Challenges Now
                                </h3>
                                <div className="flex items-start gap-4 mt-4">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                        <Settings className="animate-spin-slow" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-md">Real Talk Round</h4>
                                        <p className="text-xs text-gray-400 mt-1">Friendship Room • 2m left</p>
                                    </div>
                                </div>
                            </div>

                            {/* Widget 3: Connections Made */}
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-white/5 backdrop-blur-md relative overflow-hidden">
                                <div className="absolute inset-0 z-0 opacity-30">
                                    {/* Simple SVG Network Visualization Background */}
                                    <svg width="100%" height="100%">
                                        <circle cx="20%" cy="30%" r="2" fill="white" />
                                        <circle cx="80%" cy="20%" r="2" fill="white" />
                                        <circle cx="50%" cy="70%" r="2" fill="white" />
                                        <circle cx="80%" cy="80%" r="2" fill="white" />
                                        <line x1="20%" y1="30%" x2="50%" y2="70%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                        <line x1="80%" y1="20%" x2="50%" y2="70%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                        <line x1="80%" y1="20%" x2="80%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                    </svg>
                                </div>

                                <div className="relative z-10 text-center py-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-pink-300 mb-2">Connections Made Today</h3>
                                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-sm">
                                        142
                                    </div>
                                    <div className="mt-2 text-xs text-gray-400 flex items-center justify-center gap-2">
                                        <Share2 size={12} /> Live counting...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

