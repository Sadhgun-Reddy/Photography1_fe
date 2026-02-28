import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // If server is not running, we fake the login for the demo to allow navigation
            // In production, you MUST run the backend server.
            try {
                const { data } = await axios.post('/api/auth/login', { username, password });
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } catch (axiosError) {
                // Fallback for demonstration if backend is down
                console.warn("Backend not reachable. Using fallback login for demo purposes.");
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('adminToken', 'demo-token');
                    navigate('/admin/dashboard');
                } else {
                    setError('Invalid credentials');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[100px] pointer-events-none rounded-full"></div>

            <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-md relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                        <Lock className="text-gold" size={32} />
                    </div>
                </div>

                <h2 className="font-serif text-3xl text-white text-center mb-2">Creative Studio</h2>
                <p className="font-sans text-xs tracking-widest text-offwhite/50 text-center uppercase mb-8">Admin Access Only</p>

                {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded mb-6 text-center">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs text-gold uppercase tracking-widest mb-2 font-sans">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold font-sans"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gold uppercase tracking-widest mb-2 font-sans">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold font-sans"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold text-obsidian tracking-widest uppercase text-sm font-sans font-medium hover:bg-white transition-colors"
                    >
                        {loading ? 'Authenticating...' : 'Enter Studio'}
                    </button>
                </form>

                <p className="text-xs text-white/30 text-center mt-6 font-sans">
                    Demo Credentials: admin / admin123
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
