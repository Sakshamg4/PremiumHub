import React, { useState, useEffect, useCallback, memo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'

import { useData } from '../context/DataContext'

// Reusable Components
const Logo = memo(({ onClick }) => {
  const [index, setIndex] = useState(0);
  const words = ["Supplier", "Vendor", "Seller", "Reseller"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex flex-col leading-none select-none"
      aria-label="Premium Hub Home"
    >
      <div className="flex items-center gap-0.5 text-2xl font-black tracking-tight text-slate-800">
        Premium
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:brightness-110 transition-all">Hub</span>
        <span className="text-blue-600">.</span>
      </div>
      <span
        key={index}
        className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase pl-[2px] animate-[fadeIn_0.5s_ease-in-out]"
      >
        {words[index]}
      </span>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Link>
  );
});

const MenuToggle = memo(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors focus:outline-none"
    aria-label="Toggle menu"
  >
    <div className="relative w-6 h-6">
      <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${isOpen ? 'top-3 rotate-45 bg-[#9aa6b2]' : 'top-2 bg-[#64748b]'
        }`} />
      <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-4 bg-[#64748b]'
        }`} />
      <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${isOpen ? 'top-3 -rotate-45 bg-[#9aa6b2]' : 'top-6 bg-[#64748b]'
        }`} />
    </div>
  </button>
));

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const NavLink = memo(({ item, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className="flex items-center gap-1 text-[#52525b] hover:text-[#18181b] transition-all duration-300 font-medium py-2"
          onClick={() => onClick(item.href)}
        >
          {item.label}
          <MdKeyboardArrowDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px] transition-all duration-200 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            }`}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-4">
            <div className="grid grid-cols-2 gap-2">
              {item.subItems.map((subItem) => {
                const Icon = subItem.icon;
                return (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/item"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover/item:text-blue-600 group-hover/item:bg-blue-50 transition-colors shrink-0">
                      {Icon && <Icon className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 group-hover/item:text-slate-900 block">
                        {subItem.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link to="/#services" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 group/link">
                View all services
                <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.href.startsWith('#')) {
    return (
      <a
        href={item.href}
        className="text-[#52525b] hover:text-[#18181b] transition-all duration-300 font-medium
          relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 
          hover:after:w-full after:bg-[#18181b] after:transition-all after:duration-300"
        onClick={() => onClick(item.href)}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      className="text-[#52525b] hover:text-[#18181b] transition-all duration-300 font-medium"
      onClick={() => onClick(item.href)}
    >
      {item.label}
    </Link>
  );
});

const MobileNavLink = memo(({ item, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
    return (
      <div className="px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-3 px-4 text-[#52525b] hover:text-[#18181b] rounded-lg hover:bg-[#d9eafd]/50 transition-colors font-medium"
        >
          <span className="flex items-center gap-2">
            {item.label}
          </span>
          {isOpen ? <MdKeyboardArrowUp className="w-5 h-5" /> : <MdKeyboardArrowDown className="w-5 h-5" />}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50/50 rounded-b-lg mb-2">
            {item.subItems.map((subItem) => {
              const Icon = subItem.icon;
              return (
                <Link
                  key={subItem.href}
                  to={subItem.href}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/80 text-slate-600 hover:text-blue-600 transition-colors"
                  onClick={onClick}
                >
                  <div className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center">
                    {Icon && <Icon className="w-3 h-3" />}
                  </div>
                  <span className="text-sm font-medium">{subItem.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      {item.href.startsWith('#') ? (
        <a
          href={item.href}
          className="flex items-center space-x-2 py-3 px-4 text-[#52525b] hover:text-[#18181b] rounded-lg hover:bg-[#d9eafd]/50 transition-colors font-medium"
          onClick={() => onClick(item.href)}
        >
          <span>{item.label}</span>
        </a>
      ) : (
        <Link
          to={item.href}
          className="flex items-center space-x-2 py-3 px-4 text-[#52525b] hover:text-[#18181b] rounded-lg hover:bg-[#d9eafd]/50 transition-colors font-medium"
          onClick={() => onClick(item.href)}
        >
          <span>{item.label}</span>
        </Link>
      )}
    </div>
  );
});

const SocialLink = memo(({ href, icon, name }) => (
  <a
    href={href}
    className="text-[#52525b] hover:text-[#18181b] transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="sr-only">{name}</span>
    {icon}
  </a>
));

const Header = () => {
  const { menuItems, socialLinks } = useData();
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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    ${isScrolled
          ? 'backdrop-blur-xl shadow-lg shadow-[#9aa6b2]/10 bg-[radial-gradient(circle_at_center,#f8fafc,#d9eafd)]'
          : 'bg-transparent backdrop-blur-sm'
        }`}
      style={{ minHeight: '64px' }}
    >


      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
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
                className="bg-[#9aa6b2] hover:bg-[#7e8c9d] text-white transition-all duration-300
                  hover:shadow-lg hover:shadow-[#9aa6b2]/20"
                style={{ minWidth: '120px', minHeight: '40px' }}
              >
                Join Group
              </Button>
              <Button
                variant="secondary"
                href="https://wa.me/919029151181"
                className="hover:bg-[#d9eafd] text-[#64748b] hover:text-[#1e293b] transition-all duration-300
                  border border-[#bcccdc] hover:border-[#9aa6b2]"
              >
                Chat
              </Button>
            </div>
          </div>

          <MenuToggle isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#1e293b]/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <div className={`absolute right-0 top-0 h-screen w-[75%] max-w-sm bg-[#f8fafc] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#bcccdc]/50 shrink-0">
              <Logo onClick={() => setIsMenuOpen(false)} />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-[#d9eafd]/50 cursor-pointer rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="py-4 flex-1 overflow-y-auto">
              {menuItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  item={item}
                  onClick={() => handleNavClick(item.href)}
                />
              ))}

              {/* Mobile Buttons */}
              <div className="px-4 mt-6 space-y-3 pb-6">
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
                  href="https://wa.me/919029151181"
                  className="w-full justify-center"
                >
                  Chat
                </Button>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-[#bcccdc]/50 shrink-0 bg-[#f8fafc]">
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
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