import { useState } from 'react';
import ComponentCard from './ComponentCard';
import { Search, X } from 'lucide-react';

const ComponentGrid = ({ items, stack, onAddToBuild }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'GPU', 'CPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Cooling'];

  // Category and Search Filtering Combined
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Header Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/90 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        
        {/* Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Field */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search RTX, Ryzen, Corsair..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Content / Empty Search Result State */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/40">
          <p className="text-slate-300 text-sm font-semibold">No components found</p>
          <p className="text-slate-500 text-xs mt-1">No items match "{searchQuery}" in this category.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-lg transition-colors border border-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <ComponentCard
              key={item.id}
              item={item}
              onAddToBuild={onAddToBuild}
              isSelected={stack.some((s) => s.id === item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentGrid;