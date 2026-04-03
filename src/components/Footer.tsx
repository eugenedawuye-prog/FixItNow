import { Link } from 'react-router-dom';
import { Wrench, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-white/5 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Wrench className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                FixIt<span className="text-indigo-600">Now</span>
              </span>
            </Link>
            <p className="text-lg leading-relaxed font-medium">
              Ghana's most trusted on-demand repair platform. Connecting you with verified professionals for all your home and office needs.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-indigo-500 transition-colors"><Facebook size={24} /></a>
              <a href="#" className="text-slate-500 hover:text-indigo-500 transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-slate-500 hover:text-indigo-500 transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-slate-500 hover:text-indigo-500 transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-4 font-bold">
              <li><Link to="/" className="hover:text-indigo-500 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-indigo-500 transition-colors">Services</Link></li>
              <li><Link to="/support" className="hover:text-indigo-500 transition-colors">Support & FAQ</Link></li>
              <li><Link to="/checkout" className="hover:text-indigo-500 transition-colors">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-8 tracking-tight">Services</h4>
            <ul className="space-y-4 font-bold">
              <li><Link to="/services?cat=ac" className="hover:text-indigo-500 transition-colors">AC Servicing</Link></li>
              <li><Link to="/services?cat=plumbing" className="hover:text-indigo-500 transition-colors">Plumbing Repairs</Link></li>
              <li><Link to="/services?cat=electrical" className="hover:text-indigo-500 transition-colors">Electrical Works</Link></li>
              <li><Link to="/services?cat=carpentry" className="hover:text-indigo-500 transition-colors">Carpentry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-8 tracking-tight">Contact</h4>
            <ul className="space-y-6 font-bold">
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">Address:</span>
                <span>East Legon, Accra, Ghana</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">Phone:</span>
                <span>+233 24 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">Email:</span>
                <span>support@fixitnow.gh</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 text-center text-sm font-bold text-slate-600">
          <p>© {new Date().getFullYear()} FixItNow Ghana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
