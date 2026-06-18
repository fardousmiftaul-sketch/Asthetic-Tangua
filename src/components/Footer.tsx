import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Feather } from 'lucide-react';
import AestheticTanguaLogo from './Logo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer id="footer-root" className="bg-black text-white border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1.5 space-y-4">
            <div className="flex items-center text-white">
              <AestheticTanguaLogo size="md" textColorClass="text-white" />
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-xs">
              সুনামগঞ্জ জেলার তাহিরপুরের অপরূপ টাঙ্গুয়ার হাওরের শান্ত আকাশের নিচে প্রিমিয়াম ও বিলাসবহুল হাউসবোটের অফুরন্ত প্রশান্তি।
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-400">
              <Feather className="h-3 w-3 text-white" />
              <span>বাংলাদেশে টেকসই এবং পরিবেশবান্ধব পর্যটনে প্রতিশ্রুতিবদ্ধ</span>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa] mb-4">
              টাঙ্গুয়ার অন্বেষণ
            </h3>
            <ul className="space-y-2 text-sm text-zinc-340">
              <li>
                <button 
                  onClick={() => setActiveTab('explore')} 
                  className="hover:text-white text-zinc-300 transition-colors cursor-pointer"
                >
                  প্রশান্তিময় নীড়
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('booking')} 
                  className="hover:text-white text-zinc-300 transition-colors cursor-pointer"
                >
                  হাউসবোট বুকিং
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('gallery')} 
                  className="hover:text-white text-zinc-300 transition-colors cursor-pointer"
                >
                  ফটো গ্যালারি
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('guide')} 
                  className="hover:text-white text-zinc-300 transition-colors cursor-pointer"
                >
                  স্থানীয় গাইড ও নিয়মাবলী
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Haor Seasons Info */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa] mb-4">
              জলবায়ু অনুসূচী (ঋতুচক্র)
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-300 leading-relaxed">
              <li>
                <span className="font-semibold text-white block">জুলাই - সেপ্টেম্বর (বর্ষাকাল)</span>
                থইথই পানি, তুমুল বাতাস, রাতারগুলের মতো দৃষ্টিনন্দন সোয়াম্প ফরেস্ট।
              </li>
              <li>
                <span className="font-semibold text-white block">অক্টোবর - ডিসেম্বর (শরৎ-হেমন্ত)</span>
                কাচের মতো শান্ত পানির প্রতিফলন, কুয়াশাচ্ছন্ন ভোর ও পরিষ্কার হাওরের তলদেশ।
              </li>
              <li>
                <span className="font-semibold text-white block">জানুয়ারি - মার্চ (শীতকাল)</span>
                হাজারো অতিথি পাখির আগমন, যাদুকাটা নদী ও বারেক টিলার বালুচরের রূপ।
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Access */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa] mb-4">
              যোগাযোগ ও ঠিকানা
            </h3>
            <div className="space-y-2.5 text-sm text-zinc-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-white mt-0.5 shrink-0" />
                <span>সাহেব বাড়ি ঘাট, সুনামগঞ্জ সদর, সিলেট, বাংলাদেশ</span>
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <Phone className="h-4 w-4 text-zinc-400 shrink-0" />
                <span>+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <Mail className="h-4 w-4 text-zinc-400 shrink-0" />
                <span>stay@aesthetictangua.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-zinc-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} এস্থেটিক টাঙ্গুয়া লিঃ। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center space-x-1 mt-2 md:mt-0">
            <Sparkles className="h-3 w-3 text-white animate-pulse" />
            <span>বাংলাদেশের মর্যাদাপূর্ণ ‘রামসার সাইট’ টাঙ্গুয়ার হাওরের পরিবেশ রক্ষায় ব্রতী।</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
