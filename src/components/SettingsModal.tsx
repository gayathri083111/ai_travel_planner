import React, { useState } from 'react';
import { X, Settings, DollarSign, Compass, Sliders, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem('pref_currency') || 'USD');
  const [unit, setUnit] = useState(() => localStorage.getItem('pref_unit') || 'KM');
  const [aiDepth, setAiDepth] = useState(() => localStorage.getItem('pref_ai_depth') || 'detailed');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSaveSettings = () => {
    localStorage.setItem('pref_currency', currency);
    localStorage.setItem('pref_unit', unit);
    localStorage.setItem('pref_ai_depth', aiDepth);

    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                App Preferences & Settings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize currency, measurement units, and AI response depth.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Default Currency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Default Display Currency
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['USD ($)', 'EUR (€)', 'INR (₹)', 'GBP (£)'].map((curr) => {
                const code = curr.split(' ')[0];
                const isSelected = currency === code;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    {curr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance Units */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Distance Measurement Unit
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'KM', label: 'Kilometers (km)' },
                { code: 'MILES', label: 'Miles (mi)' },
              ].map((u) => {
                const isSelected = unit === u.code;
                return (
                  <button
                    key={u.code}
                    type="button"
                    onClick={() => setUnit(u.code)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <span>{u.label}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Response Depth */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              AI Itinerary Detail Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'detailed', label: 'Comprehensive (Recommended)' },
                { id: 'compact', label: 'Quick Summary' },
              ].map((d) => {
                const isSelected = aiDepth === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setAiDepth(d.id)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveSettings}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            {isSavedNotice ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
