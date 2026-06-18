import React, { useState } from 'react';
import { galleryImages } from '../data';
import { GalleryImage } from '../types';
import { Camera, X, ArrowLeft, ArrowRight, Sparkles, Filter, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'scenic' | 'houseboats' | 'cabins' | 'culture' | 'sunset'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const filterTabs: { id: typeof activeFilter; label: string }[] = [
    { id: 'all', label: 'সব ছবি' },
    { id: 'scenic', label: 'স্বর্গীয় জলরাশি' },
    { id: 'houseboats', label: 'বিলাসবহুল হাউসবোট' },
    { id: 'cabins', label: 'কেবিন ইন্টেরিয়র' },
    { id: 'culture', label: 'জলাবন ও প্রকৃতি' },
    { id: 'sunset', label: 'সূর্যাস্তের জাদু' },
  ];

  const handleOpenLightbox = (image: GalleryImage) => {
    const originalIdx = galleryImages.findIndex(img => img.id === image.id);
    setSelectedImage(image);
    setImageIndex(originalIdx);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (imageIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIdx]);
    setImageIndex(nextIdx);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (imageIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIdx]);
    setImageIndex(prevIdx);
  };

  return (
    <div id="gallery-root" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#18181b] bg-zinc-100 px-3 py-1.5 rounded-full inline-block mb-3 font-semibold">
          ক্যামেরাবন্দী নীরব প্রশান্তি
        </span>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          টাঙ্গুয়ার হাওরের দৃশ্যকাব্য
        </h1>
        <p className="mt-4 text-base text-gray-650 leading-relaxed">
          আমাদের লেন্সের চোখে তুলনাহীন সুনামগঞ্জের কিছু আসল রূপ দেখে নিন। সীমাহীন নীল দিগন্ত, খাঁটি কাঠের নৌকা, রাতে জ্বলতে থাকা হারিকেনের নিভু নিভু আলো আর নীরবতায় ঘেরা প্রথম সকাল।
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-gray-100 pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 mr-2">
          <Filter className="h-3.5 w-3.5 text-black" />
          <span>বিভাগ নির্বাচন করুন:</span>
        </div>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            id={`filter-${tab.id}`}
            onClick={() => setActiveFilter(tab.id)}
            className={`cursor-pointer rounded-full px-4.5 py-2 text-xs font-semibold tracking-wide transition-all ${
              activeFilter === tab.id
                ? 'bg-black text-white shadow-sm shadow-zinc-950/10'
                : 'bg-gray-100 text-gray-650 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        id="gallery-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-50 shadow-sm cursor-pointer border border-gray-100/50"
              onClick={() => handleOpenLightbox(image)}
              id={`gallery-item-${image.id}`}
            >
              {/* Image box */}
              <div className="aspect-video w-full overflow-hidden sm:aspect-square relative">
                <img
                  src={image.url}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5" />
                
                {/* Visual hover contents */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="flex justify-end">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-sm">
                      <ZoomIn className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  
                  <div className="text-white space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-300">
                      /{image.category}
                    </span>
                    <h3 className="font-sans font-bold text-base leading-tight">
                      {image.title}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-200 pt-1">
                      <Camera className="h-3.5 w-3.5 text-amber-400" />
                      <span className="font-mono text-[11px]">{image.photographer}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Bottom Banner for mobile display */}
              <div className="p-4 bg-white flex flex-col justify-between block sm:hidden">
                <h3 className="font-sans font-bold text-gray-900 text-sm">
                  {image.title}
                </h3>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                  বাই {image.photographer}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 p-4 sm:p-6 select-none"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="h-5.5 w-5.5" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 z-40 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            {/* Middle Display Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative max-w-4xl w-full flex flex-col pointer-events-auto bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Real Image */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Lightbox Details Panel */}
              <div className="bg-black p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full font-bold">
                        {selectedImage.category}
                      </span>
                      <div className="flex items-center space-x-1 font-mono text-[11px] text-amber-400">
                        <Sparkles className="h-3 w-3" />
                        <span>প্রসিদ্ধ টাঙ্গুয়া কিউরেটেড গ্যালারি</span>
                      </div>
                    </div>
                    <h2 className="font-sans text-xl font-bold tracking-tight">
                      {selectedImage.title}
                    </h2>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3 bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-800 text-white animate-pulse">
                      <Camera className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">ছবি তুলেছেন</span>
                      <span className="font-sans font-semibold text-sm text-zinc-100">{selectedImage.photographer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 z-40 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
