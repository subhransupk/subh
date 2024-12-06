"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SpiderWebDecoration from './SpiderWebDecoration';
import Image from 'next/image';

const technologies = [
    {
        category: "Frontend",
        techs: [
            { name: "React", icon: "/icons/react.svg", proficiency: 95 },
            { name: "Next.js", icon: "/icons/nextjs.svg", proficiency: 90 },
            { name: "TypeScript", icon: "/icons/typescript.svg", proficiency: 88 },
            { name: "Flutter", icon: "/icons/flutter.svg", proficiency: 92 }
        ]
    },
    {
        category: "Backend",
        techs: [
            { name: "Node.js", icon: "/icons/nodejs.svg", proficiency: 85 },
            { name: "Python", icon: "/icons/python.svg", proficiency: 88 },
            { name: "MongoDB", icon: "/icons/mongodb.svg", proficiency: 82 },
            { name: "PostgreSQL", icon: "/icons/postgresql.svg", proficiency: 80 }
        ]
    },
    {
        category: "Tools & Others",
        techs: [
            { name: "Git", icon: "/icons/git.svg", proficiency: 90 },
            { name: "WordPress", icon: "/icons/wordpress.svg", proficiency: 85 },
            { name: "Firebase", icon: "/icons/firebase.svg", proficiency: 85 }
        ]
    }
];

const TechStack = () => {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-l border-cyan-500/50 transform -skew-x-45 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full border-l border-pink-500/50 transform skew-x-45 animate-pulse" />
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Title */}
                    <div className="text-center mb-16 relative">
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
                            Tech <span className="text-cyan-400">Arsenal</span>
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500" />
                        </motion.h2>
                        <p className="text-gray-400 text-lg mt-4">
                            My web-slinging tools and technologies
                        </p>
                    </div>

                    {/* Tech Categories */}
                    <div className="space-y-12">
                        {technologies.map((category, categoryIndex) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.2 }}
                                className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border-2 border-cyan-500/30 relative group"
                            >
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500 rounded-tl-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-500 rounded-br-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />

                                <h3 className="text-2xl font-bold text-white mb-6">{category.category}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {category.techs.map((tech, techIndex) => (
                                        <motion.div
                                            key={tech.name}
                                            whileHover={{ scale: 1.05 }}
                                            className="relative"
                                        >
                                            <div className="bg-black/60 p-4 rounded-lg border border-cyan-500/30 hover:border-pink-500/50 
                                                        transition-colors duration-300">
                                                <div className="flex items-center justify-center mb-3">
                                                    <div className="relative w-12 h-12">
                                                        <Image
                                                            src={tech.icon}
                                                            alt={tech.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </div>
                                                <h4 className="text-white text-center font-medium mb-2">{tech.name}</h4>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${tech.proficiency}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: categoryIndex * 0.1 + techIndex * 0.1 }}
                                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
                                                    />
                                                </div>
                                                <p className="text-center text-sm text-cyan-400 mt-1">{tech.proficiency}%</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack; 