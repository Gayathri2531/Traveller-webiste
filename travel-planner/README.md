# Travel Planner - Your Perfect Trip Awaits ✈️

A beautiful and interactive travel planning website built with React and TailwindCSS featuring dynamic currency conversion and colorful animated backgrounds!

## 🌟 **NEW FEATURES**

### 🗺️ **Local & International Destinations**
- **Local Indian Destinations**: Goa, Jaipur, Manali, Kerala, Agra
- **International Destinations**: Paris, Tokyo, New York, Dubai, Bali
- Filter by location type: All, Local (India 🇮🇳), or International (✈️)

### 💱 **Multi-Currency Support**
- **Dynamic Currency Conversion**: Switch between USD ($) and INR (₹)
- **Live Exchange Rate**: 1 USD = ₹83
- **Toggle Button**: Easy currency switching on every page
- **All prices automatically convert** based on selected currency

### 🔙 **Easy Navigation**
- **Back Buttons**: Every page has a back button to previous page
- Smooth navigation flow: Login → Planner → Suggestions → Summary

### 🎨 **Beautiful Animated Backgrounds**
- **6 Dynamic Themes** that rotate every 5 seconds:
  - 🏖️ Beach (Blue/Cyan/Teal)
  - 🌲 Forest (Green/Emerald/Lime)
  - 🏙️ City (Purple/Pink/Rose)
  - 🏜️ Desert (Orange/Amber/Yellow)
  - 🏔️ Mountains (Indigo/Blue/Sky)
  - 🏛️ Monuments (Red/Orange/Amber)
- **Floating Elements** and smooth animations
- **Theme Indicator Dots** at bottom to switch manually

### 👥 **Smart Traveler Management**
- Separate counts for **vegetarian** and **non-vegetarian** travelers
- Different accommodation options for each group
- Automatic price calculation for mixed groups

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd travel-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 User Flow

1. **Login** → Enter any email and password (demo mode)
2. **Trip Planner** → 
   - Choose location type (All/Local/International)
   - Select destination
   - Add vegetarian travelers
   - Add non-vegetarian travelers
   - Set budget (in USD)
   - Switch currency to see prices in INR
3. **Suggestions** → 
   - Browse nearby attractions (click to add)
   - View recommended routes
   - Select vegetarian accommodations (if applicable)
   - Select non-vegetarian accommodations (if applicable)
   - Use back button to modify trip details
4. **Summary** → 
   - Review complete trip breakdown
   - See separate accommodation sections
   - Check budget status
   - Print or plan another trip

## 🎨 Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework with custom animations
- **React Router** - Client-side routing
- **Context API** - Currency state management

## 📂 Project Structure

```
travel-planner/
├── src/
│   ├── components/
│   │   ├── CurrencyToggle.jsx     # Currency switcher component
│   │   └── TravelBackground.jsx    # Animated background
│   ├── context/
│   │   └── CurrencyContext.jsx     # Currency conversion logic
│   ├── data/
│   │   └── destinations.json       # 10 destinations (5 local + 5 intl)
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── TripPlanner.jsx         # With location filter
│   │   ├── TripSuggestions.jsx     # Dual accommodations
│   │   └── TripSummary.jsx         # Complete breakdown
│   ├── App.jsx                     # Main app with background
│   ├── main.jsx
│   └── index.css                   # Custom animations
├── public/
└── package.json
```

## 🌍 Available Destinations

### 🇮🇳 Local (India)
- **Goa** - Beaches, forts, churches (₹300/person base)
- **Jaipur** - Pink City, forts, palaces (₹250/person base)
- **Manali** - Mountains, adventure sports (₹280/person base)
- **Kerala** - Backwaters, houseboats, tea gardens (₹320/person base)
- **Agra** - Taj Mahal, Mughal heritage (₹220/person base)

### ✈️ International
- **Paris, France** - Eiffel Tower, Louvre ($1500/person base)
- **Tokyo, Japan** - Temples, skyscrapers ($2000/person base)
- **New York, USA** - Statue of Liberty, Central Park ($1800/person base)
- **Dubai, UAE** - Burj Khalifa, desert safari (prices not shown)
- **Bali, Indonesia** - Beaches, temples (prices not shown)

## 💱 Currency Features

### Exchange Rate
- **Fixed Rate**: 1 USD = ₹83
- **Bidirectional Conversion**: USD ↔ INR

### Price Display
- Budget slider in USD, shows INR equivalent
- All destinations show prices in selected currency
- Attractions automatically convert
- Accommodations show per-night and total in current currency
- Final summary with complete breakdown

### Currency Toggle Component
- Located on all pages (except login)
- Visual indicator showing active currency
- One-click switching
- Shows exchange rate

## 🎯 Key Features

### Location Selection
- **3 Filter Buttons**: All Destinations, Local (India), International
- Dynamic destination list based on selection
- Visual indicators with emojis

### Traveler Management
- Separate inputs for vegetarian and non-vegetarian counts
- Real-time total calculation
- Accommodation filtering based on preferences

### Accommodation System
- **Dual Selection**: Choose different hotels for veg/non-veg groups
- Color-coded sections (green for veg, red for non-veg)
- Separate pricing calculations
- Amenities display

### Background System
- **Auto-Rotate**: Changes every 5 seconds
- **Manual Control**: Click dots to switch themes
- **Smooth Transitions**: 2-second fade effect
- **Floating Elements**: Subtle animations
- **Pattern Overlay**: Travel emojis background

## 🎨 UI Highlights

- **Dynamic Gradients**: 6 rotating color schemes
- **Glassmorphism**: Frosted glass effects on cards
- **Smooth Animations**: Transitions and hover effects
- **Responsive Design**: Works on all screen sizes
- **Icon Integration**: Beautiful SVG icons
- **Color-Coded Sections**: Easy visual distinction
- **Interactive Elements**: Hover states and click feedback

## 📊 Price Calculation

```
Grand Total = Base Package + (Attractions × Total People) + Veg Accommodation + Non-Veg Accommodation

Where:
- Base Package = destination.baseCost × totalPeople
- Attractions = sum(selected places) × totalPeople
- Veg Accommodation = hotel.pricePerNight × 3 nights × vegetarianCount
- Non-Veg Accommodation = hotel.pricePerNight × 3 nights × nonVegetarianCount
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎪 Demo Credentials

**Login**: Any email and password will work (demo mode)

Example:
- Email: `traveler@example.com`
- Password: `password123`

## 📝 Example Usage

### Plan a Mixed Group Trip to Goa

1. Login with any credentials
2. Select **"Local (India)"** 
3. Choose **"Goa"**
4. Add **2 Vegetarian** travelers
5. Add **3 Non-Vegetarian** travelers
6. Set budget: **$500** (see ₹41,500 in INR)
7. **Switch to INR** to see all prices in Rupees
8. Select attractions: Baga Beach, Fort Aguada
9. Choose veg hotel: Sattvic Goa Retreat
10. Choose non-veg hotel: Beach Paradise Hotel
11. View complete summary with separate accommodation sections

## 🌈 Background Themes

1. **Beach** 🏖️ - Blue/Cyan/Teal gradients
2. **Forest** 🌲 - Green/Emerald/Lime gradients
3. **City** 🏙️ - Purple/Pink/Rose gradients
4. **Desert** 🏜️ - Orange/Amber/Yellow gradients
5. **Mountains** 🏔️ - Indigo/Blue/Sky gradients
6. **Monuments** 🏛️ - Red/Orange/Amber gradients

## 🚀 Production Ready

- Optimized bundle size
- Fast page loads
- Responsive on all devices
- Clean, maintainable code
- Accessible UI elements

## 📄 License

This project is open source and available for educational purposes.

## ✨ Enjoy Planning Your Perfect Trip!

**Built with ❤️ using React, TailwindCSS, and modern web technologies**
