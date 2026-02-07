
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, Github, Chrome } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    setUser({ id: '1', name: 'John Doe', email: 'john@example.com' });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/20 via-slate-950 to-slate-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold mb-3">
              {isLogin ? 'Welcome Back' : 'Join Lumina'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Sign in to access your culinary vault.' : 'Start your interactive food journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 transition-all"
                  required
                />
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 transition-all"
                required
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 transition-all"
                required
              />
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all mt-8 group">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-xs text-slate-600 font-bold uppercase tracking-widest">or continue with</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
              <Chrome size={20} />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
              <Github size={20} />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="mt-10 text-center text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-orange-500 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
