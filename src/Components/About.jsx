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
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Premium Hub</h2>
            <p className="text-xl text-blue-500 font-semibold mb-6">
              Your Gateway to Premium Digital Solutions
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-zinc-400 leading-relaxed">
              At Premium Hub, we democratize access to premium software and tools. 
              Our mission is to empower creators, professionals, and businesses with 
              top-tier solutions at accessible prices. We believe in transparency, 
              reliability, and exceptional support for our global community.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 border border-zinc-700 rounded-lg hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-zinc-400">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Who We Serve */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-8">Who We Serve</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-6 border border-zinc-700 rounded-lg hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <span className="text-4xl mb-3">{feature.icon}</span>
                  <span className="text-white font-semibold mb-2">{feature.title}</span>
                  <span className="text-sm text-zinc-400">{feature.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center border border-zinc-700 rounded-lg p-8 hover:border-blue-500 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-zinc-400 mb-6">
              Join thousands of satisfied users who trust Premium Hub for their digital needs
            </p>
            <Button 
              variant="primary"
              href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
              className="inline-flex"
            >
              Join Premium Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About