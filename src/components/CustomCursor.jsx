import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        // Hide native cursor completely using CSS class added to body

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Move the small dot instantly
            gsap.to(cursorDot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out',
            });

            // Move the larger circle with a slight lag
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: 'power3.out',
            });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // If hovering over links, buttons, or images
            const isHoverable = target.closest('a') || target.closest('button') || target.tagName.toLowerCase() === 'img';

            if (isHoverable) {
                gsap.to(cursor, {
                    scale: 2,
                    backgroundColor: 'rgba(201, 168, 76, 0.1)', // Gold tint
                    borderColor: '#C9A84C',
                    duration: 0.3,
                });
                gsap.to(cursorDot, {
                    scale: 0,
                    duration: 0.3,
                });
            } else {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    duration: 0.3,
                });
                gsap.to(cursorDot, {
                    scale: 1,
                    duration: 0.3,
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ></div>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ></div>
        </>
    );
};

export default CustomCursor;
