'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function ResendHero() {
    return (
        <div className="relative z-20 pt-[60px] md:h-screen md:max-h-[950px] md:pt-0 overflow-hidden bg-black text-white selection:bg-[#111111]/20">

            {/* Background Lights */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 mx-auto hidden h-screen w-full select-none md:block opacity-80 transition-opacity duration-500">
                <Image
                    alt="Floor background"
                    fill
                    className="object-cover"
                    style={{
                        maskImage: 'linear-gradient(to top, transparent 15%, black 25%)',
                        WebkitMaskImage: 'linear-gradient(to top, transparent 15%, black 25%)',
                    }}
                    src="/static/landing-page/bg-hero-1.jpg"
                    sizes="100vw"
                    priority
                />
            </div>

            <section className="mx-auto max-w-5xl px-6 pb-8 md:h-screen md:max-h-[950px] md:max-w-7xl">
                <div className="flex h-full flex-col items-center justify-between md:flex-row md:pb-12">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="origin-center-left order-2 max-w-3xl sm:shrink-0 md:order-1 lg:pl-16 z-30"
                    >
                        <h1 className="font-display text-[4rem] md:text-[5.5rem] font-medium tracking-tight leading-[100%] relative text-center md:text-left pb-3 text-white">
                            AI That Respects Your <span className="text-[#14B8A6]">Privacy</span>
                        </h1>
                        <p className="text-base md:text-[1.125rem] md:leading-[1.5] text-stone-400 font-normal relative mb-8 mt-4 max-w-[32rem] text-center leading-7 md:text-left">
                            Build intelligent Solana agents that never see your wallet address. Your data stays private through our <span className="text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded font-mono text-sm">sly_data</span> architecture.
                        </p>

                        <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-start">
                            <Link
                                href="/signup"
                                className="relative inline-flex items-center justify-center select-none rounded-2xl transition-all duration-200 text-white bg-[#111111] hover:bg-[#111111]/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] text-base h-12 gap-0 px-5 font-semibold"
                            >
                                Get Started
                                {/* Button texture overlay - exact match to Resend */}
                                <div
                                    className="absolute inset-[-2px] rounded-[1rem] pointer-events-none opacity-50 mix-blend-overlay"
                                    style={{ backgroundImage: 'url("/static/texture-btn.png")' }}
                                />
                            </Link>
                            <Link
                                href="/docs"
                                className="relative inline-flex items-center border border-white/10 justify-center select-none rounded-2xl transition ease-in-out duration-200 bg-transparent text-stone-300 hover:text-white hover:bg-[#111111]/5 text-base h-12 gap-0 px-5 font-semibold"
                            >
                                Documentation
                            </Link>
                        </div>
                    </motion.div>

                    {/* Top Light Ray */}
                    <div className="pointer-events-none absolute -top-20 left-0 right-0 mx-auto hidden h-screen w-full select-none md:block transition-all duration-500 z-10">
                        <Image
                            alt="Light ray background"
                            fill
                            className="object-cover"
                            style={{
                                maskImage: 'linear-gradient(to top, transparent 15%, black 25%)',
                                WebkitMaskImage: 'linear-gradient(to top, transparent 15%, black 25%)',
                            }}
                            src="/static/landing-page/bg-light.png"
                            sizes="100vw"
                        />
                    </div>

                    {/* 3D Cube Video - The core of the floating effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative order-1 w-full max-w-[500px] aspect-square md:w-[600px] flex items-center justify-center z-20 mix-blend-screen"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                            poster="/static/cube-fallback.jpg"
                            src="/static/cube.mp4"
                        />
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
