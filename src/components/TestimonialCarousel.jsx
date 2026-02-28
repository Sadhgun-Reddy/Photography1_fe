import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Eleanor & James",
        event: "Lake Como Wedding",
        rating: 5,
        quote: "Sadhgun doesn't just take pictures; he captures the very essence of the moment. Looking at our album feels like reliving the magic all over again."
    },
    {
        id: 2,
        name: "Vogue India",
        event: "Editorial Spring '23",
        rating: 5,
        quote: "An absolute master of light and shadow. The cinematic quality Sadhgun brings to fashion photography is unparalleled in the industry right now."
    },
    {
        id: 3,
        name: "Sophia Rossi",
        event: "Maternity Session",
        rating: 5,
        quote: "I felt so beautiful and empowered during our shoot. The portraits are timeless works of art that our family will cherish for generations."
    },
    {
        id: 4,
        name: "The Grand Hotel",
        event: "Commercial Campaign",
        rating: 5,
        quote: "Professional, visionary, and exact. Sadhgun elevated our brand imagery to a global luxury standard."
    }
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Helper to determine the position of a card relative to the center
    const getIndexOffset = (index) => {
        const diff = index - currentIndex;
        if (diff < -1) return diff + testimonials.length;
        if (diff > 1) return diff - testimonials.length;
        return diff;
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center perspective-[1000px]">

            {testimonials.map((testimonial, index) => {
                const offset = getIndexOffset(index);
                const isActive = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                // Only render the 3 visible cards to save performance
                if (Math.abs(offset) > 1) return null;

                let zIndex = isActive ? 30 : 20;
                let xPos = isActive ? '0%' : isLeft ? '-40%' : '40%';
                let rotateY = isActive ? 0 : isLeft ? 15 : -15;
                let scale = isActive ? 1 : 0.85;
                let opacity = isActive ? 1 : 0.5;

                return (
                    <motion.div
                        key={testimonial.id}
                        initial={false}
                        animate={{
                            x: xPos,
                            rotateY: rotateY,
                            scale: scale,
                            opacity: opacity,
                            zIndex: zIndex
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute w-full max-w-lg p-8 md:p-12 rounded-xl bg-obsidian border border-white/10 shadow-2xl backdrop-blur-md transform-gpu ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => {
                            if (isLeft) prevSlide();
                            if (isRight) nextSlide();
                        }}
                    >
                        <div className="flex text-gold mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={18} fill="#C9A84C" stroke="none" className="mr-1" />
                            ))}
                        </div>

                        <p className="font-serif text-xl md:text-2xl text-offwhite leading-relaxed mb-8 italic">
                            "{testimonial.quote}"
                        </p>

                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-white/10 mr-4"></div>
                            <div>
                                <h4 className="font-serif text-gold text-lg">{testimonial.name}</h4>
                                <p className="font-sans text-xs text-offwhite/50 tracking-wider uppercase">{testimonial.event}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}

            {/* Manual Controls */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-6 z-40">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

        </div>
    );
};

export default TestimonialCarousel;
