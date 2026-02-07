
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Star } from 'lucide-react';
import { FoodScene } from '../components/Food3D';
import { PartnerLogo } from '../components/Logo';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
              <Star size={12} className="fill-orange-400" />
              Award Winning Gastronomy
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
              Bolder <span className="italic text-orange-500 block lg:inline">Bites.</span>
              <br className="hidden lg:block" />
              Perfectly <span className="text-slate-500">Rendered.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-medium">
              Join the elite circle of taste. Experience our hyper-realistic 3D culinary vault and order your next masterpiece with absolute confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-2xl shadow-orange-500/40"
              >
                Enter the Vault
                <ChevronRight size={18} />
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all">
                <Play size={16} className="fill-white" />
                The Experience
              </button>
            </div>

            <div className="mt-20">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-6">Global Culinary Partners</p>
              <div className="flex flex-wrap items-center gap-8 justify-center lg:justify-start">
                <PartnerLogo name="Vogue Dining" />
                <PartnerLogo name="Michelin Star" />
                <PartnerLogo name="Meta Eats" />
                <PartnerLogo name="Stellar Guide" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Visual */}
        <div className="flex-1 w-full h-[450px] lg:h-[80%] relative group cursor-grab active:cursor-grabbing">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-slate-500/10 rounded-full blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <React.Suspense fallback={null}>
              <FoodScene category="Burger" />
            </React.Suspense>
          </Canvas>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 right-0 lg:-right-4 bg-slate-900/90 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-800 shadow-2xl max-w-[200px]"
          >
             <div className="flex items-center gap-3 mb-3">
               <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Live Rendering</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
               Real-time simulation of your meal's precise composition and texture.
             </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-24 border-y border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Orders Processed', val: '12,402' },
            { label: 'Average Delivery', val: '14.2m' },
            { label: 'Certified Chefs', val: '58' },
            { label: 'Custom Textures', val: '1,200+' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <h3 className="text-4xl font-black mb-2 tracking-tighter group-hover:text-orange-500 transition-colors">{stat.val}</h3>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.25em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
