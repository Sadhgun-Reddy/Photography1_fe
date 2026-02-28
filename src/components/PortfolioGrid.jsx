import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const categories = ["All", "Weddings", "Fashion", "Events", "Commercial"];

// Mock Portfolio Data
const mockPortfolio = [
    { id: 1, category: "Weddings", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop", title: "Lake Como Affair", date: "Sep 2023", height: "h-[500px]" },
    { id: 2, category: "Fashion", src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop", title: "Autumn Vogue", date: "Nov 2023", height: "h-[700px]" },
    { id: 3, category: "Commercial", src: "https://images.unsplash.com/photo-1558223363-f2eb01ec7497?q=80&w=1000&auto=format&fit=crop", title: "Chanel N°5", date: "Jan 2024", height: "h-[450px]" },
    { id: 4, category: "Weddings", src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", title: "Tuscan Vows", date: "Oct 2023", height: "h-[650px]" },
    { id: 5, category: "Events", src: "https://images.unsplash.com/photo-1511795409834-432f7b1728d2?q=80&w=1000&auto=format&fit=crop", title: "Gala Dinner", date: "Dec 2023", height: "h-[500px]" },
    { id: 6, category: "Fashion", src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop", title: "Paris Runway", date: "Feb 2024", height: "h-[600px]" },
    { id: 7, category: "Commercial", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", title: "Porsche Reveal", date: "Mar 2024", height: "h-[550px]" },
    { id: 8, category: "Weddings", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop", title: "Aman Tokyo", date: "Apr 2024", height: "h-[500px]" },
    { id: 9, category: "Fashion", src: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=1000&auto=format&fit=crop", title: "Milan Excl.", date: "May 2024", height: "h-[750px]" }
];

const PortfolioGrid = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [filteredItems, setFilteredItems] = useState(mockPortfolio);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const gridRef = useRef(null);

    useEffect(() => {
        // Filter
        const results = activeCategory === "All"
            ? mockPortfolio
            : mockPortfolio.filter(item => item.category === activeCategory);

        setFilteredItems(results);
    }, [activeCategory]);

    useEffect(() => {
        // Staggered fade up animation on items change
        if (gridRef.current && filteredItems.length > 0) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
            );
        }
    }, [filteredItems]);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const slides = filteredItems.map(item => ({
        src: item.src,
        title: item.title,
        description: `${item.date} • ${item.category}`
    }));

    // Create columns for masonry (3 cols on desktop)
    const columns = [[], [], []];
    filteredItems.forEach((item, i) => {
        columns[i % 3].push(item);
    });

    return (
        <div className="w-full max-w-7xl mx-auto pb-32">

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 relative z-20">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative text-sm tracking-widest uppercase font-sans pb-2 transition-colors duration-300
              ${activeCategory === cat ? 'text-gold' : 'text-offwhite/50 hover:text-white'}`}
                    >
                        {cat}
                        <span className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-500 ease-out-expo ${activeCategory === cat ? 'w-full' : 'w-0'}`}></span>
                    </button>
                ))}
            </div>

            {/* Masonry Grid (CSS Columns approximation) */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-6">
                        {column.map((item) => {
                            // Find index in original filtered array for lightbox
                            const originalIndex = filteredItems.findIndex(f => f.id === item.id);
                            return (
                                <div
                                    key={item.id}
                                    className={`relative w-full ${item.height} rounded-lg overflow-hidden group cursor-pointer`}
                                    onClick={() => openLightbox(originalIndex)}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <p className="text-gold font-sans text-xs tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{item.category}</p>
                                        <h3 className="font-serif text-3xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button className="px-8 py-3 border border-white/20 text-white/50 hover:text-white hover:border-gold transition-colors font-sans tracking-widest text-xs uppercase">
                    Load More
                </button>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={currentIndex}
                slides={slides}
                plugins={[Zoom, Captions]}
                carousel={{ finite: false }}
                render={{
                    iconClose: () => <span className="text-4xl hover:text-gold transition-colors block p-4">×</span>,
                    iconPrev: () => <span className="font-serif text-5xl hover:text-gold transition-colors pl-8">‹</span>,
                    iconNext: () => <span className="font-serif text-5xl hover:text-gold transition-colors pr-8">›</span>,
                }}
                styles={{
                    container: { backgroundColor: "rgba(10, 10, 10, 0.95)" },
                    captionsTitleContainer: { color: "#C9A84C", fontFamily: "Playfair Display, serif", fontSize: "1.5rem" },
                    captionsDescriptionContainer: { color: "#EDEDED", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.75rem" }
                }}
                animation={{ fade: 400, swipe: 400, zoom: 400 }}
            />
        </div>
    );
};

export default PortfolioGrid;
