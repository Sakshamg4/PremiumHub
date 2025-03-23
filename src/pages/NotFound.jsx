import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen py-16 md:py-24 flex items-center">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12 text-center">
          <div className="space-y-8">
            {/* Error Code & Icon */}
            <div className="space-y-4">
              <span role="img" aria-label="error" className="text-6xl">
                🤔
              </span>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-semibold">Page Not Found</h2>
              <p className="text-zinc-400 max-w-md mx-auto">
                Sorry, the page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link 
                to="/" 
                className="inline-flex items-center px-8 py-3 bg-black text-white border-[1px] border-zinc-700 rounded-lg hover:bg-zinc-800 transition-all duration-300"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
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
                variant="secondary"
                href="https://wa.me/9029151181"
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