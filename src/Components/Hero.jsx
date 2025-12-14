import React, { memo, useCallback, useMemo } from 'react'
import { TypeAnimation } from 'react-type-animation';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

// Reusable Components

const AnimatedTyping = memo(({ sequence }) => (
  <div className="h-[1.2em] w-full relative overflow-hidden">
    <TypeAnimation
      sequence={sequence}
      wrapper="div"
      speed={50}
      repeat={Infinity}
      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 absolute left-1/2 -translate-x-1/2 min-w-max font-bold pb-2"
      cursor={true}
      deletionSpeed={50}
    />
  </div>
));

const TrustIndicators = memo(({ activeMembers }) => (
  <div className="pt-8 border-t border-[#bcccdc]/50 flex flex-col items-center justify-center gap-4">
    <div className="flex items-center gap-4">
      {/* Avatar Stack */}
      <div className="flex -space-x-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-10 h-10 rounded-full border-2 border-white relative overflow-hidden shadow-sm">
            <img
              src={`https://i.pravatar.cc/100?img=${i + 10}`}
              alt={`User ${i}`}
              className="w-full h-full object-cover"
              loading="lazy"
              width="40"
              height="40"
            />
          </div>
        ))}
        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm relative z-10">
          {activeMembers}
        </div>
      </div>

      {/* Text & Stars */}
      <div className="flex flex-col items-start">
        <div className="flex text-amber-400 gap-0.5 text-sm">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
        </div>
        <p className="text-slate-600 text-sm font-semibold">
          Happy Customers
        </p>
      </div>
    </div>
    <p className="text-slate-500 text-xs font-medium">
      Rated 4.8/5 by professionals worldwide
    </p>
  </div>
));

const CTAButtons = memo(({ onExplore }) => (
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-2">
    <Button
      variant="gradient"
      onClick={onExplore}
      className="min-w-[160px] justify-center"
      icon={null}
      showIcon={false}
    >
      Explore Plans
    </Button>
    <Button
      variant="secondary"
      href="https://wa.me/9029151181"
      className="min-w-[160px] justify-center"
    >
      Get Started
    </Button>
  </div>
));

const BrandMarquee = memo(({ brands }) => (
  <div className="w-full relative overflow-hidden py-10" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
    <div className="flex w-max animate-scroll">
      {[...brands, ...brands, ...brands].map((brand, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center gap-2 mx-8 text-[#64748b] hover:text-[#0077b5] transition-colors duration-300 group cursor-default">
          <div className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300">
            {brand.icon}
          </div>
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6">
            {brand.name}
          </span>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.33%); }
      }
      .animate-scroll {
        animation: scroll 30s linear infinite;
      }
      .animate-scroll:hover {
        animation-play-state: paused;
      }
    `}</style>
  </div>
));

const Hero = () => {
  const navigate = useNavigate();
  const { services, brands, heroTypeSequence, aboutStats } = useData();

  // Find active members count or default to 750+
  const activeMembers = useMemo(() => {
    return aboutStats?.find(s => s.label === 'Active Members')?.number || '750+';
  }, [aboutStats]);

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
          <div className="absolute inset-0 bg-[#f8fafc]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#d9eafd_0%,transparent_75%)] opacity-60" />
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] bg-[radial-gradient(circle_at_center,#bcccdc_0%,transparent_70%)] opacity-30 blur-3xl" />
          <div className="absolute top-[10%] -left-[10%] w-[50%] h-[80%] bg-[radial-gradient(circle_at_center,#9aa6b2_0%,transparent_70%)] opacity-15 blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />

          <div className="relative z-10 space-y-8 text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative group cursor-default">
                  {/* Outer Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />

                  {/* Beam Container */}
                  <div className="relative overflow-hidden rounded-full p-[1px]">
                    {/* Spinning Beam */}
                    <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F1F5F9_0%,#3B82F6_50%,#F1F5F9_100%)]" />

                    {/* Badge Content */}
                    <div className="relative inline-flex items-center gap-3 px-4 py-2 bg-white/95 backdrop-blur-xl rounded-full">
                      {/* Icon */}
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-100 shadow-sm text-yellow-500">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </span>

                      {/* Text */}
                      <span className="text-md md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 tracking-tight">
                        Premium Hub Tools
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col items-center gap-2">
                <span className="text-[#18181b]">Your One-Stop Destination for</span>
                <AnimatedTyping sequence={heroTypeSequence} />
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#52525b] leading-relaxed max-w-3xl mx-auto font-medium">
              Unlock unlimited access to top-tier software and business solutions—all in one place,
              at unbeatable prices.
            </p>

            {/* Light Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {services.slice(0, 4).map((service, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-full text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-blue-600 hover:border-blue-100 transition-all duration-300 cursor-default"
                >
                  <span className="text-lg opacity-80">{service.icon}</span>
                  {service.title}
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <CTAButtons onExplore={() => handleNavClick('#pricing')} />

            {/* Brands Marquee */}
            <BrandMarquee brands={brands} />

            {/* Trust Indicators */}
            <TrustIndicators activeMembers={activeMembers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);