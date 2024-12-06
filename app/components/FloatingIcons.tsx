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

    const initializeIcons = (containerWidth: number, containerHeight: number) => {
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const safeZone = 300;
        const margin = 120;

        return techIcons.map((icon) => {
            let x, y;
            do {
                x = margin + Math.random() * (containerWidth - 2 * margin);
                y = margin + Math.random() * (containerHeight - 2 * margin);
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
                scale: 1,
            };
        });
    };

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
        const updateIcons = () => {
            setIcons(initializeIcons(container.offsetWidth, container.offsetHeight));
        };

        const handleResize = () => {
            updateIcons();
        };

        updateIcons();
        window.addEventListener('resize', handleResize);

        const glitchInterval = setInterval(() => {
            if (Math.random() < 0.3) {
                triggerGlitch();
            }
        }, 2000);

        const animate = () => {
            const time = Date.now() * 0.001;
            
            setIcons(prevIcons => prevIcons.map(icon => ({
                ...icon,
                x: icon.x + Math.sin(time * icon.speed + icon.offset) * 1,
                y: icon.y + Math.cos(time * icon.speed + icon.offset) * 1,
                rotation: icon.rotation + icon.rotationSpeed,
            })));

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
            clearInterval(glitchInterval);
            if (glitchTimeoutRef.current) {
                clearTimeout(glitchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 1 }}
        >
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
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-30"
                                style={{
                                    transform: 'translate(2px, 0)',
                                    filter: `drop-shadow(0 0 3px ${colorScheme.color})`
                                }}
                            >
                                <Image
                                    src={icon.src}
                                    alt={`${icon.alt}-glitch`}
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