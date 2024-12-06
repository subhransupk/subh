"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    offset: number;
}

const CornerWeb: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shineRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);

    const spiderVerseColors = [
        '#FF3366', // Pink
        '#80FFFF', // Cyan
        '#FF1744', // Red
        '#FFEB3B', // Yellow
        '#00E5FF', // Light Blue
        '#FF9100', // Orange
    ];

    const createParticles = (webSize: number, cornerX: number, cornerY: number) => {
        return Array(8).fill(null).map(() => ({
            x: cornerX - Math.random() * webSize * 0.8,
            y: cornerY + Math.random() * webSize * 0.8,
            size: Math.random() * 3 + 1,
            color: spiderVerseColors[Math.floor(Math.random() * spiderVerseColors.length)],
            offset: Math.random() * Math.PI * 2, // Random starting point for oscillation
        }));
    };

    const drawWeb = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Web settings
        const cornerX = width;
        const cornerY = 0;
        const isMobile = window.innerWidth < 768;
        const webSize = isMobile ? 
            Math.min(width * 0.4, height * 0.4) : // Larger web on mobile
            Math.min(width * 0.3, height * 0.3);
        const numSpokes = isMobile ? 8 : 12; // Fewer spokes on mobile
        const numRings = isMobile ? 6 : 8; // Fewer rings on mobile

        // Set web style with Spider-Verse colors
        ctx.strokeStyle = 'rgba(128, 255, 255, 0.8)';
        ctx.lineWidth = isMobile ? 0.8 : 0.5; // Thicker lines on mobile
        ctx.shadowColor = '#FF3366';
        ctx.shadowBlur = isMobile ? 4 : 3; // Stronger glow on mobile

        // Draw anchor points to corner and edges
        ctx.beginPath();
        ctx.moveTo(cornerX, cornerY);
        ctx.lineTo(cornerX - webSize * 0.9, cornerY + webSize * 0.1);
        ctx.moveTo(cornerX, cornerY);
        ctx.lineTo(cornerX - webSize * 0.1, cornerY + webSize * 0.9);
        ctx.stroke();

        // Draw spokes
        for (let i = 0; i < numSpokes; i++) {
            const angle = (i * Math.PI / 2) / (numSpokes - 1);
            const endX = cornerX - Math.cos(angle) * webSize;
            const endY = cornerY + Math.sin(angle) * webSize;

            ctx.beginPath();
            ctx.moveTo(cornerX, cornerY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        // Draw spiral web
        let currentRadius = webSize * (isMobile ? 0.2 : 0.15); // Start further out on mobile
        const radiusStep = (webSize - currentRadius) / numRings;

        for (let ring = 0; ring < numRings; ring++) {
            ctx.beginPath();
            
            for (let i = 0; i <= numSpokes; i++) {
                const angle = (i * Math.PI / 2) / (numSpokes - 1);
                const distortion = Math.sin(ring + i + shineRef.current * 0.05) * (isMobile ? 8 : 5); // More movement on mobile
                const radius = currentRadius + distortion;
                
                const x = cornerX - Math.cos(angle) * radius;
                const y = cornerY + Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevAngle = ((i - 1) * Math.PI / 2) / (numSpokes - 1);
                    const prevX = cornerX - Math.cos(prevAngle) * radius;
                    const prevY = cornerY + Math.sin(prevAngle) * radius;
                    
                    const cpX = (x + prevX) / 2 - Math.sin(angle) * (isMobile ? 15 : 10);
                    const cpY = (y + prevY) / 2 + Math.cos(angle) * (isMobile ? 15 : 10);
                    
                    ctx.quadraticCurveTo(cpX, cpY, x, y);
                }
            }
            ctx.stroke();
            currentRadius += radiusStep;
        }

        // Add shine effects with Spider-Verse colors
        const gradient = ctx.createRadialGradient(
            cornerX - webSize * 0.3, 
            cornerY + webSize * 0.3, 
            0,
            cornerX - webSize * 0.3, 
            cornerY + webSize * 0.3, 
            webSize * 0.5
        );
        gradient.addColorStop(0, 'rgba(255, 51, 102, 0.3)'); // Stronger pink glow
        gradient.addColorStop(0.5, 'rgba(128, 255, 255, 0.2)'); // Stronger cyan glow
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(cornerX - webSize, cornerY, webSize, webSize);

        // Initialize particles if not exists
        if (particlesRef.current.length === 0) {
            particlesRef.current = createParticles(webSize, cornerX, cornerY);
        }

        // Draw particles with enhanced animation for mobile
        particlesRef.current.forEach((particle) => {
            const oscillation = Math.sin((shineRef.current * (isMobile ? 0.03 : 0.02)) + particle.offset) * (isMobile ? 3 : 2);
            
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = isMobile ? 8 : 5;

            ctx.beginPath();
            ctx.arc(
                particle.x + oscillation, 
                particle.y + oscillation * 0.5, 
                particle.size * (isMobile ? 1.5 : 1), // Larger particles on mobile
                0, 
                Math.PI * 2
            );
            ctx.fillStyle = particle.color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
                particle.x + oscillation - particle.size * 0.3,
                particle.y + oscillation * 0.5 - particle.size * 0.3,
                particle.size * (isMobile ? 0.6 : 0.4),
                0,
                Math.PI * 2
            );
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fill();
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Reset particles when canvas is resized
            particlesRef.current = [];
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const animate = () => {
            shineRef.current += 1;
            drawWeb(ctx, canvas.width, canvas.height);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 right-0 w-full h-full pointer-events-none"
            style={{ 
                zIndex: 2,
                opacity: 1
            }}
        />
    );
};

export default CornerWeb; 