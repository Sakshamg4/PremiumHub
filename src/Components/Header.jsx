import React, { useState, useEffect, useCallback, memo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'

// Constants
const MENU_ITEMS = [
  { href: '#home', label: 'Home', icon: '🏠' },
  { href: '#services', label: 'Services', icon: '⚡' },
  { href: '#pricing', label: 'Pricing', icon: '💎' },
  { href: '#contact', label: 'Contact', icon: '📱' },
  { href: '#about', label: 'About', icon: 'ℹ️' }
]

const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/9029151181',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me/OfficalBinner',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    )
  }
]

// Reusable Components
const Logo = memo(() => (
  <Link
    to="/"
    className="text-2xl font-bold text-zinc-100 hover:text-blue-500 transition-all duration-300 
      group flex items-center gap-1"
  >
    Premium
    <span className='text-blue-600 group-hover:text-zinc-100 transition-all duration-300'>Hub</span>
  </Link>
));

const MenuToggle = memo(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors focus:outline-none"
    aria-label="Toggle menu"
  >
    <div className="relative w-6 h-6">
      <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${
        isOpen ? 'top-3 rotate-45 bg-blue-500' : 'top-2 bg-zinc-400'
      }`} />
      <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${
        isOpen ? 'opacity-0' : 'top-4 bg-zinc-400'
      }`} />
      <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${
        isOpen ? 'top-3 -rotate-45 bg-blue-500' : 'top-6 bg-zinc-400'
      }`} />
    </div>
  </button>
));

const NavLink = memo(({ item, onClick }) => {
  if (item.href.startsWith('#')) {
    return (
      <a
        href={item.href}
        className="text-zinc-400 hover:text-blue-500 transition-all duration-300 
          relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 
          hover:after:w-full after:bg-blue-500 after:transition-all after:duration-300"
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      className="text-zinc-400 hover:text-blue-500 transition-all duration-300"
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
});

const MobileNavLink = memo(({ item, onClick }) => (
  <div className="px-4">
    {item.href.startsWith('#') ? (
      <a
        href={item.href}
        className="flex items-center space-x-2 py-3 px-4 text-zinc-400 hover:text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors"
        onClick={onClick}
      >
        <span>{item.label}</span>
      </a>
    ) : (
      <Link
        to={item.href}
        className="flex items-center space-x-2 py-3 px-4 text-zinc-400 hover:text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors"
        onClick={onClick}
      >
        <span>{item.label}</span>
      </Link>
    )}
  </div>
));

const SocialLink = memo(({ href, icon, name }) => (
  <a 
    href={href} 
    className="text-zinc-400 hover:text-blue-500 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="sr-only">{name}</span>
    {icon}
  </a>
));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = useCallback((href) => {
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <header
      className={`py-1 fixed w-full top-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-black/10' : 'bg-transparent backdrop-blur-sm'}`}
      style={{ minHeight: '64px' }}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => (
              <NavLink 
                key={item.href} 
                item={item} 
                onClick={() => handleNavClick(item.href)}
              />
            ))}
            <div className='flex items-center space-x-4'>
              <Button 
                variant="primary" 
                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300
                  hover:shadow-lg hover:shadow-blue-500/20"
                style={{ minWidth: '120px', minHeight: '40px' }}
              >
                Join Group
              </Button>
              <Button 
                variant="secondary" 
                href="https://wa.me/9029151181"
                className="hover:bg-blue-600/10 transition-all duration-300
                  border border-zinc-700 hover:border-blue-500"
              >
                Chat
              </Button>
            </div>
          </div>

          <MenuToggle isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className={`absolute right-0 top-0 h-screen w-[75%] max-w-sm bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
              {MENU_ITEMS.map((item) => (
                <MobileNavLink 
                  key={item.href} 
                  item={item} 
                  onClick={() => handleNavClick(item.href)}
                />
              ))}
              
              {/* Mobile Buttons */}
              <div className="px-4 mt-6 space-y-3">
                <Button 
                  variant="primary" 
                  href="https://chat.whatsapp.com/IP0IZVJymid5IQwDq7YtO3"
                  className="w-full justify-center"
                  style={{ minWidth: '120px', minHeight: '40px' }}
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
                {SOCIAL_LINKS.map((social) => (
                  <SocialLink key={social.name} {...social} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);