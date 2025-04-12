import React from 'react'
import Button from './Button'

const Servies = () => {
  const services = [
    {
      title: "Creative Tools",
      description: "Access premium creative suites including Adobe Creative Cloud, Canva Pro, and Envato Elements for unlimited design possibilities",
      icon: "🎨",
      features: ["Adobe Creative", "Canva Pro", "Envato Elements", "AutoDesk"]
    },
    {
      title: "Design & Engineering",
      description: "Professional tools for design, prototyping, and engineering workflows",
      icon: "🛠️",
      features: ["Autodesk", "Figma Pro", "Canva Pro"]
    },
    {
      title: "Entertainment & OTT",
      description: "Stream your favorite content across multiple platforms",
      icon: "📺",
      features: ["Netflix Premium", "Prime Video", "SonyLiv", "JioHotstar"]
    },
    {
      title: "Professional Growth",
      description: "Enhance your professional presence and networking capabilities",
      icon: "💼",
      features: ["LinkedIn Business", "Recruiter Lite", "Ads Coupons", "Sale Navigator","Couresera Plus"]
    },
    {
      title: "AI Tools",
      description: "Access cutting-edge AI tools to boost your productivity",
      icon: "🤖",
      features: ["Perplexity AI", "You.com AI", "ChatGPT Plus", "Copilot AI", "Cursor AI"]
    },
    {
      title: "Marketing & Sales",
      description: "Comprehensive tools to grow your brand and reach",
      icon: "🎯",
      features: ["LinkedIn Ads", "LinkedIn $100 Page", "Google Ads", "Facebook Ads"]
    }
  ]

  return (
    <div className="py-16 md:py-24 \">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border-[1px] border-white/10 rounded-xl p-8 md:p-12 shadow-xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
              Services
            </h2>
            <p className="text-xl text-blue-400 font-semibold mb-2">
              Everything You Need to Work Smarter, Create More & Grow Faster
            </p>
            <p className="text-lg text-zinc-300">
              At Premium Hub, we provide verified access to premium tools and services
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/5 rounded-lg p-6 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-zinc-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-zinc-300">
                      <span className="mr-2 text-blue-400">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Custom Solutions */}
          <div className="text-center mt-12 p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/5 rounded-lg hover:border-blue-400/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Need Something Custom?</h3>
            <p className="text-zinc-300 mb-6">
              We can create a tailored package that perfectly fits your needs.
            </p>
            <Button 
              variant="primary"
              href="https://wa.me/9029151181"
              className="mx-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Servies