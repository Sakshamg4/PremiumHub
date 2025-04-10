import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'

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
    <header className="py-1 backdrop-blur-2xl fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-zinc-100 hover:text-blue-600 transition-colors"
          >
            Premium
            <span className='text-blue-600 transition-colors '>Hub</span>
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
            <div className='flex items-center space-x-4'>
              <Button 
                variant="primary" 
                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
              >
                Join Group
              </Button>
              <Button 
                variant="secondary" 
                href="https://wa.me/9029151181"
              >
                Chat
              </Button>
            </div>
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
              
              {/* Add buttons to mobile menu */}
              <div className="px-4 mt-6 space-y-3">
                <Button 
                  variant="primary" 
                  href="https://chat.whatsapp.com/IP0IZVJymid5IQwDq7YtO3"
                  className="w-full justify-center"
                >
                  Join Group
                </Button>
                <Button 
                  variant="secondary" 
                  href="https://wa.me/9029151181"
                  className="w-full justify-center"
                >
                  Chat
                </Button>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-700/50">
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://wa.me/9029151181" 
                  className="text-zinc-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a 
                  href="https://t.me/OfficalBinner" 
                  className="text-zinc-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Telegram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
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