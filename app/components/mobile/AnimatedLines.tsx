"use client";

import React, { useEffect, useRef } from 'react';

const MobileAnimatedLines: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        let lines: { x: number; y: number; width: number }[] = [];
        const maxLines = 8; // Very few lines

        const createLine = () => {
            const y = Math.random() * canvas.height;
            return {
                x: -100, // Start off screen
                y,
                width: Math.random() * 30 + 20 // Shorter lines
            };
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new line if needed
            if (lines.length < maxLines && Math.random() < 0.05) {
                lines.push(createLine());
            }

            // Update and draw lines
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'; // Very low opacity
            ctx.lineWidth = 1;

            lines = lines.filter(line => {
                line.x += 1; // Slow movement
                
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x + line.width, line.y);
                ctx.stroke();

                return line.x < canvas.width + 100;
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

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
            style={{ opacity: 0.2 }}
        />
    );
};

export default MobileAnimatedLines; 