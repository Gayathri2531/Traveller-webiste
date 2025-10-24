import React from 'react'
import { useCurrency } from '../context/CurrencyContext'

function CurrencyToggle() {
  const { currency, toggleCurrency, exchangeRate } = useCurrency()

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleCurrency}
        className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 transition duration-200 shadow-md hover:shadow-lg"
      >
        <div className="flex items-center gap-2">
          <span className={`font-bold ${currency === 'USD' ? 'text-green-600' : 'text-gray-400'}`}>
            $ USD
          </span>
          <div className="relative inline-block w-12 h-6">
            <div className={`absolute inset-0 rounded-full transition-colors duration-200 ${
              currency === 'INR' ? 'bg-orange-500' : 'bg-green-500'
            }`}></div>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
              currency === 'INR' ? 'translate-x-7' : 'translate-x-1'
            }`}></div>
          </div>
          <span className={`font-bold ${currency === 'INR' ? 'text-orange-600' : 'text-gray-400'}`}>
            ₹ INR
          </span>
        </div>
      </button>
      <div className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200">
        1 USD = ₹{exchangeRate}
      </div>
    </div>
  )
}

export default CurrencyToggle
