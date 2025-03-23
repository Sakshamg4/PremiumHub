import React from 'react'

const About = () => {
  const stats = [
    { number: '10K+', label: 'Happy Clients' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '500+', label: 'Global Users' },
    { number: '24/7', label: 'Customer Support' },
  ]

  const features = [
    { title: 'Creators', icon: '🎨' },
    { title: 'Students', icon: '📚' },
    { title: 'Professionals', icon: '💼' },
    { title: 'Business Owners', icon: '🏢' },
  ]

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Premium Hub</h2>
            <p className="text-xl text-blue-500 font-semibold mb-6">
              Simplifying Premium Access Since Day One
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-zinc-400 leading-relaxed">
              At Premium Hub, our mission is to make top-tier software accessible, 
              affordable, and flexible for everyone—whether you're a creator, student, 
              professional, or business owner. With a focus on quality, customer support, 
              and transparency, we serve clients around the globe who want the best 
              without the hassle.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 border border-zinc-700 rounded-lg hover:border-blue-500 transition-colors duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Who We Serve */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-8">Who We Serve</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-6 border border-zinc-700 rounded-lg hover:border-blue-500 transition-colors duration-300"
                >
                  <span className="text-4xl mb-3">{feature.icon}</span>
                  <span className="text-zinc-400">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-zinc-400 font-semibold">
              Join the thousands who trust Premium Hub for all their digital and professional needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About