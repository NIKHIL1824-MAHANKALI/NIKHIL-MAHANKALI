
import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Info */}
          <div>
            <h1 className="text-5xl font-display font-bold mb-8">Get in <span className="text-orange-500 italic">Touch</span></h1>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Have a question about our 3D menu or want to partner with us? Our team is always here to help you find the perfect flavor.
            </p>

            <div className="space-y-8 mb-16">
              {[
                { icon: MapPin, title: 'Visit Us', desc: '452 Stellar Way, San Francisco, CA' },
                { icon: Phone, title: 'Call Us', desc: '+1 (555) LUMINA-00' },
                { icon: Mail, title: 'Email Us', desc: 'hello@luminabites.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Name</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                  <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-orange-500/50 transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Ordering Issues</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                <textarea rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-orange-500/50 transition-all resize-none" placeholder="Your culinary thoughts..."></textarea>
              </div>
              <button className="w-full bg-white text-slate-950 hover:bg-orange-500 hover:text-white h-16 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all group">
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
