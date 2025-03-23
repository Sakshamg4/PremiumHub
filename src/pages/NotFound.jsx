import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen py-16 md:py-24 flex items-center">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12 text-center">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-blue-500">404</h1>
            <h2 className="text-2xl md:text-4xl font-semibold">Page Not Found</h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="pt-8">
              <Link 
                to="/" 
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound