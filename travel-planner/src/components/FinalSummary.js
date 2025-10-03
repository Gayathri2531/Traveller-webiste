import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/travelData';

const FinalSummary = () => {
  const [finalTripData, setFinalTripData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFinalTripData = localStorage.getItem('finalTripData');
    if (!storedFinalTripData) {
      navigate('/trip-planner');
      return;
    }

    const parsedData = JSON.parse(storedFinalTripData);
    setFinalTripData(parsedData);
  }, [navigate]);

  const handleStartNewTrip = () => {
    localStorage.removeItem('tripData');
    localStorage.removeItem('finalTripData');
    navigate('/trip-planner');
  };

  const handlePrintSummary = () => {
    window.print();
  };

  if (!finalTripData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your trip summary...</p>
        </div>
      </div>
    );
  }

  const destinationRoutes = routes[finalTripData.destination.id] || [];
  const nearbyPlacesCost = finalTripData.nearbyPlaces.reduce((sum, place) => sum + place.cost, 0);
  const accommodationCost = finalTripData.accommodation.pricePerNight * finalTripData.nights * parseInt(finalTripData.numberOfPeople);
  const baseCost = finalTripData.destination.baseCost * parseInt(finalTripData.numberOfPeople);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm print:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              ✈️ TravelPlanner
            </h1>
            <div className="flex space-x-4 print:hidden">
              <button
                onClick={handlePrintSummary}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                onClick={() => navigate('/suggestions')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Suggestions
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Trip is Ready! 🎉
          </h2>
          <p className="text-lg text-gray-600">
            Here's your complete travel itinerary
          </p>
        </div>

        {/* Trip Overview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {finalTripData.destination.name}
            </h3>
            <p className="text-gray-600">
              {new Date(finalTripData.startDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} - {new Date(finalTripData.endDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {finalTripData.numberOfPeople}
              </div>
              <div className="text-sm text-gray-600">
                {finalTripData.numberOfPeople === 1 ? 'Traveler' : 'Travelers'}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {finalTripData.nights}
              </div>
              <div className="text-sm text-gray-600">
                {finalTripData.nights === 1 ? 'Night' : 'Nights'}
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${finalTripData.totalPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Destination & Nearby Places */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Destinations
            </h3>
            
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Main Destination</h4>
              <p className="text-gray-700">{finalTripData.destination.name}</p>
              <p className="text-sm text-blue-600 font-medium">
                ${baseCost.toLocaleString()} for {finalTripData.numberOfPeople} {finalTripData.numberOfPeople === 1 ? 'person' : 'people'}
              </p>
            </div>

            {finalTripData.nearbyPlaces.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Additional Attractions</h4>
                <div className="space-y-2">
                  {finalTripData.nearbyPlaces.map((place) => (
                    <div key={place.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{place.name}</p>
                        <p className="text-sm text-gray-600">{place.distance} away</p>
                      </div>
                      <p className="font-medium text-blue-600">${place.cost}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Attractions Total:</span>
                    <span className="font-semibold text-blue-600">${nearbyPlacesCost}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accommodation */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Accommodation
            </h3>
            
            <div className="mb-4">
              <img
                src={finalTripData.accommodation.image}
                alt={finalTripData.accommodation.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-gray-900">{finalTripData.accommodation.name}</h4>
              <p className="text-gray-600 mb-2">{finalTripData.accommodation.type}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(finalTripData.accommodation.rating) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{finalTripData.accommodation.rating}</span>
              </div>

              <div className="space-y-1 mb-3">
                {finalTripData.accommodation.features.map((feature, index) => (
                  <p key={index} className="text-sm text-gray-600">• {feature}</p>
                ))}
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Rate per night:</span>
                  <span className="font-medium">${finalTripData.accommodation.pricePerNight}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    {finalTripData.nights} nights × {finalTripData.numberOfPeople} {finalTripData.numberOfPeople === 1 ? 'person' : 'people'}:
                  </span>
                  <span className="font-semibold text-green-600">${accommodationCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Routes */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Suggested Travel Routes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinationRoutes.map((route, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{route.mode}</h4>
                  <span className="text-purple-600 font-medium">${route.cost}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{route.duration}</p>
                <p className="text-sm text-gray-700">{route.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Cost Breakdown
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Base destination cost ({finalTripData.numberOfPeople} {finalTripData.numberOfPeople === 1 ? 'person' : 'people'})</span>
              <span className="font-medium">${baseCost.toLocaleString()}</span>
            </div>
            
            {nearbyPlacesCost > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Additional attractions</span>
                <span className="font-medium">${nearbyPlacesCost.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">
                Accommodation ({finalTripData.nights} nights × {finalTripData.numberOfPeople} {finalTripData.numberOfPeople === 1 ? 'person' : 'people'})
              </span>
              <span className="font-medium">${accommodationCost.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total Trip Cost</span>
              <span className="text-2xl font-bold text-green-600">${finalTripData.totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Original budget: ${parseInt(finalTripData.budget).toLocaleString()} • 
              {finalTripData.totalPrice <= parseInt(finalTripData.budget) ? (
                <span className="text-green-600 ml-1">Within budget! 🎉</span>
              ) : (
                <span className="text-red-600 ml-1">Over budget by ${(finalTripData.totalPrice - parseInt(finalTripData.budget)).toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
          <button
            onClick={handleStartNewTrip}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Plan Another Trip
          </button>
          <button
            onClick={handlePrintSummary}
            className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Print Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalSummary;