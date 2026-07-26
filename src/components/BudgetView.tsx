import React, { useState } from 'react';
import { DollarSign, PieChart as PieIcon, Hotel, Utensils, Ticket, Car, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { BudgetBreakdown } from '../types';

interface BudgetViewProps {
  budget: BudgetBreakdown;
  durationDays: number;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1, name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'INR', symbol: '₹', rate: 83.5, name: 'Indian Rupee' },
  { code: 'GBP', symbol: '£', rate: 0.78, name: 'British Pound' },
  { code: 'JPY', symbol: '¥', rate: 155.0, name: 'Japanese Yen' },
];

export const BudgetView: React.FC<BudgetViewProps> = ({ budget, durationDays }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  const convert = (usdVal: number) => {
    return Math.round(usdVal * selectedCurrency.rate);
  };

  const chartData = [
    { name: 'Accommodation', value: convert(budget.accommodationUSD), color: '#38bdf8' },
    { name: 'Food & Dining', value: convert(budget.foodUSD), color: '#f59e0b' },
    { name: 'Activities', value: convert(budget.activitiesUSD), color: '#8b5cf6' },
    { name: 'Transport', value: convert(budget.transportUSD), color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Currency Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Estimated Budget & Expenses
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Smart cost estimate for {durationDays} days based on selected budget tier.
          </p>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Currency:</span>
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            {CURRENCIES.map((curr) => (
              <button
                key={curr.code}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCurrency.code === curr.code
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {curr.symbol} {curr.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Totals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-md">
              Total Estimated Trip Cost
            </span>
            <div className="mt-4">
              <span className="text-4xl sm:text-5xl font-black tracking-tight">
                {selectedCurrency.symbol}{convert(budget.totalUSD).toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-xs mt-4 opacity-90 pt-4 border-t border-white/20">
            Covers stays, daily dining, entry tickets, and local city transportation.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Average Daily Expenditure
            </span>
            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {selectedCurrency.symbol}{convert(budget.dailyEstimateUSD).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-400 ml-2">/ person / day</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            💡 <strong className="font-semibold text-slate-800 dark:text-slate-200">Pro Tip:</strong> Keep 10-15% extra for spontaneous local souvenirs or specialized dining.
          </div>
        </div>
      </div>

      {/* Expense Split Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Stay */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 w-fit mb-3">
            <Hotel className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase text-slate-400 block">Hotels & Stay</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            {selectedCurrency.symbol}{convert(budget.accommodationUSD).toLocaleString()}
          </p>
        </div>

        {/* Food */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit mb-3">
            <Utensils className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase text-slate-400 block">Food & Dining</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            {selectedCurrency.symbol}{convert(budget.foodUSD).toLocaleString()}
          </p>
        </div>

        {/* Activities */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 w-fit mb-3">
            <Ticket className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase text-slate-400 block">Activities & Sightseeing</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            {selectedCurrency.symbol}{convert(budget.activitiesUSD).toLocaleString()}
          </p>
        </div>

        {/* Transport */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit mb-3">
            <Car className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase text-slate-400 block">Local Transport</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            {selectedCurrency.symbol}{convert(budget.transportUSD).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recharts Graphical Chart Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-sky-500" />
          <span>Expense Distribution Visualization</span>
        </h3>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                formatter={(value: any) => [`${selectedCurrency.symbol}${Number(value).toLocaleString()}`, 'Cost']}
                contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none' }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
