"use client";

import React, { useEffect, useRef } from 'react';

interface SpeedLine {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    opacity: number;
    direction: 'left' | 'right';
}

const MobileAnimatedLines: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const linesRef = useRef<SpeedLine[]>([]);
    const frameRef = useRef<number>(0);

    const createSpeedLine = (canvas: HTMLCanvasElement): SpeedLine => {
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        const width = Math.random() * 50 + 50; // Shorter lines
        return {
            x: direction === 'left' ? canvas.width : -width,
            y: Math.random() * canvas.height,
            width,
            height: Math.random() * 1 + 0.5, // Thinner lines
            speed: Math.random() * 1 + 0.5, // Slower speed
            opacity: Math.random() * 0.3 + 0.1, // Lower opacity
            direction,
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const updateLines = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw lines
            for (let i = linesRef.current.length - 1; i >= 0; i--) {
                const line = linesRef.current[i];

                // Move line
                if (line.direction === 'right') {
                    line.x += line.speed;
                } else {
                    line.x -= line.speed;
                }

                // Draw line
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 255, ${line.opacity})`; // Cyan color
                ctx.lineWidth = line.height;
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x + line.width, line.y);
                ctx.stroke();

                // Remove lines that are off screen
                if (line.direction === 'right' && line.x > canvas.width ||
                    line.direction === 'left' && line.x + line.width < 0) {
                    linesRef.current.splice(i, 1);
                }
            }

            // Add new lines less frequently
            if (Math.random() < 0.1 && linesRef.current.length < 15) { // Fewer lines
                linesRef.current.push(createSpeedLine(canvas));
            }

            frameRef.current = requestAnimationFrame(() => updateLines(canvas, ctx));
        };

        updateLines(canvas, ctx);

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
            style={{ opacity: 0.3 }} // Lower overall opacity
        />
    );
};

export default MobileAnimatedLines; 