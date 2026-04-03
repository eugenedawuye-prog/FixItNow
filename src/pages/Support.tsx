import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "How are your professionals verified?",
    answer: "Every professional on FixItNow undergoes a rigorous background check, including criminal record verification and a practical skills assessment by our technical team."
  },
  {
    question: "What if I'm not satisfied with the repair?",
    answer: "We offer a 7-day satisfaction guarantee. If the issue persists or the work was unsatisfactory, we will send another professional to fix it at no extra cost to you."
  },
  {
    question: "How do I pay for the service?",
    answer: "You can pay securely through our platform using MTN Mobile Money, Telecel Cash, or any major Debit/Credit card. We do not recommend cash payments to pros directly for your safety."
  },
  {
    question: "Is there an emergency service fee?",
    answer: "Yes, for urgent repairs where you need a professional within 60 minutes, a flat emergency fee of GHS 50 is applied to the base service price."
  }
];

function AccordionItem({ question, answer, isOpen, onClick }: { 
  question: string, 
  answer: string, 
  isOpen: boolean, 
  onClick: () => void,
  key?: any
}) {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left hover:text-indigo-600 transition-colors group"
      >
        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{question}</span>
        <div className={cn(
          "p-2 rounded-xl transition-all",
          isOpen ? "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rotate-180" : "bg-slate-50 dark:bg-slate-900 text-slate-400"
        )}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Support() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-indigo-600 font-bold text-sm"
        >
          Help Center
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">How can we help?</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto font-medium">Find answers to common questions or reach out to our dedicated support team in Accra.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Phone, label: 'Call Us', value: '+233 24 000 0000', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
          { icon: Mail, label: 'Email Us', value: 'support@fixitnow.gh', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
          { icon: MapPin, label: 'Visit Us', value: 'East Legon, Accra', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none text-center group hover:border-indigo-500 transition-all"
          >
            <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform", item.color)}>
              <item.icon size={32} />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-xl mb-2">{item.label}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <section className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[60px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/233240000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 bg-green-500 text-white p-5 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 flex items-center gap-3 group"
      >
        <MessageCircle size={36} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black whitespace-nowrap text-lg">
          Chat with us
        </span>
      </a>
    </div>
  );
}
