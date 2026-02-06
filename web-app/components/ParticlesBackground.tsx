'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    hue: number;
}

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize particles
        const particleCount = Math.min(50, Math.floor((dimensions.width * dimensions.height) / 20000));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 60 + 160, // Teal to cyan range
        }));

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            particlesRef.current.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Mouse interaction (subtle push)
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 0.02;
                    particle.vx -= (dx / dist) * force;
                    particle.vy -= (dy / dist) * force;
                }

                // Boundary bounce
                if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

                // Keep within bounds
                particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
                particle.y = Math.max(0, Math.min(dimensions.height, particle.y));

                // Apply friction
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particlesRef.current.slice(i + 1).forEach((other) => {
                    const dx = other.x - particle.x;
                    const dy = other.y - particle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `hsla(${particle.hue}, 70%, 50%, ${(1 - dist / 120) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [dimensions]);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="fixed inset-0 pointer-events-none z-0 opacity-40"
        />
    );
}
