import React, { useState } from 'react';
import { Booking } from '../types';
import { 
  Trash2, CreditCard, Clock, Calendar, CheckSquare, 
  MapPin, Printer, HelpCircle, FileText, CheckCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyBookingsProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  currency: 'BDT' | 'USD';
  setActiveTab: (tab: string) => void;
}

export default function MyBookings({
  bookings,
  setBookings,
  currency,
  setActiveTab
}: MyBookingsProps) {
  
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const exchangeRate = 118;
  const formatCharge = (bdt: number) => {
    if (currency === 'USD') {
      return `$${Math.round(bdt / exchangeRate)}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('aesthetic_tangua_bookings', JSON.stringify(updated));
    setCancellingId(null);
  };

  const handleSimulatePayment = (id: string) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, paymentStatus: 'Paid' as const };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem('aesthetic_tangua_bookings', JSON.stringify(updated));
    setPayingId(null);
  };

  const calculateDaysUntilCheckIn = (checkInStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cin = new Date(checkInStr);
    cin.setHours(0, 0, 0, 0);
    const diff = cin.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div id="my-bookings-root" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Visual Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#18181b] bg-zinc-100 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
          আপনার ভ্রমণ বহি
        </span>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900">
          বুক করা হাউসবোটসমূহ
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          আপনার কেবিন অ্যাসাইনমেন্ট পরিচালনা করুন, যাত্রার কাউন্টডাউন দেখুন অথবা বুকিং নিশ্চিতকরণ পরিচালনা করুন।
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        
        {/* State 1: No bookings yet */}
        {bookings.length === 0 ? (
          <motion.div
            key="empty-ledger"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="text-center py-16 px-6 bg-white border border-gray-150 rounded-3xl shadow-sm"
          >
            <div className="h-16 w-16 bg-zinc-100 text-black rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
              🛥️
            </div>
            <h3 className="font-sans font-bold text-lg text-gray-900">কোনো বুকিং লক করা নেই</h3>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
              আপনি এখনও টাঙ্গুয়ার হাওরে ভ্রমণের জন্য কোনো হাউসবোট কেবিন বুক করেননি। আজই আমাদের আকর্ষণীয় বহরগুলো দেখে আপনার জন্য উপযুক্ত ভ্রমণটি বেছে নিন।
            </p>
            <button
              id="btn-goto-booking-tab"
              onClick={() => setActiveTab('booking')}
              className="mt-6 bg-black hover:bg-zinc-900 text-white font-sans text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm cursor-pointer transition-all"
            >
              আজই বুকিং করুন
            </button>
          </motion.div>
        ) : (
          
          /* State 2: Active List */
          <div className="space-y-6">
            {bookings.map((booking) => {
              const daysLeft = calculateDaysUntilCheckIn(booking.checkInDate);
              const isCheckingInSoon = daysLeft >= 0 && daysLeft <= 7;
              
              return (
                <motion.div
                  layout
                  key={booking.id}
                  id={`booking-card-${booking.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start"
                >
                  
                  {/* Column 1: Left Details */}
                  <div className="space-y-4 w-full md:w-3/4">
                    
                    {/* Top Row: Vessel title & confirmation tag */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sans font-bold text-lg text-gray-950">
                        {booking.houseboatName}
                      </h3>
                      <span className="font-mono text-xs text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded">
                        #{booking.id}
                      </span>
                      
                      {booking.paymentStatus === 'Paid' ? (
                        <span className="bg-zinc-100 text-black border border-zinc-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-zinc-700" />
                          <span>সম্পূর্ণ পরিশোধিত ও কনফার্মড</span>
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-951 border border-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="h-3 w-3 text-amber-750 shrink-0" />
                          <span>উঠে পেমেন্ট করার কথা</span>
                        </span>
                      )}
                    </div>

                    {/* Meta Specifications */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-650">
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-zinc-500 shrink-0" />
                        <div>
                          <span className="text-[9px] font-mono font-bold block text-gray-400">আরোহণের তারিখ</span>
                          <span className="font-mono font-semibold text-gray-800 text-[11px]">{booking.checkInDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-zinc-500 shrink-0" />
                        <div>
                          <span className="text-[9px] font-mono font-bold block text-gray-400">প্রস্থানের তারিখ</span>
                          <span className="font-mono font-semibold text-gray-800 text-[11px]">{booking.checkOutDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-zinc-500 shrink-0" />
                        <div>
                          <span className="text-[9px] font-mono font-bold block text-gray-400">আরোহণ ঘাট</span>
                          <span className="font-sans text-gray-850 font-bold">সুনামগঞ্জ সাহেব বাড়ি ঘাট</span>
                        </div>
                      </div>

                    </div>

                    {/* Addon details badges */}
                    {booking.selectedAddOns.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase block text-gray-400">সংযুক্ত অতিরিক্ত সুযোগ-সুবিধাসমূহ</span>
                        <div className="flex flex-wrap gap-1.5">
                          {booking.selectedAddOns.map((id, index) => (
                            <span key={index} className="bg-zinc-100 border border-zinc-200 text-zinc-900 text-[10px] font-sans px-2.5 py-1 rounded-md font-semibold font-mono">
                              ✓ {id === 'add-feast' ? 'সিলেটি হাঁস ভোজ' : id === 'add-baul' ? 'মধ্যরাতের বাউল গান' : id === 'add-canoe' ? 'জলাবন ডিঙি নৌ ভ্রমণ' : 'নক্ষত্রমণ্ডল দেখার কিট'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Days Left Countdown Banner */}
                    {daysLeft >= 0 ? (
                      <div className={`text-xs inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 ${
                        isCheckingInSoon 
                          ? 'bg-amber-50 text-amber-950 font-bold animate-pulse'
                          : 'bg-zinc-150 text-black font-semibold'
                      }`}>
                        <span>⏰</span>
                        <span>
                          {daysLeft === 0 
                            ? "আজই আপনার স্বপ্নের যাত্রা শুরু! সকাল ০৯:৩০ মিনিটে ঘাটে স্বাগত।" 
                            : `যাত্রার আর মাত্র ${daysLeft} দিন অবশিষ্ট আছে।`}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs inline-flex items-center gap-1.5 rounded-lg bg-gray-100 text-gray-500 py-1 px-2.5 font-mono">
                        <span>✓</span>
                        <span>অতীত সফর / ইতিপূর্বে ভ্রমণ সম্পন্ন</span>
                      </div>
                    )}

                  </div>

                  {/* Column 2: Right financial ledger and actions */}
                  <div className="w-full md:w-1/4 flex flex-col justify-between items-end gap-4 self-stretch border-t md:border-t-0 md:border-l border-dashed border-gray-150 pt-4 md:pt-0 md:pl-6">
                    
                    <div className="text-right w-full">
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-bold tracking-widest block">মোট প্রদেয় অর্থ</span>
                      <span className="font-sans text-xl font-extrabold text-black block mt-0.5">
                        {formatCharge(booking.totalPrice)}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono block">হাওরের রামসার করসহ</span>
                    </div>

                    <div className="w-full space-y-2">
                      
                      {/* Sim Payment Button */}
                      {booking.paymentStatus === 'Pending' && (
                        <button
                          onClick={() => setPayingId(booking.id)}
                          className="w-full text-center block text-xs bg-black hover:bg-zinc-950 text-white font-bold py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                        >
                          💸 পেমেন্ট প্র্যাকটিস করুন
                        </button>
                      )}

                      {/* Cancel Booking */}
                      <button
                        onClick={() => setCancellingId(booking.id)}
                        className="w-full text-center block text-xs border border-red-200 hover:bg-red-50 text-red-650 font-semibold py-2 rounded-xl transition-all cursor-pointer"
                      >
                        বুকিং বাতিল করুন
                      </button>

                    </div>

                  </div>

                  {/* INNER DIALOG/CONFIRMATION: PAYING SIMULATION */}
                  {payingId === booking.id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4">
                      <div className="bg-white rounded-3xl p-6.5 max-w-sm w-full space-y-4 border border-zinc-200 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                        <CreditCard className="h-10 w-10 text-black animate-bounce" />
                        <div>
                          <h4 className="font-sans font-bold text-base text-gray-950">পেমেন্ট সিমুলেশন নিশ্চিত করুন</h4>
                          <p className="text-xs text-gray-500 mt-1">এটি আপনার কার্ড বা অনলাইন ব্যাংকিং নেটওয়ার্ক (যেমন বিকাশ, রকেট বা কার্ড) এর সাহায্যে কাল্পনিক পেমেন্ট প্রক্রিয়া করবে এবং আপনার বুকিং স্ট্যাটাস "Paid" হিসেবে লক করা দেখাবে।</p>
                        </div>
                        <div className="flex gap-2 text-xs pt-2">
                          <button
                            onClick={() => handleSimulatePayment(booking.id)}
                            className="bg-black hover:bg-zinc-900 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
                          >
                            পরিশোধ সম্পন্ন করুন
                          </button>
                          <button
                            onClick={() => setPayingId(null)}
                            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl cursor-pointer"
                          >
                            ফিরে যান
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* INNER DIALOG/CONFIRMATION: CANCELLING STAY */}
                  {cancellingId === booking.id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4">
                      <div className="bg-white rounded-3xl p-6.5 max-w-sm w-full space-y-4 border border-red-150 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                        <HelpCircle className="h-10 w-10 text-red-650" />
                        <div>
                          <h4 className="font-sans font-bold text-base text-gray-950">আপনি কি বুকিং বাতিল নিশ্চিত করতে চান?</h4>
                          <p className="text-xs text-gray-500 mt-1">আপনি কি নিশ্চিত যে আপনি বুকিং #{booking.id} বাতিল করে দিতে চান? এই কাজটি অপরিবর্তনযোগ্য।</p>
                        </div>
                        <div className="flex gap-2 text-xs pt-2">
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-red-650 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
                          >
                            হ্যাঁ, বুকিং বাতিল করুন
                          </button>
                          <button
                            onClick={() => setCancellingId(null)}
                            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-semibold cursor-pointer"
                          >
                            বুকিং রেখে দিন
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              );
            })}
          </div>

        )}

      </AnimatePresence>

    </div>
  );
}
