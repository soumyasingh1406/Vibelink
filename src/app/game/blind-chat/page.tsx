"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

// Initial messages or empty state
type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: number;
};

// Keyword-based response system
const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("travel") || lowerInput.includes("trip") || lowerInput.includes("visit")) {
        return "That sounds adventurous! Which place did you enjoy visiting the most?";
    }
    if (lowerInput.includes("fear") || lowerInput.includes("scared") || lowerInput.includes("nervous") || lowerInput.includes("afraid")) {
        return "That’s understandable. What usually helps you feel more comfortable in those situations?";
    }
    if (lowerInput.includes("music") || lowerInput.includes("song") || lowerInput.includes("band") || lowerInput.includes("listen")) {
        return "Music is a great way to connect! What genre do you find yourself listening to lately?";
    }
    if (lowerInput.includes("hobby") || lowerInput.includes("hobbies") || lowerInput.includes("free time")) {
        return "It's always good to have passions. How did you get started with that?";
    }
    if (lowerInput.includes("food") || lowerInput.includes("eat") || lowerInput.includes("cook")) {
        return "Food is the universal language! Do you prefer cooking at home or trying new restaurants?";
    }
    if (lowerInput.includes("work") || lowerInput.includes("job") || lowerInput.includes("study") || lowerInput.includes("school")) {
        return "It sounds like that takes up a lot of your time. Do you find it rewarding?";
    }
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        return "Hey there! Ready for a blind chat? What's on your mind?";
    }

    // Fallback responses
    const fallbacks = [
        "That’s interesting, tell me more.",
        "Why do you feel that way?",
        "I see. How does that make you feel?",
        "Go on, I'm listening.",
        "That's a unique perspective!"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

export default function BlindChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [timeLeft, setTimeLeft] = useState(40);
    const [isTyping, setIsTyping] = useState(false);
    const [isRoundOver, setIsRoundOver] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsRoundOver(true);
            // Wait a bit then redirect
            const timeout = setTimeout(() => {
                router.push("/game/results"); // or next round
            }, 3000);
            return () => clearTimeout(timeout);
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, router]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!inputValue.trim() || isRoundOver) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot thinking delay
        setTimeout(() => {
            const botText = getBotResponse(userMsg.text);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: "bot",
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center bg-mesh overflow-hidden relative">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 z-10 relative h-[85vh]"
            >

                {/* Left Panel - Identity & Timer */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <GlassCard className="flex-1 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden" glowColor="purple">
                        <motion.div
                            animate={{
                                boxShadow: ["0 0 20px #a855f7", "0 0 40px #3b82f6", "0 0 20px #a855f7"],
                            }}
                            className="w-32 h-32 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue mb-6 flex items-center justify-center"
                        >
                            <span className="text-4xl">?</span>
                        </motion.div>

                        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-2">
                            Blind Chat Round
                        </h1>
                        <p className="text-gray-400 mb-8">
                            Chat quickly! You have limited time to get to know your partner.
                        </p>

                        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden relative">
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-neon-blue to-neon-pink"
                                initial={{ width: "100%" }}
                                animate={{ width: `${(timeLeft / 40) * 100}%` }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </div>
                        <p className="mt-4 text-2xl font-mono font-bold text-white">
                            00:{timeLeft.toString().padStart(2, '0')}
                        </p>
                    </GlassCard>
                </div>

                {/* Right Panel - Chat Interface */}
                <div className="md:col-span-8 h-full">
                    <GlassCard className="h-full flex flex-col p-0 overflow-hidden border-white/10 bg-black/60" glowColor="cyan">
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/20">
                                <span className="text-lg">👤</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Anonymous Participant</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            <div className="flex justify-center mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-400">
                                    Chat started • Keep it friendly!
                                </span>
                            </div>

                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-tr-none"
                                            : "bg-white/10 border border-white/10 text-gray-200 rounded-tl-none icon-glow"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Transmit Message..."
                                    disabled={isRoundOver}
                                    className="glass-input flex-1 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:shadow-[0_0_15px_rgba(189,0,255,0.3)] transition-all disabled:opacity-50"
                                    autoFocus
                                />
                                <NeonButton
                                    type="submit"
                                    disabled={!inputValue.trim() || isRoundOver}
                                    className="px-6"
                                    variant="primary"
                                    glowColor="cyan"
                                >
                                    SEND
                                </NeonButton>
                            </form>
                        </div>

                        {/* Round Completed Overlay */}
                        <AnimatePresence>
                            {isRoundOver && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        className="p-8 bg-black/90 border border-neon-blue rounded-3xl text-center shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                                    >
                                        <h2 className="text-4xl font-bold text-white mb-2 text-glow">
                                            Blind Chat Completed
                                        </h2>
                                        <p className="text-gray-400 text-lg">
                                            Moving to the next challenge...
                                        </p>
                                        <div className="mt-6 flex justify-center">
                                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-neon-blue"></div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </GlassCard>
                </div>
            </motion.div>
        </div>
    );
}
