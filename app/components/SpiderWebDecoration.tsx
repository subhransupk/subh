"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SpiderWebDecoration = () => {
    return (
        <div className="absolute -right-16 top-0 bottom-0 w-16">
            <svg 
                viewBox="0 0 64 100" 
                className="w-full h-full"
                style={{
                    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))'
                }}
            >
                {/* Main vertical line */}
                <line 
                    x1="32" y1="0" 
                    x2="32" y2="100" 
                    stroke="#FF3366" 
                    strokeWidth="2"
                />

                {/* Horizontal lines */}
                <line 
                    x1="0" y1="25" 
                    x2="64" y2="25" 
                    stroke="#00FFFF" 
                    strokeWidth="2"
                />
                <line 
                    x1="0" y1="50" 
                    x2="64" y2="50" 
                    stroke="#FF3366" 
                    strokeWidth="2"
                />
                <line 
                    x1="0" y1="75" 
                    x2="64" y2="75" 
                    stroke="#00FFFF" 
                    strokeWidth="2"
                />

                {/* Diagonal lines */}
                <line 
                    x1="0" y1="0" 
                    x2="64" y2="100" 
                    stroke="#FF3366" 
                    strokeWidth="2"
                />
                <line 
                    x1="64" y1="0" 
                    x2="0" y2="100" 
                    stroke="#00FFFF" 
                    strokeWidth="2"
                />

                {/* Additional web details */}
                <circle 
                    cx="32" cy="50" 
                    r="3" 
                    fill="#FF3366"
                />
            </svg>
        </div>
    );
};

export default SpiderWebDecoration; 