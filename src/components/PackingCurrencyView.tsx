import React, { useState } from 'react';
import { Briefcase, ArrowRightLeft, Check, Plus, Trash2, Coins, Calculator, CheckCircle2 } from 'lucide-react';
import { PackingCategory, CurrencyInfo } from '../types';

interface PackingCurrencyViewProps {
  initialPacking: PackingCategory[];
  currency: CurrencyInfo;
}

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  INR: 83.5,
  GBP: 0.78,
  JPY: 155.0,
  AUD: 1.52,
  CAD: 1.36,
  SGD: 1.34,
  AED: 3.67,
};

export const PackingCurrencyView: React.FC<PackingCurrencyViewProps> = ({
  initialPacking,
  currency,
}) => {
  // Packing List state
  const [categories, setPackingCategories] = useState<PackingCategory[]>(
    initialPacking && initialPacking.length > 0
      ? initialPacking
      : [
          {
            categoryName: 'Essentials & Documents',
            items: [
              { id: 'p1', text: 'Passport & Identification Cards', checked: true },
              { id: 'p2', text: 'Travel Insurance Details', checked: false },
              { id: 'p3', text: 'Local Cash & Credit Cards', checked: true },
            ],
          },
          {
            categoryName: 'Clothing & Comfort',
            items: [
              { id: 'p4', text: 'Comfortable Sneakers or Sandals', checked: false },
              { id: 'p5', text: 'Light Cotton T-shirts & Shorts', checked: false },
              { id: 'p6', text: 'Sunglasses & Sun Hat', checked: false },
            ],
          },
          {
            categoryName: 'Electronics & Tech',
            items: [
              { id: 'p7', text: 'Universal Power Adapter', checked: false },
              { id: 'p8', text: 'Portable Power Bank (10,000+ mAh)', checked: true },
              { id: 'p9', text: 'Headphones / Earbuds', checked: false },
            ],
          },
        ]
  );

  const [newItemText, setNewItemText] = useState('');
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);

  // Currency Converter State
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState(currency.code || 'EUR');
  const [amount, setAmount] = useState('100');

  const handleToggleItem = (catIdx: number, itemId: string) => {
    const updated = [...categories];
    const cat = updated[catIdx];
    cat.items = cat.items.map((it) => (it.id === itemId ? { ...it, checked: !it.checked } : it));
    setPackingCategories(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const updated = [...categories];
    updated[selectedCatIndex].items.push({
      id: `custom-${Date.now()}`,
      text: newItemText.trim(),
      checked: false,
    });
    setPackingCategories(updated);
    setNewItemText('');
  };

  const handleDeleteItem = (catIdx: number, itemId: string) => {
    const updated = [...categories];
    updated[catIdx].items = updated[catIdx].items.filter((it) => it.id !== itemId);
    setPackingCategories(updated);
  };

  // Calculate packing completion
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = categories.reduce(
    (acc, cat) => acc + cat.items.filter((it) => it.checked).length,
    0
  );
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  // Currency Conversion logic
  const numAmount = parseFloat(amount) || 0;
  const rateFrom = EXCHANGE_RATES[fromCurr] || 1.0;
  const rateTo = EXCHANGE_RATES[toCurr] || (currency.rateVsUSD || 0.92);
  const convertedResult = ((numAmount / rateFrom) * rateTo).toFixed(2);

  return (
    <div className="space-y-8">
      {/* 1. Interactive Packing Checklist Tool */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-sky-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Interactive Packing Checklist
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track essential baggage items and add custom reminders.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="bg-sky-50 dark:bg-sky-950/60 p-3 rounded-2xl border border-sky-100 dark:border-sky-900/50 flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Progress</span>
              <span className="text-base font-black text-sky-600 dark:text-sky-300">
                {checkedItems} / {totalItems} Packed
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-md">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Add Item Bar */}
        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={selectedCatIndex}
            onChange={(e) => setSelectedCatIndex(Number(e.target.value))}
            className="w-full sm:w-48 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {categories.map((cat, i) => (
              <option key={i} value={i}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new item (e.g. Sunscreen, Extra Camera Battery)..."
            className="flex-1 w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </form>

        {/* Category List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-700/60"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center justify-between">
                <span>{category.categoryName}</span>
                <span className="text-[10px] font-extrabold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">
                  {category.items.filter((i) => i.checked).length} / {category.items.length}
                </span>
              </h3>

              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(catIdx, item.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      item.checked
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                          item.checked
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-xs font-medium ${item.checked ? 'line-through opacity-70' : ''}`}>
                        {item.text}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(catIdx, item.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Real-time Currency Converter Tool */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Instant Currency Converter
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Convert between USD, EUR, INR, GBP, JPY, and foreign travel currencies.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-black text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* From & To Selectors */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                From
              </label>
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                className="w-full px-3 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {Object.keys(EXCHANGE_RATES).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                To
              </label>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="w-full px-3 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {Object.keys(EXCHANGE_RATES).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-tr from-amber-500 to-orange-600 p-4 rounded-xl text-white text-center shadow-md">
            <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-80 block">
              Converted Result
            </span>
            <span className="text-2xl sm:text-3xl font-black block mt-1">
              {convertedResult} {toCurr}
            </span>
            <span className="text-[10px] opacity-90 block mt-0.5">
              1 {fromCurr} = {((1 / rateFrom) * rateTo).toFixed(3)} {toCurr}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
