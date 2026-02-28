import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import PricingCard from '../components/PricingCard';

const categories = ["Weddings", "Fashion", "Events", "Commercial"];

const pricingData = {
    "Weddings": [
        { tier: "Essential", price: "3500", duration: "8 Hours Coverage", category: "Weddings", isPopular: false, features: ["1 Photographer", "High-Res Digital Gallery", "Print Preview Box", "Travel within 50 miles"] },
        { tier: "Editorial", price: "5500", duration: "10 Hours Coverage", category: "Weddings", isPopular: true, features: ["2 Photographers", "High-Res Digital Gallery", "10x10 Luxury Album", "Engagement Session", "Travel within 100 miles"] },
        { tier: "The Heirloom", price: "8500", duration: "Full Weekend Coverage", category: "Weddings", isPopular: false, features: ["Lead Photographer + 2 Associates", "Rehearsal Dinner Coverage", "12x12 Premium Album", "2 Parent Albums", "Global Travel Included"] }
    ],
    "Fashion": [
        { tier: "Lookbook", price: "1500", duration: "Half Day Studio", category: "Fashion", isPopular: false, features: ["1 Model Focus", "2 Looks/Changes", "15 Retouched Images", "Digital Usage Rights"] },
        { tier: "Editorial", price: "3200", duration: "Full Day Location", category: "Fashion", isPopular: true, features: ["Full Creative Direction", "Up to 5 Looks", "30 Retouched Images", "Commercial Usage Rights", "Behind the Scenes Video"] },
        { tier: "Campaign", price: "6500", duration: "Multi-Day Project", category: "Fashion", isPopular: false, features: ["Extensive Location Scouting", "Unlimited Looks", "Full Image Catalog", "Global Buyout Rights", "Dedicated Retoucher"] }
    ],
    "Events": [
        { tier: "Social", price: "800", duration: "4 Hours Coverage", category: "Events", isPopular: false, features: ["1 Photographer", "Online Digital Gallery", "Standard Editing", "Next-Day Teasers"] },
        { tier: "Gala", price: "1800", duration: "8 Hours Coverage", category: "Events", isPopular: true, features: ["2 Photographers", "Step & Repeat Setup", "Expedited 7-Day Delivery", "Media Wall Licensing"] },
        { tier: "Festival", price: "4000", duration: "3 Day Pass", category: "Events", isPopular: false, features: ["Team of 3 Photographers", "Live Editing Station", "Instant Social Delivery", "Complete Event Documentation"] }
    ],
    "Commercial": [
        { tier: "Social Media", price: "1200", duration: "Half Day Base", category: "Commercial", isPopular: false, features: ["Product/Brand Focus", "20 Web-Ready Images", "1 Year Social Rights", "Basic Prop Styling"] },
        { tier: "Brand Identity", price: "3500", duration: "Full Day Base", category: "Commercial", isPopular: true, features: ["Hero & Lifestyle Images", "50 Hi-Res Deliverables", "5 Year Web/Print Rights", "Collaborative Moodboard"] },
        { tier: "Global Ads", price: "Custom", duration: "Retainer Available", category: "Commercial", isPopular: false, features: ["Extensive Pre-Production", "Full Crew Management", "Perpetual Buyout Licensing", "Priority Scheduling"] }
    ],
};

const faqs = [
    { q: "How far in advance should we book?", a: "For weddings and major events, I recommend inquiring 9-12 months in advance. For fashion and commercial shoots, a 4-8 week lead time is usually sufficient." },
    { q: "Do you travel for shoots?", a: "Absolutely. I am based in New York but hold a valid passport and travel globally for destination weddings and international campaigns. Travel fees are custom calculated based on location." },
    { q: "How many images will we receive?", a: "This varies by package. A typical editorial wedding yields 60-80 final, meticulously edited images per hour of coverage. I prioritize quality and storytelling over sheer quantity." },
    { q: "Can we get the unedited RAW files?", a: "To ensure my standard of quality and artistic vision is maintained, I do not release unedited or RAW digital files. The final, retouched images represent my completed work." },
    { q: "What is your payment structure?", a: "A 30% non-refundable retainer and signed contract are required to secure your date. The remaining balance is divided into manageable installments leading up to the shoot date." }
];

const Services = () => {
    const [activeTab, setActiveTab] = useState("Weddings");
    const [openFaq, setOpenFaq] = useState(0);
    const cardsContainerRef = useRef(null);

    useEffect(() => {
        // Animate cards on tab change
        if (cardsContainerRef.current) {
            gsap.fromTo(cardsContainerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }
            );

            // Animate price counters
            gsap.utils.toArray('.counter-up').forEach((el) => {
                const val = parseInt(el.innerText.replace(/,/g, ''), 10);
                if (!isNaN(val)) {
                    gsap.fromTo(el, { innerText: 0 }, {
                        innerText: val,
                        duration: 1.5,
                        ease: 'power3.out',
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%'
                        }
                    });
                }
            });
        }
    }, [activeTab]);

    return (
        <PageTransition>
            <div className="w-full bg-obsidian text-white">

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 text-center border-b border-white/5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose/5 blur-[120px] pointer-events-none -z-10"></div>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6">Invest in <span className="text-gold italic">Art</span></h1>
                    <p className="font-sans text-offwhite/50 max-w-2xl mx-auto leading-relaxed">
                        Transparent pricing for uncompromising quality. Select an experience tailored to your unique specific requirements.
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-16 pb-4 border-b border-white/10 max-w-4xl mx-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`relative text-xs md:text-sm tracking-widest uppercase font-sans pb-4 transition-colors duration-300
                  ${activeTab === cat ? 'text-gold' : 'text-offwhite/50 hover:text-white'}`}
                            >
                                {cat}
                                {activeTab === cat && (
                                    <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-gold"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Pricing Cards Section */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
                        {pricingData[activeTab].map((pkg, i) => (
                            <PricingCard key={i} {...pkg} />
                        ))}
                    </div>
                </section>

                {/* Add-ons Section */}
                <section className="py-24 bg-[#080808] border-y border-white/5 px-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">A La Carte <span className="text-gold italic">Add-ons</span></h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Engagement Session", price: "800" },
                                { title: "Additional Hour", price: "500" },
                                { title: "Drone Coverage", price: "950" },
                                { title: "Second Shooter", price: "1200" },
                                { title: "Rush Editing (7 Days)", price: "1500" },
                                { title: "Parent Album", price: "600" },
                                { title: "Raw Video Footage", price: "1000" },
                                { title: "Custom USB Box", price: "150" }
                            ].map((addon, i) => (
                                <div key={i} className="bg-obsidian border border-white/5 p-6 rounded-xl hover:border-gold/30 transition-colors cursor-default">
                                    <h4 className="font-serif text-lg text-white mb-2">{addon.title}</h4>
                                    <p className="font-sans text-gold text-lg">+${addon.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 px-6 max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl">Client <span className="text-gold italic">Questions</span></h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
                                >
                                    <span className="font-serif text-lg md:text-xl text-white pr-8">{faq.q}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-gold transform transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out
                    ${openFaq === i ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="w-12 h-px bg-gold/50 mb-4"></div>
                                    <p className="font-sans text-offwhite/60 leading-relaxed text-sm md:text-base">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default Services;
