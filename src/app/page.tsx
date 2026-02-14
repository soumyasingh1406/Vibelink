'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function ConnectionRooms() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👤");
  const avatars = ["👤", "👽", "🦄", "🤖", "🐱", "🦊", "🐯", "🦁", "🐶", "🐼"];

  useEffect(() => {
    // If user is not logged in, show login modal
    if (!user) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [user]);

  const handleLogin = () => {
    if (!username.trim()) return;

    const newUser = {
      id: `user-${Date.now()}`,
      name: username,
      avatar: selectedAvatar,
      interests: [],
      vibeCharacteristics: { nightOwl: Math.random() > 0.5, texter: Math.random() > 0.5 },
      vibeScore: 0
    };

    setUser(newUser);
    setShowLogin(false);
  };

  const rooms = [
    {
      id: 'friendship',
      name: 'Friendship Room',
      participants: 23,
      description: 'Find new friendships',
      gradient: 'from-pink-500 via-purple-500 to-blue-500',
      iconGradient: 'from-pink-400 to-purple-500',
      image: '/logos/friendship.svg',
    },
    {
      id: 'collaborators',
      name: 'Collaborators Room',
      participants: 17,
      description: 'Seek or share fun ideas',
      gradient: 'from-purple-600 via-violet-500 to-blue-500',
      iconGradient: 'from-purple-500 to-blue-500',
      image: '/logos/collaborators.svg',
    },
    {
      id: 'mentorship',
      name: 'Mentorship Room',
      participants: 8,
      description: 'Seek or offer mentorship',
      gradient: 'from-orange-500 via-pink-500 to-purple-500',
      iconGradient: 'from-orange-400 to-pink-500',
      image: '/logos/mentors.svg',
    },
    {
      id: 'travel',
      name: 'Travel Buddies Room',
      participants: 12,
      description: 'Plan your next adventure',
      gradient: 'from-cyan-500 via-blue-500 to-teal-400',
      iconGradient: 'from-cyan-400 to-teal-400',
      image: '/logos/travel.svg',
    },
    {
      id: 'love-connection',
      name: 'Love Connection Room',
      participants: 14,
      description: 'Build meaningful romantic connections',
      gradient: 'from-pink-600 via-rose-500 to-red-500',
      iconGradient: 'from-pink-500 to-red-500',
      image: '/logos/love-connection.svg',
    },
  ];

  const topVibers = [
    { name: 'Amy', avatar: '👤' },
    { name: 'Jake', avatar: '👤' },
    { name: 'Sarah', avatar: '👤' },
    { name: 'Chris', avatar: '👤' },
  ];

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0520] via-[#150a35] to-[#1a0f3e] text-white overflow-hidden relative">
      {/* Animated Starfield Background */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* Nebula Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-40 right-32 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px] animate-drift-reverse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[130px] animate-pulse-slow" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <Logo variant="horizontal" />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            <span className="text-gray-300">Live Rooms</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => !user && setShowLogin(true)}>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              {user?.avatar || "?"}
            </div>
            <span className="text-sm font-medium">{user?.name || "Join Now"}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-10 py-16">
        {/* Welcome Heading */}
        <div className="mb-16">
          <h2 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome to Connection Rooms
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-20">

          {/* 1. ROOMS SECTION (Vertical Column) */}
          <section className="flex flex-wrap justify-center gap-8">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="group relative animate-float cursor-pointer"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
                onClick={() => router.push(`/room/${room.id}`)}
              >
                {/* Card */}
                <div className="relative h-auto min-h-[400px] w-80 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 flex flex-col items-center py-8">

                  {/* Gradient Border */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${room.gradient} opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl`} />
                  <div className={`absolute inset-[2px] bg-gradient-to-b from-[#0f0829] to-[#1a0f3e] rounded-3xl`} />

                  {/* Content - Vertical Layout */}
                  <div className="relative h-full w-full flex flex-col items-center justify-between p-6 gap-6 z-10">

                    {/* Icon Section */}
                    <div className={`flex-shrink-0 w-32 h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <div className="relative w-full h-full p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] filter brightness-110"
                        />
                        {/* Sparkles */}
                        <div className="absolute -top-2 -right-2 w-2 h-2 bg-white rounded-full animate-ping opacity-60" />
                        <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }} />
                      </div>
                    </div>

                    {/* Room Info */}
                    <div className="flex-1 flex flex-col items-center text-center space-y-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all">
                        {room.name}
                      </h3>
                      <p className="text-purple-300/80 text-base font-medium">
                        {room.participants} participators
                      </p>
                      <p className="text-gray-400 text-sm max-w-[200px]">
                        {room.description}
                      </p>
                    </div>

                    {/* Join Button */}
                    <div className="flex-shrink-0 w-full px-4">
                      <button
                        className={`w-full py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-opacity-20 backdrop-blur-sm border border-white/20 text-white font-bold tracking-wide uppercase text-xs hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group-hover:border-white/40 pointer-events-none`}
                      >
                        Join Room
                      </button>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${room.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`} />
                </div>
              </div>
            ))}
          </section>


          {/* 2. CONNECTION INSIGHTS (Bottom Section) */}
          <section className="border-t border-white/10 pt-16">
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold uppercase tracking-widest text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Connection Insights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Top Vibers */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                  <span className="text-white">Today's Top Vibers</span>
                </h3>
                <div className="flex justify-between items-center px-4">
                  {topVibers.map((vibe, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50 border-2 border-white/20">
                        {vibe.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-300">{vibe.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Challenges */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                  <span className="text-white">Active Challenges Now</span>
                </h3>
                <div className="flex items-center gap-4 text-base p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl animate-pulse">
                    📋
                  </div>
                  <div>
                    <div className="font-bold text-cyan-300">Real Talk Round</div>
                    <span className="text-gray-400 text-sm">Happening in Friendship Room</span>
                  </div>
                </div>
              </div>

              {/* Connections Made */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all relative overflow-hidden">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 relative z-10">
                  <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                  <span className="text-white">Connections Made</span>
                </h3>

                {/* Network Visualization */}
                <div className="relative h-24 mb-2 z-10">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    {/* Connection Lines */}
                    <line x1="40" y1="30" x2="80" y2="50" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />
                    <line x1="80" y1="50" x2="120" y2="40" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />
                    <line x1="120" y1="40" x2="160" y2="60" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />
                    <line x1="80" y1="50" x2="100" y2="80" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />
                    <line x1="40" y1="30" x2="60" y2="70" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />

                    {/* Nodes */}
                    {[{ x: 40, y: 30 }, { x: 80, y: 50 }, { x: 120, y: 40 }, { x: 160, y: 60 }, { x: 100, y: 80 }, { x: 60, y: 70 }].map((node, i) => (
                      <circle key={i} cx={node.x} cy={node.y} r="5" fill="#a855f7" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                      </circle>
                    ))}
                  </svg>

                  {/* Connection Count */}
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                    142
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 relative z-10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span>Live Updates</span>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] rounded-full pointer-events-none"></div>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <GlassCard className="w-full max-w-md p-8 flex flex-col gap-6 items-center border-holo-purple/50" glowColor="purple">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Enter the Vibe
              </h2>
              <p className="text-gray-400 text-center">
                Create your persona to join the connection rooms.
              </p>

              <div className="w-full space-y-4">
                <div>
                  <label className="block text-xs font-mono text-purple-300 mb-2 uppercase tracking-widest">Choose Avatar</label>
                  <div className="flex gap-2 flex-wrap justify-center p-2 bg-black/20 rounded-xl">
                    {avatars.map(av => (
                      <button
                        key={av}
                        onClick={() => setSelectedAvatar(av)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${selectedAvatar === av ? 'bg-purple-500 scale-110 shadow-lg shadow-purple-500/50' : 'bg-white/5 hover:bg-white/10'}`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-purple-300 mb-2 uppercase tracking-widest">Viber Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. CosmicTraveler"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>

                <NeonButton
                  onClick={handleLogin}
                  variant="primary"
                  glowColor="purple"
                  className="w-full mt-4"
                >
                  ENTER LOBBY
                </NeonButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}