'use client';

import { Dock, DockItemConfig } from './Dock';
import { useRouter } from 'next/navigation';
import { VscHome, VscBeaker, VscSparkle, VscGithubInverted } from 'react-icons/vsc';

export function HomeDock() {
    const router = useRouter();

    const items: DockItemConfig[] = [
        {
            icon: <VscHome size={22} className="text-white" />,
            label: 'Home',
            onClick: () => router.push('/')
        },
        {
            icon: <VscBeaker size={22} className="text-[#14B8A6]" />,
            label: 'Try Demo',
            onClick: () => router.push('/demo')
        },
        {
            icon: <VscSparkle size={22} className="text-[#F59E0B]" />,
            label: 'Features',
            onClick: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: <VscGithubInverted size={22} className="text-white" />,
            label: 'GitHub',
            onClick: () => window.open('https://github.com/NeuroSolanaAgents/neurosan', '_blank')
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="pointer-events-auto">
                <Dock
                    items={items}
                    panelHeight={68}
                    baseItemSize={48}
                    magnification={70}
                />
            </div>
        </div>
    );
}
