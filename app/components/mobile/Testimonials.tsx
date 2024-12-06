"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Alex Johnson",
            role: "CEO, TechStart",
            content: "Working with this developer was an absolute pleasure. The attention to detail and technical expertise truly set them apart.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },
        {
            name: "Sarah Chen",
            role: "Product Manager, InnovateCo",
            content: "Exceptional problem-solving skills and great communication throughout the project. Delivered beyond our expectations.",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            name: "Michael Brown",
            role: "CTO, WebSolutions",
            content: "Their expertise in modern web technologies helped us create a cutting-edge platform. Highly recommended!",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
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
                    Client <span className="text-cyan-400">Testimonials</span>
                </h2>
            </motion.div>

            {/* Testimonials */}
            <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30"
                    >
                        <div className="flex items-start space-x-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full bg-cyan-500/20"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-300 text-sm mb-2">
                                    "{testimonial.content}"
                                </p>
                                <div className="mt-2">
                                    <p className="text-white font-semibold">{testimonial.name}</p>
                                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials; 