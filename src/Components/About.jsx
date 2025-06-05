import React, { memo } from 'react'
import CTAButton from './CTAButton'

// Move static data outside component
const STATS = [
  { 
    number: '250+', 
    label: 'Active Members', 
    description: 'Growing community of digital professionals',
    icon: '👥',
    color: 'from-blue-500/10 via-blue-500/5 to-transparent',
    ariaLabel: 'Active Members Statistics'
  },
  { 
    number: '93%', 
    label: 'Customer Satisfaction', 
    description: 'Based on verified user reviews',
    icon: '⭐',
    color: 'from-green-500/10 via-green-500/5 to-transparent',
    ariaLabel: 'Customer Satisfaction Rate'
  },
  { 
    number: '9 AM to 11 PM', 
    label: 'Support Hours', 
    description: 'Fast WhatsApp response (IST)',
    icon: '💬',
    color: 'from-purple-500/10 via-purple-500/5 to-transparent',
    ariaLabel: 'Support Hours Information'
  },
  { 
    number: '5+', 
    label: 'Countries', 
    description: 'International client network',
    icon: '🌏',
    color: 'from-red-500/10 via-red-500/5 to-transparent',
    ariaLabel: 'Global Presence Statistics'
  },
]

const SERVICES = [
  { 
    title: 'LinkedIn Solutions', 
    icon: '💼',
    features: [
      'Premium Business & Career Plans',
      'Advanced Sales Navigator Tools',
      'Recruiter Lite Access',
      'Professional Career Support'
    ],
    gradient: 'from-[#0077B5]/10 via-[#0077B5]/5 to-transparent',
    ariaLabel: 'LinkedIn Professional Services'
  },
  { 
    title: 'Creative Tools', 
    icon: '🎨',
    features: [
      'Full Adobe Creative Cloud Suite',
      'Canva Pro with Premium Assets',
      'Autodesk Professional Apps',
      'Exclusive Design Resources'
    ],
    gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    ariaLabel: 'Creative Design Tools'
  },
  { 
    title: 'Streaming Services', 
    icon: '🎬',
    features: [
      'Netflix Premium 4K HDR',
      'Amazon Prime Video & Benefits',
      'Disney+ Hotstar VIP',
      'YouTube Premium Ad-free'
    ],
    gradient: 'from-red-600/10 via-red-600/5 to-transparent',
    ariaLabel: 'Premium Streaming Services'
  },
  { 
    title: 'Learning Platforms', 
    icon: '📚',
    features: [
      'Coursera Plus Unlimited Access',
      'edX Verified Certificates',
      'Professional Skill Development',
      'Industry-recognized Certifications'
    ],
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    ariaLabel: 'Educational Learning Platforms'
  },
]

// Reusable Background Effects Component
const BackgroundEffects = memo(() => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,#000000)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,100,255,0.1),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,200,100,0.1),transparent_40%)]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
  </div>
))

// Memoize StatCard component
const StatCard = memo(({ stat }) => (
  <div 
    className="relative group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
      overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    role="article"
    aria-label={stat.ariaLabel}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}`} />
    <div className="relative p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 text-3xl flex items-center justify-center 
        bg-zinc-800/50 rounded-full border border-zinc-700/50 group-hover:scale-110 
        transition-transform duration-300 ease-out">
        {stat.icon}
      </div>
      <div className="text-3xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors">
        {stat.number}
      </div>
      <div className="text-zinc-300 font-medium mb-1 group-hover:text-opacity-90 transition-colors">
        {stat.label}
      </div>
      <div className="text-sm text-zinc-400 group-hover:text-opacity-90 transition-colors">
        {stat.description}
      </div>
    </div>
  </div>
))

// Memoize ServiceCard component
const ServiceCard = memo(({ service }) => (
  <div 
    className="relative group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
      overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    role="article"
    aria-label={service.ariaLabel}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
    <div className="relative p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 text-2xl flex items-center justify-center 
          bg-zinc-800/50 rounded-full border border-zinc-700/50 
          group-hover:scale-110 transition-transform duration-300 ease-out">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-opacity-90 transition-colors">
          {service.title}
        </h3>
      </div>
      <ul className="space-y-3" role="list">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-zinc-300 text-sm 
            group-hover:text-opacity-90 transition-colors">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" 
              fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
))

const About = () => {
  return (
    <section className="relative py-10 md:py-8" aria-label="About Premium Hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <BackgroundEffects />
          <div className="relative p-8 md:p-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 animate-gradient">
                About Premium Hub
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Your trusted partner for premium digital solutions and services
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {STATS.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>

            <CTAButton 
              title="Ready to Get Started?" 
              description="Join our growing community and get access to premium digital tools and services at unbeatable prices" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(About)