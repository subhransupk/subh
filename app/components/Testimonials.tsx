"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SpiderWebDecoration from './SpiderWebDecoration';
import Image from 'next/image';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO, TechVision",
        image: "/testimonials/avatar1.jpg", // You'll need to add these images
        content: "Working with this developer was like having Spider-Man on our tech team - swift, precise, and always delivering beyond expectations!",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "CTO, InnovateLabs",
        image: "/testimonials/avatar2.jpg",
        content: "The attention to detail and creative problem-solving abilities brought to our project were exceptional. A true web-slinging coding hero!",
        rating: 5
    },
    {
        name: "Emma Davis",
        role: "Product Manager, StartupX",
        image: "/testimonials/avatar3.jpg",
        content: "Not only delivered outstanding code but also brought innovative ideas that transformed our project. A developer with both technical prowess and creative vision.",
        rating: 5
    }
];

const Testimonials = () => {
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
                            Client <span className="text-cyan-400">Testimonials</span>
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500" />
                        </motion.h2>
                        <p className="text-gray-400 text-lg mt-4">
                            What my amazing clients say about our collaboration
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-500/30 relative group"
                            >
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-pink-500 rounded-tl-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-pink-500 rounded-br-lg opacity-60 
                                            transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-center mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/50">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                            <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Rating Stars */}
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <div className="relative">
                                        <div className="absolute -top-2 -left-2 text-4xl text-cyan-500/20">"</div>
                                        <p className="text-gray-300 italic relative z-10 pl-4">
                                            {testimonial.content}
                                        </p>
                                        <div className="absolute -bottom-4 -right-2 text-4xl text-cyan-500/20">"</div>
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

export default Testimonials; 