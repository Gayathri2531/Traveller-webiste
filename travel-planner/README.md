# Travel Planner - Your Perfect Trip Awaits ✈️

A beautiful and interactive travel planning website built with React and TailwindCSS. Plan your dream vacation with ease!

## 🌟 Features

- **User Authentication**: Secure login page to access the trip planner
- **Trip Planning Form**: 
  - Select from 5+ popular destinations worldwide
  - Choose number of travelers
  - Set your budget with an interactive slider
  - Select food preferences (Vegetarian/Non-Vegetarian)
  
- **Smart Suggestions**:
  - Browse and select nearby famous attractions
  - View recommended travel routes
  - Choose from curated accommodation options based on food preference
  
- **Final Trip Summary**:
  - Complete breakdown of selected destination and attractions
  - Detailed price calculation
  - Recommended routes
  - Accommodation details
  - Budget tracking (within/over budget alerts)

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

1. **Login** → Enter any email and password to access the app
2. **Trip Planner** → Fill out the trip planning form with your preferences
3. **Suggestions** → Browse and select:
   - Nearby attractions to visit
   - Travel routes
   - Accommodation based on your food preference
4. **Summary** → Review your complete trip plan with detailed pricing

## 🎨 Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 📂 Project Structure

```
travel-planner/
├── src/
│   ├── components/      # Reusable components
│   ├── data/           # JSON data for destinations
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── TripPlanner.jsx
│   │   ├── TripSuggestions.jsx
│   │   └── TripSummary.jsx
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## 🌍 Available Destinations

- Paris, France
- Tokyo, Japan
- New York, USA
- Dubai, UAE
- Bali, Indonesia

Each destination includes:
- 4+ nearby attractions
- 2+ suggested travel routes
- Multiple accommodation options (vegetarian and non-vegetarian)

## 🎯 Features Breakdown

### Login Page
- Clean and modern UI
- Demo credentials (any email/password works)
- Feature highlights

### Trip Planner
- Destination dropdown with pricing
- Number of travelers selector
- Budget slider (visual and numeric input)
- Food preference selection with beautiful cards

### Trip Suggestions
- Tabbed interface for easy navigation
- Clickable cards for nearby places
- Route visualizations
- Accommodation options filtered by food preference
- Real-time price calculation

### Trip Summary
- Complete trip overview
- Detailed price breakdown
- Budget comparison
- Print functionality
- Option to plan another trip

## 🎨 UI Highlights

- Gradient backgrounds and cards
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Beautiful color schemes
- Interactive elements with visual feedback
- Icon integration for better UX

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and make your own improvements!

## ✨ Enjoy Planning Your Perfect Trip!
