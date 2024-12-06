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
}

const FloatingIcons: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [icons, setIcons] = useState<Icon[]>([]);
    const animationRef = useRef<number>(0);

    const techIcons = [
        { src: '/icons/react.svg', alt: 'React' },
        { src: '/icons/nextjs.svg', alt: 'Next.js' },
        { src: '/icons/typescript.svg', alt: 'TypeScript' },
        { src: '/icons/nodejs.svg', alt: 'Node.js' },
        { src: '/icons/mongodb.svg', alt: 'MongoDB' },
        { src: '/icons/postgresql.svg', alt: 'PostgreSQL' }
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const isMobile = window.innerWidth < 768;

        // Initialize icons in a grid layout
        const initializeIcons = () => {
            const mobileIcons = techIcons.map((icon, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const cellWidth = container.clientWidth / 2;
                const cellHeight = container.clientHeight / 3;
                
                return {
                    ...icon,
                    x: (col * cellWidth) + (cellWidth / 2) - 25,
                    y: (row * cellHeight) + (cellHeight / 2) - 25,
                    size: 50,
                    speed: 0.8,
                    offset: Math.random() * Math.PI * 2,
                    rotation: Math.random() * 360,
                    rotationSpeed: 0.5
                };
            });
            setIcons(mobileIcons);
        };

        initializeIcons();

        // Animation loop
        const animate = () => {
            const now = Date.now() / 1000;
            
            setIcons(prevIcons => prevIcons.map(icon => {
                const floatRadius = 20;
                const newX = icon.x + Math.sin(now * icon.speed + icon.offset) * floatRadius;
                const newY = icon.y + Math.cos(now * icon.speed + icon.offset) * floatRadius;
                const newRotation = icon.rotation + icon.rotationSpeed;

                return {
                    ...icon,
                    x: newX,
                    y: newY,
                    rotation: newRotation
                };
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
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 50 }}
        >
            {icons.map((icon, index) => (
                <div
                    key={`${icon.alt}-${index}`}
                    className="absolute"
                    style={{
                        transform: `translate(${icon.x}px, ${icon.y}px) rotate(${icon.rotation}deg)`,
                        width: `${icon.size}px`,
                        height: `${icon.size}px`,
                        willChange: 'transform',
                        filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
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
            ))}
        </div>
    );
};

export default FloatingIcons; 