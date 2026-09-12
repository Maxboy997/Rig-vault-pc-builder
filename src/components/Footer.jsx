import { Cpu, Globe, Mail, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-orange-500" />
            <span className="text-white font-bold text-lg tracking-wide">RigVault</span>
            <span className="text-xs text-slate-500 ml-2">© 2026 RigVault Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-orange-400 transition-colors" title="Website"><Globe className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors" title="Contact"><Mail className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors" title="Share"><Share2 className="w-5 h-5" /></a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;