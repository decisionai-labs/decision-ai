'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState, ReactElement } from 'react';

interface DockItemProps {
    children: ReactElement[];
    className?: string;
    onClick?: () => void;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    spring: { mass: number; stiffness: number; damping: number };
    distance: number;
    magnification: number;
    baseItemSize: number;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center rounded-full bg-[#111111]/90 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl transition-shadow ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child => cloneElement(child, { isHovered } as { isHovered: typeof isHovered }))}
        </motion.div>
    );
}

interface DockLabelProps {
    children: React.ReactNode;
    className?: string;
    isHovered?: ReturnType<typeof useMotionValue<number>>;
}

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHovered) return;
        const unsubscribe = isHovered.on('change', (latest: number) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${className} absolute -top-8 left-1/2 w-fit whitespace-pre rounded-lg border border-white/10 bg-[#111111] px-3 py-1 text-xs font-medium text-white shadow-md`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface DockIconProps {
    children: React.ReactNode;
    className?: string;
    isHovered?: ReturnType<typeof useMotionValue<number>>;
}

function DockIcon({ children, className = '' }: DockIconProps) {
    return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export interface DockItemConfig {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
}

interface DockProps {
    items: DockItemConfig[];
    className?: string;
    spring?: { mass: number; stiffness: number; damping: number };
    magnification?: number;
    distance?: number;
    panelHeight?: number;
    dockHeight?: number;
    baseItemSize?: number;
}

export function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 68,
    dockHeight = 256,
    baseItemSize = 50
}: DockProps) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={`${className} absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-3 rounded-2xl border border-white/10 bg-[#111111]/80 backdrop-blur-md pb-3 px-4 shadow-xl`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
