import React from 'react';
import BookingForm from '../components/BookingForm';
import PageTransition from '../components/PageTransition';

const Booking = () => {
    return (
        <PageTransition>
            <div className="w-full bg-obsidian min-h-screen relative overflow-hidden flex flex-col pt-32 pb-24">

                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose/5 blur-[150px] pointer-events-none rounded-full -translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 flex-grow flex flex-col justify-center px-6 wrapper max-w-7xl mx-auto w-full">
                    <div className="text-center mb-16">
                        <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Create <span className="text-gold italic">History</span></h1>
                        <p className="font-sans text-offwhite/50 max-w-xl mx-auto tracking-wide">
                            Secure your date. Complete the form below to begin the conversation about your upcoming event or project.
                        </p>
                    </div>

                    <BookingForm />

                </div>
            </div>
        </PageTransition>
    );
};

export default Booking;
