import React from 'react';
import { Utensils, Star, MapPin, ChefHat, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { Restaurant } from '../types';
import { getPlaceImageUrl } from '../utils/images';

interface DiningViewProps {
  restaurants: Restaurant[];
  destination: string;
  onSelectPlace: (placeName: string, category: string) => void;
}

export const DiningView: React.FC<DiningViewProps> = ({
  restaurants,
  destination,
  onSelectPlace,
}) => {
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">No dining recommendations available for this destination.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Authentic Dining & Food Experiences in {destination}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Curated culinary spots featuring iconic local signature dishes and regional specialties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((rest) => {
          const photoUrl = rest.imageUrl || getPlaceImageUrl(rest.name, 'Restaurant & Dining', destination);

          return (
            <div
              key={rest.id}
              onClick={() => onSelectPlace(rest.name, 'Restaurant & Dining')}
              className="group bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Restaurant Image Header Banner */}
                <div className="h-44 -mx-5 -mt-5 mb-4 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={photoUrl}
                    alt={rest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                      {rest.cuisine || 'Local Cuisine'}
                    </span>
                    <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{rest.rating || 4.8}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                      {rest.name}
                    </h3>
                    <span className="text-xs font-black bg-amber-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                      {rest.priceRange || '$$'}
                    </span>
                  </div>
                </div>

                {/* Address */}
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{rest.address || destination}</span>
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-4">
                  {rest.description}
                </p>

                {/* Signature Dish Badge */}
                {rest.signatureDish && (
                  <div className="bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-200/50 dark:border-amber-900/40 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1 mb-1">
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Must-Try Signature Dish</span>
                    </span>
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-100 line-clamp-1">
                      {rest.signatureDish}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-500">
                <span>View Restaurant Details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
