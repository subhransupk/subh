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
        { src: '/icons/react.svg', alt: 'React' },
        { src: '/icons/nextjs.svg', alt: 'Next.js' },
        { src: '/icons/typescript.svg', alt: 'TypeScript' },
        { src: '/icons/nodejs.svg', alt: 'Node.js' },
        { src: '/icons/mongodb.svg', alt: 'MongoDB' },
        { src: '/icons/postgresql.svg', alt: 'PostgreSQL' },
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

        // Initialize icons based on device type
        const initializeIcons = () => {
            if (isMobile) {
                // Mobile: Grid-based layout with 6 icons
                const mobileIcons = techIcons.slice(0, 6).map((icon, index) => {
                    const row = Math.floor(index / 2);
                    const col = index % 2;
                    const gridSize = {
                        width: container.clientWidth / 2,
                        height: container.clientHeight / 3
                    };
                    
                    return {
                        ...icon,
                        x: (col + 0.5) * gridSize.width + (Math.random() - 0.5) * 20,
                        y: (row + 0.5) * gridSize.height + (Math.random() - 0.5) * 20,
                        size: 40,
                        speed: 0.8,
                        offset: Math.random() * Math.PI * 2,
                        rotation: Math.random() * 360,
                        rotationSpeed: (Math.random() - 0.5) * 2,
                        glitchOffset: 0,
                        scale: 1
                    };
                });
                setIcons(mobileIcons);
            } else {
                // Desktop: Original scattered layout
                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;
                const safeZone = 300;
                const margin = 120;

                const desktopIcons = techIcons.map((icon) => {
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
                        scale: 1
                    };
                });
                setIcons(desktopIcons);
            }
        };

        initializeIcons();

        // Animation loop
        const animate = () => {
            const now = Date.now() / 1000;
            
            setIcons(prevIcons => prevIcons.map(icon => {
                if (isMobile) {
                    // Mobile: Floating animation with larger movement
                    const floatRadius = 20;
                    const newX = icon.x + Math.sin(now * icon.speed + icon.offset) * floatRadius;
                    const newY = icon.y + Math.cos(now * icon.speed + icon.offset) * floatRadius;
                    const newRotation = icon.rotation + icon.rotationSpeed;

                    return {
                        ...icon,
                        x: newX,
                        y: newY,
                        rotation: newRotation,
                        scale: 1 + Math.sin(now * icon.speed) * 0.1 // Subtle pulse effect
                    };
                } else {
                    // Desktop: Original animation
                    return {
                        ...icon,
                        x: icon.x + Math.sin(now * icon.speed + icon.offset),
                        y: icon.y + Math.cos(now * icon.speed + icon.offset),
                        rotation: icon.rotation + icon.rotationSpeed
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
                        className="absolute transition-transform duration-300"
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
                                    className="w-full h-full object-contain"
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