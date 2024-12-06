"use client";

import React, { useEffect, useRef } from 'react';

interface SpeedLine {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    opacity: number;
    color: string;
    direction: 'left' | 'right';
    glitchOffset: number;
    glitchTime: number;
    rgbShift: number;
    isGlitching: boolean;
}

const AnimatedLines: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const linesRef = useRef<SpeedLine[]>([]);
    const frameRef = useRef<number>(0);
    const globalGlitchRef = useRef<boolean>(false);
    const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const colors = [
        '#FF3366', // Pink
        '#66FFFF', // Cyan
        '#FF0000', // Red
        '#FFFFFF', // White
    ];

    const createSpeedLine = (canvas: HTMLCanvasElement): SpeedLine => {
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        const width = Math.random() * 150 + 100; // Length of line
        const height = Math.random() * 2 + 1;    // Thickness of line
        
        return {
            x: direction === 'right' ? -width : canvas.width,
            y: Math.random() * canvas.height,
            width,
            height,
            speed: (Math.random() * 15 + 10) * (direction === 'right' ? 1 : -1),
            opacity: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            direction,
            glitchOffset: 0,
            glitchTime: 0,
            rgbShift: 0,
            isGlitching: false,
        };
    };

    const triggerGlobalGlitch = () => {
        if (glitchTimeoutRef.current) {
            clearTimeout(glitchTimeoutRef.current);
        }
        
        globalGlitchRef.current = true;
        
        // Random duration for the glitch effect
        const glitchDuration = Math.random() * 200 + 100;
        
        glitchTimeoutRef.current = setTimeout(() => {
            globalGlitchRef.current = false;
        }, glitchDuration);
    };

    const updateLines = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Randomly trigger global glitch
        if (Math.random() < 0.02) { // 2% chance each frame
            triggerGlobalGlitch();
        }

        // Update and draw existing lines
        for (let i = linesRef.current.length - 1; i >= 0; i--) {
            const line = linesRef.current[i];
            
            // Update position
            line.x += line.speed;
            
            // Fade out as it moves
            line.opacity -= 0.02;

            // Update glitch state
            if (Math.random() < 0.05 || globalGlitchRef.current) {
                line.isGlitching = true;
                line.glitchTime = 5;
                line.glitchOffset = (Math.random() - 0.5) * 30;
                line.rgbShift = Math.random() * 8 + 4;
            }

            if (line.glitchTime > 0) {
                line.glitchTime--;
            } else {
                line.isGlitching = false;
                line.glitchOffset *= 0.8;
                line.rgbShift *= 0.8;
            }

            const drawGlitchedLine = (xOffset: number, color: string, alpha: number = line.opacity) => {
                const glitchX = line.isGlitching ? 
                    line.x + line.glitchOffset + (Math.random() - 0.5) * 10 : 
                    line.x + line.glitchOffset;
                
                const glitchY = line.isGlitching ? 
                    line.y + (Math.random() - 0.5) * 5 : 
                    line.y;

                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = line.isGlitching ? 8 : 5;
                
                // Draw main segment
                ctx.fillRect(
                    glitchX + xOffset, 
                    glitchY, 
                    line.isGlitching ? line.width * (0.8 + Math.random() * 0.4) : line.width, 
                    line.height
                );

                // Sometimes draw glitch segments
                if (line.isGlitching && Math.random() < 0.3) {
                    const segmentWidth = line.width * (Math.random() * 0.3);
                    const segmentX = glitchX + xOffset + Math.random() * (line.width - segmentWidth);
                    ctx.fillRect(
                        segmentX,
                        glitchY + (Math.random() - 0.5) * 10,
                        segmentWidth,
                        line.height * (0.5 + Math.random())
                    );
                }

                ctx.restore();
            };

            // Draw the line with glitch effects
            drawGlitchedLine(0, line.color);

            // RGB shift effects
            if (line.rgbShift > 0.5) {
                drawGlitchedLine(line.rgbShift, '#FF0000', line.opacity * 0.5);
                drawGlitchedLine(-line.rgbShift, '#00FFFF', line.opacity * 0.5);
            }

            // Remove lines that are off screen or fully faded
            if (line.opacity <= 0 || 
                (line.direction === 'right' && line.x > canvas.width) ||
                (line.direction === 'left' && line.x + line.width < 0)) {
                linesRef.current.splice(i, 1);
            }
        }

        // Randomly add new lines
        if (Math.random() < 0.2) {
            linesRef.current.push(createSpeedLine(canvas));
        }

        frameRef.current = requestAnimationFrame(() => updateLines(canvas, ctx));
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

        // Initialize with a few lines
        linesRef.current = Array(10).fill(null).map(() => createSpeedLine(canvas));

        // Start animation
        updateLines(canvas, ctx);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            cancelAnimationFrame(frameRef.current);
            if (glitchTimeoutRef.current) {
                clearTimeout(glitchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ 
                zIndex: 1,
                mixBlendMode: 'screen',
                opacity: 0.8
            }}
        />
    );
};

export default AnimatedLines; 