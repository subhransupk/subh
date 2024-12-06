"use client";

import React, { useEffect, useRef } from 'react';

const MobileCornerWeb: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

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

        let time = 0;
        const animate = () => {
            time += 0.02; // Slower animation

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Web settings
            const cornerX = canvas.width;
            const cornerY = 0;
            const webSize = Math.min(canvas.width * 0.3, canvas.height * 0.3);
            const numSpokes = 6; // Fewer spokes
            const numRings = 4; // Fewer rings

            // Set web style
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)'; // Lower opacity cyan
            ctx.lineWidth = 0.5;
            ctx.shadowColor = '#00FFFF';
            ctx.shadowBlur = 2; // Reduced glow

            // Draw anchor points
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
            let currentRadius = webSize * 0.2;
            const radiusStep = (webSize - currentRadius) / numRings;

            for (let ring = 0; ring < numRings; ring++) {
                ctx.beginPath();
                
                for (let i = 0; i <= numSpokes; i++) {
                    const angle = (i * Math.PI / 2) / (numSpokes - 1);
                    const distortion = Math.sin(ring + i + time) * 3; // Reduced movement
                    const radius = currentRadius + distortion;
                    
                    const x = cornerX - Math.cos(angle) * radius;
                    const y = cornerY + Math.sin(angle) * radius;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        const prevAngle = ((i - 1) * Math.PI / 2) / (numSpokes - 1);
                        const prevX = cornerX - Math.cos(prevAngle) * radius;
                        const prevY = cornerY + Math.sin(prevAngle) * radius;
                        
                        const cpX = (x + prevX) / 2 - Math.sin(angle) * 5;
                        const cpY = (y + prevY) / 2 + Math.cos(angle) * 5;
                        
                        ctx.quadraticCurveTo(cpX, cpY, x, y);
                    }
                }
                ctx.stroke();
                currentRadius += radiusStep;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 right-0 pointer-events-none"
            style={{ opacity: 0.5 }} // Reduced overall opacity
        />
    );
};

export default MobileCornerWeb; 