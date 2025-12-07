import React, { memo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Constants
const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/9029151181',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    className: 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20'
  }
];

const FOOTER_LINKS = {
  services: [
    { label: 'LinkedIn Premium', href: '#services', icon: '💼' },
    { label: 'Creative Tools', href: '#services', icon: '🎨' },
    { label: 'OTT Platforms', href: '#services', icon: '🎬' },
    { label: 'AI Solutions', href: '#services', icon: '🤖' }
  ],
  support: [
    { label: 'WhatsApp Support', href: 'https://wa.me/9029151181', icon: '💬' },
    { label: 'Join Community', href: '#contact', icon: '👥' },
    { label: 'View Pricing', href: '#pricing', icon: '💎' },
    { label: 'premiumhubtools@gmail.com', href: 'mailto:premiumhubtools@gmail.com', icon: '📧' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true, icon: '🔒' },
    { label: 'Terms of Service', href: '/terms-and-conditions', isRoute: true, icon: '📜' },
    { label: 'About Us', href: '#about', icon: 'ℹ️' }
  ]
};

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
        className="group flex items-center gap-3 text-[#52525b] hover:text-[#18181b] transition-colors duration-300 font-medium"
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
        <li key={item.label}>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
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
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.name} {...social} />
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          <FooterSection title="Our Services" items={FOOTER_LINKS.services} onNavClick={handleNavClick} />
          <FooterSection title="Support" items={FOOTER_LINKS.support} onNavClick={handleNavClick} />
          <FooterSection title="Legal" items={FOOTER_LINKS.legal} onNavClick={handleNavClick} />
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