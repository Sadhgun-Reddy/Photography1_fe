import React from 'react';
import MagneticButton from './MagneticButton';
import { Check } from 'lucide-react';

const PricingCard = ({ tier, price, duration, features, isPopular, category }) => {
    return (
        <div className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-500 overflow-hidden group
      ${isPopular
                ? 'bg-gradient-to-b from-white/10 to-transparent border-gold/50 shadow-2xl scale-105 z-10'
                : 'bg-white/5 border-white/10 hover:border-gold/30 hover:bg-white/10'}`}
        >
            {/* Background glow for popular */}
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gold/10 blur-[50px] pointer-events-none -z-10"></div>
            )}

            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gold text-obsidian text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-b-md">
                    Most Popular
                </div>
            )}

            <div className="mb-8 mt-4 text-center">
                <p className="text-gold text-xs tracking-widest uppercase mb-2 font-sans">{category}</p>
                <h3 className="text-3xl font-serif text-white">{tier}</h3>
            </div>

            <div className="mb-8 text-center flex-grow">
                <div className="flex justify-center items-start mb-2">
                    <span className="text-gold text-2xl mt-2 mr-1">$</span>
                    <span className="text-5xl font-serif text-white counter-up">{price}</span>
                </div>
                <p className="text-offwhite/50 text-sm font-sans tracking-wide">{duration}</p>
            </div>

            <ul className="mb-10 space-y-4">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <Check size={18} className="text-gold mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-sans text-offwhite/80">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <MagneticButton
                    href="/booking"
                    className={`w-full py-4 text-center transition-colors text-sm tracking-widest uppercase font-sans border
            ${isPopular
                            ? 'bg-gold text-obsidian border-gold hover:bg-white hover:border-white'
                            : 'border-white/20 text-white hover:border-gold hover:text-gold'}`}
                >
                    Book {tier}
                </MagneticButton>
            </div>
        </div>
    );
};

export default PricingCard;
