"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaGamepad, FaInstagram } from 'react-icons/fa';
import SpiderWebDecoration from './SpiderWebDecoration';

const AboutMe = () => {
    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/yourusername", label: "GitHub" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
        { icon: FaTwitter, href: "https://twitter.com/yourusername", label: "Twitter" },
        { icon: FaInstagram, href: "https://instagram.com/yourusername", label: "Instagram" }
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Animated web background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-l border-cyan-500/50 transform -skew-x-45 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full border-l border-pink-500/50 transform skew-x-45 animate-pulse" />
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-pink-500/50 to-transparent animate-pulse" />
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Title with web decoration */}
                    <div className="text-center mb-12 relative">
                        <div className="absolute -left-8 top-0 w-16 h-16 transform -rotate-45">
                            <SpiderWebDecoration />
                        </div>
                        <div className="absolute -right-8 top-0 w-16 h-16 transform rotate-45">
                            <SpiderWebDecoration />
                        </div>
                        <motion.h2 
                            className="text-4xl font-bold text-white mb-4 relative inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-cyan-400">About</span> Me
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500" />
                        </motion.h2>
                    </div>

                    {/* Main Content Panel with enhanced styling */}
                    <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border-2 border-cyan-500/30 relative group">
                        {/* Animated corner webs */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-pink-500 rounded-tl-lg opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-pink-500 rounded-br-lg opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />

                        <div className="space-y-6 relative z-10">
                            {/* Introduction with glowing effect */}
                            <motion.p 
                                className="text-gray-300 leading-relaxed"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Hey there! I'm a web developer who weaves digital experiences like Spider-Man spins his webs. 
                                With a passion for creating seamless, user-friendly applications, I swing between front-end and 
                                back-end development with ease.
                            </motion.p>

                            {/* Gaming Interest with animated icon */}
                            <motion.div 
                                className="flex items-center space-x-3 text-cyan-400"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <FaGamepad className="text-2xl animate-pulse" />
                                <span>Avid Gamer & Tech Enthusiast</span>
                            </motion.div>

                            {/* Professional Approach with gradient text */}
                            <motion.p 
                                className="text-gray-300 leading-relaxed"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Just as Peter Parker balances his daily life with being Spider-Man, I balance creativity with 
                                technical precision. Each project is an opportunity to create something amazing, combining 
                                cutting-edge technology with intuitive design.
                            </motion.p>

                            {/* Social Links with web-themed hover effects */}
                            <div className="pt-6 border-t border-gray-700/50 relative">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                                <h3 className="text-white text-lg mb-4 relative">
                                    Connect With Me
                                    <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-pink-500" />
                                </h3>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-cyan-400 transition-colors relative group"
                                            whileHover={{ scale: 1.2, rotate: 12 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <social.icon className="text-2xl relative z-10" />
                                            <div className="absolute inset-0 bg-pink-500/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="sr-only">{social.label}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe; 