
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { Auth } from './pages/Auth';
import { Contact } from './pages/Contact';
import { Logo } from './components/Logo';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center gap-12">
    <div className="relative">
      <Logo size={120} className="text-orange-500 z-10" />
      <div className="absolute inset-0 bg-orange-500/20 blur-[60px] rounded-full animate-pulse" />
    </div>
    <div className="text-center">
      <h2 className="text-4xl font-display font-extrabold tracking-tighter mb-3">
        LUMINA<span className="text-orange-500">BITES</span>
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" />
      </div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { loading } = useApp();

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-slate-950 text-white selection:bg-orange-500 selection:text-white">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-950 border-t border-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3 mb-4">
                  <Logo size={32} className="text-orange-500" />
                  <span className="text-xl font-extrabold tracking-tighter">LUMINA BITES</span>
                </div>
                <p className="text-slate-500 max-w-xs text-center md:text-left text-sm leading-relaxed">
                  Sculpting the future of dining through interactive 3D gastronomy and high-fidelity culinary art.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm">
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs">Explore</h4>
                  <ul className="space-y-2 text-slate-500">
                    <li><a href="#/menu" className="hover:text-orange-400 transition-colors">Digital Menu</a></li>
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Chef's Table</a></li>
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Gift Cards</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs">Support</h4>
                  <ul className="space-y-2 text-slate-500">
                    <li><a href="#/contact" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Delivery Info</a></li>
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Track Order</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs">Legal</h4>
                  <ul className="space-y-2 text-slate-500">
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Terms</a></li>
                    <li><a href="#" className="hover:text-orange-400 transition-colors">Cookies</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-900 w-full mb-8" />
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
              <span>© 2024 Lumina Bites Gastronomy. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </Router>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
