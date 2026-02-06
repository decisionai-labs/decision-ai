'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    rotation: number;
    rotationSpeed: number;
    shape: 'circle' | 'square' | 'triangle';
}

const COLORS = [
    '#14B8A6', // teal (brand color)
    '#F472B6', // pink
    '#60A5FA', // blue
    '#A78BFA', // purple
    '#34D399', // green
    '#FBBF24', // yellow
    '#F87171', // red
];

export function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Initialize particles
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
        particlesRef.current = [];

        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(createParticle(canvas.width, canvas.height));
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += particle.rotationSpeed;

                // Wrap around screen
                if (particle.x < -20) particle.x = canvas.width + 20;
                if (particle.x > canvas.width + 20) particle.x = -20;
                if (particle.y < -20) particle.y = canvas.height + 20;
                if (particle.y > canvas.height + 20) particle.y = -20;

                // Draw particle
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;

                if (particle.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else if (particle.shape === 'square') {
                    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                } else {
                    // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -particle.size);
                    ctx.lineTo(particle.size, particle.size);
                    ctx.lineTo(-particle.size, particle.size);
                    ctx.closePath();
                    ctx.fill();
                }

                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.7 }}
        />
    );
}

function createParticle(width: number, height: number): Particle {
    const shapes: Particle['shape'][] = ['circle', 'square', 'triangle'];
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3 + 0.2, // Slight downward drift
        size: Math.random() * 4 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
    };
}
