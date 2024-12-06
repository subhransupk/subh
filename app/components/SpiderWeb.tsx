'use client';
import React, { useEffect, useRef, useState } from 'react';

interface WebNode {
  x: number;
  y: number;
  timestamp: number;
}

interface WebShot {
  x: number;
  y: number;
  angle: number;
  timestamp: number;
}

export default function SpiderWeb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<WebNode[]>([]);
  const [webShots, setWebShots] = useState<WebShot[]>([]);
  const maxNodes = 50;
  const connectionDistance = 150;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });
      
      const now = Date.now();
      if (nodes.length === 0 || now - nodes[nodes.length - 1].timestamp > 100) {
        setNodes(prev => {
          const newNodes = [...prev, { x: clientX, y: clientY, timestamp: now }];
          return newNodes.slice(-maxNodes);
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const now = Date.now();
      
      const angle = Math.atan2(
        clientY - mousePos.y,
        clientX - mousePos.x
      );

      setWebShots(prev => [
        ...prev,
        {
          x: clientX,
          y: clientY,
          angle: angle,
          timestamp: now
        }
      ]);

      setTimeout(() => {
        setWebShots(prev => prev.filter(shot => shot.timestamp !== now));
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [nodes.length, mousePos]);

  const getWebConnections = () => {
    const connections: JSX.Element[] = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode, j) => {
        const dx = otherNode.x - node.x;
        const dy = otherNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const angle = Math.atan2(dy, dx);
          const opacity = 1 - (distance / connectionDistance);
          
          connections.push(
            <div
              key={`connection-${i}-${j}-${node.timestamp}`}
              className="web-connection"
              style={{
                left: node.x,
                top: node.y,
                width: `${distance}px`,
                transform: `rotate(${angle}rad)`,
                opacity: opacity * 0.4
              }}
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div ref={containerRef} className="web-container">
      {nodes.map((node, i) => (
        <div
          key={`node-${node.timestamp}-${i}`}
          className="web-node"
          style={{
            left: node.x,
            top: node.y
          }}
        />
      ))}

      {getWebConnections()}

      {webShots.map((shot) => (
        <div
          key={`shot-${shot.timestamp}`}
          className="web-shot"
          style={{
            left: shot.x,
            top: shot.y
          }}
        >
          <div className="web-center" />
          
          {[...Array(8)].map((_, index) => (
            <div
              key={`radial-${shot.timestamp}-${index}`}
              className="web-radial"
              style={{
                transform: `rotate(${index * 45}deg)`
              }}
            />
          ))}
          
          {[...Array(8)].map((_, index) => (
            <React.Fragment key={`connector-group-${shot.timestamp}-${index}`}>
              {[...Array(3)].map((_, subIndex) => (
                <div
                  key={`connector-${shot.timestamp}-${index}-${subIndex}`}
                  className="web-connector"
                  style={{
                    transform: `rotate(${index * 45 + 22.5}deg) translate(${(subIndex + 1) * 20}px, 0)`,
                    animationDelay: `${index * 0.05 + subIndex * 0.02}s`
                  }}
                />
              ))}
            </React.Fragment>
          ))}
          
          {[...Array(16)].map((_, index) => (
            <div
              key={`segment-${shot.timestamp}-${index}`}
              className="web-segment"
              style={{
                '--rotation': `${index * 22.5}deg`,
                transform: `rotate(${index * 22.5}deg)`,
                animationDelay: `${index * 0.02}s`
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
} 