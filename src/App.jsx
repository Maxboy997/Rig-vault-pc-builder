import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComponentGrid from './components/ComponentGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [components, setComponents] = useState([]);
  
  const [stack, setStack] = useState(() => {
    const savedStack = localStorage.getItem('rigvault_stack');
    return savedStack ? JSON.parse(savedStack) : [];
  });

  useEffect(() => {
    localStorage.setItem('rigvault_stack', JSON.stringify(stack));
  }, [stack]);

  useEffect(() => {
    fetch('/data/components.json')
      .then((res) => res.json())
      .then((data) => setComponents(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const handleAddToBuild = (item) => {
    if (stack.some((s) => s.id === item.id)) {
      toast.warn(`${item.name} is already in your build!`, {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }
    setStack([...stack, item]);
    toast.success(`${item.name} added to your build!`, {
      position: "bottom-right",
      theme: "dark",
    });
  };

  const handleRemoveFromBuild = (id) => {
    const removedItem = stack.find(s => s.id === id);
    setStack(stack.filter((item) => item.id !== id));
    if (removedItem) {
      toast.info(`${removedItem.name} removed from build.`, {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  const handleClearAll = () => {
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
            <ComponentGrid
              items={components}
              stack={stack}
              onAddToBuild={handleAddToBuild}
            />
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
      <ToastContainer />
    </div>
  );
}

export default App;