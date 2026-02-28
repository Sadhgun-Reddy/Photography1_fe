import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';
import { Camera, Aperture, Focus, Award, Shield, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const bioContainerRef = useRef(null);
    const leftColRef = useRef(null);
    const awardStripRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pinning the left column while right column scrolls
            if (window.innerWidth > 768) {
                ScrollTrigger.create({
                    trigger: bioContainerRef.current,
                    start: 'top top+=100',
                    end: 'bottom bottom',
                    pin: leftColRef.current,
                    pinSpacing: false,
                });
            }

            // Horizontal scroll for awards
            gsap.to(awardStripRef.current, {
                xPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: awardStripRef.current.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition>
            <div className="w-full bg-obsidian overflow-hidden">

                {/* Section 1: Hero (Layered Depth Effect) */}
                <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20">
                    {/* Layer 1: Huge Outlined Text */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 whitespace-nowrap overflow-hidden">
                        <h1 className="font-serif text-[15vw] leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)' }}>
                            THE ARTIST
                        </h1>
                    </div>

                    {/* Layer 2: Portrait Image */}
                    <div className="relative z-10 w-full max-w-2xl px-6 pointer-events-none mt-16">
                        <img
                            src="https://images.unsplash.com/photo-1605466436660-f46320579e0a?q=80&w=1200&auto=format&fit=crop"
                            alt="Vivek Portrait"
                            className="w-full h-auto object-cover opacity-90 drop-shadow-2xl grayscale contrast-125"
                        />
                    </div>

                    {/* Layer 3: Overlay Text */}
                    <div className="absolute bottom-10 left-6 md:left-24 z-20">
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-2">Vivek Sharma</h2>
                        <p className="font-sans text-sm tracking-widest text-gold uppercase">Lead Photographer & Director</p>
                    </div>
                </section>

                {/* Section 2: Scrolling Bio (Pinned) */}
                <section ref={bioContainerRef} className="py-32 px-6 md:px-24 border-t border-white/5 relative">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
                        {/* Pinned Left Column (Images) */}
                        <div ref={leftColRef} className="w-full md:w-5/12 hidden md:block relative h-[600px] rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1000&auto=format&fit=crop" alt="Working in studio" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" />
                            <div className="absolute inset-0 border-2 border-gold/30 rounded-2xl m-6 pointer-events-none"></div>
                        </div>

                        {/* Scrolling Right Column (Text) */}
                        <div className="w-full md:w-7/12 py-10">
                            <h2 className="font-serif text-5xl text-white mb-10 leading-tight">
                                Chasing light for over <br /><span className="text-gold italic">a decade.</span>
                            </h2>

                            <div className="space-y-8 font-sans text-offwhite/70 text-lg leading-relaxed">
                                <p>
                                    My journey began with a borrowed 35mm film camera in the streets of Mumbai.
                                    What started as a fascination with freezing time quickly evolved into a lifelong
                                    pursuit of cinematic beauty in the real world.
                                </p>
                                <p>
                                    I don't just want to take your picture. I want to tell your story in a way that feels
                                    authentic, editorial, and utterly timeless. My approach blends the raw emotion of photojournalism
                                    with the precise lighting and composition of high-fashion editorial.
                                </p>
                                <p className="text-xl text-white font-serif italic border-l-2 border-gold pl-6 py-2">
                                    "Every person, every brand, every couple has a unique cinematic signature. My job is to find it."
                                </p>
                                <p>
                                    Today, I lead a boutique agency that serves discerning clients globally, from intimate destination
                                    weddings in Tuscany to high-impact commercial campaigns in New York.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Equipment */}
                <section className="py-24 bg-[#080808] border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-24">
                        <div className="text-center mb-16">
                            <h3 className="font-sans tracking-widest text-sm text-gold uppercase mb-4">The Toolkit</h3>
                            <h2 className="font-serif text-4xl text-white">Uncompromising Quality</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: <Camera size={32} />, title: "Digital Medium Format", desc: "Fujifilm GFX 100S & Hasselblad X2D for unparalleled detail and dynamic range in editorial work." },
                                { icon: <Aperture size={32} />, title: "Prime Glass", desc: "A curated collection of Canon L-series and Leica prime lenses (35mm f/1.4, 50mm f/1.2, 85mm f/1.2)." },
                                { icon: <Focus size={32} />, title: "Lighting & Cinema", desc: "Profoto studio lighting systems and Arri continuous lights to sculpt the perfect scene." },
                            ].map((item, i) => (
                                <div key={i} className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-xl flex flex-col items-center text-center">
                                    <div className="text-gold mb-6">{item.icon}</div>
                                    <h4 className="font-serif text-2xl text-white mb-4">{item.title}</h4>
                                    <p className="text-offwhite/50 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 4: Awards Marquee */}
                <section className="py-20 bg-obsidian overflow-hidden">
                    <div className="mb-12 text-center">
                        <h2 className="font-serif text-3xl text-offwhite/50">Featured & Recognized By</h2>
                    </div>
                    <div className="relative w-full flex whitespace-nowrap overflow-hidden">
                        <div ref={awardStripRef} className="flex gap-20 items-center px-10 text-white/30 font-serif text-3xl uppercase tracking-widest">
                            <span>Vogue Magazine</span>
                            <span>•</span>
                            <span>Harper's Bazaar</span>
                            <span>•</span>
                            <span>Sony World Photography Awards</span>
                            <span>•</span>
                            <span>GQ India</span>
                            <span>•</span>
                            <span>Wedded Wonderland</span>
                            <span>•</span>
                            {/* Duplicates for loop */}
                            <span>Vogue Magazine</span>
                            <span>•</span>
                            <span>Harper's Bazaar</span>
                            <span>•</span>
                            <span>Sony World Photography Awards</span>
                            <span>•</span>
                        </div>
                    </div>
                </section>

                {/* Section 5: Core Values */}
                <section className="py-32 bg-[#050505] relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                        <div className="text-center mb-20 flex flex-col items-center">
                            <span className="w-px h-16 bg-gold mb-8 block"></span>
                            <h2 className="font-serif text-4xl md:text-5xl text-white">Philosophy</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                { icon: <Award className="mb-6 text-gold" size={40} strokeWidth={1} />, title: 'Excellence', desc: 'Every frame is meticulously planned, captured, and retouched to meet the highest global standards.' },
                                { icon: <Heart className="mb-6 text-gold" size={40} strokeWidth={1} />, title: 'Empathy', desc: 'Great portraits require trust. I prioritize creating a comfortable, empowering environment for every subject.' },
                                { icon: <Shield className="mb-6 text-gold" size={40} strokeWidth={1} />, title: 'Discretion', desc: 'Serving high-profile clients globally with strict NDAs and absolute privacy guaranteed.' },
                            ].map((value, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    {value.icon}
                                    <h3 className="font-serif text-2xl text-white mb-4">{value.title}</h3>
                                    <p className="text-offwhite/60 leading-relaxed font-sans">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default About;
