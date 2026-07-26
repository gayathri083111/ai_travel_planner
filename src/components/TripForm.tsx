import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Sparkles, Compass, Check, Navigation } from 'lucide-react';
import { TripPreferences, BudgetLevel, TravelGroup } from '../types';

interface TripFormProps {
  onSubmit: (prefs: TripPreferences) => void;
  isLoading: boolean;
}

const POPULAR_DESTINATIONS = [
  'Paris, France',
  'Tokyo, Japan',
  'Bali, Indonesia',
  'Rome, Italy',
  'Hyderabad, India',
  'London, UK',
  'New York, USA',
  'Goa, India',
];

const INTEREST_OPTIONS = [
  { id: 'Food & Dining', label: '🍜 Food & Dining' },
  { id: 'Culture & Art', label: '🏛️ Culture & Art' },
  { id: 'Adventure', label: '⛰️ Adventure' },
  { id: 'Relaxation & Spa', label: '🧘 Relaxation' },
  { id: 'Shopping', label: '🛍️ Shopping' },
  { id: 'Nature & Wildlife', label: '🌴 Nature' },
  { id: 'Photography', label: '📸 Photography' },
];

export const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>('Moderate');
  const [travelGroup, setTravelGroup] = useState<TravelGroup>('Couple');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Food & Dining',
    'Culture & Art',
  ]);

  const toggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDest = destination.trim() || 'Paris, France';
    onSubmit({
      destination: finalDest,
      durationDays,
      budgetLevel,
      travelGroup,
      interests: selectedInterests,
    });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Scenic Travel Hero Background Image */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
          alt="Scenic World Travel"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Hero Header Text */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold mb-3 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI-Powered Personal Trip Architect</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Where would you like to travel next?
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
            Generate custom day-by-day itineraries, hotel suggestions, local dining spots, real-time weather, expense breakdown, and interactive packing lists in seconds.
          </p>
        </div>
      </div>

      {/* Form Container Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">

        {/* Destination Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Destination / City Name
            </label>
            <button
              type="button"
              onClick={() => {
                if ('geolocation' in navigator) {
                  navigator.geolocation.getCurrentPosition(
                    async (position) => {
                      const { latitude, longitude } = position.coords;
                      try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await res.json();
                        const city = data.address?.city || data.address?.town || data.address?.state || data.address?.country || 'Current Location';
                        const country = data.address?.country ? `, ${data.address.country}` : '';
                        setDestination(`${city}${country}`);
                      } catch (err) {
                        setDestination(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
                      }
                    },
                    (error) => {
                      alert('Could not access current location. Please type destination manually.');
                    }
                  );
                } else {
                  alert('Geolocation is not supported by your browser.');
                }
              }}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Detect My Location</span>
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-500">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Paris, Tokyo, Hyderabad, Rome, Bali..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Quick Popular Picks */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">
              Popular:
            </span>
            {POPULAR_DESTINATIONS.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setDestination(city)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  destination === city
                    ? 'bg-sky-500 text-white border-sky-500 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Duration */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              <Calendar className="w-4 h-4 text-sky-500" />
              <span>Duration (Days)</span>
            </label>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                -
              </button>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
              <button
                type="button"
                onClick={() => setDurationDays(Math.min(7, durationDays + 1))}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
              Optimized for 1 to 7 days
            </p>
          </div>

          {/* Budget Level */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span>Budget Level</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Budget', 'Moderate', 'Luxury'] as BudgetLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setBudgetLevel(level)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all ${
                    budgetLevel === level
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
              {budgetLevel === 'Budget' && 'Economic stays & local transit'}
              {budgetLevel === 'Moderate' && '3-4★ Comfort stays & balanced dining'}
              {budgetLevel === 'Luxury' && '5★ Premium resorts & gourmet dining'}
            </p>
          </div>

          {/* Travel Group */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Who is Traveling?</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['Solo', 'Couple', 'Family', 'Friends'] as TravelGroup[]).map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setTravelGroup(group)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                    travelGroup === group
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-400'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
              Customizes pace & spot types
            </p>
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
            Trip Style & Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/50'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-sky-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-lg shadow-sky-500/25 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Crafting Real-time Travel Plan for {destination || 'Destination'}...</span>
            </>
          ) : (
            <>
              <Compass className="w-5 h-5 animate-spin-slow" />
              <span>Generate Travel Plan</span>
            </>
          )}
        </button>
      </form>
      </div>
    </div>
  );
};
