import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle, ShoppingCart, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const services = [
  { id: 'ac-service', category: 'ac', name: 'AC Servicing', price: 150, description: 'Complete cleaning and gas refill check.' },
  { id: 'ac-repair', category: 'ac', name: 'AC Repair', price: 200, description: 'Fixing cooling issues or electrical faults.' },
  { id: 'leak-fix', category: 'plumbing', name: 'Leak Repair', price: 80, description: 'Fixing leaking pipes or faucets.' },
  { id: 'toilet-repair', category: 'plumbing', name: 'Toilet Repair', price: 120, description: 'Fixing flushing issues or blockages.' },
  { id: 'wiring', category: 'electrical', name: 'Electrical Wiring', price: 100, description: 'New wiring or fixing faulty circuits.' },
  { id: 'socket-fix', category: 'electrical', name: 'Socket/Switch Fix', price: 50, description: 'Replacing or repairing wall sockets.' },
  { id: 'furniture-fix', category: 'carpentry', name: 'Furniture Repair', price: 150, description: 'Fixing broken chairs, tables, or beds.' },
  { id: 'door-fix', category: 'carpentry', name: 'Door/Lock Repair', price: 90, description: 'Fixing misaligned doors or faulty locks.' },
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const emergencyFee = 50;
  const totalPrice = selectedService ? selectedService.price + (isEmergency ? emergencyFee : 0) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Catalog */}
          <div className="flex-1">
            <div className="mb-12">
              <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Find a Service</h1>
              <div className="flex flex-wrap gap-2">
                {['all', 'ac', 'plumbing', 'electrical', 'carpentry'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-8 py-3 rounded-2xl font-bold transition-all capitalize border-2",
                      selectedCategory === cat 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" 
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={cn(
                    "p-8 rounded-[32px] border-2 cursor-pointer transition-all relative overflow-hidden group",
                    selectedService?.id === service.id 
                      ? "border-indigo-600 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-100 dark:shadow-none" 
                      : "border-transparent bg-white dark:bg-slate-900 hover:border-indigo-200"
                  )}
                >
                  {selectedService?.id === service.id && (
                    <div className="absolute top-0 right-0 p-4">
                      <div className="bg-indigo-600 text-white p-1 rounded-full">
                        <Check size={16} />
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{service.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <span className="text-2xl font-black text-indigo-600">GHS {service.price}</span>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-indigo-500" />
                      Verified Pro
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Price Estimator Sidebar */}
          <div className="lg:w-[400px]">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <div className="bg-indigo-600 p-8 text-white">
                <h2 className="text-2xl font-black tracking-tight">Booking Summary</h2>
                <p className="text-indigo-100 text-sm font-medium opacity-80">Review your service details</p>
              </div>
              
              <div className="p-8 space-y-8">
                <AnimatePresence mode="wait">
                  {selectedService ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400 font-bold">Service</span>
                          <span className="font-black text-slate-900 dark:text-white">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400 font-bold">Base Price</span>
                          <span className="font-black text-slate-900 dark:text-white">GHS {selectedService.price}</span>
                        </div>
                      </div>

                      <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-xl text-amber-600">
                              <AlertCircle size={20} />
                            </div>
                            <span className="font-black text-amber-900 dark:text-amber-400">Emergency?</span>
                          </div>
                          <button 
                            onClick={() => setIsEmergency(!isEmergency)}
                            className={cn(
                              "w-14 h-7 rounded-full transition-all relative p-1",
                              isEmergency ? "bg-amber-600" : "bg-slate-300 dark:bg-slate-700"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 bg-white rounded-full transition-all shadow-sm",
                              isEmergency ? "translate-x-7" : "translate-x-0"
                            )} />
                          </button>
                        </div>
                        <p className="text-xs text-amber-700 dark:text-amber-500/80 leading-relaxed font-medium">
                          Need a pro right now? We'll dispatch the nearest expert within 60 minutes for a flat fee.
                        </p>
                      </div>

                      {isEmergency && (
                        <div className="flex justify-between items-center text-amber-600 font-black">
                          <span>Emergency Fee</span>
                          <span>+ GHS {emergencyFee}</span>
                        </div>
                      )}

                      <div className="pt-8 border-t-2 border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-end mb-8">
                          <span className="text-slate-500 dark:text-slate-400 font-bold text-lg">Total</span>
                          <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">GHS {totalPrice}</span>
                        </div>
                        <Link 
                          to={`/checkout?service=${selectedService.id}&emergency=${isEmergency}`}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02]"
                        >
                          <ShoppingCart size={22} />
                          Continue to Checkout
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
                        <ShoppingCart size={40} />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">Your cart is empty</p>
                      <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Select a service to get a quote</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
