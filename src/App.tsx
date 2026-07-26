import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { 
  Calendar, 
  MapPin, 
  Building2, 
  Utensils, 
  CloudSun, 
  DollarSign, 
  Briefcase, 
  Bookmark, 
  Download, 
  Share2, 
  PlusCircle, 
  Sparkles, 
  Compass, 
  CheckCircle2,
  ShieldAlert,
  Bot
} from 'lucide-react';

import { TripPreferences, TripPlanData } from './types';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { ItineraryView } from './components/ItineraryView';
import { HotelsView } from './components/HotelsView';
import { DiningView } from './components/DiningView';
import { WeatherView } from './components/WeatherView';
import { BudgetView } from './components/BudgetView';
import { PackingCurrencyView } from './components/PackingCurrencyView';
import { EmergencyView } from './components/EmergencyView';
import { AiAssistantModal } from './components/AiAssistantModal';
import { PlaceDetailsModal } from './components/PlaceDetailsModal';
import { SavedTripsModal } from './components/SavedTripsModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SettingsModal } from './components/SettingsModal';
import { AboutModal } from './components/AboutModal';
import { getDestinationHeroUrl } from './utils/images';

type ActiveTab = 'itinerary' | 'hotels' | 'dining' | 'weather' | 'budget' | 'packing' | 'emergency';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ai_travel_theme') === 'dark';
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlanData | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('itinerary');

  // Modal & Drawer states
  const [selectedPlaceName, setSelectedPlaceName] = useState<string | null>(null);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('Attraction');
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Saved trips in localStorage
  const [savedTrips, setSavedTrips] = useState<TripPlanData[]>(() => {
    try {
      const stored = localStorage.getItem('ai_travel_saved_trips');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ai_travel_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ai_travel_theme', 'light');
    }
  }, [darkMode]);

  // Persist saved trips
  useEffect(() => {
    localStorage.setItem('ai_travel_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  const handleCreatePlan = async (prefs: TripPreferences) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      });

      const data: TripPlanData = await res.json();
      setTripPlan(data);
      setActiveTab('itinerary');
      setIsLoading(false);

      // Trigger celebrate confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err) {
      console.error('Failed to generate trip plan:', err);
      setIsLoading(false);
    }
  };

  const handleSaveTrip = () => {
    if (!tripPlan) return;
    const exists = savedTrips.some((t) => t.id === tripPlan.id);
    if (!exists) {
      setSavedTrips([tripPlan, ...savedTrips]);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const handleDeleteSavedTrip = (tripId: string) => {
    setSavedTrips(savedTrips.filter((t) => t.id !== tripId));
  };

  const handleSelectPlace = (placeName: string, category: string) => {
    setSelectedPlaceName(placeName);
    setSelectedPlaceCategory(category);
  };

  const handleDownloadPDF = () => {
    if (!tripPlan) return;

    try {
      const doc = new jsPDF();
      let y = 20;

      doc.setFontSize(22);
      doc.setTextColor(14, 165, 233); // sky blue
      doc.text(`AI Travel Plan: ${tripPlan.destination}`, 14, y);
      y += 10;

      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      doc.text(`Duration: ${tripPlan.durationDays} Days | Budget: ${tripPlan.budgetLevel} | Travelers: ${tripPlan.travelGroup}`, 14, y);
      y += 12;

      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text(`Day-by-Day Itinerary Summary`, 14, y);
      y += 8;

      tripPlan.days?.forEach((day) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(12);
        doc.setTextColor(2, 132, 199);
        doc.text(`Day ${day.dayNumber}: ${day.theme}`, 14, y);
        y += 7;

        const allActivities = [...(day.morning || []), ...(day.afternoon || []), ...(day.evening || [])];
        allActivities.forEach((act) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(10);
          doc.setTextColor(30, 41, 59);
          doc.text(`• [${act.timeSlot}] ${act.name} ($${act.estimatedCostUSD})`, 18, y);
          y += 5.5;
        });

        y += 4;
      });

      doc.save(`${tripPlan.destination.replace(/\s+/g, '_')}_Travel_Itinerary.pdf`);
    } catch (e) {
      console.error('PDF export error:', e);
      window.print();
    }
  };

  const isCurrentTripSaved = tripPlan ? savedTrips.some((t) => t.id === tripPlan.id) : false;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        savedTripsCount={savedTrips.length}
        onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
        onNewTrip={() => setTripPlan(null)}
        hasActiveTrip={!!tripPlan}
        onOpenMenu={() => setIsDrawerOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!tripPlan ? (
          /* Form View */
          <div className="animate-fade-in">
            <TripForm onSubmit={handleCreatePlan} isLoading={isLoading} />
          </div>
        ) : (
          /* Active Trip Plan View */
          <div className="space-y-8 animate-fade-in">
            {/* Trip Plan Hero Banner */}
            <div className="relative bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl overflow-hidden text-white">
              <img
                src={getDestinationHeroUrl(tripPlan.destination)}
                alt={tripPlan.destination}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-sky-500/80 text-white backdrop-blur-md border border-sky-400/30">
                      📍 {tripPlan.country || 'Destination'}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-slate-200 backdrop-blur-md border border-white/20">
                      {tripPlan.durationDays} Days • {tripPlan.budgetLevel} Tier • {tripPlan.travelGroup}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    {tripPlan.destination}
                  </h1>

                  <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                    {tripPlan.tagline || `Custom 100% personalized itinerary & travel guide for ${tripPlan.destination}.`}
                  </p>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setIsAiAssistantOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:opacity-95 transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Ask AI Assistant</span>
                  </button>

                  <button
                    onClick={handleSaveTrip}
                    disabled={isCurrentTripSaved}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                      isCurrentTripSaved
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isCurrentTripSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Plan Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Save Plan</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4 text-sky-500" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => setTripPlan(null)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Clean Tab Navigation Pills */}
            <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'itinerary'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Day-by-Day Itinerary</span>
              </button>

              <button
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'hotels'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Hotels ({tripPlan.hotels?.length || 6})</span>
              </button>

              <button
                onClick={() => setActiveTab('dining')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'dining'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Dining ({tripPlan.restaurants?.length || 6})</span>
              </button>

              <button
                onClick={() => setActiveTab('weather')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'weather'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <CloudSun className="w-4 h-4" />
                <span>Weather</span>
              </button>

              <button
                onClick={() => setActiveTab('emergency')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'emergency'
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                    : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Emergency Services</span>
              </button>

              <button
                onClick={() => setActiveTab('budget')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'budget'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Budget & Expenses</span>
              </button>

              <button
                onClick={() => setActiveTab('packing')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'packing'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Packing & Currency</span>
              </button>
            </div>

            {/* Active Tab Panel */}
            <div className="pt-2">
              {activeTab === 'itinerary' && (
                <ItineraryView trip={tripPlan} onSelectPlace={handleSelectPlace} />
              )}
              {activeTab === 'hotels' && (
                <HotelsView
                  hotels={tripPlan.hotels}
                  destination={tripPlan.destination}
                  onSelectPlace={handleSelectPlace}
                />
              )}
              {activeTab === 'dining' && (
                <DiningView
                  restaurants={tripPlan.restaurants}
                  destination={tripPlan.destination}
                  onSelectPlace={handleSelectPlace}
                />
              )}
              {activeTab === 'weather' && (
                <WeatherView weather={tripPlan.weather} destination={tripPlan.destination} />
              )}
              {activeTab === 'emergency' && (
                <EmergencyView emergency={tripPlan.emergency} destination={tripPlan.destination} />
              )}
              {activeTab === 'budget' && (
                <BudgetView budget={tripPlan.budget} durationDays={tripPlan.durationDays} />
              )}
              {activeTab === 'packing' && (
                <PackingCurrencyView
                  initialPacking={tripPlan.packing}
                  currency={tripPlan.currency}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Place Details Modal / Drawer */}
      <PlaceDetailsModal
        placeName={selectedPlaceName}
        locationName={tripPlan?.destination || 'Destination'}
        category={selectedPlaceCategory}
        onClose={() => setSelectedPlaceName(null)}
      />

      {/* Saved Trips Manager Modal */}
      <SavedTripsModal
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={(trip) => {
          setTripPlan(trip);
          setActiveTab('itinerary');
        }}
        onDeleteTrip={handleDeleteSavedTrip}
      />

      {/* Slide-out Navigation Drawer (Hamburger Menu) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onGoHome={() => setTripPlan(null)}
        onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        savedTripsCount={savedTrips.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* 4th Year College Project / About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* AI Assistant Chatbot Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        destination={tripPlan?.destination || 'Your Destination'}
      />

      {/* Floating AI Assistant Trigger Button */}
      <button
        onClick={() => setIsAiAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:scale-105 text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs border border-white/20 transition-all group"
        title="Ask AI Travel Assistant"
      >
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline pr-1">AI Travel Assistant</span>
      </button>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <Compass className="w-4 h-4 text-sky-500" />
            <span>AI Travel Planner Pro — Production-Grade Travel Companion</span>
          </div>
          <p>© {new Date().getFullYear()} AI Travel Planner. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
