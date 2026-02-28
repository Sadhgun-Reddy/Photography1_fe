
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({ children, className = '', onClick, href }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 1,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (href) {
        return (
            <a
                href={href}
                ref={buttonRef}
                className={`inline-block ${className}`}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`inline-block ${className}`}
        >
            {children}
        </button>
    );
};

export default MagneticButton;
