"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaMobile, FaRobot, FaCloud } from 'react-icons/fa';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All', icon: FaGlobe },
        { id: 'web', label: 'Web', icon: FaGlobe },
        { id: 'mobile', label: 'Mobile', icon: FaMobile },
        { id: 'ai', label: 'AI', icon: FaRobot },
    ];

    const projects = [
        {
            category: 'web',
            title: 'E-Commerce Platform',
            description: 'A modern e-commerce solution with real-time inventory.',
            technologies: ['Next.js', 'TypeScript', 'MongoDB'],
            color: 'cyan'
        },
        {
            category: 'mobile',
            title: 'Fitness Tracking App',
            description: 'Cross-platform mobile app for fitness enthusiasts.',
            technologies: ['Flutter', 'Firebase', 'REST APIs'],
            color: 'pink'
        },
        {
            category: 'ai',
            title: 'Smart Content Generator',
            description: 'AI-powered content generation and optimization tool.',
            technologies: ['Python', 'TensorFlow', 'OpenAI'],
            color: 'purple'
        },
        {
            category: 'web',
            title: 'Project Management Suite',
            description: 'Cloud-based project management solution.',
            technologies: ['Node.js', 'PostgreSQL', 'WebSocket'],
            color: 'yellow'
        }
    ];

    const filteredProjects = activeCategory === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

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
                    My <span className="text-cyan-400">Portfolio</span>
                </h2>
            </motion.div>

            {/* Category Filter */}
            <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap
                            ${activeCategory === category.id
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-black/20 text-gray-400 border border-gray-700'
                            }`}
                    >
                        <category.icon className="text-sm" />
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="space-y-4">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30"
                    >
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white">{project.title}</h3>
                            <p className="text-sm text-gray-300">{project.description}</p>
                            
                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <span 
                                        key={techIndex}
                                        className={`text-xs px-2 py-1 rounded-full bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/30`}
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

export default Portfolio; 