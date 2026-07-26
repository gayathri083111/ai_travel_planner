import React, { useState } from 'react';
import { Sun, Sunset, Moon, MapPin, Clock, DollarSign, Lightbulb, Compass, Navigation, ExternalLink, ChevronRight } from 'lucide-react';
import { ItineraryDay, Activity, TripPlanData } from '../types';
import { getPlaceImageUrl } from '../utils/images';

interface ItineraryViewProps {
  trip: TripPlanData;
  onSelectPlace: (placeName: string, category: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ trip, onSelectPlace }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  if (!trip.days || trip.days.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">No itinerary data available.</p>
      </div>
    );
  }

  const currentDay: ItineraryDay = trip.days[activeDayIndex] || trip.days[0];

  const renderActivityCard = (activity: Activity, slotIcon: React.ReactNode) => {
    const photoUrl = activity.imageUrl || getPlaceImageUrl(activity.name, activity.category || 'Attraction', trip.destination);

    return (
      <div
        key={activity.id}
        onClick={() => onSelectPlace(activity.name, activity.category || 'Attraction')}
        className="group relative bg-white dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-600 transition-all cursor-pointer flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
      >
        {/* Activity Photo Thumbnail */}
        <div className="relative w-full sm:w-44 h-36 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700">
          <img
            src={photoUrl}
            alt={activity.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
          <span className="absolute bottom-2 left-2 sm:hidden text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
            {activity.category || 'Sightseeing'}
          </span>
        </div>

        {/* Card Content Details */}
        <div className="flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {slotIcon}
                <span>{activity.timeSlot}</span>
              </span>

              <span className="hidden sm:inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/40">
                {activity.category || 'Sightseeing'}
              </span>

              <span className="text-xs font-medium text-slate-400 flex items-center gap-1 ml-auto">
                <Clock className="w-3 h-3" />
                {activity.durationHours} hrs
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                <span>{activity.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-sky-500" />
              </h3>

              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shrink-0">
                ${activity.estimatedCostUSD}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{activity.address || `${activity.name}, ${trip.destination}`}</span>
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-2">
              {activity.description}
            </p>
          </div>

          {activity.localTip && (
            <div className="flex items-start gap-2 bg-amber-50/70 dark:bg-amber-950/30 p-2 rounded-xl border border-amber-200/50 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1"><strong className="font-semibold">Local Tip:</strong> {activity.localTip}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {trip.days.map((day, idx) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDayIndex(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border ${
              activeDayIndex === idx
                ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20 scale-[1.02]'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
            }`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Day Theme Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              Day {currentDay.dayNumber} Highlights
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              {currentDay.theme || `Exploring ${trip.destination}`}
            </h2>
          </div>
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
            📍 {trip.destination}
          </span>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-6">
        {/* Morning */}
        {currentDay.morning && currentDay.morning.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Morning Program</span>
            </h3>
            <div className="space-y-3">
              {currentDay.morning.map((act) => renderActivityCard(act, <Sun className="w-3 h-3 text-amber-500" />))}
            </div>
          </div>
        )}

        {/* Afternoon */}
        {currentDay.afternoon && currentDay.afternoon.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-500" />
              <span>Afternoon Exploration</span>
            </h3>
            <div className="space-y-3">
              {currentDay.afternoon.map((act) => renderActivityCard(act, <Sunset className="w-3 h-3 text-orange-500" />))}
            </div>
          </div>
        )}

        {/* Evening */}
        {currentDay.evening && currentDay.evening.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Evening Experience</span>
            </h3>
            <div className="space-y-3">
              {currentDay.evening.map((act) => renderActivityCard(act, <Moon className="w-3 h-3 text-indigo-400" />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
