import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComponentGrid from './components/ComponentGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Sound Effect Helper (Pure JS Web Audio API - no external assets needed)
const playAudioFeedback = (type = 'add') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'add') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.1); // G5
    } else if (type === 'warn') {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    } else if (type === 'remove') {
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12); // A3
    }
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
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