"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    timestamp: number;
    color: string;
}

const WebEffect = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();

    const spiderVerseColors = [
        { main: '#FF3366', glow: 'rgba(255, 51, 102, 0.3)' },  // Neon Pink
        { main: '#00FFFF', glow: 'rgba(0, 255, 255, 0.3)' },   // Neon Cyan
        { main: '#00E5FF', glow: 'rgba(0, 229, 255, 0.3)' },   // Electric Blue
        { main: '#FF1744', glow: 'rgba(255, 23, 68, 0.3)' },   // Vibrant Red
        { main: '#FFEB3B', glow: 'rgba(255, 235, 59, 0.3)' },  // Neon Yellow
    ];

    const getRandomColor = () => {
        return spiderVerseColors[Math.floor(Math.random() * spiderVerseColors.length)];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const color = getRandomColor();
            const newPoint = {
                x: e.clientX,
                y: e.clientY,
                timestamp: now,
                color: color.main,
            };

            setPoints(prevPoints => {
                const newPoints = [...prevPoints, newPoint];
                return newPoints.filter(point => now - point.timestamp < 2000);
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            document.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const drawWeb = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections between points
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
                    if (distance < 150) {
                        const age = Math.min(
                            Date.now() - points[i].timestamp,
                            Date.now() - points[j].timestamp
                        );
                        
                        // Create gradient for the line
                        const gradient = ctx.createLinearGradient(
                            points[i].x, points[i].y,
                            points[j].x, points[j].y
                        );
                        gradient.addColorStop(0, points[i].color + '80'); // 50% opacity
                        gradient.addColorStop(1, points[j].color + '80'); // 50% opacity

                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);

                        // Set line style with reduced glow
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5; // Slightly thinner lines
                        ctx.shadowBlur = 5; // Reduced glow
                        ctx.shadowColor = points[i].color + '40'; // 25% opacity for glow
                        
                        // Fade based on distance and time
                        const opacity = Math.max(0, 1 - distance / 150) * 
                                      Math.max(0, 1 - age / 2000) * 0.7; // Reduced max opacity
                        ctx.globalAlpha = opacity;
                        
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            // Draw points with reduced glow
            points.forEach(point => {
                const age = Date.now() - point.timestamp;
                const opacity = Math.max(0, 1 - age / 2000) * 0.7; // Reduced max opacity

                // Draw glow
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2); // Slightly smaller points
                ctx.fillStyle = point.color + '80'; // 50% opacity
                ctx.shadowBlur = 8; // Reduced glow
                ctx.shadowColor = point.color + '40'; // 25% opacity for glow
                ctx.globalAlpha = opacity;
                ctx.fill();

                // Draw center
                ctx.beginPath();
                ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
                ctx.fillStyle = '#FFFFFF80'; // 50% opacity
                ctx.fill();

                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            });

            animationFrameRef.current = requestAnimationFrame(drawWeb);
        };

        drawWeb();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [points]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

export default WebEffect; 