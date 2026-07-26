import React from 'react';
import { ShieldAlert, Phone, Hospital, Shield, PhoneCall, MapPin, Navigation, Info, ExternalLink, AlertTriangle } from 'lucide-react';
import { EmergencyInfo } from '../types';

interface EmergencyViewProps {
  emergency?: EmergencyInfo;
  destination: string;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({ emergency, destination }) => {
  const policeNum = emergency?.generalPoliceNumber || '112 / 100';
  const ambNum = emergency?.generalAmbulanceNumber || '102 / 112';
  const touristNum = emergency?.touristHelplineNumber || '+1-800-555-TOURIST';

  const defaultServices = emergency?.services && emergency.services.length > 0 ? emergency.services : [
    {
      id: 'em-1',
      name: `${destination} Central General Hospital`,
      type: 'Hospital' as const,
      address: `100 Health Avenue, ${destination}`,
      contactNumber: '+1-555-019-2831',
      notes: '24/7 Emergency Room & Trauma Center with multi-lingual medical personnel.',
    },
    {
      id: 'em-2',
      name: `${destination} Police Headquarters`,
      type: 'Police' as const,
      address: `1 Civic Center Plaza, ${destination}`,
      contactNumber: '+1-555-011-9988',
      notes: 'Dedicated Tourist Assistance Desk for emergency reports, stolen items, and safety.',
    },
    {
      id: 'em-3',
      name: `${destination} Travelers Urgent Care Clinic`,
      type: 'Hospital' as const,
      address: `45 Medical Park Road, ${destination}`,
      contactNumber: '+1-555-014-3322',
      notes: 'Specialized in international traveler insurance claims, travel medicine & vaccinations.',
    },
    {
      id: 'em-4',
      name: `${destination} Tourist Police Unit`,
      type: 'Helpline' as const,
      address: `Tourist Information Office, ${destination}`,
      contactNumber: '+1-555-018-7711',
      notes: 'Multi-lingual hotline for emergency translation, passport guidance, and tourist safety.',
    }
  ];

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleOpenMaps = (address: string) => {
    const query = encodeURIComponent(`${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Warning Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-500 via-rose-600 to-amber-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-start gap-4 z-10 relative">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shrink-0">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full border border-white/20">
                24/7 Safety First
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Emergency Contacts & Nearby Safety Services
            </h2>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-2xl font-medium leading-relaxed">
              Essential local emergency contacts, hospitals, and police station information for <strong>{destination}</strong>. One-tap direct dial available below.
            </p>
          </div>
        </div>
      </div>

      {/* Main Hotline Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Police Card */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              Police Hotline
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Police & Security
            </h3>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {policeNum}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              For crime, theft, accidents, or urgent safety intervention.
            </p>
          </div>

          <button
            onClick={() => handleCall(policeNum)}
            className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Police ({policeNum})</span>
          </button>
        </div>

        {/* Ambulance Card */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-2xl">
              <Hospital className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300">
              Medical ER
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Ambulance & ER
            </h3>
            <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">
              {ambNum}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              For acute health emergencies and immediate trauma response.
            </p>
          </div>

          <button
            onClick={() => handleCall(ambNum)}
            className="mt-4 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Medical ER ({ambNum})</span>
          </button>
        </div>

        {/* Tourist Helpline Card */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
              Tourist Support
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Tourist Helpline
            </h3>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1 truncate">
              {touristNum}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Multi-lingual advice, passport loss help, & traveler support.
            </p>
          </div>

          <button
            onClick={() => handleCall(touristNum)}
            className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Tourist Helpline</span>
          </button>
        </div>
      </div>

      {/* Specific Hospitals & Police Stations List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Hospital className="w-5 h-5 text-red-500" />
            <span>Nearby Hospitals & Police Headquarters ({destination})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:border-sky-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    srv.type === 'Hospital' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {srv.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{srv.contactNumber}</span>
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                  {srv.name}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>{srv.address}</span>
                </p>

                {srv.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                    {srv.notes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
                <button
                  onClick={() => handleCall(srv.contactNumber)}
                  className="flex-1 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Direct</span>
                </button>

                <button
                  onClick={() => handleOpenMaps(`${srv.name}, ${srv.address}`)}
                  className="px-3.5 py-2 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold text-xs rounded-xl border border-sky-200/80 dark:border-sky-800 hover:bg-sky-100 transition-colors flex items-center gap-1"
                  title="Open in Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Maps</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Safety Checklist Card */}
      <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-extrabold text-sm text-amber-900 dark:text-amber-200 uppercase tracking-wider">
            Traveler Safety Guidelines
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-900/90 dark:text-amber-200/90 font-medium">
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-600">•</span>
            <span>Always keep digital & physical copies of your passport, visa & travel insurance policy.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-600">•</span>
            <span>Share your daily itinerary and live location with family members or close friends.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-600">•</span>
            <span>Store local emergency hospital and embassy numbers on your phone speed dial.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-600">•</span>
            <span>In case of lost passport, immediately contact your embassy or tourist police headquarters.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
