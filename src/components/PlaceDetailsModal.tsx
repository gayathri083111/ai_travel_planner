import React, { useEffect, useState } from 'react';
import { X, MapPin, Star, Thermometer, Clock, Sparkles, Navigation, DollarSign, ExternalLink, Lightbulb, Compass } from 'lucide-react';
import { PlaceDetails } from '../types';
import { getPlaceImageUrl } from '../utils/images';

interface PlaceDetailsModalProps {
  placeName: string | null;
  locationName: string;
  category?: string;
  onClose: () => void;
}

export const PlaceDetailsModal: React.FC<PlaceDetailsModalProps> = ({
  placeName,
  locationName,
  category = 'Attraction',
  onClose,
}) => {
  const [details, setDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!placeName) return;

    let isMounted = true;
    setLoading(true);

    fetch('/api/place-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        placeName,
        locationName,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setDetails(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load place details:', err);
        if (isMounted) {
          setDetails({
            name: placeName,
            locationName: locationName,
            category,
            currentTempC: 25,
            weatherCondition: 'Clear & Pleasant',
            rating: 4.8,
            address: `${placeName}, ${locationName}`,
            estimatedCost: 'Varies',
            description: `A highly recommended ${category.toLowerCase()} spot in ${locationName} with authentic local appeal.`,
            highlights: ['Great local ambience', 'Photogenic architecture', 'Easy public access'],
            bestVisitTime: 'Morning or Sunset',
            insiderTip: 'Visit early during peak hours for fewer crowds.',
            nearbySpots: ['Central Square', 'Local Cafe', 'Scenic Walkway'],
            googleMapsQuery: `${placeName}, ${locationName}`,
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [placeName, locationName, category]);

  if (!placeName) return null;

  const handleOpenMaps = () => {
    const query = encodeURIComponent(details?.googleMapsQuery || `${placeName}, ${locationName}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const photoUrl = details?.imageUrl || getPlaceImageUrl(placeName, details?.category || category, locationName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo Banner */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
          <img
            src={photoUrl}
            alt={placeName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-20"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 z-10 text-white">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/90 text-white backdrop-blur-md mb-1.5">
              {details?.category || category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
              {placeName}
            </h2>
            <p className="text-xs text-slate-200 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{details?.address || `${placeName}, ${locationName}`}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Fetching real dynamic insights for {placeName}...
              </p>
            </div>
          ) : (
            <>
              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Rating</span>
                  <div className="flex items-center gap-1 text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{details?.rating || 4.8} / 5</span>
                  </div>
                </div>

                <div className="flex flex-col items-center border-x border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Temperature</span>
                  <div className="flex items-center gap-1 text-sm font-extrabold text-sky-600 dark:text-sky-400 mt-0.5">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>{details?.currentTempC || 24}°C ({details?.weatherCondition || 'Clear'})</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Est. Price</span>
                  <div className="flex items-center gap-1 text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{details?.estimatedCost || '$15'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  About {placeName}
                </h4>
                <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {details?.description}
                </p>
              </div>

              {/* Highlights */}
              {details?.highlights && details.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Key Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {details.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-sky-50/50 dark:bg-sky-950/30 p-2.5 rounded-xl border border-sky-100 dark:border-sky-900/50">
                        <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Best Visit Time & Insider Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-amber-50/60 dark:bg-amber-950/30 p-3.5 rounded-2xl border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold text-xs mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Best Time to Visit</span>
                  </div>
                  <p className="text-xs text-amber-900 dark:text-amber-200">
                    {details?.bestVisitTime || 'Morning hours (8:30 AM - 11:00 AM)'}
                  </p>
                </div>

                <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 rounded-2xl border border-indigo-200/60 dark:border-indigo-900/40">
                  <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold text-xs mb-1">
                    <Lightbulb className="w-4 h-4" />
                    <span>Insider Tip</span>
                  </div>
                  <p className="text-xs text-indigo-900 dark:text-indigo-200">
                    {details?.insiderTip || 'Pre-book online tickets to skip queue lines.'}
                  </p>
                </div>
              </div>

              {/* Nearby Spots */}
              {details?.nearbySpots && details.nearbySpots.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Nearby Spots
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {details.nearbySpots.map((spot, i) => (
                      <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                        📍 {spot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleOpenMaps}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};
