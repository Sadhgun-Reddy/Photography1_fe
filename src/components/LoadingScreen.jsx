import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const LoadingScreen = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center p-8 bg-obsidian rounded-xl border border-white/10 shadow-2xl glass-panel whitespace-nowrap">
                <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-gold animate-spin mb-4"></div>
                <p className="font-serif text-xl tracking-widest text-gold mb-2">LOADING <span className="text-white">{Math.max(0, Math.floor(progress))}%</span></p>
                <p className="text-xs text-white/50 tracking-widest font-sans uppercase">Preparing 3D Experience</p>
            </div>
        </Html>
    );
};

export const FallbackLoader = () => (
    <div className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-gold animate-spin mb-6"></div>
        <h2 className="text-2xl font-serif text-white tracking-widest uppercase">Initializing...</h2>
    </div>
);

export default LoadingScreen;
