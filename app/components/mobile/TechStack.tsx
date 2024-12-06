"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TechStack = () => {
    const technologies = [
        {
            category: "Frontend",
            items: [
                { name: "React", icon: "/icons/react.svg" },
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" }
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", icon: "/icons/nodejs.svg" },
                { name: "MongoDB", icon: "/icons/mongodb.svg" },
                { name: "PostgreSQL", icon: "/icons/postgresql.svg" }
            ]
        },
        {
            category: "Mobile & Cloud",
            items: [
                { name: "Flutter", icon: "/icons/flutter.svg" },
                { name: "Firebase", icon: "/icons/firebase.svg" },
                { name: "Git", icon: "/icons/git.svg" }
            ]
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
                    Tech <span className="text-cyan-400">Arsenal</span>
                </h2>
            </motion.div>

            {/* Tech Categories */}
            <div className="space-y-8">
                {technologies.map((category, categoryIndex) => (
                    <motion.div
                        key={categoryIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30"
                    >
                        <h3 className="text-lg font-bold text-cyan-400 mb-4">{category.category}</h3>
                        
                        <div className="grid grid-cols-3 gap-4">
                            {category.items.map((tech, techIndex) => (
                                <motion.div
                                    key={techIndex}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center space-y-2"
                                >
                                    <div className="relative w-12 h-12 bg-black/30 rounded-lg p-2">
                                        <Image
                                            src={tech.icon}
                                            alt={tech.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-300">{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TechStack; 