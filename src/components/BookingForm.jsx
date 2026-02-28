import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Video, Briefcase, Calendar, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const schema = z.object({
    serviceType: z.string().min(1, "Please select a service type"),
    date: z.string().min(1, "Please select a date"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    venue: z.string().min(2, "Venue is required"),
    details: z.string().optional(),
});

const servicesList = [
    { id: 'wedding', label: 'Wedding Photography', icon: <Camera size={24} /> },
    { id: 'fashion', label: 'Fashion & Editorial', icon: <ImageIcon size={24} /> },
    { id: 'events', label: 'Event Coverage', icon: <Video size={24} /> },
    { id: 'commercial', label: 'Commercial Shots', icon: <Briefcase size={24} /> },
];

const BookingForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            serviceType: '',
            date: '',
            name: '',
            email: '',
            phone: '',
            venue: '',
            details: ''
        }
    });

    const formValues = watch();

    const nextStep = async () => {
        let fieldsToValidate = [];
        if (step === 1) fieldsToValidate = ['serviceType'];
        if (step === 2) fieldsToValidate = ['date'];
        if (step === 3) fieldsToValidate = ['name', 'email', 'phone', 'venue'];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Booking Data: ", data);

        setIsSubmitting(false);
        setIsSuccess(true);
        setStep(5);

        // Confetti effect
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C9A84C', '#FFFFFF', '#D4A5A5']
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden relative min-h-[600px] flex flex-col">

            {/* Progress Bar (Hidden on Success) */}
            {!isSuccess && (
                <div className="px-8 pt-10 pb-6 border-b border-white/10 bg-black/20">
                    <div className="flex justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 -z-10 rounded">
                            <motion.div
                                className="h-full bg-gold rounded"
                                initial={{ width: 0 }}
                                animate={{ width: `${((step - 1) / 3) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {['Service', 'Date', 'Details', 'Review'].map((label, idx) => {
                            const currentStep = idx + 1;
                            const isActive = step >= currentStep;
                            return (
                                <div key={label} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-sans mb-2 transition-colors duration-500 shadow-xl
                    ${isActive ? 'bg-gold text-obsidian border-2 border-obsidian' : 'bg-obsidian border border-white/20 text-white/50'}`}>
                                        {isActive && currentStep < step ? <CheckCircle size={16} /> : currentStep}
                                    </div>
                                    <span className={`text-xs uppercase tracking-widest font-sans ${isActive ? 'text-gold' : 'text-offwhite/50'}`}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Form Area */}
            <div className="flex-1 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
                    <AnimatePresence mode="wait">

                        {/* Step 1: Select Service */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="font-serif text-3xl text-white mb-2">What are we creating?</h3>
                                    <p className="text-offwhite/50 font-sans tracking-wide">Select the primary service you are interested in.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {servicesList.map((service) => {
                                        const isSelected = formValues.serviceType === service.id;
                                        return (
                                            <div
                                                key={service.id}
                                                onClick={() => setValue("serviceType", service.id)}
                                                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 flex items-center
                          ${isSelected ? 'bg-gold/10 border-gold' : 'bg-obsidian border-white/10 hover:border-gold/50'}`}
                                            >
                                                <div className={`mr-4 ${isSelected ? 'text-gold' : 'text-white/50'}`}>
                                                    {service.icon}
                                                </div>
                                                <span className={`font-serif text-xl ${isSelected ? 'text-gold' : 'text-white'}`}>
                                                    {service.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.serviceType && <p className="text-red-400 text-sm mt-4 text-center">{errors.serviceType.message}</p>}
                            </motion.div>
                        )}

                        {/* Step 2: Pick Date */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 flex flex-col items-center justify-center h-full"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="font-serif text-3xl text-white mb-2">When is the magic happening?</h3>
                                    <p className="text-offwhite/50 font-sans tracking-wide">Select your preferred date for the shoot or event.</p>
                                </div>

                                <div className="w-full max-w-sm">
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
                                        <input
                                            type="date"
                                            {...register("date")}
                                            className="w-full bg-obsidian border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold font-sans min-h-[60px]"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    {errors.date && <p className="text-red-400 text-sm mt-4 text-center">{errors.date.message}</p>}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Event Details */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="font-serif text-3xl text-white mb-2">The finer details</h3>
                                    <p className="text-offwhite/50 font-sans tracking-wide">Tell me a little more about yourself and the event.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Full Name</label>
                                        <input type="text" {...register("name")} className="w-full bg-obsidian border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Emma Watson" />
                                        {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Email</label>
                                        <input type="email" {...register("email")} className="w-full bg-obsidian border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="emma@example.com" />
                                        {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Phone</label>
                                        <input type="tel" {...register("phone")} className="w-full bg-obsidian border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="+1 (555) 000-0000" />
                                        {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Venue / Location</label>
                                        <input type="text" {...register("venue")} className="w-full bg-obsidian border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="The Plaza Hotel, NYC" />
                                        {errors.venue && <p className="text-red-400 text-xs mt-2">{errors.venue.message}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Additional Details & Vision</label>
                                        <textarea {...register("details")} rows={4} className="w-full bg-obsidian border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell me about your vibe, specific shots you want, or anything else..."></textarea>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Review & Confirm */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="font-serif text-3xl text-white mb-2">Review & Request</h3>
                                    <p className="text-offwhite/50 font-sans tracking-wide">Please confirm your details before submitting.</p>
                                </div>

                                <div className="bg-obsidian border border-gold/30 rounded-xl p-8 max-w-2xl mx-auto space-y-6">
                                    <div className="grid grid-cols-2 border-b border-white/5 pb-4">
                                        <span className="text-gold text-sm tracking-widest uppercase">Service</span>
                                        <span className="text-white font-serif">{servicesList.find(s => s.id === formValues.serviceType)?.label}</span>
                                    </div>
                                    <div className="grid grid-cols-2 border-b border-white/5 pb-4">
                                        <span className="text-gold text-sm tracking-widest uppercase">Date</span>
                                        <span className="text-white font-serif">{formValues.date}</span>
                                    </div>
                                    <div className="grid grid-cols-2 border-b border-white/5 pb-4">
                                        <span className="text-gold text-sm tracking-widest uppercase">Client Name</span>
                                        <span className="text-white font-serif">{formValues.name}</span>
                                    </div>
                                    <div className="grid grid-cols-2 border-b border-white/5 pb-4">
                                        <span className="text-gold text-sm tracking-widest uppercase">Venue</span>
                                        <span className="text-white font-serif">{formValues.venue}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-gold text-sm tracking-widest uppercase">Contact</span>
                                        <span className="text-white font-serif">{formValues.email}<br />{formValues.phone}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Success Screen */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center h-full py-16"
                            >
                                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mb-8">
                                    <CheckCircle size={48} className="text-gold" />
                                </div>
                                <h3 className="font-serif text-4xl text-white mb-4">Request Received</h3>
                                <p className="text-offwhite/70 font-sans max-w-md mx-auto mb-8 leading-relaxed">
                                    Thank you, {formValues.name}. Your booking inquiry has been successfully sent. I will review your details and be in touch within 24 hours to confirm availability and discuss next steps.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-sm tracking-widest uppercase font-sans"
                                >
                                    Return Home
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </form>
            </div>

            {/* Footer / Navigation (Hidden on Success) */}
            {!isSuccess && (
                <div className="px-8 py-6 border-t border-white/10 bg-black/20 flex justify-between items-center z-10">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center space-x-2 text-offwhite/50 hover:text-white transition-colors uppercase tracking-widest text-xs"
                        >
                            <ChevronLeft size={16} /> <span>Back</span>
                        </button>
                    ) : <div></div>}

                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-8 py-3 bg-gold text-obsidian font-medium tracking-widest uppercase text-xs hover:bg-white transition-colors flex items-center shadow-lg shadow-gold/20"
                        >
                            Next Step <ChevronRight size={16} className="ml-2" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-gold text-obsidian font-medium tracking-widest uppercase text-xs hover:bg-white transition-colors flex items-center shadow-lg shadow-gold/20 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                        </button>
                    )}
                </div>
            )}

        </div>
    );
};

export default BookingForm;
