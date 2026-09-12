import { X } from 'lucide-react';

const StackItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded bg-slate-900 p-1.5 flex items-center justify-center shrink-0 border border-slate-800">
          <img src={item.icon} alt={item.name} className="w-full h-full object-contain filter invert" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-slate-200 truncate">{item.name}</h4>
          <span className="text-[10px] text-slate-400">{item.category}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-bold text-orange-400">${item.price || 0}</span>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors"
          title="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StackItem;