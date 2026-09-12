import { useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile Hamburger + Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-300 hover:text-white p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2 font-bold text-xl">
              <Cpu className="w-7 h-7 text-orange-500 animate-pulse" />
              <span className="text-brand-gradient">RigVault</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
            <a href="#components" className="hover:text-orange-400 transition-colors">Components</a>
            <a href="#builds" className="hover:text-orange-400 transition-colors">Builds</a>
            <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors">
              Sign In
            </button>
            <button className="text-sm font-medium bg-brand-gradient text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-2 text-sm">
          <a href="#home" className="block py-2 hover:text-orange-400">Home</a>
          <a href="#components" className="block py-2 hover:text-orange-400">Components</a>
          <a href="#builds" className="block py-2 hover:text-orange-400">Builds</a>
          <a href="#about" className="block py-2 hover:text-orange-400">About</a>
          <a href="#contact" className="block py-2 hover:text-orange-400">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;