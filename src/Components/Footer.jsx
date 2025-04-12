import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()

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

  const services = [
    { label: 'Creative Tools', href: '#services' },
    { label: 'AI Solutions', href: '#services' },
    { label: 'Business Tools', href: '#services' },
    { label: 'Professional Growth', href: '#services' }
  ]

  const support = [
    { label: 'Help Center', href: '#contact' },
    { label: 'Contact Sales', href: '#contact' },
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'officallinkedinseller@gmail.com', href: null }
  ]

  const legal = [
    { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
    { label: 'Terms of Service', href: '/terms-and-conditions', isRoute: true },
    { label: 'About Us', href: '#about' }
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/9029151181',
      icon: (
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      )
    },
    {
      name: 'Telegram',
      href: 'https://t.me/OfficalBinner',
      icon: (
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      )
    }
  ]

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-black to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Company Info - Enhanced */}
          <div className="space-y-6">
            <Link to="/" className="inline-block text-2xl font-bold text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-105">
              Premium<span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Hub</span>
            </Link>
            <p className="text-white/70 leading-relaxed">
              Your gateway to premium software and professional tools. Access everything you need to grow your business.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/60 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services - Enhanced */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-white/70 hover:text-blue-400 transition-all duration-300 flex items-center group"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(service.href)
                    }}
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {service.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - Enhanced */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
              Support
            </h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-blue-400 transition-all duration-300 flex items-center group"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {item.label}
                      </span>
                    </a>
                  ) : (
                    <span className="text-white/70">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Enhanced */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.label}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className="text-white/70 hover:text-blue-400 transition-all duration-300 flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-blue-400 transition-all duration-300 flex items-center group"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {item.label}
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="relative mt-16 pt-8 text-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="space-y-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Premium<span className="text-blue-400">Hub</span>. All rights reserved. 
              <span className="block mt-1">Crafting premium experiences for professionals worldwide.</span>
            </p>
            
            <p className="text-white/40 text-sm flex items-center justify-center gap-2 group">
              Designed & Developed with
              <span className="text-red-400 group-hover:scale-110 transition-transform duration-300">❤</span>
              by
              <a 
                href="https://github.com/saksham" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
              >
                Saksham Gupta
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer