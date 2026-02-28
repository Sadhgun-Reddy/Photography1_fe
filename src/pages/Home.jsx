import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from '../components/HeroCanvas';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { ArrowRight, Instagram, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const bentoRef = useRef(null);
    const textRevealRef = useRef(null);

    // Parallax featured images
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Marquee animation
            gsap.to('.marquee-inner', {
                xPercent: -50,
                ease: 'none',
                duration: 20,
                repeat: -1,
            });

            // Bento Grid Parallax
            gsap.utils.toArray('.bento-img').forEach((img, i) => {
                gsap.to(img, {
                    yPercent: 15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });

            // Split Text Reveal (Manual span animation as SplitText is premium)
            const quoteWords = gsap.utils.toArray('.quote-word');
            gsap.fromTo(quoteWords,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: textRevealRef.current,
                        start: 'top 75%',
                    }
                }
            );

        });
        return () => ctx.revert();
    }, []);

    return (
        <PageTransition>
            <div className="w-full bg-obsidian">

                {/* Section 1: Hero (Full Viewport, 3D) */}
                <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                    <HeroCanvas />

                    <div className="relative z-10 text-center flex flex-col items-center select-none pointer-events-none mt-20">
                        <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold mb-6 uppercase">
                            Capturing Moments. Creating Memories.
                        </p>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-widest mb-6 mix-blend-difference">
                            Sadhgun
                        </h1>
                        <p className="font-sans text-sm md:text-base text-offwhite/80 tracking-widest uppercase mb-12">
                            Wedding · Fashion · Editorial · Fine Art
                        </p>

                        <div className="flex space-x-6 pointer-events-auto">
                            <MagneticButton href="/portfolio" className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors duration-500 font-sans tracking-widest text-sm uppercase">
                                View Portfolio
                            </MagneticButton>
                            <MagneticButton href="/booking" className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-obsidian transition-colors duration-500 font-sans tracking-widest text-sm uppercase">
                                Book a Session
                            </MagneticButton>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
                    </div>
                </section>

                {/* Section 2: Stats Bar (Marquee) */}
                <section className="w-full py-4 border-y border-white/10 bg-white/5 backdrop-blur-md overflow-hidden relative z-20">
                    <div className="flex whitespace-nowrap marquee-inner opacity-70">
                        <span className="text-sm font-sans tracking-widest uppercase px-8">500+ Weddings</span>
                        <span className="text-gold px-2">·</span>
                        <span className="text-sm font-sans tracking-widest uppercase px-8">10 Years Experience</span>
                        <span className="text-gold px-2">·</span>
                        <span className="text-sm font-sans tracking-widest uppercase px-8">Featured in Vogue</span>
                        <span className="text-gold px-2">·</span>
                        <span className="text-sm font-sans tracking-widest uppercase px-8">50+ Brand Campaigns</span>
                        <span className="text-gold px-2">·</span>
                        {/* Duplicate for seamless looping */}
                        <span className="text-sm font-sans tracking-widest uppercase px-8">500+ Weddings</span>
                        <span className="text-gold px-2">·</span>
                        <span className="text-sm font-sans tracking-widest uppercase px-8">10 Years Experience</span>
                        <span className="text-gold px-2">·</span>
                        <span className="text-sm font-sans tracking-widest uppercase px-8">Featured in Vogue</span>
                        <span className="text-gold px-2">·</span>
                        <span className="text-sm font-sans tracking-widest uppercase px-8">50+ Brand Campaigns</span>
                        <span className="text-gold px-2">·</span>
                    </div>
                </section>

                {/* Section 3: Featured Work (Bento Grid) */}
                <section ref={bentoRef} className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto z-20 relative bg-obsidian">
                    <div className="mb-20 flex justify-between items-end">
                        <div>
                            <h2 className="font-serif text-5xl md:text-6xl text-white mb-4">Featured <span className="text-gold italic">Work</span></h2>
                            <p className="text-offwhite/50 max-w-md">A curated selection of my most recent and defining works across different disciplines.</p>
                        </div>
                        <MagneticButton href="/portfolio" className="hidden md:flex items-center text-sm tracking-widest uppercase border-b border-gold text-gold pb-1 hover:text-white hover:border-white transition-colors">
                            Explore All <ArrowRight size={16} className="ml-2" />
                        </MagneticButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
                        {/* Main large block */}
                        <div className="md:col-span-2 md:row-span-2 bg-white/5 rounded-2xl overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="bento-img w-full h-[120%] bg-cover bg-center -mt-[10%]" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop")' }}></div>
                            </div>
                            <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className="text-gold font-sans text-xs tracking-widest uppercase mb-2">Editorial Wedding</span>
                                <h3 className="text-3xl font-serif text-white mb-4">The Lake Como Affair</h3>
                                <span className="inline-block w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300"></span>
                            </div>
                        </div>

                        {/* Video block */}
                        <div className="md:col-span-1 md:row-span-1 bg-white/5 rounded-2xl overflow-hidden relative group cursor-pointer">
                            {/* Fallback image to simulate video block */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="bento-img w-full h-[120%] bg-cover bg-center -mt-[10%] opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop")' }}></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/80 transition-all duration-300">
                                    <Play size={20} className="text-white ml-1" fill="white" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1 md:row-span-1 bg-white/5 rounded-2xl overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="bento-img w-full h-[120%] bg-cover bg-center -mt-[10%]" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop")' }}></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex items-end">
                                <p className="font-serif text-xl">Fashion Week '23</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 md:row-span-1 bg-white/5 rounded-2xl overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="bento-img w-full h-[120%] bg-cover bg-center -mt-[10%]" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop")' }}></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                                <span className="text-gold font-sans text-xs tracking-widest uppercase mb-2">Commercial</span>
                                <h3 className="text-2xl font-serif text-white">Aston Martin Reserve</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Services Snapshot (3D Floating Cards) */}
                <section className="py-32 px-6 bg-obsidian relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20 animate-on-scroll">
                            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Mastery in <span className="text-gold italic">Every Frame</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
                            {/* Card 1 */}
                            <div className="group h-[500px] perspective-[1000px]">
                                <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                                    {/* Front */}
                                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                        <h3 className="font-serif text-3xl mb-4 text-center">Wedding<br />Photography</h3>
                                        <div className="w-12 h-[1px] bg-gold mb-6 relative">
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gold bg-obsidian"></span>
                                        </div>
                                        <p className="text-offwhite/50 text-center font-sans">Timeless elegance for your most important day.</p>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-obsidian to-[#111] border border-gold/30 rounded-2xl text-center">
                                        <p className="font-serif text-lg mb-6 leading-relaxed">Comprehensive coverage, second shooter, and luxury flush-mount albums.</p>
                                        <p className="font-sans text-xs tracking-widest text-offwhite/50 uppercase mb-2">Packages Starting From</p>
                                        <p className="font-serif text-3xl text-gold mb-8">$4,500</p>
                                        <MagneticButton href="/services" className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-xs uppercase tracking-widest">Pricing Details</MagneticButton>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group h-[500px] perspective-[1000px]">
                                <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md translate-y-8 md:translate-y-12">
                                        <h3 className="font-serif text-3xl mb-4 text-center">Fashion &<br />Editorial</h3>
                                        <div className="w-12 h-[1px] bg-gold mb-6 relative">
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gold bg-obsidian"></span>
                                        </div>
                                        <p className="text-offwhite/50 text-center font-sans">Bold, cinematic, and magazine-ready.</p>
                                    </div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-obsidian to-[#111] border border-gold/30 rounded-2xl text-center translate-y-8 md:translate-y-12">
                                        <p className="font-serif text-lg mb-6 leading-relaxed">Studio or location shoots with full creative direction and retouching.</p>
                                        <p className="font-sans text-xs tracking-widest text-offwhite/50 uppercase mb-2">Packages Starting From</p>
                                        <p className="font-serif text-3xl text-gold mb-8">$2,000</p>
                                        <MagneticButton href="/services" className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-xs uppercase tracking-widest">Pricing Details</MagneticButton>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group h-[500px] perspective-[1000px]">
                                <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                        <h3 className="font-serif text-3xl mb-4 text-center">Fine Art<br />Portraits</h3>
                                        <div className="w-12 h-[1px] bg-gold mb-6 relative">
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gold bg-obsidian"></span>
                                        </div>
                                        <p className="text-offwhite/50 text-center font-sans">Capturing raw emotion and true character.</p>
                                    </div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-obsidian to-[#111] border border-gold/30 rounded-2xl text-center">
                                        <p className="font-serif text-lg mb-6 leading-relaxed">Intimate sessions resulting in heirloom quality prints and canvases.</p>
                                        <p className="font-sans text-xs tracking-widest text-offwhite/50 uppercase mb-2">Packages Starting From</p>
                                        <p className="font-serif text-3xl text-gold mb-8">$950</p>
                                        <MagneticButton href="/services" className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-xs uppercase tracking-widest">Pricing Details</MagneticButton>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Section 5: About Teaser */}
                <section ref={textRevealRef} className="py-32 px-6 md:px-12 bg-[#0d0d0d] overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute -inset-4 border border-gold/30 translate-x-4 translate-y-4 rounded-xl -z-10"></div>
                            <img src="https://images.unsplash.com/photo-1554046920-90dc20695352?q=80&w=1000&auto=format&fit=crop" alt="Photographer" className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                                <span className="block text-gold italic mb-2">"Every frame tells</span>
                                {"a story I was born to tell."}
                            </h2>

                            <div className="font-sans text-offwhite/70 leading-relaxed mb-10 text-lg">
                                {"Photography is more than releasing a shutter. It’s the art of observation. Over the last decade, I've dedicated myself to pursuing the extraordinary in the mundane, and the cinematic in the real."
                                    .split(' ')
                                    .map((word, i) => (
                                        <span key={i} className="quote-word inline-block mr-1.5 opacity-0 translate-y-2">{word}</span>
                                    ))
                                }
                            </div>

                            <MagneticButton href="/about" className="group flex items-center text-sm tracking-widest uppercase text-gold">
                                <span>Read My Story</span>
                                <span className="ml-4 w-12 h-[1px] bg-gold group-hover:w-20 transition-all duration-300 relative">
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t border-r border-gold rotate-45 group-hover:translate-x-full transition-all"></span>
                                </span>
                            </MagneticButton>
                        </div>
                    </div>
                </section>

                {/* Section 6: Testimonials */}
                <section className="py-32 bg-obsidian border-y border-white/5 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-rose/5 blur-[150px] rounded-full pointer-events-none"></div>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Client <span className="text-gold italic">Stories</span></h2>
                    </div>
                    <TestimonialCarousel />
                </section>

                {/* Section 7: Instagram Feed */}
                <section className="py-24 bg-[#080808]">
                    <div className="text-center mb-12 flex flex-col items-center">
                        <Instagram className="text-gold mb-4" size={32} />
                        <h2 className="font-serif text-3xl text-white mb-2">Follow The Journey</h2>
                        <a href="#" className="font-sans text-sm tracking-widest text-offwhite/50 hover:text-white uppercase transition-colors">@Sadhgun.photography</a>
                    </div>

                    {/* Mock Instagram Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <a key={i} href="#" className="relative aspect-square group overflow-hidden block">
                                <img src={`https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop&sig=${i}`} alt="Instagram Post" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Instagram className="text-obsidian" size={24} />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default Home;
