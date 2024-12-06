"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaMobile, FaRobot, FaCloud } from 'react-icons/fa';
import SpiderWebDecoration from './SpiderWebDecoration';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const handleCategoryClick = (categoryId: string) => {
        console.log('Category clicked:', categoryId);
        setActiveCategory(categoryId);
    };

    const categories = [
        { id: 'all', label: 'All Projects', icon: FaGlobe },
        { id: 'web', label: 'Web Apps', icon: FaGlobe },
        { id: 'mobile', label: 'Mobile Apps', icon: FaMobile },
        { id: 'ai', label: 'AI Projects', icon: FaRobot },
        { id: 'saas', label: 'SaaS', icon: FaCloud }
    ];

    const projects = [
        {
            category: 'web',
            title: 'E-Commerce Platform',
            description: 'A modern e-commerce solution with real-time inventory management.',
            challenges: ['Complex state management', 'Real-time updates', 'Payment integration'],
            features: ['User authentication', 'Shopping cart', 'Order tracking'],
            technologies: ['Next.js', 'TypeScript', 'MongoDB']
        },
        {
            category: 'mobile',
            title: 'Fitness Tracking App',
            description: 'Cross-platform mobile app for fitness enthusiasts.',
            challenges: ['Cross-platform compatibility', 'Offline functionality', 'Device sensors'],
            features: ['Workout tracking', 'Progress analytics', 'Social sharing'],
            technologies: ['Flutter', 'Firebase', 'REST APIs']
        },
        {
            category: 'ai',
            title: 'Smart Content Generator',
            description: 'AI-powered content generation and optimization tool.',
            challenges: ['ML model integration', 'Real-time processing', 'Accuracy optimization'],
            features: ['Text generation', 'Image analysis', 'SEO optimization'],
            technologies: ['Python', 'TensorFlow', 'OpenAI']
        },
        {
            category: 'saas',
            title: 'Project Management Suite',
            description: 'Cloud-based project management solution for teams.',
            challenges: ['Scalability', 'Multi-tenant architecture', 'Real-time collaboration'],
            features: ['Task management', 'Team collaboration', 'Analytics dashboard'],
            technologies: ['Node.js', 'PostgreSQL', 'WebSocket']
        }
    ];

    const filteredProjects = activeCategory === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Animated background web pattern */}
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
                            My <span className="text-cyan-400">Portfolio</span>
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500" />
                        </motion.h2>
                    </div>

                    {/* Category Filter - Updated */}
                    <div className="relative z-50 flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => handleCategoryClick(category.id)}
                                className={`
                                    relative z-50 px-6 py-2 rounded-full border-2 
                                    transition-all duration-300 flex items-center gap-2 
                                    cursor-pointer select-none hover:scale-105 active:scale-95
                                    ${activeCategory === category.id 
                                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400' 
                                        : 'border-gray-700 hover:border-pink-500 text-gray-400 hover:text-pink-400'}
                                `}
                            >
                                <category.icon aria-hidden="true" className="text-lg" />
                                <span>{category.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <AnimatePresence mode="sync">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ 
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease: "easeInOut"
                                    }}
                                    className="relative group"
                                >
                                    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-500/30 h-full
                                                transition-all duration-300 group-hover:border-cyan-500/60">
                                        {/* Corner Decorations */}
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500 rounded-tl-lg opacity-60 
                                                    transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg opacity-60 
                                                    transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg opacity-60 
                                                    transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-500 rounded-br-lg opacity-60 
                                                    transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />

                                        {/* Project Content */}
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                                            <p className="text-gray-300 mb-4">{project.description}</p>

                                            {/* Challenges */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-cyan-400 mb-2">Challenges Solved:</h4>
                                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                                    {project.challenges.map((challenge, i) => (
                                                        <li key={i}>{challenge}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Features */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-pink-400 mb-2">Key Features:</h4>
                                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                                    {project.features.map((feature, i) => (
                                                        <li key={i}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span 
                                                        key={techIndex}
                                                        className="text-sm px-3 py-1 rounded-full bg-cyan-500/20 
                                                                text-cyan-400 border border-cyan-500/30"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio; 