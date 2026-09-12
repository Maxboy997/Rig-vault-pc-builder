import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen PC Hardware Visualizer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build your dream rig, <span className="text-brand-gradient">visualized.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl">
            Select elite components, check tier compatibilities, and build your ideal workstation or gaming setup with real-time stack tracking.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#components" 
              className="inline-flex items-center gap-2 bg-brand-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Components
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#about" 
              className="inline-flex items-center border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="relative">
          <div className="absolute -inset-1 bg-brand-gradient rounded-2xl blur-xl opacity-25"></div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80" 
              alt="RigVault Gaming PC Build" 
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;