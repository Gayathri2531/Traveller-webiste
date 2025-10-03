import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinations, nearbyPlaces, routes, accommodations } from '../data/travelData';

const SuggestionsPage = () => {
  const [tripData, setTripData] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedNearbyPlaces, setSelectedNearbyPlaces] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [accommodationType, setAccommodationType] = useState('vegetarian');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTripData = localStorage.getItem('tripData');
    if (!storedTripData) {
      navigate('/trip-planner');
      return;
    }

    const parsedTripData = JSON.parse(storedTripData);
    setTripData(parsedTripData);

    const destination = destinations.find(d => d.id === parseInt(parsedTripData.destination));
    setSelectedDestination(destination);
  }, [navigate]);

  const calculateTripPrice = () => {
    if (!selectedDestination || !tripData) return 0;
    
    const baseCost = selectedDestination.baseCost * parseInt(tripData.numberOfPeople);
    const nearbyPlacesCost = selectedNearbyPlaces.reduce((sum, place) => sum + place.cost, 0);
    const accommodationCost = selectedAccommodation ? 
      selectedAccommodation.pricePerNight * calculateNights() * parseInt(tripData.numberOfPeople) : 0;
    
    return baseCost + nearbyPlacesCost + accommodationCost;
  };

  const calculateNights = () => {
    if (!tripData.startDate || !tripData.endDate) return 0;
    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const toggleNearbyPlace = (place) => {
    setSelectedNearbyPlaces(prev => {
      const isSelected = prev.find(p => p.id === place.id);
      if (isSelected) {
        return prev.filter(p => p.id !== place.id);
      } else {
        return [...prev, place];
      }
    });
  };

  const handleProceedToSummary = () => {
    const finalTripData = {
      ...tripData,
      destination: selectedDestination,
      nearbyPlaces: selectedNearbyPlaces,
      accommodation: selectedAccommodation,
      totalPrice: calculateTripPrice(),
      nights: calculateNights()
    };
    
    localStorage.setItem('finalTripData', JSON.stringify(finalTripData));
    navigate('/summary');
  };

  if (!tripData || !selectedDestination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your trip suggestions...</p>
        </div>
      </div>
    );
  }

  const destinationRoutes = routes[selectedDestination.id] || [];
  const destinationNearbyPlaces = nearbyPlaces[selectedDestination.id] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              ✈️ TravelPlanner
            </h1>
            <button
              onClick={() => navigate('/trip-planner')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Planner
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Trip to {selectedDestination.name}
              </h2>
              <p className="text-gray-600">
                {tripData.numberOfPeople} {tripData.numberOfPeople === 1 ? 'traveler' : 'travelers'} • 
                {calculateNights()} nights • 
                Budget: ${parseInt(tripData.budget).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-sm text-gray-600">Estimated Total Cost</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${calculateTripPrice().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nearby Places */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Nearby Attractions
            </h3>
            <div className="space-y-3">
              {destinationNearbyPlaces.map((place) => {
                const isSelected = selectedNearbyPlaces.find(p => p.id === place.id);
                return (
                  <div
                    key={place.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleNearbyPlace(place)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{place.name}</h4>
                        <p className="text-sm text-gray-600">{place.distance} away</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-600">${place.cost}</p>
                        {isSelected && (
                          <div className="text-blue-500 mt-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Routes */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Travel Routes
            </h3>
            <div className="space-y-4">
              {destinationRoutes.map((route, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{route.mode}</h4>
                    <span className="text-blue-600 font-medium">${route.cost}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{route.duration}</p>
                  <p className="text-sm text-gray-700">{route.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accommodations */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
              Accommodation Options
            </h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setAccommodationType('vegetarian')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  accommodationType === 'vegetarian'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => setAccommodationType('nonVegetarian')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  accommodationType === 'nonVegetarian'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Non-Vegetarian
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accommodations[accommodationType].map((hotel) => {
              const isSelected = selectedAccommodation?.id === hotel.id;
              return (
                <div
                  key={hotel.id}
                  className={`rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAccommodation(hotel)}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                      {isSelected && (
                        <div className="text-blue-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{hotel.type}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'fill-current' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-600 mb-3">
                      ${hotel.pricePerNight}/night
                    </p>
                    <div className="space-y-1">
                      {hotel.features.slice(0, 2).map((feature, index) => (
                        <p key={index} className="text-xs text-gray-600">• {feature}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleProceedToSummary}
            disabled={!selectedAccommodation}
            className={`px-8 py-4 rounded-lg font-medium text-lg transition-colors ${
              selectedAccommodation
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Final Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;