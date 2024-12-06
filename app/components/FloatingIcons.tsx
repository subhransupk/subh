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
    const [mounted, setMounted] = useState(false);
    const animationRef = useRef<number>(0);

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

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        const container = containerRef.current;
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? 40 : 80; // Padding from edges

        const initializeIcons = () => {
            if (isMobile) {
                // Mobile: Fixed positions with 6 icons in a 2x3 grid
                const mobileIcons = techIcons.slice(0, 6).map((icon, index) => {
                    const row = Math.floor(index / 2);
                    const col = index % 2;
                    const gridWidth = container.clientWidth - (padding * 2);
                    const gridHeight = container.clientHeight - (padding * 2);
                    const cellWidth = gridWidth / 2;
                    const cellHeight = gridHeight / 3;
                    
                    return {
                        ...icon,
                        x: padding + (col * cellWidth) + (cellWidth / 2) - 20, // Center in cell
                        y: padding + (row * cellHeight) + (cellHeight / 2) - 20, // Center in cell
                        size: 40,
                        speed: 0.5,
                        offset: Math.random() * Math.PI * 2,
                        rotation: Math.random() * 360,
                        rotationSpeed: 0.5,
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

        const animate = () => {
            const now = Date.now() / 1000;
            
            setIcons(prevIcons => prevIcons.map(icon => {
                if (isMobile) {
                    // Mobile: Simple floating animation
                    const floatRadius = 15;
                    const newX = icon.x + Math.sin(now * icon.speed + icon.offset) * floatRadius;
                    const newY = icon.y + Math.cos(now * icon.speed + icon.offset) * floatRadius;
                    const newRotation = icon.rotation + icon.rotationSpeed;

                    return {
                        ...icon,
                        x: newX,
                        y: newY,
                        rotation: newRotation,
                        scale: 1 + Math.sin(now * icon.speed) * 0.1
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

        const handleResize = () => {
            initializeIcons();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            style={{ minHeight: '100vh' }}
        >
            {icons.map((icon, index) => {
                const colorScheme = spiderVerseColors[index % spiderVerseColors.length];
                return (
                    <div
                        key={`${icon.alt}-${index}`}
                        className="absolute"
                        style={{
                            transform: `translate(${icon.x}px, ${icon.y}px) 
                                      rotate(${icon.rotation}deg) scale(${icon.scale})`,
                            width: `${icon.size}px`,
                            height: `${icon.size}px`,
                            willChange: 'transform',
                        }}
                    >
                        <div className="relative w-full h-full">
                            <div 
                                className="absolute inset-0"
                                style={{
                                    filter: `drop-shadow(0 0 8px ${colorScheme.shadow}60) 
                                            drop-shadow(0 0 12px ${colorScheme.color}40)`
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