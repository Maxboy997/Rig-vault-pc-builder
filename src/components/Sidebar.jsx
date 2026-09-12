import StackItem from './StackItem';
import { Layers, Trash2, DollarSign } from 'lucide-react';

const Sidebar = ({ stack, onRemove, onClearAll }) => {
  // String কে সেফলি Number-এ রূপান্তর করে মোট যোগফল বের করা
  const totalPrice = stack.reduce((sum, item) => {
    const rawPrice = item.price;
    const priceNum = typeof rawPrice === 'number'
      ? rawPrice
      : Number(String(rawPrice || 0).replace(/[^0-9.]/g, '')) || 0;
    return sum + priceNum;
  }, 0);

  return (
    <aside className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-20 shadow-xl">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-white text-base">Your Build</h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
          {stack.length} Selected
        </span>
      </div>

      {/* Stack Items / Empty State */}
      {stack.length === 0 ? (
        <div className="py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
          <p className="text-xs">Your build stack is empty.</p>
          <p className="text-[11px] mt-1 text-slate-600">Add components from the list to calculate total cost.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
          {stack.map((item) => (
            <StackItem key={item.id} item={item} onRemove={onRemove} />
          ))}
        </div>
      )}

      {/* Total Price Summary Card */}
      {stack.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <DollarSign className="w-4 h-4 text-orange-500" />
              <span>Estimated Cost</span>
            </div>
            <span className="text-lg font-extrabold text-orange-400">
              ${totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onClearAll}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Build
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;