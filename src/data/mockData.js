// All mock/demo data for the Flipkart Foods prototype. No backend — everything lives here.

export const OCCASIONS = {
  default: {
    key: 'default',
    label: 'For You',
    banner: {
      title: 'THE BIG\nFOOD DAYS',
      subtitle: 'Grab huge discounts on your fav meals!',
      cta: 'Order Now',
      gradient: 'linear-gradient(135deg,#2874F0 0%,#1a56c9 100%)',
    },
    combo: {
      title: 'Top Picks For You',
      subtitle: 'Based on what is popular around you',
      itemIds: ['m1', 'm5', 'm9', 't2'],
    },
  },
  exam: {
    key: 'exam',
    label: 'Exam Eve',
    banner: {
      title: 'EXAM EVE\nFUEL-UP',
      subtitle: 'Brain food, delivered in under 20 mins',
      cta: 'Beat the Deadline',
      gradient: 'linear-gradient(135deg,#7B2FF7 0%,#2874F0 100%)',
    },
    combo: {
      title: 'Exam Eve Combo',
      subtitle: 'Coffee + Maggi + Energy bar — curated for all-nighters',
      itemIds: ['t1', 't4', 'm7'],
    },
  },
  nightshift: {
    key: 'nightshift',
    label: 'Night Shift',
    banner: {
      title: 'NIGHT SHIFT\nSPECIAL',
      subtitle: 'Hot meals for the graveyard grind',
      gradient: 'linear-gradient(135deg,#0F2027 0%,#2874F0 100%)',
      cta: 'Order Now',
    },
    combo: {
      title: 'Night Shift Combo',
      subtitle: 'Filter coffee + Biryani — because 2 AM hunger is real',
      itemIds: ['t2', 'm2', 't4'],
    },
  },
  freshers: {
    key: 'freshers',
    label: 'Freshers Week',
    banner: {
      title: 'FRESHERS\nWEEK BASH',
      subtitle: 'New campus, new cravings — order together',
      gradient: 'linear-gradient(135deg,#FF9F1C 0%,#FFC107 100%)',
      cta: 'Explore Combos',
    },
    combo: {
      title: 'Freshers Squad Combo',
      subtitle: 'Pizza + Sides for the whole hostel wing',
      itemIds: ['m5', 'm9', 'm6'],
    },
  },
  fest: {
    key: 'fest',
    label: 'Fest/Farewell',
    banner: {
      title: 'FAREWELL\nFEAST',
      subtitle: 'Celebrate the send-off in style',
      gradient: 'linear-gradient(135deg,#C31432 0%,#FFC107 100%)',
      cta: 'Order the Feast',
    },
    combo: {
      title: 'Farewell Feast Combo',
      subtitle: 'Biryani + Gulab Jamun — a proper send-off',
      itemIds: ['m2', 'm8', 'm1'],
    },
  },
  latenight: {
    key: 'latenight',
    label: 'Late-Night Coffee',
    banner: {
      title: "IT'S LATE.\nCOFFEE'S UP.",
      subtitle: 'Your usual, ready before the credits roll',
      gradient: 'linear-gradient(135deg,#2C3E50 0%,#4CA1AF 100%)',
      cta: 'Order Coffee',
    },
    combo: {
      title: 'Late-Night Coffee Combo',
      subtitle: 'Filter coffee + Cookies — for one more episode',
      itemIds: ['t2', 't3'],
    },
  },
}

// Regular ("Flipkart Foods") menu — normal delivery estimates
export const REGULAR_MENU = [
  { id: 'm1', name: 'Paneer Butter Masala Combo', restaurant: 'Spice Route Kitchen', price: 189, mrp: 220, eta: '35-40 min', rating: 4.3, img: '🍛', tags: ['Bestseller'] },
  { id: 'm2', name: 'Hyderabadi Chicken Biryani', restaurant: 'Biryani Junction', price: 249, mrp: 280, eta: '40-45 min', rating: 4.5, img: '🍚', tags: ['Bestseller'] },
  { id: 'm3', name: 'Veg Hakka Noodles', restaurant: 'Wok This Way', price: 149, mrp: 170, eta: '30-35 min', rating: 4.1, img: '🍜', tags: [] },
  { id: 'm4', name: 'Butter Chicken + Naan', restaurant: 'Spice Route Kitchen', price: 229, mrp: 260, eta: '35-40 min', rating: 4.4, img: '🍗', tags: [] },
  { id: 'm5', name: 'Farmhouse Pizza (Medium)', restaurant: "Napoli's Pizza Co.", price: 279, mrp: 320, eta: '30-35 min', rating: 4.2, img: '🍕', tags: ['Bestseller'] },
  { id: 'm6', name: 'Loaded Cheese Fries', restaurant: "Napoli's Pizza Co.", price: 99, mrp: 120, eta: '25-30 min', rating: 4.0, img: '🍟', tags: [] },
  { id: 'm7', name: 'Protein Bowl (Grilled Chicken)', restaurant: 'FitFuel Meals', price: 199, mrp: 230, eta: '35-40 min', rating: 4.3, img: '🥗', tags: ['Healthy'] },
  { id: 'm8', name: 'Gulab Jamun (4 pcs)', restaurant: 'Sweet Tooth', price: 79, mrp: 90, eta: '25-30 min', rating: 4.6, img: '🍮', tags: [] },
  { id: 'm9', name: 'Cheese Burst Burger Meal', restaurant: 'Burger Barracks', price: 159, mrp: 189, eta: '30-35 min', rating: 4.2, img: '🍔', tags: ['Bestseller'] },
]

// TiffinX — certified <20-min menu, tighter restricted catalog to make the promise credible
export const TIFFINX_MENU = [
  { id: 't1', name: 'Veg Thali Express', restaurant: 'TiffinX Central Kitchen', price: 129, mrp: 129, eta: '18 min', rating: 4.5, img: '🍱', certified: true },
  { id: 't2', name: 'Filter Coffee + Sandwich', restaurant: 'TiffinX Central Kitchen', price: 89, mrp: 89, eta: '12 min', rating: 4.7, img: '☕', certified: true },
  { id: 't3', name: 'Choco Chip Cookies (6 pcs)', restaurant: 'TiffinX Bakes', price: 69, mrp: 69, eta: '10 min', rating: 4.6, img: '🍪', certified: true },
  { id: 't4', name: 'Instant Maggi + Cheese', restaurant: 'TiffinX Central Kitchen', price: 59, mrp: 59, eta: '9 min', rating: 4.4, img: '🍥', certified: true },
  { id: 't5', name: 'Curd Rice Bowl', restaurant: 'TiffinX Central Kitchen', price: 79, mrp: 79, eta: '15 min', rating: 4.3, img: '🍚', certified: true },
  { id: 't6', name: 'Masala Chai + Rusk', restaurant: 'TiffinX Bakes', price: 39, mrp: 39, eta: '8 min', rating: 4.5, img: '🫖', certified: true },
]

export const ALL_ITEMS = [...REGULAR_MENU, ...TIFFINX_MENU]

export const getItemById = (id) => ALL_ITEMS.find((i) => i.id === id)

// Restaurant-partner mock data
export const RESTAURANT_PROFILE = {
  name: 'Spice Route Kitchen',
  cuisine: 'North Indian, Mughlai',
  campus: 'IIT Chennai Campus Zone',
  todayOrders: 62,
  avgPrepTime: '22 min',
}

// Historical orders for the forecast chart — last 4 Thursdays, by hour bucket
export const FORECAST_HISTORY = {
  day: 'Thursday',
  slot: '1:00 PM - 2:00 PM',
  weeks: [38, 41, 47, 44],
  predicted: 45,
  hourly: [
    { hour: '9-10 AM', orders: 8 },
    { hour: '10-11 AM', orders: 12 },
    { hour: '11-12 PM', orders: 20 },
    { hour: '12-1 PM', orders: 34 },
    { hour: '1-2 PM', orders: 45 },
    { hour: '2-3 PM', orders: 30 },
    { hour: '3-4 PM', orders: 14 },
    { hour: '4-5 PM', orders: 10 },
  ],
}

export const CAMPUS_CALENDAR = [
  { date: 'Sep 3', event: 'Mid-Sem Exams Begin', impact: 'High demand expected — study snacks & coffee', type: 'exam' },
  { date: 'Sep 8', event: 'Cultural Fest - Aurora', impact: 'Very high footfall — extend capacity', type: 'fest' },
  { date: 'Sep 14', event: 'Freshers Orientation Day', impact: 'New students — combo meals recommended', type: 'orientation' },
  { date: 'Sep 20', event: 'Placement Season Kickoff', impact: 'Late-night orders likely to spike', type: 'placement' },
  { date: 'Sep 29', event: 'Hostel Farewell Night', impact: 'Group orders — push farewell combos', type: 'fest' },
]

export const COMMISSION_TIERS = [
  { tier: 'Growth', rate: 9, desc: 'New partners — first 90 days', minOrders: 0 },
  { tier: 'Standard', rate: 12, desc: 'Established partners', minOrders: 500 },
  { tier: 'Premium', rate: 15, desc: 'Top-rated, high-volume partners', minOrders: 2000 },
]

export const PROMO_RATE_PER_DAY_PER_100 = 8 // ₹ per day gives ~100 extra impressions (mocked)

// Contextual push-style nudges, keyed by occasion — used for the in-app notification demo
export const NUDGES = {
  default: { title: "It's 11 PM ⏰", body: 'Your usual late-night order is one tap away.' },
  exam: { title: 'Exams over? 🎉', body: 'Treat yourself — 20% off combos this week.' },
  nightshift: { title: 'Long shift ahead? 🛵', body: 'Order now, TiffinX delivers before your break ends.' },
  freshers: { title: 'New here? 👋', body: 'Your hostel wing ordered 12 combos today — join in!' },
  fest: { title: 'Farewell tonight! 🎊', body: 'Group order combos are 15% off for the next 2 hours.' },
  latenight: { title: "It's late ☕", body: "It's 11 PM — your usual late-night coffee order?" },
}
