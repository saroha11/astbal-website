"use client";

import {
  Mountain, Trees, Sprout, Utensils, Coffee, Flame, Footprints, TreePine,
} from "lucide-react";
import pricingData from "@/data/pricing.json";
import { formatPrice } from "@/lib/bookingEngine";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  horse: TreePine, mountain: Mountain, trees: Trees, sprout: Sprout,
  utensils: Utensils, coffee: Coffee, flame: Flame, footprints: Footprints,
};

interface AddOnsSelectorProps {
  selectedAddons: string[];
  onToggle: (addonId: string) => void;
}

export default function AddOnsSelector({ selectedAddons, onToggle }: AddOnsSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>Add-On Experiences</h3>
      <p className="text-[10px] sm:text-xs text-stone-400 mb-4">Enhance your stay with these experiences</p>

      <div className="space-y-2.5">
        {pricingData.addons.map((addon) => {
          const IconComponent = iconMap[addon.icon] || Coffee;
          const isSelected = selectedAddons.includes(addon.id);

          return (
            <button key={addon.id} type="button" onClick={() => onToggle(addon.id)}
              className={`w-full flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border-2 transition-all text-left ${
                isSelected ? "border-green-500 bg-green-50" : "border-stone-100 hover:border-stone-200 bg-stone-50 hover:bg-white"
              }`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? "bg-green-600 text-white" : "bg-green-50 text-green-600"
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-stone-800 text-xs sm:text-sm">{addon.name}</p>
                <p className="text-[10px] sm:text-xs text-stone-400 truncate">{addon.description}</p>
              </div>
              <div className="text-right shrink-0 ml-2">
                <p className="font-bold text-stone-800 text-xs sm:text-sm">{formatPrice(addon.price)}</p>
                <p className="text-[9px] sm:text-[10px] text-stone-400">{addon.duration}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected ? "border-green-600 bg-green-600" : "border-stone-300"
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
