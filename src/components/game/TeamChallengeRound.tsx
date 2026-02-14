"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { useGame } from "@/context/GameContext";
import { ROOM_CHALLENGES, RoomId } from "@/lib/roomQuestions";

interface User {
    id: string;
    name: string;
    avatar: string;
}

interface TeamChallengeRoundProps {
    team?: User[];
    onComplete?: () => void;
}

export function TeamChallengeRound({ team = [], onComplete }: TeamChallengeRoundProps) {
    const { socket, updateTeamText, gameState } = useGame();

    const roomId = (gameState?.id || 'default') as RoomId;
    const challenges = ROOM_CHALLENGES[roomId] || ROOM_CHALLENGES['default'];
    // Find the team task challenge
    const teamChallenge = challenges.find(c => c.type === 'teamTask');

    // Default fallback
    const mission = teamChallenge?.prompt || "Team Vibe Check";
    const details = "Collaborate and come up with something awesome!";

    const [timeLeft, setTimeLeft] = useState(gameState?.timeLeft || 120);
    const [response, setResponse] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Sync timer from server state if available, or local fallback
    useEffect(() => {
        if (gameState?.timeLeft) setTimeLeft(gameState.timeLeft);
    }, [gameState?.timeLeft]);

    // Collaborative Logic
    useEffect(() => {
        if (!socket) return;
        const handleTextUpdate = (text: string) => {
            setResponse(text);
        };
        socket.on('team-text-updated', handleTextUpdate);
        return () => {
            socket.off('team-text-updated', handleTextUpdate);
        };
    }, [socket]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setResponse(val);
        updateTeamText(val);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        onComplete?.();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto p-4 lg:p-6">

            {/* Header Area */}
            <div className="text-center mb-6 relative w-full">
                <div className="absolute top-0 right-0 bg-neon-purple/20 text-neon-purple font-mono font-bold px-4 py-2 rounded-xl border border-neon-purple/50 animate-pulse">
                    ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>

                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="text-5xl mb-2">🎓🎉</div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        Build the Perfect Campus Event
                    </h2>
                    <p className="text-gray-300 max-w-2xl text-lg">
                        Collaborate with your team! You have 2 minutes.
                    </p>
                </motion.div>

                {/* Team Members */}
                <div className="flex gap-4 justify-center mt-6 flex-wrap">
                    {team.length > 0 ? team.map((member) => (
                        <div key={member.id} className="flex flex-col items-center group">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl border-2 border-transparent group-hover:border-neon-purple transition-colors relative">
                                {member.avatar}
                                {/* Simulate typing indicator if needed, for now just static */}
                            </div>
                            <span className="text-xs mt-1 font-bold text-gray-400 group-hover:text-white">{member.name}</span>
                        </div>
                    )) : (
                        <div className="text-gray-500 text-sm">Waiting for team...</div>
                    )}
                </div>
            </div>

            {/* Challenge Workspace */}
            <GlassCard className="w-full relative overflow-hidden flex flex-col p-1" glowColor="purple">
                <div className="bg-black/40 p-6 md:p-8 rounded-xl border border-white/5 flex flex-col gap-4 h-[400px]">

                    <div className="bg-neon-purple/10 border-l-4 border-neon-purple p-4 rounded-r-lg">
                        <h3 className="text-neon-purple font-bold uppercase tracking-wider text-xs mb-1">{mission}</h3>
                        <p className="text-gray-200 font-medium">
                            {details}
                        </p>
                    </div>

                    <textarea
                        value={response}
                        onChange={handleChange}
                        placeholder="Start typing your ideas here... (Your team sees what you type!)"
                        className="flex-1 bg-transparent text-lg md:text-xl text-white resize-none outline-none placeholder:text-gray-600 leading-relaxed font-mono"
                        autoFocus
                    />

                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="text-gray-500 text-sm italic">
                            {response.length > 0 ? "Someone is typing..." : "Start brainstorming!"}
                        </span>
                        <NeonButton
                            variant="primary"
                            glowColor="purple"
                            className="px-8 py-2 font-bold"
                            onClick={handleSubmit}
                            disabled={!response.trim() || isSubmitted}
                        >
                            {isSubmitted ? 'Submitted!' : 'Submit Team Idea'}
                        </NeonButton>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
