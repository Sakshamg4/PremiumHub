import React, { memo, useCallback } from 'react'
import { TypeAnimation } from 'react-type-animation';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

// Constants
const TYPE_SEQUENCE = [
  'Adobe Creative',
  1500,
  'LinkedIn Premium',
  1500,
  'Canva Pro',
  1500,
  'Preplexity AI',
  1500,
  'You.com AI',
  1500,
  'Coursera Plus',
  1500,
];

const FEATURES = [
  'Creative Tools',
  'Business Apps',
  'AI Solutions',
  'Premium Support'
];

// Reusable Components
const FeatureCard = memo(({ feature }) => (
  <div
    className="border border-[#bcccdc]/80 bg-[#f8fafc]/20 backdrop-blur-sm rounded-lg p-3 
      hover:border-[#9aa6b2]/50 hover:bg-[#d9eafd]/10 transition-all duration-300"
  >
    <span className="text-[#52525b] font-medium">{feature}</span>
  </div>
));

const AnimatedTyping = memo(() => (
  <div className="h-[1.2em] w-full relative overflow-hidden">
    <TypeAnimation
      sequence={TYPE_SEQUENCE}
      wrapper="div"
      speed={50}
      repeat={Infinity}
      className="text-[#1e293b] absolute left-1/2 -translate-x-1/2 min-w-max font-bold"
      cursor={true}
      deletionSpeed={50}
    />
  </div>
));

const TrustIndicators = memo(() => (
  <div className="pt-8 border-t border-[#bcccdc]/50">
    <p className="text-[#52525b] text-sm font-medium">
      Trusted by 750+ happy customers worldwide
    </p>
    <p className="flex items-center justify-center gap-2 mt-2">
      <span className="text-yellow-500">⭐️⭐️⭐️⭐️</span>
      <span className="text-[#52525b] font-medium">4.5/5 Customer Rating</span>
    </p>
  </div>
));

const CTAButtons = memo(({ onExplore }) => (
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
    <Button
      variant="primary"
      onClick={onExplore}
      className="bg-[#9aa6b2] hover:bg-[#7e8c9d] text-white transition-all duration-300"
    >
      Explore Plans
    </Button>
    <Button
      variant="secondary"
      href="https://wa.me/9029151181"
      className="border border-[#bcccdc] hover:border-[#9aa6b2]/50 hover:bg-[#d9eafd]/10 text-[#52525b] hover:text-[#18181b] transition-all duration-300"
    >
      Get Started
    </Button>
  </div>
));

const Hero = () => {
  const navigate = useNavigate();

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
    <div id="home" className="min-h-screen py-10 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative border-[1px] border-[#bcccdc]/50 rounded-xl p-8 md:p-12 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d9eafd]/30 via-[#f8fafc] to-[#bcccdc]/20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />

          <div className="relative z-10 space-y-8 text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#d9eafd]/10 via-[#bcccdc]/10 to-[#9aa6b2]/10 border border-[#9aa6b2]/20 shadow-sm">
                  <svg className="w-5 h-5 text-[#18181b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
                  </svg>
                  <span className="text-xl md:text-2xl font-bold text-[#18181b] tracking-wide drop-shadow-sm">
                    Premium Hub
                  </span>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col items-center gap-2">
                <span className="text-[#18181b]">Your One-Stop Destination for</span>
                <AnimatedTyping />
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#52525b] leading-relaxed max-w-3xl mx-auto font-medium">
              Unlock unlimited access to top-tier software and business solutions—all in one place,
              at unbeatable prices.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>

            {/* CTA Section */}
            <CTAButtons onExplore={() => handleNavClick('#pricing')} />

            {/* Trust Indicators */}
            <TrustIndicators />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);