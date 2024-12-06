"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const AboutMe = () => {
    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/yourusername", label: "GitHub" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
        { icon: FaTwitter, href: "https://twitter.com/yourusername", label: "Twitter" },
        { icon: FaInstagram, href: "https://instagram.com/yourusername", label: "Instagram" }
    ];

    return (
        <div className="w-full">
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl font-bold mb-2">
                    <span className="text-cyan-400">About</span> Me
                </h2>
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Hey there! I'm a passionate developer who loves turning ideas into reality through code. 
                        With expertise in web and mobile development, I create solutions that make a difference.
                    </p>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-cyan-400">What I Do:</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Full-stack Web Development</li>
                            <li>Mobile App Development</li>
                            <li>AI/ML Integration</li>
                            <li>Cloud Solutions</li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 border-t border-gray-700/50">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-3">Connect With Me:</h3>
                        <div className="flex justify-center space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="text-2xl" />
                                    <span className="sr-only">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutMe; 