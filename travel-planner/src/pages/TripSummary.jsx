import React from 'react'
import { useNavigate } from 'react-router-dom'

function TripSummary({ tripData, selectedNearbyPlaces, selectedAccommodation }) {
  const navigate = useNavigate()

  if (!tripData) {
    return null
  }

  const { destination, numberOfPeople, budget, totalPrice, foodPreference } = tripData

  const totalNearbyPlacesCost = selectedNearbyPlaces.reduce((sum, place) => sum + place.cost, 0)
  const accommodationCost = selectedAccommodation ? selectedAccommodation.pricePerNight * 3 * numberOfPeople : 0
  const grandTotal = totalPrice + (totalNearbyPlacesCost * numberOfPeople) + accommodationCost

  const handleNewTrip = () => {
    navigate('/planner')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Your Trip is Ready! 🎉</h1>
          <p className="text-xl text-gray-600">Here's your complete travel plan</p>
        </div>

        {/* Main Summary Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{destination.name}</h2>
                <p className="text-lg opacity-90">{destination.country}</p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90 mb-1">Total Cost</div>
                <div className="text-4xl font-bold">${grandTotal.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="p-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-3xl mb-3">👥</div>
                <div className="text-sm text-gray-600 mb-1">Number of Travelers</div>
                <div className="text-2xl font-bold text-gray-800">{numberOfPeople}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-3xl mb-3">💰</div>
                <div className="text-sm text-gray-600 mb-1">Your Budget</div>
                <div className="text-2xl font-bold text-gray-800">${budget.toLocaleString()}</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-3xl mb-3">{foodPreference === 'vegetarian' ? '🥗' : '🍖'}</div>
                <div className="text-sm text-gray-600 mb-1">Food Preference</div>
                <div className="text-2xl font-bold text-gray-800 capitalize">{foodPreference}</div>
              </div>
            </div>

            {/* Destination Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </span>
                Main Destination
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{destination.name}</p>
                    <p className="text-gray-600">Base Package</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">${totalPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">for {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Nearby Places */}
            {selectedNearbyPlaces.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-lg p-2 mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </span>
                  Selected Attractions ({selectedNearbyPlaces.length})
                </h3>
                <div className="space-y-3">
                  {selectedNearbyPlaces.map(place => (
                    <div key={place.id} className="bg-green-50 rounded-xl p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{place.name}</p>
                        <p className="text-sm text-gray-600">{place.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-green-600">${place.cost * numberOfPeople}</p>
                        <p className="text-xs text-gray-500">${place.cost} × {numberOfPeople}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-green-100 rounded-xl p-4 flex justify-between items-center font-semibold">
                    <span className="text-gray-800">Attractions Subtotal</span>
                    <span className="text-green-700 text-lg">${totalNearbyPlacesCost * numberOfPeople}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Accommodation */}
            {selectedAccommodation && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-purple-100 text-purple-600 rounded-lg p-2 mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  Accommodation
                </h3>
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xl font-bold text-gray-800 mb-1">{selectedAccommodation.name}</p>
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span className="font-semibold text-gray-700">{selectedAccommodation.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAccommodation.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">${accommodationCost}</p>
                      <p className="text-sm text-gray-600">3 nights × {numberOfPeople}</p>
                      <p className="text-xs text-gray-500">${selectedAccommodation.pricePerNight}/night</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Routes */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-orange-100 text-orange-600 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </span>
                Recommended Routes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {destination.routes.map((route, index) => (
                  <div key={route.id} className="bg-orange-50 rounded-xl p-5">
                    <div className="flex items-start mb-3">
                      <span className="bg-orange-200 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 mb-1">{route.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{route.type} • {route.duration}</p>
                        <p className="text-sm text-gray-700 bg-white rounded-lg p-3">{route.path}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Price Breakdown</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Base Package ({destination.name})</span>
                  <span className="font-semibold">${totalPrice.toLocaleString()}</span>
                </div>
                {selectedNearbyPlaces.length > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Attractions ({selectedNearbyPlaces.length} places)</span>
                    <span className="font-semibold">${(totalNearbyPlacesCost * numberOfPeople).toLocaleString()}</span>
                  </div>
                )}
                {selectedAccommodation && (
                  <div className="flex justify-between text-gray-700">
                    <span>Accommodation (3 nights)</span>
                    <span className="font-semibold">${accommodationCost.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">Grand Total</span>
                <span className="text-4xl font-bold text-indigo-600">${grandTotal.toLocaleString()}</span>
              </div>
              {grandTotal <= budget && (
                <div className="mt-4 bg-green-100 border-2 border-green-300 rounded-xl p-4 flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 font-semibold">
                    Great! Your trip is within budget (${(budget - grandTotal).toLocaleString()} under budget)
                  </span>
                </div>
              )}
              {grandTotal > budget && (
                <div className="mt-4 bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4 flex items-center">
                  <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-yellow-800 font-semibold">
                    Note: Trip exceeds budget by ${(grandTotal - budget).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={handlePrint}
            className="bg-white text-indigo-600 border-2 border-indigo-600 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transform hover:scale-105 transition duration-200 shadow-lg flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Trip Plan
          </button>
          <button
            onClick={handleNewTrip}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Plan Another Trip
          </button>
        </div>

        {/* Thank You Message */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-3">Have a Wonderful Journey! ✈️</h3>
          <p className="text-lg opacity-90">Thank you for using Travel Planner. Safe travels!</p>
        </div>
      </div>
    </div>
  )
}

export default TripSummary
