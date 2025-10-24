import React, { useEffect, useState } from 'react'

function TravelBackground() {
  const [activeSlide, setActiveSlide] = useState(0)

  const backgrounds = [
    {
      gradient: 'from-blue-400 via-cyan-300 to-teal-400',
      theme: 'beach',
      emoji: '🏖️'
    },
    {
      gradient: 'from-green-500 via-emerald-400 to-lime-400',
      theme: 'forest',
      emoji: '🌲'
    },
    {
      gradient: 'from-purple-500 via-pink-400 to-rose-400',
      theme: 'city',
      emoji: '🏙️'
    },
    {
      gradient: 'from-orange-400 via-amber-300 to-yellow-400',
      theme: 'desert',
      emoji: '🏜️'
    },
    {
      gradient: 'from-indigo-500 via-blue-400 to-sky-400',
      theme: 'mountains',
      emoji: '🏔️'
    },
    {
      gradient: 'from-red-400 via-orange-300 to-amber-400',
      theme: 'monuments',
      emoji: '🏛️'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgrounds.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient backgrounds */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${bg.gradient} transition-opacity duration-2000 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/4 right-20 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Travel icons pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="grid grid-cols-8 gap-8 p-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="text-4xl text-white flex items-center justify-center">
                {backgrounds[i % backgrounds.length].emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20"></div>
      </div>

      {/* Theme indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {backgrounds.map((bg, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Switch to ${bg.theme} theme`}
          />
        ))}
      </div>
    </div>
  )
}

export default TravelBackground
