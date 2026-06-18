import { Houseboat, AddOn, TravelDestination, GalleryImage, Review } from './types';

export const houseboats: Houseboat[] = [
  {
    id: 'hb-shanti-deluxe',
    name: 'জল তরী (Jol Tori)',
    tagline: 'পানির গুঞ্জন ও পরম প্রশান্তি',
    type: 'Luxury Suite',
    description: 'প্রিমিয়াম মেহগনি কাঠের তৈরি ফিনিশিং, মাস্টার স্যুটে প্যানোরামিক কাচের জানালা, নিজস্ব উন্মুক্ত ফ্রন্ট ডেক, বায়ো-টয়লেট এবং টাঙ্গুয়ার হাওরের অপরূপ প্রকৃতির সাথে সামঞ্জস্য রেখে তৈরি করা চমৎকার আলোকসজ্জা নিয়ে এক অসাধারণ অভিজ্ঞতা অর্জন করুন।',
    pricePerNight: 16500, // in BDT (৳)
    capacity: 8,
    rooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviewsCount: 42,
    amenities: ['২৪/৭ সৌর বিদ্যুৎ', 'বায়ো-ডিজাইন টয়লেট', 'আকাশ দেখার ওপরের ডেক', 'পেশাদার শেফ', 'লাইফ জ্যাকেট ও সেফটি বয়া', 'গরম পানি', 'কায়াকিং সুবিধা'],
    imageUrl: '/src/assets/images/regenerated_image_1781822571427.jpg',
    cabinImageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    submergedForestTourIncluded: true,
  },
  {
    id: 'hb-mayabi-royal',
    name: 'মেঘাদ্রি (Meghedri)',
    tagline: 'কুয়াশা ও মেহগনির মেলবন্ধন',
    type: 'Royal Cabin',
    description: 'দম্পতি ও ছোট পরিবারের সম্পূর্ণ নির্জনতা এবং প্রশান্তির জন্য বিশেষভাবে তৈরি। মেঘাদ্রি ঐতিহ্যগত বাঙালি নৌকা তৈরির সুনিপুণ কারুকার্যের সাথে আধুনিক কেবিন ইন্টেরিয়রের এক অপূর্ব মিশ্রণ। ভারতের মেঘালয়ের নীল পাহাড়ের অসাধারণ দৃশ্য উপভোগ করার জন্য এতে রয়েছে একটি উঁচু পর্যবেক্ষণ ডেক।',
    pricePerNight: 22000,
    capacity: 6,
    rooms: 2,
    bathrooms: 2,
    rating: 5.0,
    reviewsCount: 29,
    amenities: ['শব্দহীন সোলার জেনারেটর', 'অ্যাটাচড প্রিমিয়াম ওয়াশরুম', 'সূর্যাস্ত দেখার ডাইনিং প্যাটিও', 'স্থানীয় সিলেটি বাউচি/শেফ', 'বিনামূল্যে বেতের ডিঙি নৌকা', 'চা ও কফি লাউঞ্জ', 'অডিও সাউন্ড সিস্টেম'],
    imageUrl: '/src/assets/images/regenerated_image_1781822572232.png',
    cabinImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    submergedForestTourIncluded: true,
  },
  {
    id: 'hb-niladri-eco',
    name: 'স্বপ্ন তরী (Shopno Tori)',
    tagline: 'প্রকৃতিবান্ধব ও সচেতন ভ্রমণ',
    type: 'Eco Deluxe',
    description: 'স্থানীয়ভাবে সংগৃহীত হালকা বাঁশ ও সেগুন কাঠের নিখুঁত কারুকার্যে নির্মিত পরিবেশবান্ধব হাউসবোট। পরিবেশ সচেতন পর্যটকদের জন্য এটি একদম উপযুক্ত, যেখানে পানির মৃদু ঢেউ এবং নিশাচর পাখিদের ডাক ছাড়া আর কোনো কৃত্রিম কোলাহল নেই।',
    pricePerNight: 12000,
    capacity: 10,
    rooms: 4,
    bathrooms: 2,
    rating: 4.8,
    reviewsCount: 37,
    amenities: ['১০০% পরিবেশবান্ধব সৌর বিদ্যুৎ গ্রিড', 'ইকো ফিল্টার টয়লেট', 'সুপ্রশস্ত বাঁশের হ্যামক ডেক', 'হাওরের তাজা খাবারের আয়োজন', 'পাখি দেখার টেলিস্কোপ', 'স্থানীয় অভিজ্ঞ গাইড', 'নিরাপত্তা সরঞ্জামাদি'],
    imageUrl: '/src/assets/images/regenerated_image_1781822577811.webp',
    cabinImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    submergedForestTourIncluded: false,
  },
  {
    id: 'hb-lilakhand-family',
    name: 'ঐশ্বরিক ময়ূর (Aesthetic Mayur)',
    tagline: 'হাওরের রাজকীয় প্রাসাদ',
    type: 'Family Duplex',
    description: 'উঁচু ছাদ, নজরকাড়া পিতলের ফিটিং, চমৎকার প্রশস্ত ডেক লাউঞ্জ এবং বিশাল রুফটপ ক্যানোপি সমৃদ্ধ ডুপ্লেক্স হাউসবোট  পারিবারিক পুনর্মিলনী বা বন্ধুবান্ধবদের সাথে আভিজাত্যের আমেজে হাওরের রূপ উপভোগ করার জন্য এটি সেরা পছন্দ।',
    pricePerNight: 28500,
    capacity: 12,
    rooms: 5,
    bathrooms: 3,
    rating: 4.95,
    reviewsCount: 51,
    amenities: ['ডুপ্লেক্স ডাবল ডেক', '২৪/৭ ব্যাকআপ সোলার গ্রিড', 'আধুনিক পিতলের কারুকার্যময় বাথরুম', 'রয়াল সিলেটি স্পেশাল ডাইনিং', 'ডিঙি নৌকা ও স্নরকেলিং কিট', 'নৌকায় মাছ ধরার সরঞ্জাম', 'সার্বক্ষণিক বোট ম্যানেজার'],
    imageUrl: '/src/assets/images/regenerated_image_1781823805030.jpg',
    cabinImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    submergedForestTourIncluded: true,
  }
];

export const addOns: AddOn[] = [
  {
    id: 'add-feast',
    name: 'সিলেটি ঐতিহ্যবাহী হাঁস ভুনা ও হাওরের তাজা মাছের ভোজ',
    description: 'হাওরের তাজা জলজ উপাদানে নৌকার রান্নাঘরে সদ্য প্রস্তুতকৃত ভোজন উৎসব: সরষের তেলে রান্না করা সিলেটি হাঁস ভুনা, টাঙ্গুয়ার বোয়াল বা আইড় মাছ ভাজি, করচ শাক ও সুগন্ধি কালোজিরা চালের ভাত।',
    price: 1500,
    unit: 'per person',
    iconName: 'ChefHat'
  },
  {
    id: 'add-baul',
    name: 'মধ্যরাতে লাইভ লালন ও হাসন রাজার বাউল গান',
    description: 'নৌকার ডেকে রাতের তারার নিচে একতারা ও দোতারার সুরে স্থানীয় বাউল শিল্পীর পরিবেশনায় হাসন রাজা, লালন শাহ এবং রাধারমণের আধ্যাত্মিক ও কালজয়ী গান শোনার এক অনন্য আধ্যাত্মিক অভিজ্ঞতা।',
    price: 3500,
    unit: 'per stay',
    iconName: 'Music'
  },
  {
    id: 'add-canoe',
    name: 'জলাবন রাতারগুলের মতো সোয়াম্প ফরেস্ট ডিঙি নৌকা ভ্রমণ',
    description: 'করচ গাছের গোলকধাঁধায় ঢাকা জলাবনের গভীরে সরু কাঠের নৌকায় গাইডসহ নীরব ভ্রমণ, যেখানে বড় হাউসবোট প্রবেশ করতে পারে না। সাথে থাকবে ঐতিহ্যবাহী কামরাঙ্গা বা লটকন ফল ও আপ্যায়ন।',
    price: 800,
    unit: 'per person',
    iconName: 'Compass'
  },
  {
    id: 'add-stars',
    name: 'মধ্যরাতের আকাশ ও নক্ষত্রমণ্ডল দেখার কিট',
    description: 'টাঙ্গুয়ার দূষণমুক্ত আকাশে টেলিস্কোপের সাহায্য গ্রহ, নক্ষত্র এবং ছায়াপথ অন্বেষণ করতে একটি প্রিমিয়াম ট্রাইপড টেলিস্কোপ কিট এবং কাস্টম স্কাই ম্যাপের ব্যবস্থা।',
    price: 1000,
    unit: 'per stay',
    iconName: 'Sparkles'
  }
];

export const travelDestinations: TravelDestination[] = [
  {
    id: 'dest-watchtower',
    name: 'লিলখন্দ ওয়াচটাওয়ার',
    localName: 'টাঙ্গুয়া ওয়াচটাওয়ার',
    description: 'হাওরের বুক চিরে জেগে ওঠা কাঠের তৈরি এই ওয়াচটাওয়ার থেকে টাঙ্গুয়ার সবুজ পানির আয়না এবং দূরের নীল মেঘালয় পাহাড়ের অপূর্ব মেলবন্ধন স্পষ্টভাবে উপভোগ করা যায়।',
    distanceFromHaor: 'টাঙ্গুয়ার হাওরের কেন্দ্রবিন্দু',
    bestTime: 'সূর্যোদয় ও সূর্যাস্ত',
    tip: 'ভোর ৫:৩০ টায় শান্ত হাওরের বুকে যখন সোনালী আভা প্রতিফলিত হয়, তখন ওয়াচটাওয়ারের সৌন্দর্য নিদারুণ রূপ নেয়।',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dest-niladri',
    name: 'নীলাদ্রি নীল লেক',
    localName: 'শহীদ সিরাজ লেক / নীলাদ্রি',
    description: 'সোনার টেক কয়লা খনির পরিত্যাক্ত এই লেকের নীল পানি দেখে অনেকেই একে বাংলার কাশ্মীর বলে থাকেন। আকাশছোঁয়া সবুজ মেঘালয় পাহাড়ের ঠিক কোল ঘেঁষে এই রূপকথার মতো লেকটি অবস্থিত।',
    distanceFromHaor: 'টেকেরঘাট (হাউসবোট থেকে ১ ঘণ্টা)',
    bestTime: 'মেঘলা দুপুর বা পড়ন্ত বিকেল',
    tip: 'মাত্র ১০০ টাকায় স্থানীয় একটি ছোট শান্ত নৌকা ভাড়া করে গভীর সবুজ রঙের চুনাপাথরের খাদের সৌন্দর্যগুলো কাছে থেকে প্রত্যক্ষ করুন।',
    imageUrl: 'https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dest-shimul',
    name: 'শিমুল বাগান',
    localName: 'জাদুকাটা শিমুল বাগান',
    description: 'যাদুকাটা নদীর বালুপাড় ঘেঁষে হাজারো শিমুল গাছের এক সুবিশাল উদ্যান। বসন্তের দিনে যখন গাছে গাছে লাল ফুল ফোটে, তখন পুরো এলাকা রক্তিম লাল সমুদ্রের মতো এক জাদুকরী দৃশ্যে রূপ নেয়।',
    distanceFromHaor: 'মানিগাঁও, সুনামগঞ্জ (যাদুকাটার নিকটবর্তী)',
    bestTime: 'বসন্তকাল (ফেব্রুয়ারি-মার্চ) অথবা বর্ষাকাল',
    tip: 'বারেক টিলা থেকে মটরবাইকে করে যাদুকাটা নদী পেরিয়ে এই বাগানের সমান্তরাল শিমুল গাছের সারির ছবি তোলা বেশ আকর্ষণীয়।',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dest-jadukata',
    name: 'যাদুকাটা নদী',
    localName: 'যাদুকাটা নদী',
    description: 'বাংলাদেশের অন্যতম সুন্দর ও স্বচ্ছ পানির নদী। ভারতের মেঘালয় পাহাড়ের গভীর গিরিপথ থেকে সরাসরি প্রবাহিত হওয়া এই নদীর বুক জুড়ে রয়েছে বালুময় চর এবং স্ফটিকের মতো স্বচ্ছ জলধারা।',
    distanceFromHaor: 'লাউড়েরগড় (টেকেরঘাট থেকে ১ ঘণ্টা)',
    bestTime: 'বর্ষাকালের মেঘাচ্ছন্ন বিকেল',
    tip: 'নদীর তীরের অন্তহীন সাদা বালুকাময় সৈকত ধরে হাঁটুন এবং সরাসরি ভারত থেকে ভেসে আসা হিমেল পাহাড়ি বাতাস উপভোগ করুন।',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'gal-1',
    url: '/src/assets/images/regenerated_image_1781822196712.png',
    title: 'টাঙ্গুয়ার সূর্যোদয়',
    category: 'scenic',
    photographer: 'আ. মর্তুজা',
    description: 'টাঙ্গুয়ার নিথর ও স্বচ্ছ কাচের মতো শান্ত জলের ওপরে প্রথম রক্তিম সূর্যের প্রতিফলন, দূরে কুয়াশাকীর্ণ ওয়াচটাওয়ারের ছায়া।'
  },
  {
    id: 'gal-2',
    url: '/src/assets/images/regenerated_image_1781824117742.png',
    title: 'জল তরীর অগ্রযাত্রা',
    category: 'houseboats',
    photographer: 'এস. কে. ফাহিম',
    description: 'লিলখন্দ ওয়াচটাওয়ারের নিকটবর্তী সুবিশাল নীল জলরাশি ভেদ করে আমাদের প্রিমিয়াম হাউসবোট জল তরীর রাজকীয় যাত্রা।'
  },
  {
    id: 'gal-3',
    url: '/src/assets/images/regenerated_image_1781822202272.webp',
    title: 'রাজকীয় কেবিনের সকাল',
    category: 'cabins',
    photographer: 'এন. এস. নিবিড়',
    description: 'জল তরীর সুসজ্জিত লাক্সারি কাঠের কেবিনের সুবিশাল কাচের জানালা দিয়ে ভোরে নীল হ্রদের বুকে চোখ মেলার অপূর্ব অনুভূতি।'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    title: 'রহস্যময় জলাবন',
    category: 'culture',
    photographer: 'এম. তানজিদ',
    description: 'ভোরের মৃদু কুয়াশায় ঘেরা হিজল-করচের সোয়াম্প ফরেস্টে পত্রপল্লবের মধ্য দিয়ে সূর্যের সোনালী রশ্মি চুঁইয়ে পড়ার দৃশ্য।'
  },
  {
    id: 'gal-5',
    url: '/src/assets/images/regenerated_image_1781822203818.jpg',
    title: 'অনিন্দ্য তারকারাজি',
    category: 'scenic',
    photographer: 'জেড. কে. সাদি',
    description: 'শহরের দূষণ ও ধোঁয়াশা থেকে দূরে টাঙ্গুয়ার নিকষ কালো গভীর রাতের আকাশে কোটি কোটি তারার মেলা এবং মিল্কিওয়ে গ্যালাক্সি।'
  },
  {
    id: 'gal-6',
    url: '/src/assets/images/regenerated_image_1781822205495.png',
    title: 'মেঘাদ্রি থেকে সূর্যাস্ত',
    category: 'sunset',
    photographer: 'আ. মর্তুজা',
    description: 'দিনশেষে মেঘালয়ের পাহাড়ের কোল জুড়ে রক্তিম সূর্যাস্ত, মেঘের রঙ ধারণ করেছে গাঢ় গোলাপি আর বেগুনী আভা।'
  },
  {
    id: 'gal-7',
    url: '/src/assets/images/regenerated_image_1781822210514.jpg',
    title: 'বুকের বইয়ের কানন',
    category: 'cabins',
    photographer: 'এইচ. তালহা',
    description: 'নৌকার ভেতরে ছোট্ট চমৎকার রিডিং জোন, যেখানে চা চক্রের পাশাপাশি গল্প-উপন্যাস বা বিভিন্ন বোর্ড গেমসের সুন্দর আয়োজন রয়েছে।'
  },
  {
    id: 'gal-8',
    url: '/src/assets/images/regenerated_image_1781822212164.png',
    title: 'যাদুকাটার বালুচর',
    category: 'scenic',
    photographer: 'এস. চৌধুরী',
    description: 'যাদুকাটা নদীর ওপরে পাহাড়ি বালুকারাশি ও স্ফটিকের চেয়েও পরিষ্কার ঠাণ্ডা প্রবহমান পাহাড়ি ঝর্ণার জলের মিলনমেলা।'
  }
];

export const localReviews: Review[] = [
  {
    id: 'rev-1',
    guestName: 'মুনতাসির আহমেদ',
    rating: 5,
    date: 'জুন ২০২৬',
    comment: 'এক সত্যিকারের অলৌকিক সপ্তাহান্ত কাটালাম। জল তরীর কেবিনের কাঠের ফিনিশিং আর বিশাল জানালায় চোখ মেলতেই চমৎকার সকাল দেখা যেত। রাতে বাউল গান এবং মধ্যাহ্নে মাটির হাঁড়িতে রান্না সিলেটি হাঁস ভুনার স্বাদ সারাজীবন জিভে লেগে থাকবে!',
    avatarUrl: '/src/assets/images/regenerated_image_1781822579155.jpg'
  },
  {
    id: 'rev-2',
    guestName: 'ফারহান ও তাহিয়া',
    rating: 5,
    date: 'মে ২০২৬',
    comment: 'আমাদের বিবাহবার্ষিকীর জন্য মেঘাদ্রি বুক করেছিলাম। মেহগনি কেবিনটি ছিল অসাধারণ নান্দনিক এবং অত্যন্ত পরিষ্কার। দূর দিগন্তে মেঘালয় পাহাড়ের পাদদেশে বসে চায়ের কাপ হাতে সূর্যাস্ত দেখার আনন্দ ভোলা যাবে না। আমাদের পক্ষ থেকে ১০/১০ বুকিং রেটিং!',
    avatarUrl: '/src/assets/images/regenerated_image_1781822579924.jpg'
  },
  {
    id: 'rev-3',
    guestName: 'সাঈদ আল মাহমুদ',
    rating: 4.8,
    date: 'এপ্রিল ২০২৬',
    comment: 'এস্থেটিক টাঙ্গুয়া তাদের পরিবেশ সুরক্ষার কথা সত্যিই প্রমাণ করেছে! স্বপ্ন তরী নৌকাটি অত্যন্ত শান্ত, সৌর শক্তিতে চলে আর খাবারের মাছগুলো সরাসরি হাওর থেকে তাজা ধরা। মাঝরাতে ওপরের ডেকে জোছনার আলোয় বসে দোতারার সুরে বাউল গান শোনা দারুণ ছিল।',
    avatarUrl: '/src/assets/images/regenerated_image_1781822580613.jpg'
  }
];
