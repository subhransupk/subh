"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SpiderWebDecoration from './SpiderWebDecoration';

const HeroContent = () => {
    const glitchVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const comicPanelVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "backOut"
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl w-full space-y-8 text-white text-center">
                {/* Hero Title */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={glitchVariants}
                    className="space-y-4"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold glitch-text mb-2">
                        Subhransu
                    </h1>
                    <p className="text-lg sm:text-xl text-cyan-400 font-semibold">
                        Your Friendly Neighborhood Developer
                    </p>
                </motion.div>

                {/* Main Content Panel */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={comicPanelVariants}
                    className="comic-panel bg-opacity-20 bg-black backdrop-blur-sm p-4 sm:p-6 rounded-lg border-2 border-cyan-500 relative overflow-hidden group"
                >
                    {/* Spider Web Corner Decorations */}
                    <div className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-l-2 border-pink-500 rounded-tl-lg opacity-60" />
                    <div className="absolute top-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg opacity-60" />
                    <div className="absolute bottom-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg opacity-60" />
                    <div className="absolute bottom-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-r-2 border-pink-500 rounded-br-lg opacity-60" />

                    <div className="space-y-4 relative z-10">
                        <p className="text-lg sm:text-xl text-pink-500 font-bold">
                            Code-Slinger Since 2016
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-base sm:text-lg">
                            <span className="text-cyan-300 transform hover:scale-110 transition-transform">⚡ Web Development</span>
                            <span className="text-purple-400 transform hover:scale-110 transition-transform">📱 Mobile Apps</span>
                            <span className="text-green-400 transform hover:scale-110 transition-transform">🤖 AI Integration</span>
                            <span className="text-yellow-400 transform hover:scale-110 transition-transform">🚀 SaaS Development</span>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={glitchVariants}
                    className="relative inline-block w-full sm:w-auto"
                >
                    <button 
                        className="relative group bg-black text-white px-6 sm:px-12 py-3 sm:py-4 rounded-lg
                                 font-bold text-base sm:text-lg transform transition-all duration-300
                                 hover:scale-105 hover:-rotate-1 hover:translate-y-[-2px]
                                 border-2 border-cyan-500 overflow-hidden w-full sm:w-auto"
                        onClick={() => window.location.href = 'mailto:your.email@example.com'}
                    >
                        {/* Button Content */}
                        <span className="relative z-10">Ready to Web-Sling Into Your Next Project? 🕸️</span>

                        {/* Hover Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-cyan-500/20 to-pink-500/20 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Spider Web Decoration */}
                        <SpiderWebDecoration />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroContent; 