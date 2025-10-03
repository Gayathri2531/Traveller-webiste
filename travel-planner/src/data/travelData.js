export const destinations = [
  {
    id: 1,
    name: "Paris, France",
    country: "France",
    baseCost: 1200,
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    country: "Japan",
    baseCost: 1500,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    name: "New York, USA",
    country: "USA",
    baseCost: 1000,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop"
  },
  {
    id: 4,
    name: "London, UK",
    country: "UK",
    baseCost: 1100,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Rome, Italy",
    country: "Italy",
    baseCost: 900,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Dubai, UAE",
    country: "UAE",
    baseCost: 1300,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop"
  }
];

export const nearbyPlaces = {
  1: [ // Paris
    { id: 1, name: "Versailles Palace", distance: "20 km", cost: 50, selected: false },
    { id: 2, name: "Disneyland Paris", distance: "32 km", cost: 80, selected: false },
    { id: 3, name: "Château de Fontainebleau", distance: "55 km", cost: 40, selected: false },
    { id: 4, name: "Giverny (Monet's Garden)", distance: "75 km", cost: 35, selected: false }
  ],
  2: [ // Tokyo
    { id: 5, name: "Mount Fuji", distance: "100 km", cost: 120, selected: false },
    { id: 6, name: "Nikko", distance: "125 km", cost: 90, selected: false },
    { id: 7, name: "Kamakura", distance: "50 km", cost: 60, selected: false },
    { id: 8, name: "Hakone", distance: "85 km", cost: 100, selected: false }
  ],
  3: [ // New York
    { id: 9, name: "Statue of Liberty", distance: "8 km", cost: 30, selected: false },
    { id: 10, name: "Niagara Falls", distance: "400 km", cost: 150, selected: false },
    { id: 11, name: "Atlantic City", distance: "185 km", cost: 80, selected: false },
    { id: 12, name: "Philadelphia", distance: "150 km", cost: 70, selected: false }
  ],
  4: [ // London
    { id: 13, name: "Windsor Castle", distance: "35 km", cost: 45, selected: false },
    { id: 14, name: "Stonehenge", distance: "140 km", cost: 65, selected: false },
    { id: 15, name: "Canterbury", distance: "100 km", cost: 55, selected: false },
    { id: 16, name: "Brighton", distance: "85 km", cost: 50, selected: false }
  ],
  5: [ // Rome
    { id: 17, name: "Vatican City", distance: "5 km", cost: 25, selected: false },
    { id: 18, name: "Tivoli Gardens", distance: "30 km", cost: 40, selected: false },
    { id: 19, name: "Pompeii", distance: "240 km", cost: 85, selected: false },
    { id: 20, name: "Florence", distance: "270 km", cost: 120, selected: false }
  ],
  6: [ // Dubai
    { id: 21, name: "Abu Dhabi", distance: "140 km", cost: 75, selected: false },
    { id: 22, name: "Sharjah", distance: "25 km", cost: 30, selected: false },
    { id: 23, name: "Al Ain", distance: "160 km", cost: 60, selected: false },
    { id: 24, name: "Fujairah", distance: "120 km", cost: 55, selected: false }
  ]
};

export const routes = {
  1: [ // Paris
    { mode: "Flight", duration: "8-12 hours", cost: 600, description: "Direct flights available from major cities" },
    { mode: "Train", duration: "3-6 hours", cost: 200, description: "Eurostar from London, TGV from other European cities" },
    { mode: "Car", duration: "6-10 hours", cost: 150, description: "Scenic drive through European countryside" }
  ],
  2: [ // Tokyo
    { mode: "Flight", duration: "10-14 hours", cost: 800, description: "Direct flights to Narita or Haneda airports" },
    { mode: "Train", duration: "7 days", cost: 400, description: "Trans-Siberian Railway (adventure route)" }
  ],
  3: [ // New York
    { mode: "Flight", duration: "6-8 hours", cost: 500, description: "Direct flights to JFK, LaGuardia, or Newark" },
    { mode: "Train", duration: "8-12 hours", cost: 150, description: "Amtrak from major US cities" },
    { mode: "Car", duration: "8-15 hours", cost: 200, description: "Interstate highway system" }
  ],
  4: [ // London
    { mode: "Flight", duration: "1-8 hours", cost: 300, description: "Direct flights to Heathrow, Gatwick, or Stansted" },
    { mode: "Train", duration: "2-4 hours", cost: 180, description: "Eurostar from Paris, trains from other UK cities" },
    { mode: "Ferry", duration: "6-8 hours", cost: 100, description: "Ferry from France, Netherlands, or Ireland" }
  ],
  5: [ // Rome
    { mode: "Flight", duration: "2-10 hours", cost: 400, description: "Direct flights to Fiumicino or Ciampino" },
    { mode: "Train", duration: "4-8 hours", cost: 120, description: "High-speed trains from major European cities" },
    { mode: "Car", duration: "6-12 hours", cost: 180, description: "Drive through beautiful Italian countryside" }
  ],
  6: [ // Dubai
    { mode: "Flight", duration: "3-8 hours", cost: 700, description: "Direct flights to Dubai International" },
    { mode: "Car", duration: "12-20 hours", cost: 300, description: "Road trip through Middle East (visa required)" }
  ]
};

export const accommodations = {
  vegetarian: [
    {
      id: 1,
      name: "Green Garden Hotel",
      type: "Eco-Friendly Hotel",
      pricePerNight: 120,
      rating: 4.5,
      features: ["100% Vegetarian Restaurant", "Organic Garden", "Yoga Classes", "Spa"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Zen Retreat Resort",
      type: "Wellness Resort",
      pricePerNight: 180,
      rating: 4.8,
      features: ["Meditation Center", "Vegan Cuisine", "Ayurvedic Treatments", "Nature Walks"],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Pure Bliss Boutique",
      type: "Boutique Hotel",
      pricePerNight: 95,
      rating: 4.3,
      features: ["Vegetarian Fine Dining", "Rooftop Garden", "Cooking Classes", "Library"],
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=250&fit=crop"
    }
  ],
  nonVegetarian: [
    {
      id: 4,
      name: "Grand Luxury Palace",
      type: "5-Star Hotel",
      pricePerNight: 250,
      rating: 4.9,
      features: ["Michelin Star Restaurant", "Concierge Service", "Spa & Wellness", "Business Center"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      name: "Coastal Bay Resort",
      type: "Beach Resort",
      pricePerNight: 200,
      rating: 4.6,
      features: ["Seafood Restaurant", "Private Beach", "Water Sports", "Kids Club"],
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      name: "Urban Chic Hotel",
      type: "Modern Hotel",
      pricePerNight: 150,
      rating: 4.4,
      features: ["Rooftop Bar", "International Cuisine", "Fitness Center", "City Views"],
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop"
    }
  ]
};