export interface BookingDate {
  date: string;
  status: "available" | "booked" | "limited";
  price: number;
  isWeekend: boolean;
  isPeak: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number; // 0 = no fixed price (see priceLabel)
  priceLabel?: string; // shown instead of the price, e.g. "As per quantity"
  note?: string; // small print, e.g. "Seasonal · T&C apply"
  duration: string;
  icon: string;
}

export interface PricingConfig {
  accommodation: {
    weekday: number;
    weekend: number;
    peakSeason: number;
    peakSeasonStart: string;
    peakSeasonEnd: string;
    minNights: number;
    maxNights: number;
    extraGuest: number;
    maxGuests: number;
    baseGuests: number;
    currency: string;
    currencySymbol: string;
  };
  addons: AddonItem[];
  weekendDays: number[];
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  included: boolean;
  addonId: string | null;
  highlights: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  addons: string[];
  specialRequests: string;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  addons: string[];
  special_requests: string;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface GalleryImage {
  src: string; // photo, or a video's poster frame
  alt: string;
  category: string;
  width: number;
  height: number;
  video?: string; // set for videos: the .mp4 to play
}
