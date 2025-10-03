# 🚀 Quick Start Guide

## Running the Application

The development server is already running! 

**Access the application at:** `http://localhost:5173`

## 📋 How to Use

### 1. Login Page
- Enter any email address (e.g., `user@example.com`)
- Enter any password (e.g., `password123`)
- Click "Sign In"

### 2. Trip Planner
- **Select Destination**: Choose from Paris, Tokyo, New York, Dubai, or Bali
- **Number of Travelers**: Use the number input (1-20 people)
- **Budget**: Use the slider or type directly ($500 - $10,000+)
- **Food Preference**: Click on Vegetarian 🥗 or Non-Vegetarian 🍖
- Click "Find My Perfect Trip"

### 3. Trip Suggestions
Use the tabs to navigate:
- **Nearby Places**: Click on attractions to add/remove them from your trip
- **Routes**: View suggested travel routes for your destination
- **Accommodation**: Select your preferred hotel based on food preference

Click "View Trip Summary" when ready

### 4. Trip Summary
- Review your complete trip plan
- See detailed price breakdown
- Check if you're within budget
- Print your trip plan or start planning a new trip

## 🎯 Tips

- The app calculates prices based on the number of travelers
- You can select multiple attractions
- Budget warnings appear if your trip exceeds your budget
- All data is stored in your session (refresh will reset)

## 🛑 Stopping the Server

To stop the development server:
```bash
# Press Ctrl+C in the terminal running the dev server
```

## 🔄 Restarting the Server

```bash
cd /workspace/travel-planner
npm run dev
```

## 📦 Building for Production

```bash
npm run build
npm run preview
```

Enjoy planning your perfect trip! ✈️🌍
