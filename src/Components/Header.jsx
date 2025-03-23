import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { href: '#home', label: 'Home' }, // Changed from '/' to '#home'
    { href: '#services', label: 'Services' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
    { href: '#about', label: 'About' }
  ]

  const handleNavClick = (href) => {
    setIsMenuOpen(false)

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

  // Scroll to top when navigating to home
  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname])

  return (
    <header className="py-3 backdrop-blur-2xl fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-zinc-100 hover:text-zinc-600 transition-colors"
          >
            Premium
            <span className='text-teal-500 hover:text-zinc-300 transition-colors '>Hub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-zinc-400 hover:text-blue-600 transition-colors"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-zinc-400 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Modern Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${isMenuOpen ? 'top-3 rotate-45 bg-blue-500' : 'top-2 bg-zinc-400'
                }`} />
              <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-4 bg-zinc-400'
                }`} />
              <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${isMenuOpen ? 'top-3 -rotate-45 bg-blue-500' : 'top-6 bg-zinc-400'
                }`} />
            </div>
          </button>
        </div>

        {/* Modern Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <div className={`absolute right-0 top-0 h-screen w-[75%] max-w-sm bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
              <Link
                to="/"
                className="text-xl font-bold text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium Hub
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-zinc-500/10 cursor-pointer rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="py-4">
              {menuItems.map((item) => (
                <div key={item.href} className="px-4">
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="flex items-center space-x-2 py-3 px-4 text-zinc-400 hover:text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors"
                      onClick={() => handleNavClick(item.href)}
                    >
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center space-x-2 py-3 px-4 text-zinc-400 hover:text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-700/50">
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-zinc-400 hover:text-blue-500 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-400 hover:text-blue-500 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header