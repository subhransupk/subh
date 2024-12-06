"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import SpiderWebDecoration from './SpiderWebDecoration';
import { sendToGoogleSheets } from '@/utils/googleIntegration';

interface Notification {
    type: 'success' | 'error';
    message: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    budget: string;
    message: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/yourusername", label: "GitHub" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
        { icon: FaTwitter, href: "https://twitter.com/yourusername", label: "Twitter" },
        { icon: FaInstagram, href: "https://instagram.com/yourusername", label: "Instagram" },
        { icon: FaWhatsapp, href: "https://wa.me/yournumber", label: "WhatsApp" }
    ];

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/);
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setNotification({
                type: 'error',
                message: "Spider-sense tingling... Name is required! 🕷️"
            });
            return false;
        }

        if (!formData.email.trim() || !validateEmail(formData.email)) {
            setNotification({
                type: 'error',
                message: "Whoops! That email doesn't look quite right! 🕸️"
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const success = await sendToGoogleSheets({
                ...formData,
                source: 'Portfolio Website'
            });

            if (success) {
                setNotification({
                    type: 'success',
                    message: 'Thanks for reaching out! I\'ll get back to you soon! 🕸️'
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    projectType: '',
                    budget: '',
                    message: ''
                });
            } else {
                setNotification({
                    type: 'error',
                    message: 'Oops! Something went wrong. Please try again or email me directly.'
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setNotification({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again or email me directly.'
            });
        } finally {
            setIsSubmitting(false);
            // Clear notification after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="contact" className="relative py-20 overflow-hidden">
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
                            Let's <span className="text-cyan-400">Connect</span>
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500" />
                        </motion.h2>
                        <p className="text-gray-400 text-lg mt-4">
                            Ready to swing into action? Let's create something amazing together!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
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

                            {/* Notification */}
                            <AnimatePresence>
                                {notification && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
                                            notification.type === 'success' 
                                                ? 'bg-cyan-500/90 text-white' 
                                                : 'bg-pink-500/90 text-white'
                                        }`}
                                    >
                                        {notification.type === 'success' ? (
                                            <FaCheckCircle className="text-xl" />
                                        ) : (
                                            <FaExclamationCircle className="text-xl" />
                                        )}
                                        <p>{notification.message}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-cyan-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-cyan-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-cyan-400 mb-2">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        autoComplete="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="projectType" className="block text-cyan-400 mb-2">Project Type</label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        autoComplete="off"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select a project type</option>
                                        <option value="website">Website</option>
                                        <option value="mobile-app">Mobile App</option>
                                        <option value="ai-integration">AI Integration</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="budget" className="block text-cyan-400 mb-2">Budget Range</label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        autoComplete="off"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select your budget range</option>
                                        <option value="<5k">Less than $5,000</option>
                                        <option value="5k-10k">$5,000 - $10,000</option>
                                        <option value="10k-20k">$10,000 - $20,000</option>
                                        <option value=">20k">More than $20,000</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-cyan-400 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        autoComplete="off"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        required
                                        className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400 py-3 rounded-lg
                                            hover:bg-pink-500/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-300
                                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <span className="inline-flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info & Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Contact Info */}
                            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border-2 border-cyan-500/30 relative group">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white mb-4">Let's Create Something Extraordinary</h3>
                                    <p className="text-gray-300">
                                        Just like Spider-Man swings through the city to help others, I'm here to help bring your digital ideas to life.
                                        Whether you need a web app, mobile solution, or AI integration, I've got you covered!
                                    </p>
                                    <div className="text-gray-300">
                                        <p className="mb-2">⚡ Quick Response Time</p>
                                        <p className="mb-2">🌐 Global Project Experience</p>
                                        <p>🤝 Dedicated Support</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border-2 border-cyan-500/30 relative group">
                                <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-cyan-400 transition-colors relative group"
                                            whileHover={{ scale: 1.2, rotate: 12 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <social.icon className="text-3xl" />
                                            <div className="absolute inset-0 bg-pink-500/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="sr-only">{social.label}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact; 