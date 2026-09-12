import { Star } from 'lucide-react';

const ComponentCard = ({ item, onAddToBuild, isSelected }) => {
  const { name, category, description, icon, rating, tier, badge, price } = item;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-orange-400 border border-slate-700">
            {badge}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
            {tier}
          </span>
        </div>

        {/* Header with Icon and Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 p-2 flex items-center justify-center shrink-0 border border-slate-700/50">
            <img src={icon} alt={name} className="w-full h-full object-contain filter invert opacity-90" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-snug group-hover:text-orange-400 transition-colors">
              {name}
            </h3>
            <span className="text-xs text-slate-400 font-medium">{category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Price & Actions Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <div>
          <div className="text-base font-extrabold text-orange-400">${price || 0}</div>
          <div className="flex items-center gap-1 text-amber-400 text-[11px] font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        <button
          onClick={() => onAddToBuild(item)}
          disabled={isSelected}
          className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
            isSelected
              ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
              : "bg-brand-gradient text-white hover:opacity-90 shadow-md hover:shadow-orange-500/10 active:scale-95"
          }`}
        >
          {isSelected ? "✓ In Your Build" : "Add to Build"}
        </button>
      </div>
    </div>
  );
};

export default ComponentCard;