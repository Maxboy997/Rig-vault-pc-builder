import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComponentGrid from './components/ComponentGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Sound Effect Helper (Pure JS Web Audio API - no external assets needed)
// Enhanced Audio Feedback (Messenger-style Ping & Bell Chimes)
const playAudioFeedback = (type = 'add') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'add') {
      // Messenger-style Crisp "Ping" Bell Sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // High Harmonic Chime (E5 -> E6 & B5 -> B6)
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime); 
      osc1.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.08);

      osc2.frequency.setValueAtTime(987.77, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1975.53, ctx.currentTime + 0.08);

      // Boosted Volume (0.35)
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);

    } else if (type === 'warn') {
      // Clear Warning Double Bell Tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(440.00, ctx.currentTime + 0.08); // A4

      gain.gain.setValueAtTime(0.30, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);

    } else if (type === 'remove') {
      // Crisp Mechanical Pop / Click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.30, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (e) {
    console.error(e);
  }
};

function App() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [stack, setStack] = useState(() => {
    const savedStack = localStorage.getItem('rigvault_stack');
    return savedStack ? JSON.parse(savedStack) : [];
  });

  useEffect(() => {
    localStorage.setItem('rigvault_stack', JSON.stringify(stack));
  }, [stack]);

  useEffect(() => {
    setLoading(true);
    fetch('/data/components.json')
      .then((res) => res.json())
      .then((data) => {
        setComponents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToBuild = (item) => {
    if (stack.some((s) => s.id === item.id)) {
      playAudioFeedback('warn');
      toast.warn(`"${item.name}" is already in your build stack!`, {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }
    playAudioFeedback('add');
    setStack([...stack, item]);
    toast.success(`${item.name} added to your build!`, {
      position: "bottom-right",
      theme: "dark",
    });
  };

  const handleRemoveFromBuild = (id) => {
    const removedItem = stack.find(s => s.id === id);
    playAudioFeedback('remove');
    setStack(stack.filter((item) => item.id !== id));
    if (removedItem) {
      toast.info(`${removedItem.name} removed from build.`, {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  const handleClearAll = () => {
    playAudioFeedback('remove');
    setStack([]);
    toast.info("Build stack cleared.", {
      position: "bottom-right",
      theme: "dark",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-64 bg-slate-900/60 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                      <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-10 bg-slate-800/50 rounded w-full"></div>
                    </div>
                    <div className="h-10 bg-slate-800 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ComponentGrid
                items={components}
                stack={stack}
                onAddToBuild={handleAddToBuild}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <Sidebar
              stack={stack}
              onRemove={handleRemoveFromBuild}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;