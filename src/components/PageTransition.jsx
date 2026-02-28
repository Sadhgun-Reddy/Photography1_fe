import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full"
            >
                {children}
            </motion.div>

            {/* Black Curtain Wipe Outwards */}
            <motion.div
                className="fixed inset-0 bg-obsidian z-[999] pointer-events-none"
                initial={{ y: '0%' }}
                animate={{ y: '-100%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />

            {/* Black Curtain Wipe Inwards on Exit */}
            <motion.div
                className="fixed inset-0 bg-obsidian z-[999] pointer-events-none"
                initial={{ y: '100%' }}
                exit={{ y: '0%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    );
};

export default PageTransition;
