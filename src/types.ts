export interface Houseboat {
  id: string;
  name: string;
  tagline: string;
  type: 'Luxury Suite' | 'Royal Cabin' | 'Eco Deluxe' | 'Family Duplex';
  description: string;
  pricePerNight: number;
  capacity: number;
  rooms: number;
  bathrooms: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  imageUrl: string;
  cabinImageUrl: string;
  submergedForestTourIncluded: boolean;
}

export interface Booking {
  id: string;
  houseboatId: string;
  houseboatName: string;
  houseboatImageUrl: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  selectedAddOns: string[];
  totalPrice: number;
  bookingDate: string;
  paymentStatus: 'Pending' | 'Paid';
  specialRequests?: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: 'per person' | 'per stay' | 'per day';
  iconName: string;
}

export interface TravelDestination {
  id: string;
  name: string;
  localName: string;
  description: string;
  distanceFromHaor: string;
  bestTime: string;
  tip: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'scenic' | 'houseboats' | 'cabins' | 'culture' | 'sunset';
  photographer: string;
  description: string;
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl: string;
}
