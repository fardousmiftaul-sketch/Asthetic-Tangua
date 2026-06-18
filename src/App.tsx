import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import TravelGuide from './components/TravelGuide';
import BookingSystem from './components/BookingSystem';
import MyBookings from './components/MyBookings';
import { houseboats, localReviews } from './data';
import { Booking } from './types';
import { 
  Anchor, Sparkles, ChefHat, Ship, Sunset, Star, ShieldAlert,
  Compass, Feather, ArrowUpRight, HelpCircle, ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aesthetic_tangua_bookings');
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error parsing loaded bookings', e);
    }
  }, []);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'BDT' ? 'USD' : 'BDT');
  };

  const exchangeRate = 118;
  const formatCharge = (bdt: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdt / exchangeRate)}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  return (
    <div id="app-viewport" className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-black selection:text-white">
      
      {/* Decorative top alert describing pristine ecological status */}
      <div className="bg-black text-white py-2.5 text-center px-4 border-b border-zinc-800">
        <p className="font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 font-bold">
          <Feather className="h-3 w-3 text-white" />
          <span>রামসার ইকোসিস্টেম সুরক্ষা নীতি — আমাদের সমস্ত হাউসবোটে ১০০% পরিবেশবান্ধব সোলার ও বর্জ্য ফিল্টারিং নিশ্চিত করা হয়েছে</span>
        </p>
      </div>

      {/* Shared Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        toggleCurrency={toggleCurrency}
        bookingsCount={bookings.length}
      />

      {/* Main Workspace Frame */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ================= SECTION 1: EXPLORE HOME ================= */}
          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-16 pb-20"
            >
              
              {/* Hero Showcase Section */}
              <div className="relative overflow-hidden bg-gray-900 text-white min-h-[75vh] flex items-center">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
                    alt="Pristine Tanguar Haor waterscapes"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-35"
                  />
                  {/* Atmospheric dusky gradient veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950/40 to-transparent" />
                </div>

                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10 w-full">
                  <div className="max-w-3xl space-y-6">
                    <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white border border-white/10">
                      <Sparkles className="h-3.5 w-3.5 text-neutral-300" />
                      <span>সিলেটের স্বর্গীয় রূপ ও অসীম নীরবতার ছোঁয়া</span>
                    </div>

                    <h1 style={{ fontFamily: 'Verdana' }} className="font-sans text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-white leading-[1.1]">
                      টাঙ্গুয়ার হাওরে ভাসমান <span className="underline decoration-white/30">অনন্য হাউসবোটে</span> রাত্রিযাপন
                    </h1>

                    <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-sans">
                      চেনা হোটেলের কোলাহল ছেড়ে বাংলাদেশের অন্যতম গৌরবময় রামসার জলাভূমির তারার মেলায় নোঙর ফেলুন। উপভোগ করুন কাঠের কারুকাজ, অনবদ্য স্থানীয় সিলেটি খাবারের চমৎকার ভোজ এবং রহস্যময় সোয়াম্প ফরেস্টের আদিম রূপ অন্বেষণ।
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                      
                      <button
                        id="hero-book-now"
                        onClick={() => setActiveTab('booking')}
                        className="inline-flex items-center justify-center rounded-2xl bg-white text-black font-bold px-6 py-3.5 text-sm cursor-pointer shadow-lg hover:bg-neutral-100 transition-all font-sans"
                      >
                        আপনার কেবিন বুক করুন
                      </button>

                      <button
                        id="hero-learn-more"
                        onClick={() => setActiveTab('guide')}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm px-6 py-3.5 text-sm hover:bg-white/20 transition-all cursor-pointer"
                      >
                        <span>স্থানীয় ভ্রমণ নির্দেশিকা</span>
                        <ArrowUpRight className="h-4 w-4 ml-1.5" />
                      </button>

                    </div>
                  </div>
                </div>
              </div>

              {/* Serene Features Bento-Grid */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    এস্থেটিক টাঙ্গুয়ার শান্ত ও নান্দনিক শৈলী
                  </h2>
                  <p className="text-xs text-gray-500 mt-2">
                    প্রতিটি সূক্ষ্ম বিবরণকে অত্যন্ত দরদ দিয়ে সাজানো হয়েছে যাতে আপনি টাঙ্গুয়ার হাওরের কাচের মতো শান্ত দিগন্তের সাথে বিরামহীন যুক্ত থাকতে পারেন।
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Feature 1 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-4 shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
                      <Ship className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-gray-900">ঐতিহ্যবাহী কাঠের হাউসবোট</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        সুনামগঞ্জের অভিজ্ঞ কারিগরদের দ্বারা সেগুন ও মেহগনি কাঠে হাতে তৈরি সুনিপুণ নৌকা, যা আপনাকে দেয় পরম নিরাপত্তা এবং চিরায়ত শৈলী।
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-4 shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
                      <ChefHat className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-gray-900">আমাদের নিজস্ব সিলেটি শেফ</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Savor three chef-cooked regional meals daily. Hand-cooked duck curry, Mustard seed marine fish sears, and fragrant black cumin rice on the deck.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-4 shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
                      <Feather className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-gray-900">শতভাগ পরিবেশবান্ধব</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        নিঃশব্দ সোলার বিদ্যুৎ ব্যবস্থা, উন্নত বায়ো-টয়লেট স্যানিটেশন সিস্টেম ও রি-সাইক্লিং ফিল্টার যা টাঙ্গুয়ার সুরক্ষিত বন্যপ্রাণীদের রক্ষা করে।
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-4 shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
                      <Sunset className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-base text-gray-900">খোলা অবজারভেশন ডেক</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        সূর্যাস্তের নয়নাভিরাম রূপ দেখতে ও রাতে টেলিস্কোপ দিয়ে মেঘের ওপাশে তারা দেখতে ব্যবহার করুন আমাদের প্রকাণ্ড দোতলা ডেক ও অবজারভেশন কর্নার।
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Vessel Quick Catalog Preview */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                  <div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      নির্বাচিত আমাদের চমৎকার প্রিমিয়াম বহরসমূহ
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      রোমাঞ্চের জন্য ব্যক্তিগত স্যুইট হোক কিংবা পরিবারের পুনর্মিলনের জন্য বড় বা সুপ্রশস্ত ডুপ্লেক্স কেবিন।
                    </p>
                  </div>
                  <button
                    id="btn-all-vessels"
                    onClick={() => setActiveTab('booking')}
                    className="inline-flex items-center space-x-1 text-xs font-mono font-bold uppercase tracking-wider text-black hover:text-gray-600 mt-4 sm:mt-0 cursor-pointer"
                  >
                    <span>সব হাউসবোট দেখুন</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {houseboats.slice(0, 3).map((hb) => (
                    <div
                      key={hb.id}
                      className="group bg-white rounded-2.5xl overflow-hidden border border-gray-150 hover:border-black shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={hb.imageUrl}
                          alt={hb.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-black text-white text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded">
                            {hb.type === 'Luxury Suite' ? 'লাক্সারি সুইট' : hb.type === 'Royal Cabin' ? 'রয়্যাল কেবিন' : hb.type === 'Eco Deluxe' ? 'ইকো ডিল্যাক্স' : 'ফ্যামিলি ডুপ্লেক্স'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5.5 space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-sans font-bold text-base text-gray-900">{hb.name}</h3>
                          <p className="text-xs uppercase font-mono text-gray-400 font-semibold">{hb.tagline}</p>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {hb.description}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="font-mono text-xs text-gray-400 font-semibold">{hb.capacity} জন সর্বোচ্চ</span>
                          <span className="font-sans font-extrabold text-gray-950">{formatCharge(hb.pricePerNight)}</span>
                        </div>
                      </div>

                      <button
                        id={`explore-btn-${hb.id}`}
                        onClick={() => {
                          setActiveTab('booking');
                        }}
                        className="w-full bg-neutral-100 hover:bg-black hover:text-white text-black font-sans text-xs font-bold py-3 text-center border-t border-gray-100 transition-all cursor-pointer"
                      >
                        বুকিং সুনিশ্চিত করুন
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sylhet Chronicles Review Quotes Panel */}
              <div className="bg-neutral-50 py-16 border-y border-zinc-200/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-900">
                      জলতলের প্রতিধ্বনি এবং পর্যটকদের স্মৃতিচারণ
                    </h2>
                    <p className="text-xs text-gray-500 mt-2">
                      আমাদের পূর্ববর্তী সম্মানিত অতিথিদের মনের অনুভূতি এবং সত্য ভ্রমণ অভিজ্ঞতা দেখে নিন।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {localReviews.map((rev) => (
                      <div key={rev.id} className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200/60 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-1.5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 italic leading-relaxed">
                            "{rev.comment}"
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 pt-5 mt-5 border-t border-gray-100">
                          <div className="h-9 w-9 overflow-hidden rounded-full shrink-0">
                            <img src={rev.avatarUrl} alt={rev.guestName} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-xs text-gray-900">{rev.guestName}</h4>
                            <span className="font-mono text-[9px] text-gray-400 font-bold block mt-0.5">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ================= SECTION 2: BOOKING FLOW ================= */}
          {activeTab === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BookingSystem
                currency={currency}
                bookings={bookings}
                setBookings={setBookings}
                onBookingSuccess={() => {
                  // Option callback
                }}
              />
            </motion.div>
          )}

          {/* ================= SECTION 3: PHOTO GALLERY ================= */}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Gallery />
            </motion.div>
          )}

          {/* ================= SECTION 4: LOCAL GUIDE ================= */}
          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TravelGuide />
            </motion.div>
          )}

          {/* ================= SECTION 5: MY RECORDS LEDGER ================= */}
          {activeTab === 'my-bookings' && (
            <motion.div
              key="my-bookings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MyBookings
                bookings={bookings}
                setBookings={setBookings}
                currency={currency}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
