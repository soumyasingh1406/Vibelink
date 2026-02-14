"use client";

import { useGame } from "@/context/GameContext";
import { useUser } from "@/context/UserContext";
import { NeonButton } from "@/components/ui/NeonButton";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function UniversalChallenge() {
    const { gameState, submitRound } = useGame();
    const { user } = useUser();

    const [response, setResponse] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Get question from roundData (primary) or activeChallenge (fallback)
    const questionText = gameState?.roundData?.question || gameState?.activeChallenge?.prompt || 'Loading question...';
    const questionCount = gameState?.roundData?.questionCount || 1;
    const timeLeft = gameState?.timeLeft || 30;

    // Reset when question changes
    useEffect(() => {
        setResponse("");
        setSubmitted(false);
    }, [questionCount, questionText]);

    // Check if user already submitted
    useEffect(() => {
        if (gameState?.roundData?.responses && user?.id) {
            const hasSubmitted = gameState.roundData.responses[user.id] !== undefined;
            if (hasSubmitted) {
                setSubmitted(true);
            }
        }
    }, [gameState?.roundData?.responses, user?.id]);

    const handleSubmit = () => {
        if (submitted) return;
        if (!response.trim()) return;

        submitRound(response);
        setSubmitted(true);
    };

    // Calculate progress
    const totalUsers = gameState?.users?.length || 0;
    const submittedCount = Object.keys(gameState?.roundData?.responses || {}).length;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={questionCount}
            className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-6"
        >
            {/* Header: Badge & Timer */}
            <div className="flex w-full justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="flex flex-col items-start bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        Challenge {questionCount} of 5
                    </span>
                    <span className="text-neon-cyan font-bold text-lg uppercase glow-sm">
                        QUESTION
                    </span>
                </div>

                <div className={`text-2xl font-mono font-bold px-6 py-2 rounded-lg border bg-black/40 ${timeLeft <= 10 ? 'text-red-500 border-red-500/50 animate-pulse' : 'text-neon-yellow border-neon-yellow/30'}`}>
                    ⏱️ {timeLeft}s
                </div>
            </div>

            {/* Prompt */}
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-white drop-shadow-xl min-h-[120px] flex items-center justify-center px-4">
                {questionText}
            </h2>

            {/* Input Area */}
            {!submitted ? (
                <div className="w-full max-w-2xl bg-black/30 p-1 rounded-2xl border border-white/10 backdrop-blur-md relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                    <textarea
                        className="w-full text-white p-4 rounded-xl text-base outline-none resize-none transition-all placeholder-gray-500 focus:ring-2 focus:ring-neon-blue bg-black/40 border-2 border-white/20"
                        rows={3}
                        placeholder="Type your answer here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        maxLength={500}
                        autoFocus
                    />

                    <div className="flex justify-between items-center px-4 py-2 bg-black/40 rounded-b-xl border-t border-white/5">
                        <span className="text-xs text-gray-400 font-mono">
                            {response.length}/500 chars
                        </span>
                        <NeonButton
                            onClick={handleSubmit}
                            variant="primary"
                            glowColor="cyan"
                            className="px-6 py-2 text-sm uppercase tracking-wider"
                            disabled={!response.trim()}
                        >
                            Submit
                        </NeonButton>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center animate-pulse">
                    <div className="text-3xl font-bold text-green-400 mb-3">Submitted! ✓</div>
                    <div className="text-gray-400 mb-6 text-lg">Waiting for others...</div>

                    <div className="bg-white/5 px-8 py-4 rounded-full border border-white/10 flex items-center gap-3">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-gray-400">{submittedCount}/{totalUsers} submitted</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}