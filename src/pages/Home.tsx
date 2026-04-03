import { AirVent, Droplets, Zap, Hammer, ShieldCheck, Users, Star, Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'ac', name: 'AC Repair', icon: AirVent, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: 'plumbing', name: 'Plumbing', icon: Droplets, color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
  { id: 'carpentry', name: 'Carpentry', icon: Hammer, color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' },
];

const stats = [
  { label: 'Verified Pros', value: '500+', icon: ShieldCheck },
  { label: 'Happy Customers', value: '10k+', icon: Users },
  { label: 'Avg Rating', value: '4.8/5', icon: Star },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16 transition-colors">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2000" 
            alt="Professional Handyman" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold text-sm backdrop-blur-sm"
          >
            Ghana's #1 Repair Platform
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight"
          >
            Fix It <span className="text-indigo-500">Now</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl mb-10 text-slate-300 max-w-2xl mx-auto font-medium"
          >
            Professional home repairs at the tap of a button. Verified experts, transparent pricing.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="flex items-center bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl border border-white/10">
              <Search className="ml-4 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="What needs fixing? (e.g. AC leaking)" 
                className="flex-1 px-4 py-4 text-slate-900 dark:text-white focus:outline-none text-lg bg-transparent"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                Find Pro
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Our Services</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Select a category to get started</p>
          </div>
          <Link to="/services" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View all services <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={`/services?cat=${cat.id}`}
                className="flex flex-col p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-500 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={32} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white text-2xl mb-2">{cat.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Professional {cat.name.toLowerCase()} experts available now.</p>
                <div className="mt-auto flex items-center text-indigo-600 font-bold gap-2">
                  Book now <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-indigo-600 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center text-white">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md mb-6 border border-white/10">
                  <stat.icon className="text-amber-400" size={40} />
                </div>
                <span className="text-5xl font-black mb-2 tracking-tighter">{stat.value}</span>
                <span className="text-indigo-100 font-bold text-lg">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 dark:bg-indigo-900/20 rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 text-center md:text-left max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">Ready to fix your home?</h2>
            <p className="text-slate-400 text-xl leading-relaxed">Join thousands of happy Ghanaians who trust FixItNow for their home maintenance.</p>
          </div>
          <Link 
            to="/services" 
            className="relative z-10 bg-indigo-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-2xl shadow-indigo-500/40 flex items-center gap-3"
          >
            Get Started <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
