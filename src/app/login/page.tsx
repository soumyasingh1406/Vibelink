"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { generateId } from "@/lib/utils";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Optional for now
    const [password, setPassword] = useState(""); // Dummy for now
    const { setUser } = useUser();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock Auth Logic
        const newUser = {
            id: generateId(),
            name: name || "Viber", // Default if login doesn't require name
            avatar: "👤", // Default placeholder
            interests: [],
            vibeScore: 0
        };

        // In a real app, we'd fetch user data on login
        // For now, we just set the name and redirect to onboarding to complete profile
        // OR if login, we assume they are "returning" (but we don't have a DB, so always onboarding for now)

        // Let's simplify: Both flows go to Onboarding for this MVP stage
        // ensuring they set their avatar/interests

        setUser(newUser);
        router.push('/onboarding');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-black -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <GlassCard className="w-full max-w-md p-8" variant="default" glowColor="purple">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black mb-2 tracking-tighter text-white">
                        VIBE<span className="text-neon-purple">LINK</span>
                    </h1>
                    <p className="text-gray-400">Where connections come alive.</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-lg mb-6">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        ENTER VIBE
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        JOIN VIBE
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-500">Username</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-all"
                                placeholder="UniqueAlias"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-all"
                            placeholder="you@vibe.link"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <NeonButton type="submit" variant="primary" glowColor="purple" className="w-full py-4 text-lg mt-4">
                        {isLogin ? "Unlock Vibe" : "Create Identity"}
                    </NeonButton>
                </form>

                <p className="text-xs text-center text-gray-600 mt-6">
                    By entering, you agree to pass the Vibe Check.
                </p>
            </GlassCard>
        </div>
    );
}
