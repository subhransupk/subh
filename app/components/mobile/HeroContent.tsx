"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroContent = () => {
    return (
        <div className="w-full space-y-6 text-center px-4">
            {/* Hero Title with simple fade-in animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
            >
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                    Subhransu
                </h1>
                <p className="text-lg text-cyan-400 font-semibold">
                    Your Friendly Neighborhood Developer
                </p>
            </motion.div>

            {/* Content Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30"
            >
                <div className="space-y-4">
                    <p className="text-lg text-pink-500 font-bold">
                        Code-Slinger Since 2016
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full">⚡ Web Development</span>
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">📱 Mobile Apps</span>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full">🤖 AI Integration</span>
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full">🚀 SaaS Development</span>
                    </div>
                </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <button
                    className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-3 rounded-lg
                             font-bold text-base shadow-lg shadow-cyan-500/20"
                    onClick={() => window.location.href = 'mailto:your.email@example.com'}
                >
                    Let's Work Together 🚀
                </button>
            </motion.div>
        </div>
    );
};

export default HeroContent; 