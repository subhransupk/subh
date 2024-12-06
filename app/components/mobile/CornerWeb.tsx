"use client";

import React, { useEffect, useRef } from 'react';

const MobileCornerWeb: React.FC = () => {
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

        let time = 0;
        const animate = () => {
            time += 0.01; // Very slow animation

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Web settings
            const cornerX = canvas.width;
            const cornerY = 0;
            const webSize = Math.min(canvas.width * 0.25, canvas.height * 0.25); // Smaller web
            const numSpokes = 5; // Very few spokes
            const numRings = 3; // Very few rings

            // Simple web style
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)'; // Very low opacity
            ctx.lineWidth = 0.5;

            // Draw simple spokes
            for (let i = 0; i < numSpokes; i++) {
                const angle = (i * Math.PI / 2) / (numSpokes - 1);
                const endX = cornerX - Math.cos(angle) * webSize;
                const endY = cornerY + Math.sin(angle) * webSize;

                ctx.beginPath();
                ctx.moveTo(cornerX, cornerY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            // Draw simple rings
            for (let ring = 1; ring <= numRings; ring++) {
                const radius = (webSize / numRings) * ring;
                ctx.beginPath();
                
                for (let i = 0; i <= numSpokes; i++) {
                    const angle = (i * Math.PI / 2) / (numSpokes - 1);
                    const x = cornerX - Math.cos(angle) * radius;
                    const y = cornerY + Math.sin(angle) * radius;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }

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
            className="fixed top-0 right-0 pointer-events-none"
            style={{ opacity: 0.2 }}
        />
    );
};

export default MobileCornerWeb; 