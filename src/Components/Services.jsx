import React, { memo } from 'react';
import { useData } from '../Context/DataContext';

// Reusable Components
const Feature = memo(({ feature }) => (
  <div className="flex items-start gap-2 text-[#1e293b] group-hover:text-[#1e293b] transition-colors">
    <span className="text-[#9aa6b2]">🌟</span>
    <div>
      <span className="font-medium">{feature.name}</span>
      {feature.details && (
        <p className="text-md text-[#52525b] mt-1 font-medium">
          {feature.details}
        </p>
      )}
    </div>
  </div>
));

const ServiceCard = memo(({ service }) => (
  <div
    className={`border border-[#bcccdc]/80 rounded-xl p-6 
      hover:border-[#9aa6b2]/50 transition-all duration-300 group
      bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm`}
  >
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{service.icon}</span>
        <h3 className="text-xl font-bold text-[#1e293b] group-hover:text-[#9aa6b2] transition-colors">
          {service.title}
        </h3>
      </div>

      <p className="text-[#52525b] font-medium">
        {service.description}
      </p>

      <div className="space-y-3">
        {service.features.map((feature, idx) => (
          <Feature key={idx} feature={feature} />
        ))}
      </div>
    </div>
  </div>
));

const ServicesHeader = memo(() => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">
      Professional-Grade Digital Tools Suite
    </h2>
    <p className="text-[#1e293b] text-lg font-medium">
      <span className="inline-block bg-[#d9eafd]/40 rounded-full px-4 py-1">
        Premium Access. No Gimmicks. 100% Secure.
      </span>
    </p>
  </div>
));

const CTASection = memo(() => (
  <div className="mt-12 text-center max-w-2xl mx-auto px-4">
    <p className="text-[#52525b] text-md mb-6 font-medium">
      Unlock exclusive deals on premium digital tools and services. Join our community for the best prices and expert support!
    </p>
    <a
      href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-green-600 to-green-500 
        text-white rounded-xl font-medium transition-all duration-300
        hover:shadow-2xl hover:shadow-green-500/20 transform hover:scale-[1.02]
        border border-green-500/20 overflow-hidden"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our WhatsApp community"
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] 
        bg-[length:250%_250%] bg-[0%_0%] group-hover:bg-[100%_100%] transition-all duration-1000" />

      <div className="relative flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
          group-hover:bg-white/20 transition-colors duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
          </svg>
        </div>
        <span className="text-lg">Join our community</span>
      </div>
    </a>
  </div>
));

const Services = () => {
  const { services } = useData();
  return (
    <div id="services" className="min-h-screen py-10 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative border-[1px] border-[#bcccdc]/50 rounded-xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#d9eafd]/30 via-[#f8fafc] to-[#bcccdc]/20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />

          <div className="relative z-10">
            <ServicesHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>

            <CTASection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Services);