import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Thermometer, Wind, Droplets, Calendar, Search, Sparkles, MapPin } from 'lucide-react';
import { WeatherInfo, DailyForecast } from '../types';

interface WeatherViewProps {
  weather: WeatherInfo;
  destination: string;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ weather, destination }) => {
  const [searchCity, setSearchCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherInfo>(weather);
  const [cityDisplay, setCityDisplay] = useState(destination);
  const [loading, setLoading] = useState(false);

  const handleSearchWeather = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setLoading(true);
    const target = searchCity.trim();

    fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: target }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.currentTempC) {
          setCurrentWeather({
            currentTempC: data.currentTempC,
            condition: data.condition || 'Clear',
            humidity: data.humidity || 50,
            windSpeedKmh: data.windSpeedKmh || 12,
            highLowC: data.highLowC || '26° / 18°',
            forecast: data.forecast || weather.forecast,
            bestTimeToVisit: data.bestMonths || weather.bestTimeToVisit,
            clothingTips: data.packingAdvice || weather.clothingTips,
          });
          setCityDisplay(target);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Weather search error:', err);
        setLoading(false);
      });
  };

  const getWeatherIcon = (iconType: string, conditionStr: string) => {
    const text = (conditionStr || '').toLowerCase();
    if (iconType === 'rain' || text.includes('rain') || text.includes('shower')) {
      return <CloudRain className="w-8 h-8 text-sky-400" />;
    }
    if (iconType === 'thunder' || text.includes('thunder') || text.includes('storm')) {
      return <CloudLightning className="w-8 h-8 text-amber-400" />;
    }
    if (iconType === 'cloud' || text.includes('cloud') || text.includes('overcast')) {
      return <Cloud className="w-8 h-8 text-slate-400" />;
    }
    return <Sun className="w-8 h-8 text-amber-400 animate-spin-slow" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Weather City Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-sky-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Weather & Climate for {cityDisplay}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time local temperature forecast and clothing recommendations.
          </p>
        </div>

        {/* Live Search Form */}
        <form onSubmit={handleSearchWeather} className="w-full sm:w-auto flex items-center gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Check another city..."
            className="px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-48"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            <span>Check</span>
          </button>
        </form>
      </div>

      {/* Main Temperature Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-md">
                Current Temperature
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl sm:text-7xl font-black tracking-tight">
                  {currentWeather.currentTempC}°C
                </span>
                <span className="text-lg font-medium opacity-80">
                  ({currentWeather.condition})
                </span>
              </div>
              <p className="text-xs sm:text-sm mt-1 opacity-90">
                Day Range: <strong className="font-extrabold">{currentWeather.highLowC}</strong>
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
              {getWeatherIcon('sun', currentWeather.condition)}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/15">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-75">Humidity</span>
                <p className="text-base font-black">{currentWeather.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/15">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-75">Wind Speed</span>
                <p className="text-base font-black">{currentWeather.windSpeedKmh} km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Time & Packing Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Best Visit Season</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
              {currentWeather.bestTimeToVisit}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Recommended Apparel
            </span>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {currentWeather.clothingTips && currentWeather.clothingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <span className="text-sky-500 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          5-Day Weather Forecast
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {currentWeather.forecast && currentWeather.forecast.map((dayItem, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-center flex flex-col items-center justify-between space-y-2 hover:border-sky-400 transition-all shadow-sm"
            >
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                {dayItem.day}
              </span>

              <div className="my-1">
                {getWeatherIcon(dayItem.icon, dayItem.condition)}
              </div>

              <div>
                <span className="text-sm font-black text-slate-900 dark:text-white block">
                  {dayItem.highTempC}° <span className="text-slate-400 text-xs font-medium">/ {dayItem.lowTempC}°</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5 truncate max-w-[100px]">
                  {dayItem.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
