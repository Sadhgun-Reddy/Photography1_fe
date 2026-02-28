import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

// Admin Routes
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

const AnimatedRoutes = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes (No Navbar/Footer) */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </AnimatePresence>
    );
};

const WhatsAppButton = () => {
    const location = useLocation();
    if (location.pathname.startsWith('/admin')) return null;

    return (
        <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center z-[90] hover:scale-110 transition-transform duration-300"
        >
            <MessageCircle size={28} />
        </a>
    );
};

// Outer layout to conditionally hide Navbar/Footer for Admin routes
const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="relative w-full min-h-screen flex flex-col bg-obsidian select-none">
            {!isAdminRoute && <CustomCursor />}
            {!isAdminRoute && <Navbar />}

            <main className="flex-grow flex-1">
                {children}
            </main>

            {!isAdminRoute && <Footer />}
            <WhatsAppButton />
        </div>
    );
};

function App() {
    return (
        <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </Router>
    );
}

export default App;
