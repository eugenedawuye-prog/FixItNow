import { useState, FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CreditCard, ShieldCheck, CheckCircle2, Smartphone, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

const paymentMethods = [
  { id: 'mtn', name: 'MTN Mobile Money', color: 'bg-yellow-400', icon: Smartphone },
  { id: 'telecel', name: 'Telecel Cash', color: 'bg-red-500 text-white', icon: Smartphone },
  { id: 'card', name: 'Debit/Credit Card', color: 'bg-indigo-600 text-white', icon: CreditCard },
];

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('mtn');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 p-12 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={56} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Success!</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
            Your booking is confirmed. A professional will contact you shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">Checkout</h1>
      
      <form onSubmit={handleCheckout} className="grid lg:grid-cols-3 gap-12">
        {/* Billing & Address */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl">
                <MapPin size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Service Location</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">GhanaPost GPS Address</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. GA-123-4567" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">Nearest Landmark</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Near West Hills Mall" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl">
                <CreditCard size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Payment Method</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all",
                    paymentMethod === method.id 
                      ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20" 
                      : "border-slate-100 dark:border-slate-800 hover:border-indigo-200"
                  )}
                >
                  <div className={cn("p-4 rounded-2xl shadow-lg", method.color)}>
                    <method.icon size={28} />
                  </div>
                  <span className="font-black text-slate-900 dark:text-white">{method.name}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === 'card' ? (
                <motion.div
                  key="card-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">Card Number</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                      />
                      <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">Expiry Date</label>
                      <input 
                        required
                        type="text" 
                        placeholder="MM/YY" 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">CVV</label>
                      <input 
                        required
                        type="text" 
                        placeholder="123" 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="momo-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {paymentMethod === 'mtn' ? 'MTN' : 'Telecel'} Phone Number
                  </label>
                  <div className="relative">
                    <input 
                      required
                      type="tel" 
                      placeholder="024 000 0000" 
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                    />
                    <Smartphone className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">You will receive a prompt on your phone to authorize the payment.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-slate-900 dark:bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl border border-white/5">
            <h2 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h2>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-slate-400 font-bold">
                <span>Service Fee</span>
                <span className="text-white">GHS 150.00</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold">
                <span>Emergency Fee</span>
                <span className="text-white">GHS 50.00</span>
              </div>
              <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                <span className="text-slate-400 font-bold text-lg">Total</span>
                <span className="text-4xl font-black text-indigo-400 tracking-tighter">GHS 200.00</span>
              </div>
            </div>
            
            <button 
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-indigo-500/20"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={24} />
                  Confirm Booking
                </>
              )}
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-4 object-contain grayscale invert" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 object-contain grayscale invert" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
