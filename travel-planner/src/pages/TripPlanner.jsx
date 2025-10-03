import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import destinationsData from '../data/destinations.json'

function TripPlanner({ setTripData }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    destination: '',
    numberOfPeople: 1,
    budget: 1000,
    foodPreference: 'vegetarian'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Find selected destination
    const selectedDestination = destinationsData.destinations.find(
      dest => dest.id === parseInt(formData.destination)
    )

    if (!selectedDestination) {
      alert('Please select a destination')
      return
    }

    // Calculate trip price
    const basePrice = selectedDestination.baseCost * formData.numberOfPeople
    const budgetMultiplier = formData.budget / 1000 // Scale based on budget
    const totalPrice = Math.round(basePrice * budgetMultiplier)

    // Prepare trip data
    const tripInfo = {
      destination: selectedDestination,
      numberOfPeople: formData.numberOfPeople,
      budget: formData.budget,
      totalPrice: totalPrice,
      foodPreference: formData.foodPreference
    }

    setTripData(tripInfo)
    navigate('/suggestions')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfPeople' || name === 'budget' ? parseInt(value) : value
    }))
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Plan Your Dream Trip</h1>
          <p className="text-lg text-gray-600">Tell us about your travel preferences</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Trip Details
            </h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Destination Selection */}
            <div>
              <label htmlFor="destination" className="block text-lg font-semibold text-gray-800 mb-3">
                Where do you want to go?
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                required
              >
                <option value="">Select your destination</option>
                {destinationsData.destinations.map(dest => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} - Starting from ${dest.baseCost}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of People */}
            <div>
              <label htmlFor="numberOfPeople" className="block text-lg font-semibold text-gray-800 mb-3">
                Number of Travelers
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  min="1"
                  max="20"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Selected: {formData.numberOfPeople} {formData.numberOfPeople === 1 ? 'person' : 'people'}</p>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-lg font-semibold text-gray-800 mb-3">
                Your Budget (USD)
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-xl font-bold text-gray-600">$</span>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  min="500"
                  max="50000"
                  step="100"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$500</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Food Preference
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition duration-200 ${
                  formData.foodPreference === 'vegetarian' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-green-300'
                }`}>
                  <input
                    type="radio"
                    name="foodPreference"
                    value="vegetarian"
                    checked={formData.foodPreference === 'vegetarian'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-3xl mb-2">🥗</div>
                    <span className="font-medium text-gray-800">Vegetarian</span>
                  </div>
                  {formData.foodPreference === 'vegetarian' && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                <label className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition duration-200 ${
                  formData.foodPreference === 'nonVegetarian' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-red-300'
                }`}>
                  <input
                    type="radio"
                    name="foodPreference"
                    value="nonVegetarian"
                    checked={formData.foodPreference === 'nonVegetarian'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-3xl mb-2">🍖</div>
                    <span className="font-medium text-gray-800">Non-Vegetarian</span>
                  </div>
                  {formData.foodPreference === 'nonVegetarian' && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-xl flex items-center justify-center"
            >
              <span>Find My Perfect Trip</span>
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-200">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">5+ Destinations</h3>
            <p className="text-sm text-gray-600">Popular travel spots worldwide</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-200">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Budget Friendly</h3>
            <p className="text-sm text-gray-600">Plans for every budget range</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-200">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Personalized</h3>
            <p className="text-sm text-gray-600">Customized to your preferences</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripPlanner
