// High-quality curated Unsplash image pools for travel elements with reliable fallback

const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', // Luxury pool resort
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', // Modern hotel suite
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', // Elegant hotel facade
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', // Boutique resort room
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', // Beachfront hotel villa
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', // Minimalist cozy hotel
];

const RESTAURANT_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', // Fine dining interior
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', // Gourmet restaurant food
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80', // Bistro ambience
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', // Artisanal dining & wine
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', // Fresh cuisine spread
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', // Outdoor patio cafe
];

const ATTRACTION_IMAGES = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80', // Travel scenic view
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80', // Mountain lake landscape
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80', // Paris architecture
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Tropical beach
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80', // Historic London / City streets
  'https://images.unsplash.com/photo-1528164344705-475426879e0d?auto=format&fit=crop&w=800&q=80', // Japan pagoda & nature
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80', // Taj Mahal / Heritage monument
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', // Dubai skyline & beach
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', // Santorini Greece
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80', // Tropical island resort
];

// Simple deterministic hash to get consistent image per string seed
function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getPlaceImageUrl(
  name: string,
  category: string = 'Attraction',
  destination: string = ''
): string {
  const seed = `${name}-${category}-${destination}`.toLowerCase();
  const hash = stringToHash(seed);

  const lowerCat = category.toLowerCase();
  const lowerName = name.toLowerCase();

  if (lowerCat.includes('hotel') || lowerCat.includes('stay') || lowerCat.includes('resort') || lowerName.includes('hotel') || lowerName.includes('inn') || lowerName.includes('suites')) {
    const idx = hash % HOTEL_IMAGES.length;
    return HOTEL_IMAGES[idx];
  }

  if (lowerCat.includes('restaurant') || lowerCat.includes('dining') || lowerCat.includes('bistro') || lowerCat.includes('food') || lowerCat.includes('cafe') || lowerName.includes('bistro') || lowerName.includes('kitchen') || lowerName.includes('cafe')) {
    const idx = hash % RESTAURANT_IMAGES.length;
    return RESTAURANT_IMAGES[idx];
  }

  // Attractions & Monuments
  const idx = hash % ATTRACTION_IMAGES.length;
  return ATTRACTION_IMAGES[idx];
}

export function getDestinationHeroUrl(destination: string): string {
  const dest = destination.toLowerCase();
  if (dest.includes('paris') || dest.includes('france')) {
    return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('tokyo') || dest.includes('japan') || dest.includes('kyoto')) {
    return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('york') || dest.includes('usa')) {
    return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('rome') || dest.includes('italy')) {
    return 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('london') || dest.includes('uk')) {
    return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('bali') || dest.includes('indonesia')) {
    return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('dubai') || dest.includes('uae')) {
    return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';
  }
  if (dest.includes('delhi') || dest.includes('mumbai') || dest.includes('goa') || dest.includes('india')) {
    return 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';
  }

  // Fallback destination stock
  const hash = stringToHash(destination);
  return ATTRACTION_IMAGES[hash % ATTRACTION_IMAGES.length];
}
