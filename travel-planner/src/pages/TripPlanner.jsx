import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'
import CurrencyToggle from '../components/CurrencyToggle'
import destinationsData from '../data/destinations.json'

function TripPlanner({ setTripData }) {
  const navigate = useNavigate()
  const { convertPrice, formatPrice } = useCurrency()
  const [locationType, setLocationType] = useState('all') // 'all', 'local', 'international'
  const [formData, setFormData] = useState({
    destination: '',
    vegetarianCount: 0,
    nonVegetarianCount: 0,
    budget: 1000
  })

  const filteredDestinations = destinationsData.destinations.filter(dest => {
    if (locationType === 'all') return true
    return dest.type === locationType
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

    // Validate at least one person
    const totalPeople = formData.vegetarianCount + formData.nonVegetarianCount
    if (totalPeople === 0) {
      alert('Please add at least one traveler (vegetarian or non-vegetarian)')
      return
    }

    // Calculate trip price
    const basePrice = selectedDestination.baseCost * totalPeople
    const budgetMultiplier = formData.budget / 1000 // Scale based on budget
    const totalPrice = Math.round(basePrice * budgetMultiplier)

    // Prepare trip data
    const tripInfo = {
      destination: selectedDestination,
      vegetarianCount: formData.vegetarianCount,
      nonVegetarianCount: formData.nonVegetarianCount,
      totalPeople: totalPeople,
      budget: formData.budget,
      totalPrice: totalPrice
    }

    setTripData(tripInfo)
    navigate('/suggestions')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'vegetarianCount' || name === 'nonVegetarianCount' || name === 'budget' ? parseInt(value) : value
    }))
  }

  const totalTravelers = formData.vegetarianCount + formData.nonVegetarianCount

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button and Currency Toggle */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Login</span>
          </button>
          <CurrencyToggle />
        </div>

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
            {/* Location Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Choose Location Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setLocationType('all')}
                  className={`py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                    locationType === 'all'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🌍 All Destinations
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('local')}
                  className={`py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                    locationType === 'local'
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇮🇳 Local (India)
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('international')}
                  className={`py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                    locationType === 'international'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✈️ International
                </button>
              </div>
            </div>

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
                {filteredDestinations.map(dest => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} - Starting from {formatPrice(dest.baseCost)}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                Showing {filteredDestinations.length} {locationType === 'all' ? 'all' : locationType} destination(s)
              </p>
            </div>

            {/* Number of Travelers by Food Preference */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Number of Travelers by Food Preference
              </label>
              
              {/* Vegetarian Count */}
              <div className="mb-4">
                <label htmlFor="vegetarianCount" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="text-2xl mr-2">🥗</span>
                  Vegetarian Travelers
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="vegetarianCount"
                    name="vegetarianCount"
                    min="0"
                    max="20"
                    value={formData.vegetarianCount}
                    onChange={handleChange}
                    className="w-full px-6 py-4 text-lg border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-green-50"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm font-medium text-green-700">people</span>
                  </div>
                </div>
              </div>

              {/* Non-Vegetarian Count */}
              <div className="mb-4">
                <label htmlFor="nonVegetarianCount" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="text-2xl mr-2">🍖</span>
                  Non-Vegetarian Travelers
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="nonVegetarianCount"
                    name="nonVegetarianCount"
                    min="0"
                    max="20"
                    value={formData.nonVegetarianCount}
                    onChange={handleChange}
                    className="w-full px-6 py-4 text-lg border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 bg-red-50"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm font-medium text-red-700">people</span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total Travelers:</span>
                  <span className="text-2xl font-bold text-indigo-600">{totalTravelers}</span>
                </div>
                {totalTravelers > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {formData.vegetarianCount > 0 && (
                      <span className="mr-3">🥗 {formData.vegetarianCount} Veg</span>
                    )}
                    {formData.nonVegetarianCount > 0 && (
                      <span>🍖 {formData.nonVegetarianCount} Non-Veg</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-lg font-semibold text-gray-800 mb-3">
                Your Budget (in USD - will convert to selected currency)
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
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>In your selected currency:</strong> {formatPrice(formData.budget)}
                </p>
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
