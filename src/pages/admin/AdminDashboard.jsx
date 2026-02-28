import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, CalendarDays, LogOut, CheckCircle, Clock } from 'lucide-react';

// Mock Data for Dashboard
const mockBookings = [
    { id: 1, name: 'Emma Watson', service: 'Weddings', date: '2024-09-15', status: 'Pending', amount: '$5,500' },
    { id: 2, name: 'Chanel Corp', service: 'Commercial', date: '2024-05-20', status: 'Confirmed', amount: '$12,000' },
    { id: 3, name: 'Sophia Rossi', service: 'Fashion', date: '2024-06-10', status: 'Completed', amount: '$3,200' },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const renderDashboard = () => (
        <div className="space-y-8">
            <h2 className="text-3xl font-serif text-white">Studio Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <p className="text-gold text-xs uppercase tracking-widest mb-2 font-sans">Active Bookings</p>
                    <p className="text-4xl font-serif text-white">12</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <p className="text-gold text-xs uppercase tracking-widest mb-2 font-sans">Pending Inquiries</p>
                    <p className="text-4xl font-serif text-white">4</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <p className="text-gold text-xs uppercase tracking-widest mb-2 font-sans">Monthly Revenue</p>
                    <p className="text-4xl font-serif text-white">$24,500</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-serif text-white mb-6">Recent Inquiries</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left font-sans text-sm">
                        <thead className="bg-black/40 text-offwhite/50">
                            <tr>
                                <th className="p-4 font-normal tracking-widest uppercase text-xs">Client</th>
                                <th className="p-4 font-normal tracking-widest uppercase text-xs">Service</th>
                                <th className="p-4 font-normal tracking-widest uppercase text-xs">Date</th>
                                <th className="p-4 font-normal tracking-widest uppercase text-xs">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBookings.map((b) => (
                                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-white">{b.name}</td>
                                    <td className="p-4 text-offwhite/80">{b.service}</td>
                                    <td className="p-4 text-offwhite/80">{b.date}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs flex items-center w-max
                      ${b.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                                b.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                                    'bg-green-500/20 text-green-300 border border-green-500/30'}`}>
                                            {b.status === 'Pending' ? <Clock size={12} className="mr-1" /> : <CheckCircle size={12} className="mr-1" />}
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderPortfolio = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-serif text-white">Portfolio Manager</h2>
                <button className="px-6 py-2 bg-gold text-obsidian tracking-widest text-xs uppercase font-medium hover:bg-white transition-colors">
                    Upload New Image
                </button>
            </div>

            <div className="border border-dashed border-white/20 rounded-xl p-12 text-center bg-white/5">
                <ImageIcon className="mx-auto text-white/30 mb-4" size={48} />
                <p className="text-white font-sans text-lg mb-2">Drag and drop images here</p>
                <p className="text-offwhite/50 font-sans text-sm">Supports JPG, PNG, WEBP up to 10MB</p>
            </div>

            {/* Mock Grid for Admin */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group border border-white/10">
                        <img src={`https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs px-2">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-obsidian flex flex-col md:flex-row font-sans">

            {/* Sidebar */}
            <div className="w-full md:w-64 bg-black/40 border-r border-white/10 flex flex-col pt-10 px-6">
                <div className="mb-12">
                    <h1 className="text-2xl font-serif text-white tracking-widest text-center">
                        <span className="text-gold">V</span>STUDIO
                    </h1>
                    <p className="text-center text-[10px] text-offwhite/40 uppercase tracking-[0.2em] mt-2">Admin Portal</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm transition-colors
              ${activeTab === 'dashboard' ? 'bg-gold/20 text-gold border border-gold/30' : 'text-offwhite/60 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutDashboard size={18} className="mr-3" /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm transition-colors
              ${activeTab === 'portfolio' ? 'bg-gold/20 text-gold border border-gold/30' : 'text-offwhite/60 hover:bg-white/5 hover:text-white'}`}
                    >
                        <ImageIcon size={18} className="mr-3" /> Portfolio Manager
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm transition-colors
              ${activeTab === 'bookings' ? 'bg-gold/20 text-gold border border-gold/30' : 'text-offwhite/60 hover:bg-white/5 hover:text-white'}`}
                    >
                        <CalendarDays size={18} className="mr-3" /> Bookings
                    </button>
                </nav>

                <div className="pb-8 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                        <LogOut size={18} className="mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-obsidian/95">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'portfolio' && renderPortfolio()}
                {activeTab === 'bookings' && renderDashboard() /* Reuse dashboard for demo, ideally a full table view */}
            </div>

        </div>
    );
};

export default AdminDashboard;
