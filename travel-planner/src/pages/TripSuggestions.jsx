import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TripSuggestions({ 
  tripData, 
  selectedNearbyPlaces, 
  setSelectedNearbyPlaces,
  selectedAccommodation,
  setSelectedAccommodation
}) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('places')

  if (!tripData) {
    return null
  }

  const { destination, numberOfPeople, budget, totalPrice, foodPreference } = tripData

  const toggleNearbyPlace = (place) => {
    setSelectedNearbyPlaces(prev => {
      const exists = prev.find(p => p.id === place.id)
      if (exists) {
        return prev.filter(p => p.id !== place.id)
      } else {
        return [...prev, place]
      }
    })
  }

  const selectAccommodation = (accommodation) => {
    setSelectedAccommodation(accommodation)
  }

  const handleContinue = () => {
    navigate('/summary')
  }

  const isPlaceSelected = (placeId) => {
    return selectedNearbyPlaces.some(p => p.id === placeId)
  }

  const accommodations = foodPreference === 'vegetarian' 
    ? destination.accommodations.vegetarian 
    : destination.accommodations.nonVegetarian

  const totalNearbyPlacesCost = selectedNearbyPlaces.reduce((sum, place) => sum + place.cost, 0)
  const estimatedTotalCost = totalPrice + (totalNearbyPlacesCost * numberOfPeople) + 
    (selectedAccommodation ? selectedAccommodation.pricePerNight * 3 * numberOfPeople : 0)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Your Trip to {destination.name}</h1>
          <p className="text-xl text-gray-600">Customize your perfect experience</p>
        </div>

        {/* Trip Summary Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <div className="text-sm opacity-90">Destination</div>
              <div className="text-lg font-bold">{destination.name}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-sm opacity-90">Travelers</div>
              <div className="text-lg font-bold">{numberOfPeople} {numberOfPeople === 1 ? 'Person' : 'People'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-sm opacity-90">Your Budget</div>
              <div className="text-lg font-bold">${budget.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💵</div>
              <div className="text-sm opacity-90">Estimated Cost</div>
              <div className="text-lg font-bold">${estimatedTotalCost.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveTab('places')}
              className={`py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                activeTab === 'places' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🗺️ Nearby Places
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                activeTab === 'routes' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🛣️ Routes
            </button>
            <button
              onClick={() => setActiveTab('accommodation')}
              className={`py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                activeTab === 'accommodation' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏨 Accommodation
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-8">
          {/* Nearby Places Tab */}
          {activeTab === 'places' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Explore Nearby Attractions</h2>
                <p className="text-gray-600">Select the places you'd like to visit (click to add/remove)</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.nearbyPlaces.map(place => (
                  <div
                    key={place.id}
                    onClick={() => toggleNearbyPlace(place)}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105 ${
                      isPlaceSelected(place.id) ? 'ring-4 ring-green-500' : ''
                    }`}
                  >
                    <div className={`h-2 ${isPlaceSelected(place.id) ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{place.name}</h3>
                        {isPlaceSelected(place.id) && (
                          <div className="bg-green-500 text-white rounded-full p-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{place.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-indigo-600">${place.cost}</span>
                        <span className="text-sm text-gray-500">per person</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedNearbyPlaces.length > 0 && (
                <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-green-800 font-semibold">
                    ✓ {selectedNearbyPlaces.length} place{selectedNearbyPlaces.length !== 1 ? 's' : ''} selected 
                    (Additional cost: ${totalNearbyPlacesCost * numberOfPeople})
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Suggested Travel Routes</h2>
                <p className="text-gray-600">Recommended paths to explore your destination</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {destination.routes.map(route => (
                  <div key={route.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-4">
                      <h3 className="text-2xl font-bold text-white">{route.name}</h3>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 mb-2">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{route.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          <span className="font-medium">{route.type}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-700 leading-relaxed">
                          {route.path}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accommodation Tab */}
          {activeTab === 'accommodation' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {foodPreference === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'} Accommodation Options
                </h2>
                <p className="text-gray-600">Choose your perfect place to stay</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {accommodations.map(acc => (
                  <div
                    key={acc.id}
                    onClick={() => selectAccommodation(acc)}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105 ${
                      selectedAccommodation?.id === acc.id ? 'ring-4 ring-indigo-500' : ''
                    }`}
                  >
                    <div className={`h-3 ${selectedAccommodation?.id === acc.id ? 'bg-indigo-500' : 'bg-gradient-to-r from-teal-500 to-blue-500'}`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{acc.name}</h3>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">⭐</span>
                            <span className="font-semibold text-gray-700">{acc.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
                          </div>
                        </div>
                        {selectedAccommodation?.id === acc.id && (
                          <div className="bg-indigo-500 text-white rounded-full p-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-indigo-600 mb-1">
                          ${acc.pricePerNight}
                          <span className="text-sm text-gray-500 font-normal"> / night</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Total for 3 nights: ${acc.pricePerNight * 3 * numberOfPeople}
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {acc.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedAccommodation && (
                <div className="mt-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                  <p className="text-indigo-800 font-semibold">
                    ✓ {selectedAccommodation.name} selected 
                    (${selectedAccommodation.pricePerNight * 3 * numberOfPeople} for 3 nights)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Ready to finalize your trip?</h3>
              <p className="text-gray-600">
                {selectedNearbyPlaces.length} attraction{selectedNearbyPlaces.length !== 1 ? 's' : ''} selected
                {selectedAccommodation && ` • Accommodation: ${selectedAccommodation.name}`}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition duration-200 shadow-lg flex items-center"
            >
              <span>View Trip Summary</span>
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripSuggestions
