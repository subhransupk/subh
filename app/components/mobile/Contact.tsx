"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    const contactMethods = [
        {
            icon: FaEnvelope,
            label: "Email",
            value: "your.email@example.com",
            href: "mailto:your.email@example.com",
            color: "cyan"
        },
        {
            icon: FaGithub,
            label: "GitHub",
            value: "github.com/yourusername",
            href: "https://github.com/yourusername",
            color: "pink"
        },
        {
            icon: FaLinkedin,
            label: "LinkedIn",
            value: "linkedin.com/in/yourusername",
            href: "https://linkedin.com/in/yourusername",
            color: "purple"
        },
        {
            icon: FaTwitter,
            label: "Twitter",
            value: "@yourusername",
            href: "https://twitter.com/yourusername",
            color: "yellow"
        }
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
                    Let's <span className="text-cyan-400">Connect</span>
                </h2>
                <p className="text-gray-400 text-sm">
                    Ready to start your next project? Let's talk!
                </p>
            </motion.div>

            {/* Contact Methods */}
            <div className="space-y-4">
                {contactMethods.map((method, index) => (
                    <motion.a
                        key={index}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="block w-full"
                    >
                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30
                                    hover:border-cyan-500/60 transition-all duration-300">
                            <div className="flex items-center space-x-4">
                                <div className={`text-${method.color}-400 text-xl`}>
                                    <method.icon />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">{method.label}</h3>
                                    <p className="text-gray-400 text-sm">{method.value}</p>
                                </div>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
            >
                <button
                    onClick={() => window.location.href = 'mailto:your.email@example.com'}
                    className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-lg
                             font-bold text-base shadow-lg shadow-cyan-500/20 w-full"
                >
                    Send a Message 📧
                </button>
            </motion.div>
        </div>
    );
};

export default Contact; 