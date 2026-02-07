
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-8 border border-slate-800">
          <ShoppingCart size={40} className="text-slate-700" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Your Bag is Empty</h2>
        <p className="text-slate-500 mb-10 text-center max-w-sm">Looks like you haven't added any culinary masterpieces yet. Let's fix that!</p>
        <Link 
          to="/menu" 
          className="bg-orange-500 px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-10">Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex items-center gap-6"
                >
                  <div className="w-24 h-24 bg-slate-950 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-800">
                    {/* Simplified icon representation for cart instead of 3D to keep performance high on list */}
                    <div className="text-orange-500 font-bold text-xs p-2 text-center uppercase">{item.category}</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">${item.price} per item</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-orange-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-orange-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-orange-500 ml-auto">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sticky top-32">
              <h3 className="text-xl font-bold mb-8">Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery</span>
                  <span className="text-white">{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                </div>
                <div className="h-px bg-slate-800 my-4" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 h-16 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-500/20 mb-4">
                Checkout Now
                <ArrowRight size={20} />
              </button>
              
              <p className="text-xs text-center text-slate-500 px-4">
                Enjoy free delivery on orders over $50. Typical prep time is 25-30 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
