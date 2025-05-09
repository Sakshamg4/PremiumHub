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
    className="border border-zinc-800/80 bg-black/20 backdrop-blur-sm rounded-lg p-3 
      hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300"
  >
    <span className="text-zinc-300">{feature}</span>
  </div>
));

const AnimatedTyping = memo(() => (
  <div className="h-[1.2em] w-full relative overflow-hidden">
    <TypeAnimation
      sequence={TYPE_SEQUENCE}
      wrapper="div"
      speed={50}
      repeat={Infinity}
      className="text-blue-400 absolute left-1/2 -translate-x-1/2 min-w-max"
      cursor={true}
      deletionSpeed={50}
    />
  </div>
));

const TrustIndicators = memo(() => (
  <div className="pt-8 border-t border-zinc-800/50">
    <p className="text-zinc-400 text-sm">
      Trusted by 300+ professionals worldwide
    </p>
    <p className="flex items-center justify-center gap-2 mt-2">
      <span className="text-yellow-400">⭐️⭐️⭐️⭐️⭐️</span>
      <span className="text-zinc-400">4.5/5 Customer Rating</span>
    </p>
  </div>
));

const CTAButtons = memo(({ onExplore }) => (
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
    <Button 
      variant="primary"
      onClick={onExplore}
      className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
    >
      Explore Plans
    </Button>
    <Button 
      variant="secondary"
      href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
      className="border border-zinc-700 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300"
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
    <div id="home" className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative border-[1px] border-zinc-800/50 rounded-xl p-8 md:p-12 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-gray-900 to-zinc-900" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          
          <div className="relative z-10 space-y-8 text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold">
                Premium Hub
              </h2>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col items-center gap-2">
                <span className="text-white">Your One-Stop Destination for</span>
                <AnimatedTyping />
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
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