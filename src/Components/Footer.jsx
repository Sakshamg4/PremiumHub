import React, { memo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

// Reusable Components
const SocialIcon = memo(({ href, icon, className }) => (
  <a
    href={href}
    className={`w-10 h-10 rounded-full border flex items-center justify-center
      transition-all duration-300 hover:scale-110 ${className}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
));

const FooterLink = memo(({ item, onClick }) => {
  if (item.isRoute) {
    return (
      <Link
        to={item.href}
        className="group relative z-50 pointer-events-auto flex items-center gap-3 text-[#52525b] hover:text-[#18181b] transition-colors duration-300 font-medium cursor-pointer"
      >
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          {item.label}
        </span>
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      onClick={onClick}
      target={item.href.startsWith('#') ? '_self' : '_blank'}
      rel={!item.href.startsWith('#') ? 'noopener noreferrer' : ''}
      className="group flex items-center gap-3 text-[#52525b] hover:text-[#18181b] transition-colors duration-300 font-medium"
    >
      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
        {item.icon}
      </span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {item.label}
      </span>
    </a>
  );
});

const FooterSection = memo(({ title, items, onNavClick }) => (
  <div className="space-y-6">
    <h4 className="text-lg font-bold text-[#1e293b]">{title}</h4>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}
          className="relative z-50 cursor-pointer"
        >
          <FooterLink
            item={item}
            onClick={(e) => {
              if (item.href.startsWith('#')) {
                e.preventDefault();
                onNavClick(item.href);
              }
            }}
          />
        </li>
      ))}
    </ul>
  </div>
));

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const { socialLinks, footerLinks } = useData();

  const handleNavClick = useCallback((href) => {
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

  return (
    <footer className="relative bg-[#f8fafc]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f8fafc,#d9eafd)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(154,166,178,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(188,204,220,0.1),transparent_40%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="group inline-flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1e293b] to-[#1e293b]/80 bg-clip-text text-transparent 
                transition-all duration-300 group-hover:from-[#9aa6b2] group-hover:to-[#7e8c9d]">
                Premium
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#9aa6b2] to-[#7e8c9d] bg-clip-text text-transparent
                transition-all duration-300 group-hover:from-[#1e293b] group-hover:to-[#1e293b]/80">
                Hub
              </span>
            </Link>
            <p className="text-[#52525b] leading-relaxed font-medium">
              Your trusted partner for premium digital solutions. Access professional tools and services at unbeatable prices.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <SocialIcon key={social.name} {...social} className="bg-white/50 border-[#bcccdc] text-[#52525b] hover:bg-[#d9eafd]/50" />
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          <FooterSection title="Our Services" items={footerLinks.services} onNavClick={handleNavClick} />
          <FooterSection title="Support" items={footerLinks.support} onNavClick={handleNavClick} />
          <FooterSection title="Legal" items={footerLinks.legal} onNavClick={handleNavClick} />

        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-[#bcccdc]/50">
          <div className="text-center space-y-4">
            <p className="text-[#52525b] font-medium">
              © {currentYear} Premium<span className="text-[#9aa6b2]">Hub</span>. All rights reserved.
            </p>
            <p className="text-[#52525b] flex items-center justify-center gap-2 text-sm font-medium">
              Made with
              <span className="text-red-500 animate-pulse">❤</span>
              by
              <a
                href="https://github.com/Sakshamg4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9aa6b2] hover:text-[#7e8c9d] transition-colors duration-300"
              >
                Saksham Gupta
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);