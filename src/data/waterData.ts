import { Product, MineralSpec, DeliveryZone } from '../types';
import aquaUnoReal20L from '../assets/images/aqua_uno_real_20l.jpg';
import aquaUnoReal10L from '../assets/images/aqua_uno_real_10l.jpg';
import aquaUnoReal5L from '../assets/images/aqua_uno_real_5l.jpg';
import aquaUnoReal500ml from '../assets/images/aqua_uno_real_500ml.jpg';
import aquaUnoReal1L from '../assets/images/aqua_uno_real_1l.jpg';
import aquaUnoReal1_5L from '../assets/images/aqua_uno_real_1_5l.jpg';

export const COMPANY_INFO = {
  name: 'Aqua Uno',
  legalName: 'Aqua Uno — Ephron Industries Limited',
  parentCompany: 'Ephron Industries Limited',
  slogan: 'Trust in Every Drop',
  subSlogan: 'Premium Natural Spring Water • Bottled at Source by Ephron Industries Limited',
  phone: '+254718618437',
  phoneDisplay: '0718618437',
  whatsappNumber: '254718618437',
  email: 'orders@aquaunowater.com',
  corporateEmail: 'info@ephroneindustries.com',
  website: 'https://aqua-uno-fresh-water.vercel.app',
  webDomain: 'aqua-uno-fresh-water.vercel.app',
  pixiesetGalleryUrl: 'https://taurusarts7.pixieset.com/ephroneindustrieslimited',
  videoUrl: '/assets/aistudio/AQUA_UNO_9befbc19.mp4',
  address: 'Ephron Industries Bottling Plant & Aqua Uno Distribution Hubs',
  serviceHours: 'Monday – Saturday: 7:00 AM – 7:00 PM | Sunday: 9:00 AM – 4:00 PM',
  currency: 'KSh',
};

export interface FacilityAsset {
  id: string;
  title: string;
  category: 'production' | 'facility' | 'warehouse';
  image: string;
  description: string;
}

export const EPHRONE_FACILITY_ASSETS: FacilityAsset[] = [
  {
    id: 'fac-1',
    title: 'Aqua Uno 3D Signage & Factory Facade',
    category: 'facility',
    image: '/src/assets/images/aqua_uno_sign_gardens.jpg',
    description: 'The iconic Aqua Uno royal cobalt blue bottling facility with 3D water teardrop emblem and manicured grounds.'
  },
  {
    id: 'fac-2',
    title: 'Highland Estate Aerial View',
    category: 'facility',
    image: '/src/assets/images/ephrone_plant_aerial.jpg',
    description: 'Aerial drone capture of the Ephron Industries compound, paved driveway, and mountain aquifer backdrop.'
  },
  {
    id: 'fac-3',
    title: 'Main Security Gate & Reception',
    category: 'facility',
    image: '/src/assets/images/ephrone_gate_entrance.jpg',
    description: 'Gated facility entry with "Trust in Every Drop" security checkpoint and logistics staging.'
  },
  {
    id: 'fac-4',
    title: 'Automated Bottling Line & Pallets',
    category: 'warehouse',
    image: '/src/assets/images/aqua_uno_warehouse_pallets.jpg',
    description: 'High-capacity sanitized bottling storage ready for nationwide distribution.'
  },
  {
    id: 'fac-5',
    title: 'Distribution Logistics Inventory',
    category: 'warehouse',
    image: '/src/assets/images/aqua_uno_warehouse_inventory.jpg',
    description: 'Thousands of sealed 500ml, 1L, and dispenser packs on wooden distribution pallets.'
  },
  {
    id: 'fac-6',
    title: 'Modern Industrial Architecture',
    category: 'production',
    image: '/src/assets/images/aqua_uno_factory_facade.jpg',
    description: 'State-of-the-art climate-controlled clean room facility certified to global food hygiene standards.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-20l',
    name: '20 Litre Dispenser Bottle',
    size: '20 Litres',
    category: 'dispenser',
    price: 1300,
    description: 'Our flagship Aqua Uno 20L reusable polycarbonate bottle. Ideal for homes, executive offices, schools, and clinics. Compatible with all standard hot & cold dispensers and pumps.',
    bestFor: 'Homes, Corporate Offices, Dispensers & Water Coolers',
    features: [
      'Eco-friendly sanitized refill exchange',
      'Food-grade, BPA-free durable bottle',
      'Tamper-evident Aqua Uno hygiene seal',
      'Compatible with top & bottom load dispensers'
    ],
    image: aquaUnoReal20L,
    tag: 'Best Seller',
    popular: true,
  },
  {
    id: 'prod-10l',
    name: '10 Litre Family Container',
    size: '10 Litres',
    category: 'dispenser',
    price: 400,
    description: 'The versatile Aqua Uno 10-Litre bottle with an ergonomic heavy-duty carry handle. Compact enough for kitchen countertops and pantry storage while providing ample hydration.',
    bestFor: 'Apartments, Small Families, Dining Rooms & Travel',
    features: [
      'Ergonomic reinforced carry handle',
      'Sturdy countertop standing base',
      'Direct dispensing tap compatible',
      '100% pure mountain spring water'
    ],
    image: aquaUnoReal10L,
    tag: 'New Size',
    popular: true,
  },
  {
    id: 'prod-5l',
    name: '5 Litre Family Bottle',
    size: '5 Litres',
    category: 'bottles',
    price: 440,
    description: 'Convenient 5-litre Aqua Uno container with sturdy blue carry handle. Perfect for family kitchens, dining tables, camping trips, and boiling crystal-clear tea and coffee.',
    bestFor: 'Family Kitchens, Camping, Cottages & Cooking',
    features: [
      'Heavy-duty molded carry handle',
      'Wide pour spout with precision seal',
      'Ideal for cooking & baby formula',
      'Space-saving refrigerator door fit'
    ],
    image: aquaUnoReal5L,
    popular: true,
  },
  {
    id: 'prod-1-5l-pack',
    name: '1.5 Litre Bottle (Pack of 12)',
    size: '12 × 1.5 Litres',
    category: 'packs',
    price: 400,
    description: 'High-capacity 1.5L Aqua Uno bottles delivering maximum daily hydration. Recommended for athletes, long-distance road trips, and all-day workstations.',
    bestFor: 'Athletes, Fitness, Long Drives & Dining',
    features: [
      '1.5L generous volume per bottle',
      'pH 7.09',
      'Ergonomic contour grip',
      'Long-lasting shelf freshness'
    ],
    image: aquaUnoReal1_5L,
  },
  {
    id: 'prod-1l-pack',
    name: '1 Litre Bottle (Pack of 12)',
    size: '12 × 1.0 Litre',
    category: 'packs',
    price: 380,
    description: 'Pack of 12 full one-litre Aqua Uno bottles. The gold standard for personal hydration, gym bags, university students, and active lifestyles.',
    bestFor: 'Gym, Field Trips, Road Trips & Daily Workstations',
    features: [
      'Optimal personal hydration volume',
      'Convenient 12-pack case',
      'Fresh mountain spring water',
      'High-impact recyclable bottle'
    ],
    image: aquaUnoReal1L,
    tag: 'Active Hydration',
  },
  {
    id: 'prod-500ml-pack',
    name: '500 ml Pack (24 Bottles)',
    size: '24 × 500ml',
    category: 'packs',
    price: 380,
    description: 'A shrink-wrapped case of 24 compact 500ml Aqua Uno spring water bottles. Perfect for boardrooms, hospitality, corporate conferences, weddings, and grab-and-go refreshment.',
    bestFor: 'Events, Boardrooms, Conferences & Daily Commutes',
    features: [
      '24 easy-grip bottles per pack',
      'Reinforced shrink-wrap packaging',
      'Crystal clear mountain spring taste',
      '100% recyclable bottles'
    ],
    image: aquaUnoReal500ml,
    tag: 'Event Favorite',
    popular: true,
  }
];

export const MINERAL_SPECS: MineralSpec[] = [
  { name: 'Iron (Fe)', amount: '0.05 mg/L' },
  { name: 'Sodium (Na)', amount: '7.56 mg/L' },
  { name: 'Sulphate (SO₄)', amount: '3.00 mg/L' },
  { name: 'Calcium (Ca)', amount: '4.23 mg/L' },
  { name: 'Magnesium (Mg)', amount: '0.58 mg/L' },
  { name: 'Nitrate (NO₃)', amount: '1.50 mg/L' },
  { name: 'Chloride (Cl)', amount: '8.20 mg/L' },
  { name: 'Fluoride (F)', amount: '0.17 mg/L' },
  { name: 'pH Level', amount: '7.09' },
  { name: 'Total Dissolved Solids (TDS)', amount: '34.5 mg/L' },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { area: 'Nairobi Metro (Westlands, Kilimani, Karen, CBD, Parklands)', leadTime: 'Within 2–4 Hours', minOrderFree: '2+ Bottles / KSh 500', days: 'Mon – Sun' },
  { area: 'Kiambu County (Kiambu Town, Ruiru, Thika, Kikuyu)', leadTime: 'Same Day (Order before 11 AM)', minOrderFree: '3+ Bottles / KSh 750', days: 'Mon – Sat' },
  { area: 'Central Highlands (Nyeri, Nyahururu, Karatina, Murang’a)', leadTime: 'Same Day Morning / Afternoon', minOrderFree: '2+ Bottles / KSh 500', days: 'Mon – Sat' },
  { area: 'Rift Valley Corridor (Naivasha, Nakuru)', leadTime: 'Next Day Scheduled Runs', minOrderFree: '5+ Bottles / Corporate', days: 'Tue, Thu, Sat' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: 'We switched our 80-person corporate headquarters to Aqua Uno 6 months ago. Deliveries are punctual every Monday morning, and our employees continually praise the pure, refreshing taste.',
    author: 'Grace Mwangi',
    role: 'Operations Director',
    company: 'Apex Logistics Hub, Nairobi',
    rating: 5,
  },
  {
    id: 2,
    quote: 'With three young kids at home, water safety is my top priority. The 20L refills arrive clean and sealed, the delivery team carries them right to our kitchen dispenser, and WhatsApp ordering takes literally 30 seconds.',
    author: 'David Ochieng',
    role: 'Homeowner & Father',
    company: 'Kilimani Resident',
    rating: 5,
  },
  {
    id: 3,
    quote: 'We ordered 50 packs of 500ml bottles for our regional medical symposium. The branded packaging looked premium, the water tasted naturally cool, and they accommodated our tight event schedule flawlessly.',
    author: 'Dr. Sarah Kariuki',
    role: 'Conference Coordinator',
    company: 'Central Health Summit',
    rating: 5,
  }
];

export const FAQS = [
  {
    question: 'How do I place an order for refills or new bottles?',
    answer: 'You can order directly using the WhatsApp button on this site, which creates an instant formatted message with your requested products and address, or use our online quick-checkout. You can also call our dispatch hotline at 0718618437.'
  },
  {
    question: 'How does the 20-Litre bottle refill exchange work?',
    answer: 'On your first order, if you do not own a clean standard 20L poly-carbonate bottle, a one-time refundable bottle deposit of KSh 600 applies. On subsequent orders, our delivery driver collects your empty sanitized bottle and swaps it with a fresh sealed 20L bottle for only KSh 250.'
  },
  {
    question: 'Where is Aqua Uno sourced from?',
    answer: 'Our water is tapped directly from pristine, protected natural aquifers located deep within protected highland reserves. The water undergoes natural volcanic rock filtration before undergoing our state-of-the-art multi-stage micro-filtration, UV sterilization, and touchless bottling in strict compliance with KEBS standards.'
  },
  {
    question: 'Do you offer scheduled weekly deliveries for offices or homes?',
    answer: 'Yes! We offer automated weekly, bi-weekly, or monthly delivery schedules with priority dispatch, consolidated monthly e-invoicing for businesses, and dedicated account manager support.'
  },
  {
    question: 'What is the delivery turnaround time and fee?',
    answer: 'Within Nairobi and major Central Kenya urban hubs, orders placed before 11:00 AM are delivered same-day. Orders placed later arrive within 2–4 hours or the next morning. Delivery is completely FREE for 2 or more 20L bottles or orders above KSh 500.'
  }
];
