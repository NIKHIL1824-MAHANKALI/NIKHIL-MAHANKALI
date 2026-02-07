
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Info, Star, Search, SlidersHorizontal } from 'lucide-react';
import { FOOD_ITEMS } from '../constants';
import { FoodCategory, FoodItem } from '../types';
import { FoodModel } from '../components/Food3D';
import { useApp } from '../store/AppContext';

export const Menu: React.FC = () => {
  const { addToCart } = useApp();
  const [filter, setFilter] = useState<FoodCategory | 'All'>('All');
  const [search, setSearch] = useState('');

  const categories: (FoodCategory | 'All')[] = [
    'All', 'Burger', 'Pizza', 'Pasta', 'Steak', 'Sushi', 'Ramen', 'Taco', 'Drink', 'Fries', 'Dessert'
  ];

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesCategory = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Curated Menu</h1>
            <p className="text-slate-400">Handcrafted culinary pieces ready for your table.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search flavors..." 
                className="bg-slate-900 border border-slate-800 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-orange-500/50 w-full sm:w-64 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 p-3 px-5 rounded-full transition-colors">
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${
                filter === cat 
                ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'border-slate-800 text-slate-400 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg italic">No culinary treasures match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MenuCard: React.FC<{ item: FoodItem; onAdd: () => void }> = ({ item, onAdd }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-6 hover:bg-slate-800/50 transition-all group overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 mb-6">
        <div className="absolute inset-0 bg-slate-950/50 rounded-3xl overflow-hidden cursor-pointer shadow-inner">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <FoodModel category={item.category} hovered={hovered} />
          </Canvas>
        </div>
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-bold text-orange-400 flex items-center gap-1">
          <Star size={12} className="fill-orange-400" />
          {item.rating}
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
           <span className="bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-slate-400 border border-slate-800">
             {item.prepTime}
           </span>
           <span className="bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-slate-400 border border-slate-800">
             {item.calories} kcal
           </span>
        </div>
      </div>

      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-1 block">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>
        </div>
        <span className="text-xl font-bold text-white">${item.price.toFixed(2)}</span>
      </div>

      <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
        {item.description}
      </p>

      <div className="flex gap-3">
        <button 
          onClick={onAdd}
          className="flex-1 bg-white hover:bg-orange-500 hover:text-white text-slate-900 h-12 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          <Plus size={20} />
          Add to Order
        </button>
        <button className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl flex items-center justify-center transition-all">
          <Info size={20} />
        </button>
      </div>
    </motion.div>
  );
};
