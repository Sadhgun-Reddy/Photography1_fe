import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PageTransition from '../components/PageTransition';
import { MapPin, Phone, Mail, Instagram, ArrowRight } from 'lucide-react';

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message is too short")
});

const Contact = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Contact Data:", data);
    };

    return (
        <PageTransition>
            <div className="w-full bg-obsidian min-h-screen pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">

                    <div className="mb-20 text-center md:text-left">
                        <h1 className="font-serif text-5xl md:text-8xl text-white mb-4">Let's <span className="text-gold italic">Connect</span></h1>
                        <p className="font-sans text-offwhite/50 max-w-xl tracking-wide">
                            Whether you're planning a destination wedding, an editorial campaign, or seeking art prints, I'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Left: Contact Form */}
                        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-md">
                            <h3 className="font-serif text-3xl text-white mb-8">Send an Inquiry</h3>

                            {isSubmitSuccessful ? (
                                <div className="h-64 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-gold mb-6">✓</div>
                                    <h4 className="font-serif text-2xl text-white mb-2">Message Sent</h4>
                                    <p className="text-offwhite/60 font-sans">I'll get back to you directly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <input type="text" {...register("name")} placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-gold transition-colors font-sans placeholder-white/30" />
                                        {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <input type="email" {...register("email")} placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-gold transition-colors font-sans placeholder-white/30" />
                                        {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <textarea {...register("message")} rows={4} placeholder="Tell me about your project..." className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-gold transition-colors font-sans placeholder-white/30 resize-none"></textarea>
                                        {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 mt-8 bg-gold text-obsidian tracking-widest uppercase text-sm font-sans hover:bg-white transition-colors flex justify-center items-center"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight size={18} className="ml-2" />
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Right: Info & Map */}
                        <div className="flex flex-col space-y-12 justify-center">
                            <div>
                                <h4 className="font-serif text-2xl text-gold mb-6">Studio & Details</h4>
                                <div className="space-y-6 font-sans text-offwhite/80">
                                    <div className="flex items-start">
                                        <MapPin className="text-white/40 mr-4 mt-1 flex-shrink-0" size={20} />
                                        <p>125 Fashion Ave, Suite 404<br />New York, NY 10001<br /><span className="text-white/40 text-sm">(By Appointment Only)</span></p>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="text-white/40 mr-4 flex-shrink-0" size={20} />
                                        <p>+1 (212) 555-0198</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="text-white/40 mr-4 flex-shrink-0" size={20} />
                                        <p>hello@Sadhgunphotography.com</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-serif text-2xl text-gold mb-6">Social</h4>
                                <a href="#" className="inline-flex items-center tracking-widest uppercase text-sm font-sans text-white hover:text-gold transition-colors border border-white/10 px-6 py-3 rounded-full hover:border-gold">
                                    <Instagram size={18} className="mr-3" /> @Sadhgun.photography
                                </a>
                            </div>

                            {/* Map Placeholder */}
                            <div className="w-full h-48 bg-white/5 border border-white/10 rounded-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop")' }}></div>
                                <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
                                    <span className="text-white tracking-widest text-sm uppercase">Global Coverage</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
