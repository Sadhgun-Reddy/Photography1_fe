import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, Facebook, Camera } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-obsidian relative overflow-hidden pt-20 pb-10 border-t border-white/5">
            {/* Background Pattern SVG */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="text-3xl font-serif text-white tracking-widest mb-6 block">
                            <span className="text-gold">V</span>IVEK
                        </Link>
                        <p className="text-offwhite/60 font-sans text-sm leading-relaxed mb-6">
                            Capturing life's most fleeting, beautiful moments with an editorial eye and timeless elegance.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-offwhite/60 hover:text-gold hover:border-gold transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-offwhite/60 hover:text-gold hover:border-gold transition-all duration-300">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-offwhite/60 hover:text-gold hover:border-gold transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gold font-accent tracking-widest text-sm mb-6 uppercase">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/portfolio" className="text-offwhite/70 hover:text-white transition-colors text-sm">Portfolio</Link></li>
                            <li><Link to="/about" className="text-offwhite/70 hover:text-white transition-colors text-sm">About Me</Link></li>
                            <li><Link to="/services" className="text-offwhite/70 hover:text-white transition-colors text-sm">Services & Pricing</Link></li>
                            <li><Link to="/contact" className="text-offwhite/70 hover:text-white transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gold font-accent tracking-widest text-sm mb-6 uppercase">Services</h4>
                        <ul className="space-y-4">
                            <li className="text-offwhite/70 text-sm">Wedding Photography</li>
                            <li className="text-offwhite/70 text-sm">Editorial & Fashion</li>
                            <li className="text-offwhite/70 text-sm">Maternity & Baby</li>
                            <li className="text-offwhite/70 text-sm">Commercial Shots</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gold font-accent tracking-widest text-sm mb-6 uppercase">Stay Inspired</h4>
                        <p className="text-offwhite/60 text-sm mb-4">Subscribe to the newsletter for exclusive shoots and offers.</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gold text-obsidian font-medium px-4 py-3 text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-offwhite/40 text-xs mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Vivek Photography. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-offwhite/40 hover:text-offwhite text-xs transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-offwhite/40 hover:text-offwhite text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
