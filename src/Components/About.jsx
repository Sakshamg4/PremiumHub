import React from 'react'
import Button from './Button'

const About = () => {
  const stats = [
    { number: '10K+', label: 'Active Members', description: 'Trusted by creators worldwide' },
    { number: '95%', label: 'Client Satisfaction', description: 'Based on user feedback' },
    { number: '500+', label: 'Global Users', description: 'Across 50+ countries' },
    { number: '24/7', label: 'Customer Support', description: 'Always here to help' },
  ]

  const features = [
    { 
      title: 'Creators', 
      icon: '🎨',
      description: 'Access to premium creative tools'
    },
    { 
      title: 'Students', 
      icon: '📚',
      description: 'Affordable learning resources'
    },
    { 
      title: 'Professionals', 
      icon: '💼',
      description: 'Business-grade solutions'
    },
    { 
      title: 'Business Owners', 
      icon: '🏢',
      description: 'Enterprise-level access'
    },
  ]

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                About Premium Hub
              </h2>
              <p className="text-xl text-blue-400 font-semibold mb-6">
                Your Gateway to Premium Digital Solutions
              </p>
            </div>

            {/* Mission Statement */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-lg text-white/70 leading-relaxed">
                At Premium Hub, we democratize access to premium software and tools. 
                Our mission is to empower creators, professionals, and businesses with 
                top-tier solutions at accessible prices. We believe in transparency, 
                reliability, and exceptional support for our global community.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-white/60">{stat.description}</div>
                </div>
              ))}
            </div>

            {/* Who We Serve */}
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold mb-8 text-white">Who We Serve</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <span className="text-4xl mb-3">{feature.icon}</span>
                    <span className="text-white font-semibold mb-2">{feature.title}</span>
                    <span className="text-sm text-white/60">{feature.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h3>
              <p className="text-lg text-white/70 mb-6">
                Join thousands of satisfied users who trust Premium Hub for their digital needs
              </p>
              <Button 
                variant="primary"
                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                className="inline-flex hover:bg-blue-600 transition-colors duration-300"
              >
                Join Premium Hub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About