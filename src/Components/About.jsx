import React, { memo } from 'react'
import CTAButton from './CTAButton'
import { useData } from '../context/DataContext'

// Reusable Background Effects Component
const BackgroundEffects = memo(() => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f8fafc,#d9eafd)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(154,166,178,0.1),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(188,204,220,0.1),transparent_40%)]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
  </div>
))

// Memoize StatCard component
const StatCard = memo(({ stat }) => (
  <div
    className="relative group bg-[#f8fafc]/50 backdrop-blur-xl border border-[#bcccdc]/50 rounded-xl 
      overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    role="article"
    aria-label={stat.ariaLabel}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}`} />
    <div className="relative p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 text-3xl flex items-center justify-center 
        bg-[#f8fafc]/50 rounded-full border border-[#bcccdc]/50 group-hover:scale-110 
        transition-transform duration-300 ease-out">
        {stat.icon}
      </div>
      <div className="text-3xl font-bold text-[#1e293b] mb-2 group-hover:text-opacity-90 transition-colors">
        {stat.number}
      </div>
      <div className="text-[#52525b] font-medium mb-1 group-hover:text-opacity-90 transition-colors">
        {stat.label}
      </div>
      <div className="text-[#18181b] text-sm group-hover:text-opacity-90 transition-colors font-medium">
        {stat.description}
      </div>
    </div>
  </div>
))

// Memoize ServiceCard component
const ServiceCard = memo(({ service }) => (
  <div
    className="relative group bg-[#f8fafc]/50 backdrop-blur-xl border border-[#bcccdc]/50 rounded-xl 
      overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    role="article"
    aria-label={service.ariaLabel}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
    <div className="relative p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 text-2xl flex items-center justify-center 
          bg-[#f8fafc]/50 rounded-full border border-[#bcccdc]/50 
          group-hover:scale-110 transition-transform duration-300 ease-out">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-[#1e293b] group-hover:text-opacity-90 transition-colors">
          {service.title}
        </h3>
      </div>
      <ul className="space-y-3" role="list">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-[#52525b] text-sm font-medium
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
  const { aboutStats, aboutServices } = useData();

  return (
    <section className="relative py-10 md:py-8" aria-label="About Premium Hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <BackgroundEffects />
          <div className="relative p-8 md:p-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent 
                bg-gradient-to-r from-[#18181b] via-[#9aa6b2] to-[#18181b] animate-gradient">
                About Premium Hub
              </h2>
              <p className="text-lg text-[#52525b] max-w-3xl mx-auto font-medium leading-relaxed">
                Premium Hub is your ultimate destination for top-tier digital tools at unbeatable prices.
                We empower professionals, creators, and businesses by providing affordable access to the
                world's best software, ensuring you have the resources to succeed without breaking the bank.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {aboutStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {aboutServices.map((service, index) => (
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