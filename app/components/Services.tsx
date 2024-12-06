"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMobile, FaRobot, FaCloud } from 'react-icons/fa';
import SpiderWebDecoration from './SpiderWebDecoration';

const Services = () => {
    const services = [
        {
            icon: FaCode,
            title: "Web Development",
            description: "Spinning responsive and dynamic web applications with modern frameworks and pixel-perfect precision.",
            technologies: ["React", "Next.js", "TypeScript", "Node.js"],
            colorClasses: {
                icon: "text-cyan-400",
                tag: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
            }
        },
        {
            icon: FaMobile,
            title: "Mobile Development",
            description: "Crafting seamless mobile experiences that feel as smooth as web-slinging through the city.",
            technologies: ["Flutter", "Firebase", "Cross-platform"],
            colorClasses: {
                icon: "text-pink-400",
                tag: "bg-pink-500/20 text-pink-400 border-pink-500/30"
            }
        },
        {
            icon: FaRobot,
            title: "AI Integration",
            description: "Enhancing applications with AI capabilities, like Peter Parker upgrading his suit with advanced tech.",
            technologies: ["Python", "Machine Learning", "API Integration"],
            colorClasses: {
                icon: "text-purple-400",
                tag: "bg-purple-500/20 text-purple-400 border-purple-500/30"
            }
        },
        {
            icon: FaCloud,
            title: "SaaS Development",
            description: "Building scalable software solutions that help businesses swing to greater heights.",
            technologies: ["Cloud Services", "MongoDB", "PostgreSQL"],
            colorClasses: {
                icon: "text-yellow-400",
                tag: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            }
        }
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background web pattern */}
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
                    <div className="text-center mb-8 sm:mb-12 relative px-4">
                        <div className="absolute -left-4 sm:-left-8 top-0 w-8 sm:w-16 h-8 sm:h-16 transform -rotate-45">
                            <SpiderWebDecoration />
                        </div>
                        <div className="absolute -right-4 sm:-right-8 top-0 w-8 sm:w-16 h-8 sm:h-16 transform rotate-45">
                            <SpiderWebDecoration />
                        </div>
                        <motion.h2 
                            className="text-3xl sm:text-4xl font-bold text-white mb-4 relative inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            My <span className="text-cyan-400">Services</span>
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500" />
                        </motion.h2>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-lg border-2 border-cyan-500/30 h-full
                                            transition-all duration-300 group-hover:border-cyan-500/60">
                                    {/* Corner Decorations */}
                                    <div className="absolute top-0 left-0 w-4 sm:w-8 h-4 sm:h-8 border-t-2 border-l-2 border-pink-500 rounded-tl-lg opacity-60 
                                                transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                    <div className="absolute top-0 right-0 w-4 sm:w-8 h-4 sm:h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg opacity-60 
                                                transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                    <div className="absolute bottom-0 left-0 w-4 sm:w-8 h-4 sm:h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg opacity-60 
                                                transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                    <div className="absolute bottom-0 right-0 w-4 sm:w-8 h-4 sm:h-8 border-b-2 border-r-2 border-pink-500 rounded-br-lg opacity-60 
                                                transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />

                                    {/* Service Content */}
                                    <div className="relative z-10">
                                        <service.icon className={`text-3xl sm:text-4xl mb-3 sm:mb-4 ${service.colorClasses.icon}`} />
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{service.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{service.description}</p>
                                        
                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {service.technologies.map((tech, techIndex) => (
                                                <span 
                                                    key={techIndex}
                                                    className={`text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${service.colorClasses.tag}`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services; 