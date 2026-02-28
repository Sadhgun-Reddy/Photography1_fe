import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';
import PortfolioGrid from '../components/PortfolioGrid';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
        // Simple parallax for the portfolio banner
        const ctx = gsap.context(() => {
            gsap.to('.banner-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: bannerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <PageTransition>
            <div className="w-full bg-obsidian">

                {/* Parallax Banner */}
                <section ref={bannerRef} className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                    <div
                        className="banner-bg absolute inset-0 bg-cover bg-center opacity-40 grayscale"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2500&auto=format&fit=crop")' }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian"></div>

                    <div className="relative z-10 text-center mt-20">
                        <h1 className="font-serif text-6xl md:text-8xl text-white tracking-widest mb-4">
                            Portfolio
                        </h1>
                        <p className="font-sans text-sm tracking-widest text-offwhite/50 uppercase">
                            A collection of light, shadow, and time
                        </p>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="pt-24 px-6 md:px-12 relative z-20 bg-obsidian">
                    <PortfolioGrid />
                </section>

            </div>
        </PageTransition>
    );
};

export default Portfolio;
