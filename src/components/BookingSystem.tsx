import React, { useState, useEffect } from 'react';
import { houseboats, addOns } from '../data';
import { Houseboat, Booking, AddOn } from '../types';
import { 
  Users, Check, Calendar, Info, Trash2, Printer, 
  Sparkles, CheckCircle2, Moon, ArrowRight, ShieldCheck, 
  ChevronRight, ArrowLeft, Heart, CreditCard, Ship, 
  CheckSquare, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AestheticTanguaLogo from './Logo';

interface BookingSystemProps {
  currency: 'BDT' | 'USD';
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  viewMyBookingsDirectly?: boolean;
  onBookingSuccess?: () => void;
}

export default function BookingSystem({
  currency,
  bookings,
  setBookings,
  viewMyBookingsDirectly = false,
  onBookingSuccess
}: BookingSystemProps) {
  
  // Selection states
  const [selectedHouseboat, setSelectedHouseboat] = useState<Houseboat | null>(null);
  const [activeScreen, setActiveScreen] = useState<'catalog' | 'form' | 'success'>(
    viewMyBookingsDirectly ? 'catalog' : 'catalog'
  );
  
  // Form fields
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalGuests, setTotalGuests] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingErrors, setBookingErrors] = useState<string[]>([]);
  
  // Active newly created booking info for receipt display
  const [recentBooking, setRecentBooking] = useState<Booking | null>(null);

  // Houseboat filter states
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [capacityFilter, setCapacityFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-fill dates with reasonable defaults (tomorrow and the day after)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // tomorrow
    const format = (d: Date) => d.toISOString().split('T')[0];
    setCheckInDate(format(today));
    
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2); // 2 nights stay
    setCheckOutDate(format(dayAfter));
  }, []);

  const exchangeRate = 118; // 1 USD = 118 BDT
  const formatCharge = (bdt: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdt / exchangeRate)}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  const calculateNights = (): number => {
    if (!checkInDate || !checkOutDate) return 1;
    const cin = new Date(checkInDate);
    const cout = new Date(checkOutDate);
    const diff = cout.getTime() - cin.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const calculateTotalPriceObj = (houseboat: Houseboat) => {
    const nights = calculateNights();
    const baseRent = houseboat.pricePerNight * nights;
    
    let addOnsCost = 0;
    selectedAddOns.forEach(id => {
      const addon = addOns.find(a => a.id === id);
      if (addon) {
        if (addon.unit === 'per person') {
          addOnsCost += addon.price * totalGuests;
        } else if (addon.unit === 'per day') {
          addOnsCost += addon.price * nights;
        } else {
          addOnsCost += addon.price; // per stay
        }
      }
    });

    const subTotal = baseRent + addOnsCost;
    const ecoTax = Math.round(subTotal * 0.05); // 5% eco preservation levy
    const grandTotal = subTotal + ecoTax;

    return {
      nights,
      baseRent,
      addOnsCost,
      subTotal,
      ecoTax,
      grandTotal
    };
  };

  const handleSelectAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const validateBooking = (): boolean => {
    const errors: string[] = [];
    
    if (!guestName.trim()) errors.push('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
    if (!guestEmail.trim() || !guestEmail.includes('@')) errors.push('একটি সঠিক ইমেইল এড্রেস প্রদান করুন।');
    if (!guestPhone.trim() || guestPhone.length < 8) errors.push('অনুগ্রহ করে একটি সঠিক মোবাইল নম্বর লিখুন।');
    
    if (!checkInDate) errors.push('ভ্রমণ শুরুর তারিখ নির্বাচন করুন।');
    if (!checkOutDate) errors.push('ভ্রমণ শেষের তারিখ নির্বাচন করুন।');
    
    const cinObj = new Date(checkInDate);
    const coutObj = new Date(checkOutDate);
    
    if (cinObj < new Date(new Date().setDate(new Date().getDate() - 1))) {
      errors.push('ভ্রমণের সূচনার তারিখ অতীতে হতে পারবে না।');
    }
    
    if (coutObj <= cinObj) {
      errors.push('ভ্রমণ শেষের তারিখ অবশ্যই শুরু হওয়ার পরবর্তী সময়ের হতে হবে।');
    }

    if (selectedHouseboat && totalGuests > selectedHouseboat.capacity) {
      errors.push(`এই হাউসবোটটির সর্বোচ্চ ধারণক্ষমতা ${selectedHouseboat.capacity} জন। এর বেশি অতিথি নেওয়া সম্ভব নয়।`);
    }

    setBookingErrors(errors);
    return errors.length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHouseboat) return;

    if (!validateBooking()) {
      return;
    }

    const priceDetails = calculateTotalPriceObj(selectedHouseboat);
    
    const newBooking: Booking = {
      id: `AT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      houseboatId: selectedHouseboat.id,
      houseboatName: selectedHouseboat.name,
      houseboatImageUrl: selectedHouseboat.imageUrl,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      totalGuests,
      selectedAddOns: [...selectedAddOns],
      totalPrice: priceDetails.grandTotal,
      bookingDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      paymentStatus: 'Pending',
      specialRequests: specialRequests.trim() || undefined
    };

    // Save state
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('aesthetic_tangua_bookings', JSON.stringify(updated));

    // Show success view
    setRecentBooking(newBooking);
    setActiveScreen('success');

    if (onBookingSuccess) {
      onBookingSuccess();
    }
  };

  const handleSelectHouseboatForBooking = (houseboat: Houseboat) => {
    setSelectedHouseboat(houseboat);
    setSelectedAddOns([]);
    setBookingErrors([]);
    setSpecialRequests('');
    setActiveScreen('form');
  };

  const handleResetForm = () => {
    setSelectedHouseboat(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSelectedAddOns([]);
    setBookingErrors([]);
    setActiveScreen('catalog');
  };

  // Filter Catalog
  const filteredHouseboats = houseboats.filter(hb => {
    const matchesSearch = hb.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hb.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hb.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || hb.type === typeFilter;
    const matchesCapacity = capacityFilter === 0 || hb.capacity >= capacityFilter;
    return matchesSearch && matchesType && matchesCapacity;
  });

  return (
    <div id="booking-system-root" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      <AnimatePresence mode="wait">
        
        {/* ================= SCREEN 1: THE CATALOGUE ================= */}
        {activeScreen === 'catalog' && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header section */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-950 bg-zinc-100 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
                হাউসবোট বুকিং পোর্টাল
              </span>
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                আপনার পছন্দের বিলাসবহুল বহর নির্বাচন করুন
              </h1>
              <p className="mt-4 text-base text-gray-650 leading-relaxed">
                আমাদের প্রতিটি হাউসবোট ঐতিহ্যবাহী কারুকাঠ, সুসজ্জিত কেবিন, সম্পূর্ণ সোলার প্যানেল, অর্গানিক খাবারের জন্য নিজস্ব শেফ এবং উন্নত বায়ো-টয়লেট স্যানিটেশন ব্যবস্থার অনন্য সমন্বয়ে তৈরি।
              </p>
            </div>

            {/* Catalog Filters Controls */}
            <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="w-full md:w-1/3 relative">
                <input
                  type="text"
                  placeholder="হাউসবোটের নাম বা সুবিধা খুঁজুন (যেমন সোলার, শেফ)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 pl-10 text-sm focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
                <span className="absolute left-3.5 top-3.5 text-gray-400">🔍</span>
              </div>

              {/* Dropdown Type Filter */}
              <div className="w-full md:w-1/4">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 cursor-pointer"
                >
                  <option value="all">সব ক্যাটাগরির কেবিন</option>
                  <option value="Luxury Suite">লাক্সারি সুইট</option>
                  <option value="Royal Cabin">রয়্যাল কেবিন</option>
                  <option value="Eco Deluxe">ইকো ডিল্যাক্স</option>
                  <option value="Family Duplex">ফ্যামিলি ডুপ্লেক্স</option>
                </select>
              </div>

              {/* capacity selector */}
              <div className="w-full md:w-1/4 flex items-center space-x-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-200">
                <Users className="h-4.5 w-4.5 text-black shrink-0" />
                <div className="flex flex-col w-full">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider font-bold">প্রয়োজনীয় ধারণক্ষমতা</span>
                  <select
                    value={capacityFilter}
                    onChange={(e) => setCapacityFilter(Number(e.target.value))}
                    className="text-xs bg-transparent border-0 p-0 focus:outline-none focus:ring-0 font-semibold text-gray-700 w-full cursor-pointer"
                  >
                    <option value={0}>সব ধারণক্ষমতা</option>
                    <option value={6}>৬+ জন অতিথি</option>
                    <option value={8}>৮+ জন অতিথি</option>
                    <option value={10}>১০+ জন অতিথি</option>
                    <option value={12}>১২+ জন অতিথি</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="fleet-grid">
              {filteredHouseboats.map((hb) => (
                <div 
                  key={hb.id}
                  id={`fleet-card-${hb.id}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-150 hover:border-black transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  {/* Image section */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img 
                      src={hb.imageUrl} 
                      alt={hb.name} 
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-black/90 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full font-bold">
                        {hb.type === 'Luxury Suite' ? 'লাক্সারি সুইট' : hb.type === 'Royal Cabin' ? 'রয়্যাল কেবিন' : hb.type === 'Eco Deluxe' ? 'ইকো ডিল্যাক্স' : 'ফ্যামিলি ডুপ্লেক্স'}
                      </span>
                      {hb.submergedForestTourIncluded && (
                        <span className="bg-white text-black text-[9px] font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1 border border-black/10">
                          <Sparkles className="h-2.5 w-2.5 shrink-0 text-black animate-pulse" />
                          <span>সোয়াম্প ফরেস্ট ট্যুর ফ্রি</span>
                        </span>
                      )}
                    </div>

                    {/* Price banner */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-black px-4 py-2.5 rounded-2xl shadow-sm border border-zinc-200">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">প্রতি রাতের ভাড়া</div>
                      <div className="font-sans text-lg font-extrabold text-black leading-none mt-0.5">
                        {formatCharge(hb.pricePerNight)}
                      </div>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6.5 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans text-xl font-bold tracking-tight text-gray-900">
                          {hb.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm font-semibold text-amber-500">
                          <span>★</span>
                          <span className="text-gray-800">{hb.rating}</span>
                          <span className="text-gray-400 text-xs font-normal">({hb.reviewsCount})</span>
                        </div>
                      </div>
                      <p className="font-sans text-xs italic text-gray-500 font-medium">"{hb.tagline}"</p>
                    </div>

                    <p className="text-xs text-gray-650 leading-relaxed line-clamp-3">
                      {hb.description}
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center font-mono text-[11px] text-gray-500">
                      <div>
                        <span className="block font-bold text-gray-850 text-xs sm:text-sm">{hb.capacity} জন</span>
                        সর্বোচ্চ অতিথি
                      </div>
                      <div>
                        <span className="block font-bold text-gray-850 text-xs sm:text-sm">{hb.rooms} টি কেবিন</span>
                        আরামদায়ক কেবিন
                      </div>
                      <div>
                        <span className="block font-bold text-gray-850 text-xs sm:text-sm">{hb.bathrooms} টি বাথরুম</span>
                        বায়ো স্যানিটেশন
                      </div>
                    </div>

                    {/* Amenities Tag Cloud */}
                    <div className="flex flex-wrap gap-1.5">
                      {hb.amenities.slice(0, 4).map((amt, idx) => (
                        <span key={idx} className="bg-gray-50 border border-gray-150 text-gray-600 text-[10px] font-mono px-2 py-1 rounded-md">
                          {amt === 'Solar Electricity & Fan' ? 'সৌর বিদ্যুৎ ও ফ্যান' : amt === 'Organic Local Chef' ? 'দক্ষ স্থানীয় শেফ' : amt === 'Attached High Commode' ? 'হাই কমোড বাথরুম' : amt === 'Open Observation Deck' ? 'খোলা অবজারভেশন ডেক' : amt}
                        </span>
                      ))}
                      {hb.amenities.length > 4 && (
                        <span className="bg-gray-50 text-gray-400 text-[10px] font-semibold px-1.5 py-1 rounded">
                          +{hb.amenities.length - 4} টি আরও
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <div className="p-6.5 pt-0">
                    <button
                      id={`book-now-${hb.id}`}
                      onClick={() => handleSelectHouseboatForBooking(hb)}
                      className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-zinc-900 text-white font-sans text-sm font-bold py-3 px-4 rounded-2xl shadow-sm transition-all cursor-pointer"
                    >
                      <span>বুকিং কনফিগার করুন</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Zero results */}
            {filteredHouseboats.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                <span className="text-3xl block mb-2">🛥️</span>
                <h3 className="font-sans font-bold text-lg text-gray-800">কোনো হাউসবোট পাওয়া যায়নি</h3>
                <p className="text-sm text-gray-500 mt-1">অনুগ্রহ করে কেবিন বা ধারণক্ষমতা পরিবর্তন করে আবার চেষ্টা করুন।</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ================= SCREEN 2: BOOKING FLOW FORM ================= */}
        {activeScreen === 'form' && selectedHouseboat && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Back CTA */}
            <div className="lg:col-span-12">
              <button
                id="btn-back-to-catalog"
                onClick={handleResetForm}
                className="inline-flex items-center space-x-2 text-sm font-semibold text-black hover:text-gray-600 cursor-pointer"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
                <span>হাউসবোটের তালিকায় ফিরে যান</span>
              </button>
            </div>

            {/* Column 1: Config Form Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-6 shadow-sm">
                
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-gray-900">বুকিং নিশ্চিতকরণ ফরম</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    হাউসবোটের নাম: <span className="font-semibold text-black">{selectedHouseboat.name}</span> ({selectedHouseboat.type === 'Luxury Suite' ? 'লাক্সারি সুইট' : selectedHouseboat.type === 'Royal Cabin' ? 'রয়্যাল কেবিন' : selectedHouseboat.type === 'Eco Deluxe' ? 'ইকো ডিল্যাক্স' : 'ফ্যামিলি ডুপ্লেক্স'})
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  
                  {/* Guest details section */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-gray-100 pb-2">
                      ভ্রমণকারীর ব্যক্তিগত বিবরণী
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-700">পূর্ণ নাম</label>
                        <input
                          type="text"
                          required
                          placeholder="মুনতাসির আহমেদ"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-700">ইমেইল এড্রেস</label>
                        <input
                          type="email"
                          required
                          placeholder="muntasir@gmail.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5 col-span-1 sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700">মোবাইল ফোন নম্বর</label>
                        <input
                          type="tel"
                          required
                          placeholder="যেমন: +৮৮০ ১৭১২-৩৪৫৬৭৮"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates and occupancy section */}
                  <div className="space-y-4 pt-2">
                    <h3 className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-gray-100 pb-2">
                      ভ্রমণের সময়কাল ও অতিথি সংখ্যা
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Check-In */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-700 font-sans">আরোহণের তারিখ</label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-mono focus:border-zinc-950 focus:outline-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Check-Out */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-700 font-sans">প্রস্থানের তারিখ</label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-mono focus:border-zinc-950 focus:outline-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Guests headcount */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-700">অতিথি সংখ্যা</label>
                        <select
                          value={totalGuests}
                          onChange={(e) => setTotalGuests(Number(e.target.value))}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none cursor-pointer font-semibold text-gray-700"
                        >
                          {[...Array(selectedHouseboat.capacity)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} জন অতিথি {i + 1 === selectedHouseboat.capacity ? '(সর্বোচ্চ ধারণক্ষমতা)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* Add-ons curation */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h3 className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                        অতিরিক্ত প্রিমিয়াম অভিজ্ঞতা (ঐচ্ছিক)
                      </h3>
                      <span className="text-[10px] font-sans text-gray-400">ভ্রমণকে প্রাণবন্ত করার সুযোগ</span>
                    </div>

                    <div className="space-y-3">
                      {addOns.map((addon) => {
                        const isChecked = selectedAddOns.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => handleSelectAddOn(addon.id)}
                            className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-zinc-50 border-zinc-900'
                                : 'bg-gray-50/50 border-gray-150 hover:bg-gray-50'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0 text-zinc-900">
                              {isChecked ? (
                                <CheckSquare className="h-4.5 w-4.5 shrink-0" />
                              ) : (
                                <Square className="h-4.5 w-4.5 text-gray-300 shrink-0" />
                              )}
                            </div>
                            
                            <div className="space-y-1 w-full">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <span className="font-sans text-xs font-bold text-gray-900 leading-tight">
                                  {addon.name === 'Midnight Baul Music Circle' ? 'মধ্যরাতের জোছনা বাউল গান উৎসব' : addon.name === 'Water Canoe Swamp Safari' ? 'জলাবন ডিঙি নৌ সোয়াম্প সাফারি' : addon.name === 'Organic Duck Feast' ? 'অর্গানিক জলজ হাঁস ভোজ' : 'নক্ষত্রমণ্ডল দেখার শক্তিশালী দূরবীন কিট'}
                                </span>
                                <span className="font-mono text-xs text-zinc-900 font-extrabold whitespace-nowrap">
                                  +{formatCharge(addon.price)} <span className="text-[10px] text-gray-400 font-normal">/{addon.unit === 'per person' ? 'জনপ্রতি' : addon.unit === 'per day' ? 'প্রতিদিন' : 'ভ্রমণকাল'}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 leading-relaxed">
                                {addon.description === 'Unlocking a live acoustic Baul sangeet performer circle over midnight tea under stars.' ? 'তারাময় আকাশের নিচে এবং নৌকার ডেকে স্থানীয় বিখ্যাত বাউল শিল্পীর চমৎকার লাইভ অ্যাকোস্টিক গান পরিবেশন।' : addon.description === 'Rent a private manual local wooden canoe with a dedicated rower to deep dive inside the swamp forest.' ? 'একটি ডেডিকেটেড সারি আর নিজস্ব মাঝি নিয়ে চমৎকার জলাবনের অত্যন্ত গভীরে ঘুরে বেড়াবেন।' : addon.description === 'Indulge in our exquisite local traditional duck curry customized for you under lanterns.' ? 'হারিকেনের জাদুকরী আলোয় নৌকার ছাদে আপনাদের জন্য বিশেষভাবে প্রস্তুতকৃত কড়াই হাঁস ভুনার ভোজ।' : 'অন্ধকার আকাশের রহস্য উন্মোচনের জন্য আমাদের উচ্চ ক্ষমতা সম্পন্ন দূরবীন গাইড কিট।'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special notes */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-xs font-semibold text-gray-700">বিশেষ কোনো অনুরোধ বা খাবারে বিধিনিষেধ (যদি থাকে)</label>
                    <textarea
                      placeholder="যেমন: নিরামিষ খাবার পছন্দ, অতিরিক্ত লাইফ জ্যাকেট প্রয়োজন বা দেরিতে আরোহণের অনুরোধ..."
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none"
                    />
                  </div>

                  {/* Error summaries */}
                  {bookingErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-150 rounded-2xl p-4 space-y-1.5">
                      <div className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                        <span>⚠️ অনুগ্রহ করে নিচের ভুলগুলো সংশোধন করুন:</span>
                      </div>
                      <ul className="list-disc pl-5 text-[11px] text-red-700 space-y-0.5">
                        {bookingErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    id="btn-submit-booking-form"
                    className="w-full flex items-center justify-center space-x-2.5 bg-black hover:bg-zinc-900 text-white font-sans text-sm font-bold py-3.5 px-4 rounded-2xl shadow-sm transition-all shadow-zinc-950/10 cursor-pointer"
                  >
                    <ShieldCheck className="h-4.5 w-4.5" />
                    <span>ইনভয়েস তৈরি করুন ও রিজার্ভেশন নিশ্চিত করুন</span>
                  </button>

                </form>

              </div>

            </div>

            {/* Column 2: Live Aesthetic Invoice Receipt Summary (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Houseboat mini summary */}
              <div className="bg-black text-white rounded-3xl p-5 border border-white/5 shadow-sm space-y-4">
                <div className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-2xl overflow-hidden aspect-square bg-gray-950">
                    <img 
                      src={selectedHouseboat.imageUrl} 
                      alt={selectedHouseboat.name} 
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold block mb-0.5">নির্বাচিত হাউসবোট</span>
                    <h3 className="font-sans font-bold text-base leading-tight">{selectedHouseboat.name}</h3>
                    <p className="text-xs text-zinc-300 mt-1">{selectedHouseboat.type === 'Luxury Suite' ? 'লাক্সারি সুইট' : selectedHouseboat.type === 'Royal Cabin' ? 'রয়্যাল কেবিন' : selectedHouseboat.type === 'Eco Deluxe' ? 'ইকো ডিল্যাক্স' : 'ফ্যামিলি ডুপ্লেক্স'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 text-xs text-zinc-300">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono tracking-wider font-bold">সর্বোচ্চ ধারণক্ষমতা</span>
                    <span className="font-sans font-semibold text-white">{selectedHouseboat.capacity} জন সর্বোচ্চ</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono tracking-wider font-bold">বাথরুম ফিটিংস</span>
                    <span className="font-sans font-semibold text-white">{selectedHouseboat.bathrooms} টি অ্যাটাচড</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Draft Invoice Box */}
              <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6 relative overflow-hidden">
                {/* Decorative cut-outs representing physical ticket */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-20 h-2 bg-zinc-100 rounded-full" />
                
                <div className="flex flex-col items-center justify-center text-center pb-4 border-b border-dashed border-gray-150">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-550 font-bold block mb-2">রিয়েল-টাইম ইনভয়েস হিসাব</span>
                  <AestheticTanguaLogo size="sm" showText={false} className="text-black mb-1" />
                  <h3 className="font-sans font-extrabold text-sm text-black mt-1">এস্থেটিক টাঙ্গুয়া লিঃ</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-mono">সাহেব বাড়ি ঘাট, সুনামগঞ্জ সদর, সিলেট</p>
                </div>

                {/* Calculations */}
                <div className="space-y-4 text-xs">
                  
                  {/* Basic rental */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                      <span className="block font-sans font-bold text-gray-950">মৌলিক নৌ সফর ও কেবিন ভাড়া</span>
                      <span className="block font-mono text-[10px] text-gray-400">
                        {formatCharge(selectedHouseboat.pricePerNight)} x {calculateNights()} রাত
                      </span>
                    </div>
                    <span className="font-mono font-bold text-gray-950">
                      {formatCharge(selectedHouseboat.pricePerNight * calculateNights())}
                    </span>
                  </div>

                  {/* Add-ons detailed breakdown */}
                  {selectedAddOns.length > 0 && (
                    <div className="space-y-2.5 pb-3 border-b border-gray-100">
                      <span className="block font-sans font-semibold text-gray-400 text-[10px] uppercase tracking-wider font-bold mb-1">অতিরিক্ত অভিজ্ঞতাবাবদ ব্যয়:</span>
                      
                      {selectedAddOns.map(id => {
                        const addon = addOns.find(a => a.id === id);
                        if (!addon) return null;
                        
                        let amt = 0;
                        let text = '';
                        if (addon.unit === 'per person') {
                          amt = addon.price * totalGuests;
                          text = `(${formatCharge(addon.price)} x ${totalGuests} জন অতিথি)`;
                        } else if (addon.unit === 'per day') {
                          amt = addon.price * calculateNights();
                          text = `(${formatCharge(addon.price)} x ${calculateNights()} দিন)`;
                        } else {
                          amt = addon.price;
                          text = '(এককালীন ফ্ল্যাট চার্জ)';
                        }

                        const banglaAddonName = id === 'add-feast' ? 'সিলেটি কড়াই হাঁস ভোজ' : id === 'add-baul' ? 'মধ্যরাতের জোছনা বাউল গান' : id === 'add-canoe' ? 'জলাবন ডিঙি নৌ সোয়াম্প সাফারি' : 'নক্ষত্রমণ্ডল দেখার কিট';

                        return (
                          <div key={id} className="flex justify-between text-xs">
                            <div className="space-y-0.5 pr-4">
                              <span className="block font-sans font-bold text-gray-800 leading-snug">{banglaAddonName}</span>
                              <span className="block font-mono text-[10px] text-gray-400">{text}</span>
                            </div>
                            <span className="font-mono text-gray-800 shrink-0">{formatCharge(amt)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pricing sub-calculations */}
                  <div className="space-y-2 text-xs pt-1">
                    <div className="flex justify-between text-gray-650">
                      <span>উপমোট (Subtotal)</span>
                      <span className="font-mono text-gray-900 font-semibold">
                        {formatCharge(calculateTotalPriceObj(selectedHouseboat).subTotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-650">
                      <span className="flex items-center gap-1">
                        <span>হাওর পরিবেশ সংরক্ষণ উন্নয়নমূলক ট্যাক্স</span>
                        <span className="text-[9px] bg-zinc-100 text-black font-mono px-1.5 py-0.5 rounded font-bold" title="5% রামসার সাইট পরিবেশ সংরক্ষণ তহবিল অনুদান">
                          ৫%
                        </span>
                      </span>
                      <span className="font-mono text-gray-900 font-semibold">
                        {formatCharge(calculateTotalPriceObj(selectedHouseboat).ecoTax)}
                      </span>
                    </div>
                  </div>

                  {/* Grand total grand box */}
                  <div className="bg-zinc-50 rounded-2xl p-4.5 flex items-center justify-between border border-zinc-200 mt-4">
                    <div className="space-y-0.5">
                      <span className="block text-xs font-mono font-bold text-black">সর্বমোট প্রদেয় অর্থ</span>
                      <span className="block text-[10px] text-gray-400">পরিবেশ সুরক্ষামূলক ট্যাক্সসহ সর্বমোট</span>
                    </div>
                    <span className="font-sans text-xl font-black text-black tracking-tight shrink-0">
                      {formatCharge(calculateTotalPriceObj(selectedHouseboat).grandTotal)}
                    </span>
                  </div>

                  {/* Booking Guarantee Statement */}
                  <div className="bg-gray-50 rounded-xl p-3 text-[10px] text-gray-400 leading-normal flex gap-2">
                    <span className="text-xs">🔒</span>
                    <p>যাত্রার ৭ দিন পূর্ব পর্যন্ত সম্পূর্ণ বিনা খরচে বুকিং বাতিল সুবিধা রয়েছে। স্ট্যান্ডার্ড চেক-ইন নির্ধারিত তারিখে সকাল ০৯:৩০ মিনিটে শুরু হয়।</p>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* ================= SCREEN 3: SUCCESS BLOCK ================= */}
        {activeScreen === 'success' && recentBooking && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center max-w-2xl mx-auto space-y-8 bg-white border border-gray-150 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2.5 bg-black" />
            
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-black mx-auto shadow-inner shadow-zinc-200 animate-bounce">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="space-y-3.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#18181b] font-bold bg-zinc-150 px-3 py-1 rounded-full inline-block">
                বুকিং সফলভাবে সম্পন্ন হয়েছে
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-gray-950">
                স্বাগতম! টাঙ্গুয়ার হাওর সফর সুনিশ্চিত
              </h2>
              <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                <strong>এস্থেটিক টাঙ্গুয়া</strong> এর সাথে আপনার হাওর ভ্রমণের আসনটি সফলভাবে সংরক্ষিত হয়েছে। আপনার বুকিং মেমো নম্বরটি নিচে দেওয়া হলো। অনুগ্রহ করে এটি ভ্রমণের দিনে দেখান।
              </p>
            </div>

            {/* Visual Invoice Card */}
            <div className="bg-black text-white rounded-2xl p-6.5 text-left border border-zinc-800 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-bold">রিজার্ভেশন মেমো কোড</span>
                  <h3 className="font-mono font-black text-sm tracking-widest text-white">
                    {recentBooking.id}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-bold block">পেমেন্ট স্ট্যাটাস</span>
                  <span className="inline-block bg-white text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-0.5">
                    বোর্ডিংকালে পরিশোধযোগ্য
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-zinc-300">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-mono tracking-wider font-bold">সংরক্ষিত হাউসবোট</span>
                  <span className="font-sans font-bold text-white text-sm">{recentBooking.houseboatName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-mono tracking-wider font-bold">ভ্রমণকারীর নাম</span>
                  <span className="font-sans font-semibold text-white text-sm">{recentBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-mono tracking-wider font-bold">আরোহণের তারিখ</span>
                  <span className="font-mono text-white">{recentBooking.checkInDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-mono tracking-wider font-bold">প্রস্থানের তারিখ</span>
                  <span className="font-mono text-white">{recentBooking.checkOutDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-mono tracking-wider font-bold">মোট মানুষের সংখ্যা</span>
                  <span className="font-sans text-white">{recentBooking.totalGuests} জন</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-mono tracking-wider font-bold">সর্বমোট প্রদেয় বিল</span>
                  <span className="font-sans text-[#f5b35c] font-black text-sm">{formatCharge(recentBooking.totalPrice)} BDT</span>
                </div>
              </div>

              {recentBooking.specialRequests && (
                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-850 text-[10px] text-zinc-300 font-sans leading-normal">
                  <strong>বিশেষ অনুরোধসমূহ:</strong> {recentBooking.specialRequests}
                </div>
              )}

            </div>

            {/* Print/Dismiss CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 select-none pt-4">
              
              <button
                id="btn-print-receipt"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-5  py-2.5 text-xs font-semibold text-gray-700 transition-all cursor-pointer"
              >
                <Printer className="h-4 w-4 text-black" />
                <span>ইনভয়েস মেমো প্রিন্ট করুন</span>
              </button>

              <button
                id="btn-return-home"
                onClick={handleResetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-black hover:bg-zinc-900 text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-sm shadow-zinc-950/10"
              >
                <span>মূল তালিকায় ফিরে যান</span>
              </button>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
