import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import TripPlanner from './pages/TripPlanner'
import TripSuggestions from './pages/TripSuggestions'
import TripSummary from './pages/TripSummary'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [tripData, setTripData] = useState(null)
  const [selectedNearbyPlaces, setSelectedNearbyPlaces] = useState([])
  const [selectedVegAccommodation, setSelectedVegAccommodation] = useState(null)
  const [selectedNonVegAccommodation, setSelectedNonVegAccommodation] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/planner" /> : 
              <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/planner" 
            element={
              !isAuthenticated ? 
              <Navigate to="/login" /> : 
              <TripPlanner setTripData={setTripData} />
            } 
          />
          <Route 
            path="/suggestions" 
            element={
              !isAuthenticated || !tripData ? 
              <Navigate to="/planner" /> : 
              <TripSuggestions 
                tripData={tripData} 
                selectedNearbyPlaces={selectedNearbyPlaces}
                setSelectedNearbyPlaces={setSelectedNearbyPlaces}
                selectedVegAccommodation={selectedVegAccommodation}
                setSelectedVegAccommodation={setSelectedVegAccommodation}
                selectedNonVegAccommodation={selectedNonVegAccommodation}
                setSelectedNonVegAccommodation={setSelectedNonVegAccommodation}
              />
            } 
          />
          <Route 
            path="/summary" 
            element={
              !isAuthenticated || !tripData ? 
              <Navigate to="/planner" /> : 
              <TripSummary 
                tripData={tripData}
                selectedNearbyPlaces={selectedNearbyPlaces}
                selectedVegAccommodation={selectedVegAccommodation}
                selectedNonVegAccommodation={selectedNonVegAccommodation}
              />
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
