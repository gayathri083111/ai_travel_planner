import React from 'react';
import { 
  X, 
  Home, 
  BookmarkCheck, 
  Settings, 
  Compass, 
  Moon, 
  Sun, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onOpenSavedTrips: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  savedTripsCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onGoHome,
  onOpenSavedTrips,
  onOpenSettings,
  onOpenAbout,
  savedTripsCount,
  darkMode,
  onToggleDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Navigation Menu
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    AI Travel Planner Pro
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

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              <button
                onClick={() => {
                  onGoHome();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl text-slate-800 dark:text-slate-100 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-all group font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-sky-500" />
                  <span>Home & Planner Search</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onOpenSavedTrips();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl text-slate-800 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <BookmarkCheck className="w-5 h-5 text-indigo-500" />
                  <span>Saved Itineraries</span>
                </div>
                <div className="flex items-center gap-2">
                  {savedTripsCount > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                      {savedTripsCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => {
                  onOpenSettings();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl text-slate-800 dark:text-slate-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-emerald-500" />
                  <span>Settings & Preferences</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onOpenAbout();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl text-slate-800 dark:text-slate-100 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 transition-all group font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-purple-500" />
                  <span>About App</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Theme Toggle Quick Option */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Theme Appearance
                </span>
                <button
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-slate-600" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer - Project Spotlight */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-200/50 dark:border-indigo-800/40">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">
                  AI Travel Planner
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Built with React 18, Google Gemini AI, Tailwind CSS, and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
