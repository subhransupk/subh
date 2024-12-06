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
        const webSize = Math.min(width * 0.3, height * 0.3);
        const numSpokes = 12;
        const numRings = 8;

        // Set web style with Spider-Verse colors
        ctx.strokeStyle = 'rgba(128, 255, 255, 0.8)'; // Cyan base color
        ctx.lineWidth = 0.5;
        ctx.shadowColor = '#FF3366'; // Pink glow
        ctx.shadowBlur = 3;

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
        let currentRadius = webSize * 0.15;
        const radiusStep = (webSize - currentRadius) / numRings;

        for (let ring = 0; ring < numRings; ring++) {
            ctx.beginPath();
            
            for (let i = 0; i <= numSpokes; i++) {
                const angle = (i * Math.PI / 2) / (numSpokes - 1);
                const distortion = Math.sin(ring + i + shineRef.current * 0.05) * 5;
                const radius = currentRadius + distortion;
                
                const x = cornerX - Math.cos(angle) * radius;
                const y = cornerY + Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevAngle = ((i - 1) * Math.PI / 2) / (numSpokes - 1);
                    const prevX = cornerX - Math.cos(prevAngle) * radius;
                    const prevY = cornerY + Math.sin(prevAngle) * radius;
                    
                    const cpX = (x + prevX) / 2 - Math.sin(angle) * 10;
                    const cpY = (y + prevY) / 2 + Math.cos(angle) * 10;
                    
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
        gradient.addColorStop(0, 'rgba(255, 51, 102, 0.2)'); // Pink
        gradient.addColorStop(0.5, 'rgba(128, 255, 255, 0.1)'); // Cyan
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(cornerX - webSize, cornerY, webSize, webSize);

        // Initialize particles if not exists
        if (particlesRef.current.length === 0) {
            particlesRef.current = createParticles(webSize, cornerX, cornerY);
        }

        // Draw particles with slow animation
        particlesRef.current.forEach((particle) => {
            // Slow oscillating movement
            const oscillation = Math.sin((shineRef.current * 0.02) + particle.offset) * 2;
            
            // Glow effect matching particle color
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 5;

            // Main particle
            ctx.beginPath();
            ctx.arc(
                particle.x + oscillation, 
                particle.y + oscillation * 0.5, 
                particle.size, 
                0, 
                Math.PI * 2
            );
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Highlight
            ctx.beginPath();
            ctx.arc(
                particle.x + oscillation - particle.size * 0.3,
                particle.y + oscillation * 0.5 - particle.size * 0.3,
                particle.size * 0.4,
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