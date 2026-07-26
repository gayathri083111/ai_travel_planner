import React from 'react';
import { Building2, Star, MapPin, Check, Wifi, Sparkles, Navigation, DollarSign, ChevronRight } from 'lucide-react';
import { Hotel } from '../types';
import { getPlaceImageUrl } from '../utils/images';

interface HotelsViewProps {
  hotels: Hotel[];
  destination: string;
  onSelectPlace: (placeName: string, category: string) => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({ hotels, destination, onSelectPlace }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">No hotel recommendations found for this trip.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Recommended Accommodations in {destination}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Click any hotel card to inspect real live details, amenity breakdowns, and location maps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => {
          const photoUrl = hotel.imageUrl || getPlaceImageUrl(hotel.name, 'Hotel Stay', destination);

          return (
            <div
              key={hotel.id}
              onClick={() => onSelectPlace(hotel.name, 'Hotel Stay')}
              className="group bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-500 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Hotel Image Card Header */}
                <div className="h-44 -mx-5 -mt-5 mb-4 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={photoUrl}
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                      {hotel.tags?.[0] || 'Top Hotel'}
                    </span>
                    <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{hotel.rating || 4.8}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="font-extrabold text-base text-white leading-tight group-hover:text-sky-200 transition-colors line-clamp-1">
                      {hotel.name}
                    </h3>
                  </div>
                </div>

                {/* Price & Address */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate max-w-[180px]">
                    <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="truncate">{hotel.address || destination}</span>
                  </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                    ${hotel.pricePerNightUSD} <span className="text-[10px] font-medium text-slate-400">/ night</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-4">
                  {hotel.description}
                </p>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-[10px] font-bold text-slate-400 px-1 py-1">
                        +{hotel.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-500">
                <span>View Hotel Details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
