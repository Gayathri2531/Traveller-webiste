import React, { createContext, useState, useContext } from 'react'

const CurrencyContext = createContext()

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD') // 'USD' or 'INR'
  const exchangeRate = 83 // 1 USD = 83 INR (approximate)

  const convertPrice = (priceInUSD) => {
    if (currency === 'INR') {
      return Math.round(priceInUSD * exchangeRate)
    }
    return priceInUSD
  }

  const formatPrice = (priceInUSD) => {
    const convertedPrice = convertPrice(priceInUSD)
    if (currency === 'INR') {
      return `₹${convertedPrice.toLocaleString('en-IN')}`
    }
    return `$${convertedPrice.toLocaleString()}`
  }

  const getCurrencySymbol = () => {
    return currency === 'INR' ? '₹' : '$'
  }

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD')
  }

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      exchangeRate,
      convertPrice,
      formatPrice,
      getCurrencySymbol,
      toggleCurrency
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}
