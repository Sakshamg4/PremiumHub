import React from 'react'
import Button from './Button'

const About = () => {
  const stats = [
    { 
      number: '500+', 
      label: 'Active Members', 
      description: 'Trusted by creators worldwide',
      icon: '👥',
      color: 'from-blue-500/10 via-blue-500/5 to-transparent'
    },
    { 
      number: '90%', 
      label: 'Success Rate', 
      description: 'Verified customer satisfaction',
      icon: '⭐',
      color: 'from-green-500/10 via-green-500/5 to-transparent'
    },
    { 
      number: '9 AM to 11 PM', 
      label: 'Support', 
      description: 'Response on WhatsApp',
      icon: '💬',
      color: 'from-purple-500/10 via-purple-500/5 to-transparent'
    },
    { 
      number: '5+', 
      label: 'Countries', 
      description: 'Global community presence',
      icon: '🌏',
      color: 'from-red-500/10 via-red-500/5 to-transparent'
    },
  ]

  const services = [
    { 
      title: 'LinkedIn Solutions', 
      icon: '💼',
      features: [
        'Premium Accounts',
        'Sales Navigator',
        'Recruiter Lite',
        'Career Support'
      ],
      gradient: 'from-[#0077B5]/10 via-[#0077B5]/5 to-transparent'
    },
    { 
      title: 'Creative Tools', 
      icon: '🎨',
      features: [
        'Adobe Creative Cloud',
        'Canva Pro',
        'Autodesk Apps',
        'Design Resources'
      ],
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent'
    },
    { 
      title: 'Streaming Services', 
      icon: '🎬',
      features: [
        'Netflix Premium',
        'Amazon Prime',
        'Disney+ Hotstar',
        'YouTube Premium'
      ],
      gradient: 'from-red-600/10 via-red-600/5 to-transparent'
    },
    { 
      title: 'Learning Platforms', 
      icon: '📚',
      features: [
        'Coursera Plus',
        'edX Unlimited',
        'Skill Development',
        'Certification Courses'
      ],
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent'
    },
  ]

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content with Background */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,#000000)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,100,255,0.1),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,200,100,0.1),transparent_40%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                About Premium Hub
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Your trusted partner for premium digital solutions and services
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="relative group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
                    overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}`} />
                  <div className="relative p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-3xl flex items-center justify-center 
                      bg-zinc-800/50 rounded-full border border-zinc-700/50 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-zinc-300 font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-zinc-400">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="relative group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
                    overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 text-2xl flex items-center justify-center 
                        bg-zinc-800/50 rounded-full border border-zinc-700/50 group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-zinc-300 text-sm">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="relative group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
              overflow-hidden transition-all duration-300 hover:shadow-2xl text-center p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-transparent" />
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                  Join our growing community and get access to premium digital tools and services at unbeatable prices
                </p>
                <Button 
                  variant="primary"
                  href="https://wa.me/9029151181"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About