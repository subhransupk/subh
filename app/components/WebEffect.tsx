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
    const lastPointRef = useRef<number>(0);

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

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // Mobile: Add random points periodically
            const addRandomPoint = () => {
                const now = Date.now();
                if (now - lastPointRef.current < 300) return;

                const color = getRandomColor();
                const newPoint = {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    timestamp: now,
                    color: color.main,
                };

                setPoints(prevPoints => {
                    const newPoints = [...prevPoints, newPoint];
                    return newPoints.filter(point => now - point.timestamp < 3000);
                });

                lastPointRef.current = now;
            };

            const interval = setInterval(addRandomPoint, 300);
            return () => {
                window.removeEventListener('resize', updateCanvasSize);
                clearInterval(interval);
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        } else {
            // Desktop: Use mouse movement
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
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;

        const drawWeb = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isMobile) {
                // Mobile: Simpler rendering with reduced effects
                ctx.lineWidth = 0.8;
                ctx.shadowBlur = 8;

                points.forEach((point1, i) => {
                    points.forEach((point2, j) => {
                        if (i === j) return;

                        const dx = point1.x - point2.x;
                        const dy = point1.y - point2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 200) {
                            const age1 = Date.now() - point1.timestamp;
                            const age2 = Date.now() - point2.timestamp;
                            const opacity = Math.min(
                                1 - age1 / 3000,
                                1 - age2 / 3000
                            ) * 0.5;

                            ctx.beginPath();
                            ctx.moveTo(point1.x, point1.y);
                            ctx.lineTo(point2.x, point2.y);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                            ctx.shadowColor = point1.color;
                            ctx.stroke();
                        }
                    });
                });

                // Draw points with enhanced effects
                points.forEach(point => {
                    const age = Date.now() - point.timestamp;
                    const opacity = Math.max(0, 1 - age / 3000) * 0.7;

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = point.color + 'B0';
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = point.color + '80';
                    ctx.globalAlpha = opacity;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = '#FFFFFFB0';
                    ctx.fill();

                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 0;
                });
            } else {
                // Desktop: Full effects
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
                            gradient.addColorStop(0, points[i].color + '80');
                            gradient.addColorStop(1, points[j].color + '80');

                            ctx.beginPath();
                            ctx.moveTo(points[i].x, points[i].y);
                            ctx.lineTo(points[j].x, points[j].y);

                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = 1.5;
                            ctx.shadowBlur = 5;
                            ctx.shadowColor = points[i].color + '40';
                            
                            const opacity = Math.max(0, 1 - distance / 150) * 
                                          Math.max(0, 1 - age / 2000) * 0.7;
                            ctx.globalAlpha = opacity;
                            
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    }
                }

                // Draw points with full effects
                points.forEach(point => {
                    const age = Date.now() - point.timestamp;
                    const opacity = Math.max(0, 1 - age / 2000) * 0.7;

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = point.color + '80';
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = point.color + '40';
                    ctx.globalAlpha = opacity;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
                    ctx.fillStyle = '#FFFFFF80';
                    ctx.fill();

                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 0;
                });
            }

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