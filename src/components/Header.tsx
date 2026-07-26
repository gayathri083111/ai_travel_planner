import React from 'react';
import { Compass, Moon, Sun, Bookmark, Sparkles, PlusCircle, Menu } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedTripsCount: number;
  onOpenSavedTrips: () => void;
  onNewTrip: () => void;
  hasActiveTrip: boolean;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  savedTripsCount,
  onOpenSavedTrips,
  onNewTrip,
  hasActiveTrip,
  onOpenMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Hamburger Menu & Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger 3-lines menu button */}
          <button
            onClick={onOpenMenu}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950 hover:text-sky-600 dark:hover:text-sky-400 transition-all border border-slate-200/80 dark:border-slate-700 shadow-sm"
            title="Open Side Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={onNewTrip}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  AI Travel Planner
                </span>
                <span className="bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-sky-200/60 dark:border-sky-800/60">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                Smart Itineraries & Real-time Local Insights
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {hasActiveTrip && (
            <button
              onClick={onNewTrip}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm"
              title="Start a new trip plan"
            >
              <PlusCircle className="w-4 h-4 text-sky-500" />
              <span className="hidden sm:inline">New Plan</span>
            </button>
          )}

          <button
            onClick={onOpenSavedTrips}
            className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm"
            title="View saved trip itineraries"
          >
            <Bookmark className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Saved Trips</span>
            {savedTripsCount > 0 && (
              <span className="bg-indigo-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {savedTripsCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

