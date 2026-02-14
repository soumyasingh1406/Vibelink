"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/scifi/DashboardHeader";
import { SciFiPanel } from "@/components/scifi/SciFiPanel";
import { HexagonCore } from "@/components/scifi/HexagonCore";
import { RadarScanner } from "@/components/scifi/RadarScanner";
import { SciFiProgressBars } from "@/components/scifi/SciFiProgressBars";
import { SciFiGauges } from "@/components/scifi/SciFiGauges";
import { WaveformVisualizer } from "@/components/scifi/WaveformVisualizer";
import { DataStreamTerminal } from "@/components/scifi/DataStreamTerminal";

export default function SciFiDashboardPage() {
    const [particles, setParticles] = useState<{ x: number; y: number; duration: number; delay: number }[]>([]);
    const [cpuLoad, setCpuLoad] = useState<{ duration: number }[]>([]);

    useEffect(() => {
        // Generate random values on client only
        setParticles(Array.from({ length: 20 }).map(() => ({
            x: Math.random() * (window.innerWidth),
            y: Math.random() * (window.innerHeight),
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 5
        })));

        setCpuLoad(Array.from({ length: 16 }).map(() => ({
            duration: Math.random() * 2 + 1
        })));
    }, []);

    return (
        <div className="relative min-h-screen p-6 pt-24 overflow-hidden bg-black text-white">
            {/* Background Grid & Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Animated Grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        transform: 'perspective(500px) rotateX(60deg)',
                        transformOrigin: 'top center',
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 50] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        className="w-full h-full"
                    />
                </div>

                {/* Floating Particles */}
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: p.x,
                            y: p.y,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, -100],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: p.duration,
                            delay: p.delay,
                            ease: "linear"
                        }}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
                    />
                ))}

                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient(circle, transparent 60%, black 100%) pointer-events-none" />
            </div>

            <DashboardHeader />

            <main className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
                {/* LEFT COLUMN */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <SciFiPanel title="SECTOR SCAN" className="h-[350px] flex items-center justify-center">
                        <RadarScanner />
                    </SciFiPanel>

                    <SciFiPanel title="SYSTEM STATUS" className="flex-1">
                        <SciFiProgressBars />
                        <div className="mt-8">
                            <div className="text-xs text-gray-400 mb-2 font-mono">CPU LOAD DISTRIBUTION</div>
                            <div className="grid grid-cols-4 gap-1 h-16">
                                {cpuLoad.map((cpu, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ repeat: Infinity, duration: cpu.duration }}
                                        className="bg-purple-500/40 rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </SciFiPanel>
                </div>

                {/* CENTER COLUMN (MAIN) */}
                <div className="lg:col-span-6 flex flex-col gap-6 relative">
                    {/* Main Viewer */}
                    <SciFiPanel className="flex-1 flex items-center justify-center relative overflow-visible border-cyan-500/30 border-2">
                        <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">TARGET: ALPHA-9</div>
                        <div className="absolute top-4 right-4 text-xs font-mono text-cyan-400">DIST: 4.2 LY</div>
                        <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-400">VEL: 0.8c</div>
                        <div className="absolute bottom-4 right-4 text-xs font-mono text-cyan-400">SHIELD: 100%</div>

                        <HexagonCore />

                        {/* Decorative lines connecting center */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                            <path d="M0,50 L100,50 L120,80" stroke="#00f3ff" fill="none" strokeWidth="1" />
                            <path d="M100%,50 Lcalc(100%-100px),50 Lcalc(100%-120px),80" stroke="#00f3ff" fill="none" strokeWidth="1" />
                        </svg>
                    </SciFiPanel>

                    {/* Bottom Controls */}
                    <div className="h-[180px] grid grid-cols-2 gap-6">
                        <SciFiPanel title="WAVEFORM ANALYSIS">
                            <WaveformVisualizer />
                        </SciFiPanel>
                        <SciFiPanel title="THRUSTER CONTROL" className="flex items-center justify-center">
                            <SciFiGauges />
                        </SciFiPanel>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <SciFiPanel title="DATA LOGS" className="h-[250px]">
                        <DataStreamTerminal />
                    </SciFiPanel>

                    <SciFiPanel title="OBJECTIVES" className="flex-1">
                        <div className="space-y-4">
                            {[
                                { id: '01', text: 'Calibrate Sensors', status: 'COMPLETE', color: 'text-green-400' },
                                { id: '02', text: 'Align Satellite Array', status: 'IN PROGRESS', color: 'text-yellow-400' },
                                { id: '03', text: 'Decrypt Signal', status: 'PENDING', color: 'text-gray-500' },
                                { id: '04', text: 'Charge Hyperdrive', status: 'PENDING', color: 'text-gray-500' },
                            ].map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-purple-400">[{item.id}]</span>
                                        <span className="text-sm font-rajdhani font-bold">{item.text}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold ${item.color} animate-pulse`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2 text-red-400 font-bold text-xs uppercase">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                Alert
                            </div>
                            <p className="text-xs text-red-200 leading-relaxed font-mono">
                                Unauthorized signal detected in Sector 7. Proximity alert.
                            </p>
                        </div>
                    </SciFiPanel>
                </div>
            </main>
        </div>
    );
}
