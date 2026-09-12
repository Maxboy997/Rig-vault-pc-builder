import { X } from 'lucide-react';

const StackItem = ({ item, onRemove }) => {
  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 flex items-start justify-between gap-3 hover:border-slate-700 transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 uppercase tracking-wide">
            {item.category}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">~{item.wattage || 0}W</span>
        </div>
        <h4 className="text-xs font-semibold text-white leading-tight break-words line-clamp-2">
          {item.name}
        </h4>
        <p className="text-xs font-bold text-orange-400 mt-1">${item.price}</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-red-500/10 transition-colors shrink-0"
        title="Remove item"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StackItem;