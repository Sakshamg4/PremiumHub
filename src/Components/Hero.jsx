import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const typeSequence = [
    'Adobe Creative',
    1500,
    'LinkedIn Premium',
    1500,
    'Canva Pro',
    1500,
    'Preplexity AI',
    1500,
    'You.com AI',
    1500,
  ]

  return (
    <div id="home" className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12 bg-gradient-to-b from-zinc-900 to-black">
          <div className="space-y-8 text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold">
                Premium Hub
              </h2>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col items-center gap-2">
                <span className="text-white">Your One-Stop Destination for</span>
                <div className="h-[1.2em] w-full relative overflow-hidden">
                  <TypeAnimation
                    sequence={typeSequence}
                    wrapper="div"
                    speed={50}
                    repeat={Infinity}
                    className="text-blue-400 absolute left-1/2 -translate-x-1/2 min-w-max"
                    cursor={true}
                    deletionSpeed={50}
                  />
                </div>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
              Unlock unlimited access to top-tier software and business solutions—all in one place, 
              at unbeatable prices.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {['Creative Tools', 'Business Apps', 'AI Solutions', 'Premium Support'].map((feature, index) => (
                <div 
                  key={index} 
                  className="border border-zinc-700 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300"
                >
                  <span className="text-zinc-400">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                variant="primary"
                onClick={() => handleNavClick('#pricing')}
                className="hover:bg-blue-600 transition-colors duration-300"
              >
                Explore Plans
              </Button>
              <Button 
                variant="secondary"
                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                className="hover:bg-zinc-800 transition-colors duration-300"
              >
                Get Started
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm">
                Trusted by 1,000+ professionals worldwide
              </p>
              <p className="flex items-center justify-center gap-2 mt-2">
                <span className="text-yellow-400">⭐️⭐️⭐️⭐️⭐️</span>
                <span className="text-zinc-400">4.9/5 Customer Rating</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero