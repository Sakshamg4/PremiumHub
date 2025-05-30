import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | PremiumHub'
  }, [])

  return (
    <div className="min-h-screen  flex items-center bg-gradient-to-b from-black to-zinc-900/50">
      <div className="container mx-auto px-4">
        <div 
          className="relative border-[1px] border-zinc-700 rounded-xl p-8 md:p-12 text-center backdrop-blur-sm bg-black/20"
          role="alert"
          aria-labelledby="error-title"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/10 to-teal-500/10 blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="space-y-8">
            {/* Error Code & Icon */}
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-400 text-sm font-medium">
                Error Code
              </span>
              <h1 
                id="error-title"
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text animate-gradient"
              >
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-semibold text-white/90">Page Not Found</h2>
              <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
                We couldn't find the page you're looking for. It might have been moved, deleted, or never existed. 
                Don't worry though, we'll help you find your way back.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
              role="group"
              aria-label="404 page actions"
            >
              <Link 
                to="/" 
                className="group inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Return to homepage"
              >
                <svg 
                  className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                Return Home
              </Link>
              <Button
                variant="outline"
                href="https://wa.me/9029151181"
                className="hover:bg-white/10 shadow-lg hover:shadow-xl"
                aria-label="Contact support via WhatsApp"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound