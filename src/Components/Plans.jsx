import React from 'react'
import Button from './Button'

const Plans = () => {
  const pricingPlans = [
    {
      name: "Basic Suite",
      subtitle: "Essential Creative Tools",
      price: "$29",
      period: "/month",
      features: [
        "LinkedIn Premium Basic",
        "Canva Pro Access",
        "Basic AI Writing Tools",
        "ChatGPT Plus Access",
        "24/7 Support"
      ],
      recommended: false,
      bgGradient: "from-slate-800/40 to-slate-900/40"
    },
    {
      name: "Pro Creator",
      subtitle: "Complete Creative Suite",
      price: "$99",
      period: "/month",
      features: [
        "LinkedIn Premium Business",
        "Adobe Creative Cloud",
        "Midjourney & DALL-E",
        "Claude AI Pro Access",
        "Priority Support"
      ],
      recommended: true,
      bgGradient: "from-blue-600/10 to-blue-900/10"
    },
    {
      name: "Business Elite",
      subtitle: "Enterprise Solutions",
      price: "$199",
      period: "/month",
      features: [
        "LinkedIn Sales Navigator",
        "Full Adobe Enterprise",
        "Unlimited AI Access",
        "Team Management Tools",
        "Dedicated Account Manager"
      ],
      recommended: false,
      bgGradient: "from-slate-800/40 to-slate-900/40"
    }
  ]

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border-[1px] border-zinc-700 rounded-xl p-8 md:p-12 shadow-xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
              Premium Plans
            </h2>
            <p className="text-xl text-blue-400 font-semibold mb-2">
              All-in-One Creative Solutions
            </p>
            <p className="text-lg text-zinc-300">
              Get verified access to premium tools at unbeatable prices
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm 
                  border ${plan.recommended ? 'border-blue-500/50' : 'border-white/5'} 
                  rounded-xl p-8 transition-all duration-300
                  hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/10
                  ${plan.recommended ? 'relative overflow-hidden transform hover:-translate-y-1' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500/80 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-white/90">{plan.name}</h3>
                <p className="text-blue-400 mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white/90">{plan.price}</span>
                  <span className="text-zinc-400 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-zinc-300">
                      <span className="mr-3 text-blue-400">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.recommended ? "primary" : "secondary"}
                  href="https://wa.me/9029151181"
                  className="w-full justify-center group"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* Custom Plan Section */}
          <div className="text-center bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
            <h3 className="text-2xl font-bold mb-2 text-white/90">Need a Custom Package?</h3>
            <p className="text-blue-400 mb-4">Tailored Enterprise Solutions</p>
            <p className="text-zinc-300 mb-6">Let's create a custom plan that fits your team's needs</p>
            <Button 
              variant="secondary"
              href="https://wa.me/9029151181"
              className="group"
            >
              Contact Sales
              
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans