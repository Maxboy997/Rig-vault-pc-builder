import { Plus, Check } from 'lucide-react';

const ComponentCard = ({ item, onAddToBuild, isSelected }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 uppercase tracking-wider">
            {item.badge || item.category}
          </span>
          <span className="text-xs font-semibold text-slate-400">{item.tier || item.category}</span>
        </div>

        <h3 className="font-bold text-white text-base mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-xs text-slate-400 font-medium mb-3">{item.category}</p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{item.description}</p>
      </div>

      <div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 mb-3">
          <span className="text-lg font-extrabold text-orange-400">${item.price}</span>
          <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
            <span>★</span>
            <span>{item.rating}</span>
          </div>
        </div>

        <button
          onClick={() => onAddToBuild(item)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.98] ${
            isSelected
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              ✓ In Your Build
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add to Build
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ComponentCard;