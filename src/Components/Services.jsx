import React, { memo } from 'react';

// Constants
const SERVICES = [
  {
    title: "LinkedIn Premium",
    description: "Linkedin Premium for your career, business, sales, and more",
    icon: "💼",
    features: [
      { name: "LinkedIn Career Plan", duration: "6, 12 Months" },
      { name: "LinkedIn Business Plan", duration: "6, 9, 12 Months" },
      { name: "LinkedIn Sales Navigator Core & Advance Plan", duration: "2 Months" },
      { name: "LinkedIn Recruiter Lite", duration: "1 Month" },
      { name: "LinkedIn Ads Credit", duration: "₹7K–₹58K" }
    ],
    bgGradient: "from-blue-900/20 to-blue-950/20"
  },
  {
    title: "Professional Tools",
    description: "Industry-standard creative and professional software suite",
    icon: "⚡",
    features: [
      { name: "Adobe Creative Cloud", duration: "1 Year", details: "All Apps - Photoshop, Illustrator, Premier Pro & more" },
      { name: "Canva Pro", duration: "1 Year", details: "Premium Templates, Background Remover" },
      { name: "Autodesk All Apps", duration: "1 Year", details: "39+ Professional Tools" },
      { name: "Loom Premium", duration: "1 Year" }
    ],
    bgGradient: "from-cyan-900/20 to-cyan-950/20"
  },
  {
    title: "AI Powerhouse",
    description: "Access cutting-edge AI models and tools for enhanced productivity",
    icon: "🤖",
    features: [
      { name: "Perplexity AI", duration: "1 Year", details: "GPT-4o, GROK, Claude 3, Pro Search Best for Research" },
      { name: "You.com Premium", duration: "1 Year", details: "25+ AI Models, GPT-4o, Claude 3, Gemini" },
      { name: "GitHub Copilot", duration: "1 Year", details: "AI-powered code completion" }
    ],
    bgGradient: "from-purple-900/20 to-purple-950/20"
  },
  {
    title: "Learning & Development",
    description: "Premium educational resources for continuous learning",
    icon: "📚",
    features: [
      { name: "Coursera Plus", duration: "12 Months", details: "7,000+ Courses with Certificates" },
      { name: "edX Unlimited", duration: "12 Months", details: "Access to 3,000+ courses from top universities" }
    ],
    bgGradient: "from-green-900/20 to-green-950/20"
  }
];

// Reusable Components
const Feature = memo(({ feature }) => (
  <div className="flex items-start gap-2 text-zinc-300 group-hover:text-zinc-200 transition-colors">
    <span className="text-blue-500 mt-1">✅</span>
    <div>
      <span className="font-medium">{feature.name}</span>
      <span className="text-zinc-400"> ({feature.duration})</span>
      {feature.details && (
        <p className="text-sm text-zinc-500 mt-1">
          {feature.details}
        </p>
      )}
    </div>
  </div>
));

const ServiceCard = memo(({ service }) => (
  <div 
    className={`border border-zinc-800/80 rounded-xl p-6 
      hover:border-blue-500/50 transition-all duration-300 group
      bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm`}
  >
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{service.icon}</span>
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>
      </div>

      <p className="text-zinc-400">
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
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Premium Digital Tools
    </h2>
    <p className="text-blue-400 text-lg font-medium">
      100% Genuine & Private Access
    </p>
  </div>
));

const CTASection = memo(() => (
  <div className="mt-12 text-center">
    <p className="text-zinc-400 mb-6">
      Join our premium community and get access to all tools
    </p>
    <a 
      href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
      className="inline-flex px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
        transition-all duration-300 font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      Get Premium Access
    </a>
  </div>
));

const Services = () => {
  return (
    <div id="services" className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative border-[1px] border-zinc-800/50 rounded-xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-gray-900 to-zinc-900" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

          <div className="relative z-10">
            <ServicesHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {SERVICES.map((service, index) => (
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