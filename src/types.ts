export type BudgetLevel = 'Budget' | 'Moderate' | 'Luxury';
export type TravelGroup = 'Solo' | 'Couple' | 'Family' | 'Friends';

export interface TripPreferences {
  destination: string;
  durationDays: number;
  budgetLevel: BudgetLevel;
  travelGroup: TravelGroup;
  interests: string[];
}

export interface DailyForecast {
  day: string;
  highTempC: number;
  lowTempC: number;
  condition: string;
  icon: 'sun' | 'cloud' | 'rain' | 'snow' | 'thunder';
}

export interface WeatherInfo {
  currentTempC: number;
  condition: string;
  humidity: number; // percentage
  windSpeedKmh: number;
  highLowC: string; // e.g. "28° / 19°"
  forecast: DailyForecast[];
  bestTimeToVisit: string;
  clothingTips: string[];
}

export interface Hotel {
  id: string;
  name: string;
  rating: number; // e.g. 4.8
  pricePerNightUSD: number;
  address: string;
  description: string;
  amenities: string[];
  bookingHint: string;
  tags: string[];
  imageUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  cuisine: string;
  address: string;
  description: string;
  signatureDish: string;
  recommendedFor: string;
  imageUrl?: string;
}

export interface Activity {
  id: string;
  name: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  durationHours: number;
  estimatedCostUSD: number;
  address: string;
  description: string;
  category: string;
  localTip: string;
  imageUrl?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
}

export interface PackingItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface PackingCategory {
  categoryName: string;
  items: PackingItem[];
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rateVsUSD: number; // e.g. 83.5 for INR, 0.92 for EUR
}

export interface BudgetBreakdown {
  currencySymbol: string;
  totalUSD: number;
  accommodationUSD: number;
  foodUSD: number;
  activitiesUSD: number;
  transportUSD: number;
  dailyEstimateUSD: number;
}

export interface EmergencyService {
  id: string;
  name: string;
  type: 'Hospital' | 'Police' | 'Embassy' | 'Helpline';
  address: string;
  contactNumber: string;
  notes?: string;
}

export interface EmergencyInfo {
  generalPoliceNumber: string;
  generalAmbulanceNumber: string;
  touristHelplineNumber: string;
  services: EmergencyService[];
}

export interface TripPlanData {
  id: string;
  createdAt: string;
  destination: string;
  country: string;
  tagline: string;
  durationDays: number;
  budgetLevel: BudgetLevel;
  travelGroup: TravelGroup;
  weather: WeatherInfo;
  hotels: Hotel[];
  restaurants: Restaurant[];
  days: ItineraryDay[];
  packing: PackingCategory[];
  currency: CurrencyInfo;
  budget: BudgetBreakdown;
  emergency?: EmergencyInfo;
}

export interface PlaceDetails {
  name: string;
  locationName: string;
  category: string; // e.g. "Historical Landmark", "Hotel", "Boutique Cafe"
  currentTempC: number;
  weatherCondition: string;
  rating: number;
  address: string;
  estimatedCost: string;
  description: string;
  highlights: string[];
  bestVisitTime: string;
  insiderTip: string;
  nearbySpots: string[];
  googleMapsQuery: string;
  imageUrl?: string;
}
