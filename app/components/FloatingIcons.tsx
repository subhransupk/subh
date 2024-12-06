"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Icon {
    src: string;
    alt: string;
    x: number;
    y: number;
    size: number;
    speed: number;
    offset: number;
    rotation: number;
    rotationSpeed: number;
    glitchOffset: number;
    glitchTime: number;
    scale: number;
}

const FloatingIcons: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [icons, setIcons] = useState<Icon[]>([]);
    const animationRef = useRef<number>(0);
    const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const spiderVerseColors = [
        { color: '#FF3366', shadow: '#FF0044' }, // Pink
        { color: '#00FFFF', shadow: '#00CCFF' }, // Cyan
        { color: '#FF1744', shadow: '#FF0000' }, // Red
        { color: '#FFEB3B', shadow: '#FFC107' }, // Yellow
        { color: '#00E5FF', shadow: '#00B8D4' }, // Light Blue
    ];

    const techIcons = [
        // Frontend
        { src: '/icons/react.svg', alt: 'React' },
        { src: '/icons/nextjs.svg', alt: 'Next.js' },
        { src: '/icons/typescript.svg', alt: 'TypeScript' },
        { src: '/icons/wordpress.svg', alt: 'WordPress' },
        // Backend & Databases
        { src: '/icons/python.svg', alt: 'Python' },
        { src: '/icons/nodejs.svg', alt: 'Node.js' },
        { src: '/icons/mongodb.svg', alt: 'MongoDB' },
        { src: '/icons/postgresql.svg', alt: 'PostgreSQL' },
        // Other
        { src: '/icons/flutter.svg', alt: 'Flutter' },
        { src: '/icons/firebase.svg', alt: 'Firebase' },
        { src: '/icons/git.svg', alt: 'Git' }
    ];

    const triggerGlitch = () => {
        if (glitchTimeoutRef.current) {
            clearTimeout(glitchTimeoutRef.current);
        }

        setIcons(prevIcons => prevIcons.map(icon => ({
            ...icon,
            glitchOffset: (Math.random() - 0.5) * 20,
            scale: 0.8 + Math.random() * 0.4,
        })));

        glitchTimeoutRef.current = setTimeout(() => {
            setIcons(prevIcons => prevIcons.map(icon => ({
                ...icon,
                glitchOffset: 0,
                scale: 1,
            })));
        }, 150);
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const isMobile = window.innerWidth < 768;

        // Initialize icons
        const initializeIcons = () => {
            if (isMobile) {
                // Mobile: Simpler initialization
                const maxIcons = 6;
                const newIcons = techIcons.slice(0, maxIcons).map((icon) => {
                    const size = 24;
                    return {
                        ...icon,
                        x: Math.random() * (container.clientWidth - size),
                        y: Math.random() * (container.clientHeight - size),
                        size,
                        speed: 0.3,
                        offset: Math.random() * Math.PI * 2,
                        rotation: Math.random() * 360,
                        rotationSpeed: 0.2,
                        glitchOffset: 0,
                        glitchTime: 0,
                        scale: 1
                    };
                });
                setIcons(newIcons);
            } else {
                // Desktop: Full initialization
                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;
                const safeZone = 300;
                const margin = 120;

                const newIcons = techIcons.map((icon) => {
                    let x, y;
                    do {
                        x = margin + Math.random() * (container.clientWidth - 2 * margin);
                        y = margin + Math.random() * (container.clientHeight - 2 * margin);
                    } while (
                        Math.abs(x - centerX) < safeZone &&
                        Math.abs(y - centerY) < safeZone
                    );

                    return {
                        ...icon,
                        x,
                        y,
                        size: Math.random() * 20 + 30,
                        speed: Math.random() * 0.4 + 0.2,
                        offset: Math.random() * Math.PI * 2,
                        rotation: Math.random() * 360,
                        rotationSpeed: (Math.random() - 0.5) * 1.5,
                        glitchOffset: 0,
                        glitchTime: 0,
                        scale: 1
                    };
                });
                setIcons(newIcons);
            }
        };

        initializeIcons();

        // Animation loop
        const animate = () => {
            const now = Date.now() / 1000;
            
            setIcons(prevIcons => prevIcons.map(icon => {
                if (isMobile) {
                    // Mobile: Simple floating animation
                    const movement = 10;
                    const newX = icon.x + Math.sin(now * icon.speed + icon.offset) * movement;
                    const newY = icon.y + Math.cos(now * icon.speed + icon.offset) * movement;
                    const newRotation = icon.rotation + icon.rotationSpeed;

                    return {
                        ...icon,
                        x: newX,
                        y: newY,
                        rotation: newRotation,
                        glitchOffset: 0,
                        scale: 1
                    };
                } else {
                    // Desktop: Full animation with glitch effects
                    const newX = icon.x + Math.sin(now * icon.speed + icon.offset);
                    const newY = icon.y + Math.cos(now * icon.speed + icon.offset);
                    const newRotation = icon.rotation + icon.rotationSpeed;
                    const shouldGlitch = Math.random() > 0.995;
                    const newGlitchOffset = shouldGlitch ? (Math.random() - 0.5) * 5 : 0;
                    const newScale = Math.random() > 0.99 ? 1.1 : 1;

                    return {
                        ...icon,
                        x: newX,
                        y: newY,
                        rotation: newRotation,
                        glitchOffset: newGlitchOffset,
                        scale: newScale
                    };
                }
            }));

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Desktop-only glitch effect
        let glitchInterval: NodeJS.Timeout | null = null;
        if (!isMobile) {
            glitchInterval = setInterval(() => {
                if (Math.random() < 0.3) {
                    triggerGlitch();
                }
            }, 2000);
        }

        const handleResize = () => {
            initializeIcons();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (glitchInterval) {
                clearInterval(glitchInterval);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (glitchTimeoutRef.current) {
                clearTimeout(glitchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
            {icons.map((icon, index) => {
                const colorScheme = spiderVerseColors[index % spiderVerseColors.length];
                return (
                    <div
                        key={`${icon.alt}-${index}`}
                        className="absolute transition-all duration-300 hover:scale-125 group"
                        style={{
                            transform: `translate(${icon.x + icon.glitchOffset}px, ${icon.y}px) 
                                      rotate(${icon.rotation}deg) scale(${icon.scale})`,
                            width: `${icon.size}px`,
                            height: `${icon.size}px`,
                        }}
                    >
                        <div className="relative w-full h-full">
                            <div 
                                className="absolute inset-0 transition-all duration-300"
                                style={{
                                    filter: `drop-shadow(0 0 5px ${colorScheme.shadow}40) 
                                            drop-shadow(0 0 10px ${colorScheme.color}30)`
                                }}
                            >
                                <Image
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={icon.size}
                                    height={icon.size}
                                    className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-125"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FloatingIcons; 