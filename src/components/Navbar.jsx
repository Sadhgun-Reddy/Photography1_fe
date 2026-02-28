import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 flex justify-between items-center
        ${scrolled ? 'bg-obsidian/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent'}`}
            >
                <Link to="/" className="text-2xl font-serif text-white tracking-widest relative group">
                    <span className="text-gold">V</span>IVEK
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm tracking-wide transition-colors duration-300 hover:text-gold uppercase
                ${location.pathname === link.path ? 'text-gold' : 'text-offwhite/80'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/booking"
                        className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors duration-300 tracking-wider text-sm uppercase"
                    >
                        Book Session
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white z-50 mix-blend-difference"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-obsidian z-40 flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center space-y-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    key={link.name}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-4xl font-serif text-white hover:text-gold transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="pt-8 flex space-x-6"
                            >
                                <a href="#" className="text-offwhite/50 hover:text-gold transition-colors"><Instagram /></a>
                                <a href="#" className="text-offwhite/50 hover:text-gold transition-colors"><Twitter /></a>
                                <a href="#" className="text-offwhite/50 hover:text-gold transition-colors"><Mail /></a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
