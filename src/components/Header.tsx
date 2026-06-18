import React, { useState } from 'react';
import { CalendarDays, Image, Compass, Menu, X, Coins, Library } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AestheticTanguaLogo from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'BDT' | 'USD';
  toggleCurrency: () => void;
  bookingsCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  currency,
  toggleCurrency,
  bookingsCount
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'হাওর অন্বেষণ', icon: Compass },
    { id: 'booking', label: 'হাউসবোট বুকিং', icon: CalendarDays },
    { id: 'gallery', label: 'ফটো গ্যালারি', icon: Image },
    { id: 'guide', label: 'ভ্রমণ গাইড', icon: Library },
  ];

  return (
    <header id="header-root" className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div 
          id="logo-container" 
          className="flex cursor-pointer items-center text-black hover:text-zinc-650 transition-colors"
          onClick={() => {
            setActiveTab('explore');
            setMobileMenuOpen(false);
          }}
        >
          <AestheticTanguaLogo size="md" textColorClass="text-gray-950" />
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-black bg-zinc-100' 
                    : 'text-gray-650 hover:text-black hover:bg-zinc-50'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-black"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Currency Toggle */}
          <button
            id="currency-toggle"
            onClick={toggleCurrency}
            className="flex items-center space-x-1.5 rounded-xl border border-gray-250 bg-white/50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-zinc-100 transition-all cursor-pointer"
            title="মূল্যের মুদ্রা পরিবর্তন করুন"
          >
            <Coins className="h-3.5 w-3.5 text-zinc-500" />
            <span>{currency === 'BDT' ? '৳ বিডিটি' : '$ ইউএসডি'}</span>
          </button>

          {/* Bookings Tracker Button */}
          <button
            id="my-bookings-btn"
            onClick={() => setActiveTab('my-bookings')}
            className={`relative flex items-center space-x-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'my-bookings'
                ? 'bg-zinc-900 text-white ring-2 ring-black/10'
                : 'bg-black hover:bg-zinc-900 text-white shadow-sm'
            }`}
          >
            <span>আমার বুকিং</span>
            {bookingsCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-black border border-black/10 animate-pulse">
                {bookingsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Currency toggle */}
          <button
            id="mobile-currency-toggle"
            onClick={toggleCurrency}
            className="flex items-center space-x-1 rounded-lg border border-gray-150 bg-white px-2.5 py-1.5 text-xs text-gray-700 font-medium"
          >
            <span>{currency === 'BDT' ? '৳' : '$'}</span>
          </button>

          {/* Hamburger */}
          <button
            id="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white md:hidden"
          >
            <div className="space-y-1.5 px-4 py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-zinc-100 text-black font-semibold' 
                        : 'text-gray-605 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-gray-450'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className="border-t border-gray-150/80 pt-3 mt-3 flex flex-col gap-2">
                <button
                  id="mobile-my-bookings-btn"
                  onClick={() => {
                    setActiveTab('my-bookings');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    activeTab === 'my-bookings'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-black text-white hover:bg-zinc-900'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <CalendarDays className="h-5 w-5" />
                    <span>আমার বুকিং</span>
                  </span>
                  {bookingsCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black border border-black/10">
                      {bookingsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
