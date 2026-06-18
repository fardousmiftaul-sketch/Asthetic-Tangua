import React, { useState } from 'react';
import { travelDestinations } from '../data';
import { MapPin, Bus, Navigation, FlameKindling, Info, Sparkles, CheckCircle, AlertTriangle, CloudSun, Compass, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TravelGuide() {
  const [activeGuideSection, setActiveGuideSection] = useState<'spots' | 'route' | 'seasons' | 'preserve' | 'food'>('spots');

  const mainSections = [
    { id: 'spots', label: 'দর্শনীয় স্থানসমূহ', icon: Compass },
    { id: 'route', label: 'যাতায়াত ব্যবস্থা', icon: Bus },
    { id: 'seasons', label: 'ভ্রমণের সেরা সময়', icon: CloudSun },
    { id: 'food', label: 'সিলেটি খাবার দাবার', icon: UtensilsCrossed },
    { id: 'preserve', label: 'পরিবেশ নির্দেশিকা', icon: Info },
  ] as const;

  return (
    <div id="guide-root" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Dynamic Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#18181b] bg-zinc-100 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
          সুনামগঞ্জ ভ্রমণ ডায়েরি
        </span>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          টাঙ্গুয়ার হাওর ভ্রমণ নির্দেশিকা
        </h1>
        <p className="mt-4 text-base text-gray-650 leading-relaxed">
          বাংলাদেশের সবচেয়ে আদিম ও নৈসর্গিক পানির রাজ্যে সুন্দরভাবে ঘুরে বেড়ানোর এক অনন্য গাইডবুক। এখানে চমৎকার স্পট, স্থানীয় খাবার, ঋতুভিত্তিক রূপ এবং পরিবেশ রক্ষার কিছু জরুরি নিয়ম তুলে ধরা হলো।
        </p>
      </div>

      {/* Grid of Section Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 border-b border-gray-100 pb-6">
        {mainSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeGuideSection === section.id;
          return (
            <button
              key={section.id}
              id={`tab-section-${section.id}`}
              onClick={() => setActiveGuideSection(section.id)}
              className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-xs font-semibold tracking-wide tracking-tight transition-all cursor-pointer ${
                isActive
                  ? 'bg-black text-white shadow-md shadow-zinc-950/10'
                  : 'bg-white border border-gray-200 text-gray-750 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Main Contents */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 rounded-full bg-zinc-100/60 blur-3xl" />
        
        <AnimatePresence mode="wait">
          {activeGuideSection === 'spots' && (
            <motion.div
              key="spots"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900">অবশ্যই দর্শনীয় হাওর ল্যান্ডমার্কসমূহ</h2>
                <p className="text-sm text-gray-500 mt-1">টাঙ্গুয়ার হাওর অঞ্চলে আমাদের পক্ষ থেকে সুপারিশকৃত রূপালী আকর্ষণসমূহ।</p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {travelDestinations.map((dest) => (
                   <div 
                    key={dest.id} 
                    className="flex flex-col sm:flex-row gap-5 bg-zinc-50 border border-gray-150 hover:border-zinc-300 rounded-2xl p-4 transition-all duration-300"
                    id={`dest-card-${dest.id}`}
                  >
                    <div className="w-full sm:w-1/3 shrink-0 rounded-xl overflow-hidden aspect-video sm:aspect-square relative shadow-sm">
                      <img 
                        src={dest.imageUrl} 
                        alt={dest.name} 
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold text-black shadow-sm">
                        {dest.distanceFromHaor}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-sans font-bold text-base text-gray-900">{dest.name}</h3>
                          <span className="font-sans text-xs bg-zinc-100 text-zinc-900 border border-zinc-200 px-2 py-0.5 rounded font-medium whitespace-nowrap">{dest.localName}</span>
                        </div>
                        <p className="text-xs text-gray-650 leading-relaxed">{dest.description}</p>
                      </div>

                      <div className="text-[11px] bg-white border border-gray-150 rounded-xl p-2.5">
                        <span className="font-mono font-bold text-black block mb-0.5">💡 বিশেষ ভ্রমণ টিপস:</span>
                        <p className="text-gray-650 leading-normal">{dest.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeGuideSection === 'route' && (
            <motion.div
              key="route"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900">যেভাবে পৌঁছাবেন (এস্থেটিক টাঙ্গুয়া)</h2>
                <p className="text-sm text-gray-500 mt-1">দেশের যে কোনো প্রান্ত থেকে সুনামগঞ্জের ঘাটে আমাদের সাথে মিলিত হওয়ার রুট ম্যাপ।</p>
              </div>

              {/* Path timeline */}
              <div className="relative border-l border-zinc-200 ml-4.5 sm:ml-6 pl-6 sm:pl-8 space-y-10">
                
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-11.5 sm:-left-13 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-black text-white shadow-sm ring-4 ring-white">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded">ধাপ ১</span>
                      <h3 className="font-sans font-bold text-base text-gray-950">ঢাকা থেকে সুনামগঞ্জ সদর</h3>
                    </div>
                    <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">
                      ঢাকার সায়েদাবাদ বা মহাখালী বাস টার্মিনাল থেকে সুসজ্জিত নন-এসি কিংবা শীতাতপ নিয়ন্ত্রিত বাসে (শ্যামলী, এনা, হানিফ, মামুন বা গ্রীন লাইন) চড়ে সুনামগঞ্জের উদ্দেশ্যে সরাসরি রওনা দিন। রাতের বাসে রওনা দিলে ভোরের আলো ফোটার মঝেই পৌঁছে যাবেন সুনামগঞ্জ সদরে।
                    </p>
                    <div className="text-[11px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg inline-block">
                      🕒 বাস ছাড়ার সময়: রাত ১০:০০ - রাত ১১:৩০ | 💵 টিকিট ভাড়া: ৳৭০০ - ৳১৫০০ বিডিটি
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-11.5 sm:-left-13 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#e11d48] text-white shadow-sm ring-4 ring-white">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-red-700 bg-rose-50 px-2 py-0.5 rounded">ধাপ ২</span>
                      <h3 className="font-sans font-bold text-base text-gray-950">সুনামগঞ্জ থেকে সাহেব বাড়ি ঘাট</h3>
                    </div>
                    <p className="text-xs text-gray-650 max-w-2xl leading-relaxed">
                      সকালে সুনামগঞ্জ সদরে নামার পর সেখান থেকে স্থানীয় মোটরবাইক অথবা সিএনজি অটো রিকশা রিজার্ভ করে সরাসরি চলে আসুন আমাদের প্রস্থান ঘাট <strong>সাহেব বাড়ি ঘাট (বা তাহিরপুর ঘাট)</strong>।
                    </p>
                    <div className="text-[11px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg inline-block">
                      🕒 দূরত্ব সময়: সিএনজি/বাইকে ৪৫ মিনিট | 💵 বাজেট: ৳২০০ - ৳৪০০ বিডিটি
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-11.5 sm:-left-13 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-neutral-800 text-white shadow-sm ring-4 ring-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded">ধাপ ৩</span>
                      <h3 className="font-sans font-bold text-base text-gray-950">হাউসবোটে আরোহণ ও যাত্রা শুরু</h3>
                    </div>
                    <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">
                      ঘাটে আমাদের ম্যানেজার ও ডেডিকেটেড স্থানীয় শেফ আপনাকে সুস্বাদু ডাব বা কচি নারকেলের মিষ্টি পানি পরিবেশন করে হাসিমুখে স্বাগত জানাবেন। চমৎকার কাঠের কেবিনে নিজের জিনিসপত্র গুছিয়ে হাওরের নীল স্রোতে যাত্রা শুরু করুন!
                    </p>
                    <div className="text-[11px] text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-lg inline-block font-semibold">
                      ☀️ সহজে চেক-ইন সময় শুরু হয়: সকাল ০৯:৩০ মিনিট থেকে
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeGuideSection === 'seasons' && (
            <motion.div
              key="seasons"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900">ভ্রমণের উপযুক্ত সময় নির্ধারণ</h2>
                <p className="text-sm text-gray-500 mt-1">ভ্রমণের সময়ভেদে টাঙ্গুয়ার হাওর নিজেকে ভিন্ন ভিন্ন অপরূপ সাজে সজ্জিত করে।</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Season 1 */}
                <div className="border border-gray-150 rounded-2xl p-5 hover:bg-zinc-50 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-4">
                    <FlameKindling className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-gray-950 mb-1">জুন - সেপ্টেম্বর (বর্ষাকাল)</h3>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold block mb-3">💦 থইথই অথৈ পানির যৌবন</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    এটিই টাঙ্গুয়ার হাওরের প্রকৃত রূপ। চারপাশে আদিগন্ত বিস্তৃত থইথই পানি, দেখতে সমুদ্রের মতো বড় ঢেউ মনে হয়। আকাশ ও পাহাড় একাকার হয়ে মেঘালয়ের পাহাড় বেয়ে নামা ঝর্ণার স্ফটিক পানি হাওরকে ভাসিয়ে দেয়। সোয়াম্প ফরেস্টগুলোর গাছগুলো অর্ধেক পানির নিচে ডুবে অনন্য দেখায়।
                  </p>
                </div>

                {/* Season 2 */}
                <div className="border border-gray-150 rounded-2xl p-5 hover:bg-zinc-50 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-4">
                    <CloudSun className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-gray-950 mb-1">অক্টোবর - নভেম্বর (শরৎকাল)</h3>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold block mb-3">🪞 শান্ত পানির জাদুকরী আকাশ-দর্পণ</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    যদি আপনি একদম শান্ত পানি আর চমৎকার ফটোগ্রাফি পছন্দ করেন, তবে শরৎকাল সেরা। বৃষ্টি কমে আসে, হাওয়া শান্ত রূপ নেয় এবং সমস্ত হাওর একটি বিশাল নীল আয়নায় পরিণত হয়। রাতের আকাশ উজ্জ্বল ও পরিষ্কার থাকে, ফলে নীচের পানিতে মেঘালয়ের পাহাড় আর কোটি কোটি বিন্দুর তারার প্রতিফলন দেখা যায়।
                  </p>
                </div>

                {/* Season 3 */}
                <div className="border border-gray-150 rounded-2xl p-5 hover:bg-zinc-50 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-4">
                    <Sparkles className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-gray-950 mb-1">ডিসেম্বর - মার্চ (শীতকাল ও অতিথি পাখি)</h3>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold block mb-3">🦅 অতিথি পাখিদের অভয়ারণ্য</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    শীতকালে হাওরের পানি কমে গিয়ে ছোট ছোট জলাধার বা বিলে পরিণত হয়। সাইবেরিয়াসহ দূর দেশ থেকে হাজার হাজার অতিথি পাখি দলবেঁধে এখানে আশ্রয় নেয়। যাদুকাটা ও কুয়াশাঘেরা নদীর বালুকাময় মরু-চর মাথা উঁচু করে। আবহাওয়া থাকে দারুণ শীতল ও আরামদায়ক।
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {activeGuideSection === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900">ঐতিহ্যবাহী সিলেটি রন্ধনশৈলী</h2>
                  <p className="text-sm text-gray-500 mt-1">আমাদের নৌকার সতেজ রান্নাঘর থেকে প্রস্তুত তাজা ও ঘ্রাণযুক্ত খাবারের স্বাদ নিন।</p>
                </div>
                <div className="shrink-0 font-sans text-xs bg-zinc-50 text-black border border-gray-200 rounded-xl p-3 max-w-xs font-semibold">
                  🌾 প্রতিদিন হাওরের জেলেদের নৌকা এবং স্থানীয় কৃষকদের থেকে সম্পূর্ণ অর্গানিক উপায়ে সংগৃহীত তাজা উপাদান।
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Culinary Card 1 */}
                <div className="bg-[#fafafa] border border-gray-150 rounded-2xl p-5 space-y-3">
                  <h3 className="font-sans font-bold text-base text-gray-950 flex items-center gap-2">
                    <span className="text-lg">🦆</span>
                    সিলেটি জলজ হাঁস ভুনা
                  </h3>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    শীত ও বর্ষার সবচেয়ে জনপ্রিয় আদিম ডিশ। স্থানীয় গৃহপালিত হাঁসকে খাঁটি সরষেরে তেলে আস্ত রসুনের কোয়া, ধনে গুঁড়ো এবং সিলেটি দারুচিনি দিয়ে ভাজা ভাজা কষিয়ে সুস্বাদু ঘন ঝোল তৈরি করা হয়। মাংসের সুঘ্রাণ ও গভীর কড়া স্বাদ সত্যিই অতুলনীয়।
                  </p>
                </div>

                {/* Culinary Card 2 */}
                <div className="bg-[#fafafa] border border-gray-150 rounded-2xl p-5 space-y-3">
                  <h3 className="font-sans font-bold text-base text-gray-950 flex items-center gap-2">
                    <span className="text-lg">🐟</span>
                    সদ্য আহরিত হাওরের তেল-সর্ষে মাছ ভাজি
                  </h3>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    টাঙ্গুয়ার হাওর থেকে জ্যান্ত বোয়াল, শোল, আইড় বা বাইম মাছ ধরে হলুদ ও কড়া মরিচ গুঁড়ো মাখিয়ে লোহার তাওয়ায় হালকা করে ভেজে নেওয়া হয় যাতে মাছের ভেতরের রসালো ও মিষ্টি মিষ্টি তাজা মিষ্টি স্বাদ অক্ষুণ্ণ থাকে।
                  </p>
                </div>

                {/* Culinary Card 3 */}
                <div className="bg-[#fafafa] border border-gray-150 rounded-2xl p-5 space-y-3">
                  <h3 className="font-sans font-bold text-base text-gray-950 flex items-center gap-2">
                    <span className="text-lg">🍚</span>
                    সুগন্ধি কালোজিরা চালের ভাত
                  </h3>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    সিলেটি ঐতিহ্যবাহী অতি ক্ষুদ্র দানার চমৎকার সুগন্ধি চাল। এর মনোরম পুষ্পসম ঘ্রাণের কারণে একে ‘বেবি বাসমতি’ও বলা হয়ে থাকে। ডেকচি থেকে ধোঁয়া ওঠা চমৎকার ভাতের নরম সুবাস কড়াইয়ের ঝোলের সাথে মিশে খাওয়ার পরিবেশকেই পাল্টে দেয়।
                  </p>
                </div>

                {/* Culinary Card 4 */}
                <div className="bg-[#fafafa] border border-gray-150 rounded-2xl p-5 space-y-3">
                  <h3 className="font-sans font-bold text-base text-gray-950 flex items-center gap-2">
                    <span className="text-lg">🌶️</span>
                    হাওরের শুঁটকি ভর্তা ত্রয়ী (চেপা, চিংড়ি ও চ্যাপা শুঁটকি)
                  </h3>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    হাওরের শুকনো মাছ শীল-পাটায় পিষে ধনেপাতা, কাঁচা মরিচ এবং লাল শুকনো ঝাল মরিচ ও রসুন দিয়ে তৈরি ঐতিহ্যবাহী ঝাল ঝাল চাটনি। কড়া এবং মন মাতানো স্বাদের মুখরোচক এই ভর্তা ভাতের প্লেটকে নিমিষেই শেষ করে দেয়।
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {activeGuideSection === 'preserve' && (
            <motion.div
              key="preserve"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900">রামসার জলাভূমি (RAMSAR Wetland) পরিবেশ রক্ষা বিধি</h2>
                <p className="text-sm text-gray-500 mt-1">টাঙ্গুয়ার হাওর আমাদের একটি অমূল্য জাতীয় সম্পদ ও সংরক্ষিত অভয়ারণ্য। চলুন একসাথে এর ভারসাম্য ধরে রাখি।</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Guidelines: DOs */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6.5">
                  <h3 className="font-sans font-bold text-sm text-zinc-950 uppercase tracking-wider flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-zinc-800 shrink-0" />
                    অবশ্যই করণীয় নির্দেশিকা (Dos)
                  </h3>
                  <ul className="space-y-3.5 text-xs text-zinc-900 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-black bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] border border-gray-150">১</span>
                      <span><strong>লাইফ জ্যাকেট সার্বক্ষণিক পরুন:</strong> হাওরের পানি অত্যন্ত গভীর ও স্রোত বিপজ্জনক হতে পারে। সাঁতার কাটলে বা নৌকার ডেকে সবসময় জ্যাকেট পরে থাকুন।</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-black bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] border border-gray-150">২</span>
                      <span><strong>আবর্জনা ঝুড়িতে রাখুন:</strong> চিপসের খোসা, প্লাস্টিক বোতল, ফ্রুট প্যাকেট নৌকার নির্দিষ্ট শুকনো/ভেজ ভেজা বর্জ্য ফেলার বিনে পরিষ্কার জমা দিন।</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-black bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] border border-gray-150">৩</span>
                      <span><strong>স্থানীয় সংস্কৃতির প্রতি শ্রদ্ধাশীল থাকুন:</strong> হাওরের বাসিন্দা ও জেলেদের সাথে ভদ্র আচরণ বজায় রাখুন, বিনয় নিশ্চিত করে ছবি তুলুন।</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-black bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] border border-gray-150">৪</span>
                      <span><strong>সৌর বিদ্যুতের যত্ন নিন:</strong> কেবিন থেকে বের হওয়ার সময়ে আলো বা পাখা নিভিয়ে প্রাকৃতিক শক্তি সাশ্রয় করুন।</span>
                    </li>
                  </ul>
                </div>

                {/* Guidelines: DONTs */}
                <div className="bg-rose-50 border border-rose-105 rounded-2xl p-6.5">
                  <h3 className="font-sans font-bold text-sm text-red-950 uppercase tracking-wider flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                    সম্পূর্ণ নিষিদ্ধ কার্যাবলী (Don'ts)
                  </h3>
                  <ul className="space-y-3.5 text-xs text-rose-950 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-700 bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]">১</span>
                      <span><strong>হাওরের জলে প্লাস্টিক নিক্ষেপ বন্ধ:</strong> হাওরের প্রাণ বৈচিত্র্য টিকিয়ে রাখতে কোনোভাবেই হ্রদে প্লাস্টিক বোতল, থালা বা ওয়ান-টাইম কাপ ফেলবেন না।</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-700 bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]">২</span>
                      <span><strong>উচ্চ শব্দে ব্লুটুথ স্পিকার পরিহার:</strong> শব্দ দূষণ পরিহার করুন। জোরে ডেক বাজানো অতিথি পাখি ও বন্যপ্রাণীদের স্বাভাবিক জীবনধারা মারাত্মক ব্যাহত করে।</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-700 bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]">৩</span>
                      <span><strong>পাখিদের বিরক্ত না করা:</strong> অতিথি পাখিদের উদ্দেশ্যে ঢিল ছোঁড়া, ডিঙি নৌকা দিয়ে তাড়া করা বা কড়া ফ্ল্যাশ লাইট জ্বালানো আইনত নিষিদ্ধ।</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-700 bg-white shadow-sm font-bold flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]">৪</span>
                      <span><strong>গাছের পাতা বা ডাল না ভাঙা:</strong> করচ ও হিজল সোয়াম্প ফরেস্টের ডালপালা ও পাতা ওড়ানো বা টেনে ছেঁড়া থেকে বিরত থাকুন।</span>
                    </li>
                  </ul>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
