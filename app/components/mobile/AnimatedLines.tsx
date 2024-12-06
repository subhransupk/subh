"use client";

import React, { useEffect, useRef } from 'react';

const MobileAnimatedLines: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const linesRef = useRef<{ x: number; y: number; width: number; speed: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle device pixel ratio
        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Initialize lines
        const maxLines = 6; // Keep very few lines for performance
        const createLine = () => ({
            x: -50,
            y: Math.random() * canvas.height,
            width: Math.random() * 30 + 20,
            speed: Math.random() * 0.3 + 0.1 // Very slow movement
        });

        // Animation loop
        let lastTime = 0;
        const minFrameTime = 50; // Limit to 20 FPS for better performance

        const animate = (currentTime: number) => {
            if (currentTime - lastTime < minFrameTime) {
                frameRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new lines if needed
            if (linesRef.current.length < maxLines && Math.random() < 0.05) {
                linesRef.current.push(createLine());
            }

            // Update and draw lines
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
            ctx.lineWidth = 1;

            linesRef.current = linesRef.current.filter(line => {
                line.x += line.speed;
                
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x + line.width, line.y);
                ctx.stroke();

                return line.x < canvas.width + 50;
            });

            lastTime = currentTime;
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default MobileAnimatedLines; 