"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMobile, FaRobot, FaCloud } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: FaCode,
            title: "Web Development",
            description: "Spinning responsive and dynamic web applications with modern frameworks.",
            technologies: ["React", "Next.js", "TypeScript", "Node.js"],
            color: "cyan"
        },
        {
            icon: FaMobile,
            title: "Mobile Development",
            description: "Crafting seamless mobile experiences that feel smooth and responsive.",
            technologies: ["Flutter", "Firebase", "Cross-platform"],
            color: "pink"
        },
        {
            icon: FaRobot,
            title: "AI Integration",
            description: "Enhancing applications with AI capabilities and advanced tech.",
            technologies: ["Python", "Machine Learning", "API Integration"],
            color: "purple"
        },
        {
            icon: FaCloud,
            title: "SaaS Development",
            description: "Building scalable software solutions for businesses.",
            technologies: ["Cloud Services", "MongoDB", "PostgreSQL"],
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
                    My <span className="text-cyan-400">Services</span>
                </h2>
            </motion.div>

            {/* Services Grid */}
            <div className="space-y-4">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30"
                    >
                        <div className="space-y-3">
                            <service.icon className={`text-2xl text-${service.color}-400`} />
                            <h3 className="text-lg font-bold text-white">{service.title}</h3>
                            <p className="text-sm text-gray-300">{service.description}</p>
                            
                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                                {service.technologies.map((tech, techIndex) => (
                                    <span 
                                        key={techIndex}
                                        className={`text-xs px-2 py-1 rounded-full bg-${service.color}-500/10 text-${service.color}-400 border border-${service.color}-500/30`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services; 