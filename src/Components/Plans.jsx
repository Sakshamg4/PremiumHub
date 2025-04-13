import React from 'react'
import Button from './Button'

const Plans = () => {
  const pricingPlans = [
    {
      name: "LinkedIn Premium",
      subtitle: "Professional Growth",
      features: [
        { text: "LinkedIn Business Plan", detail: "6 Months" },
        { text: "LinkedIn Business Plan", detail: "9 Months" },
        { text: "LinkedIn Business Plan", detail: "12 Months" },
        { text: "LinkedIn Career Plan", detail: "3 Months" },
        { text: "LinkedIn Career Plan", detail: "12 Months" }
      ],
      bgGradient: "from-[#0077B5]/5 via-[#0077B5]/10 to-transparent",
      borderColor: "group-hover:border-[#0077B5]/50",
      buttonClass: "bg-[#0077B5]/10 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50"
    },
    {
      name: "LinkedIn Business",
      subtitle: "Sales & Marketing",
      features: [
        { text: "Sales Navigator Core", detail: "2 Months" },
        { text: "Sales Navigator Advance", detail: "2 Months" },
        { text: "Recruiter Lite", detail: "5 Month" },
        { text: "Ads Credit ₹7,000 - ₹58,000", detail: "" }
      ],
      bgGradient: "from-[#0A66C2]/5 via-[#0A66C2]/10 to-transparent",
      borderColor: "group-hover:border-[#0A66C2]/50",
      buttonClass: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50"
    },
    {
      name: "Creative Tools",
      subtitle: "Design & Content",
      features: [
        { text: "Adobe Creative Cloud", detail: "1 Year" },
        { text: "Canva Pro", detail: "Lifetime" },
        { text: "Autodesk All Apps", detail: "1 Year" },
        { text: "Loom Premium", detail: "1 Year" }
      ],
      bgGradient: "from-purple-500/5 via-purple-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/50",
      buttonClass: "bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/50"
    },
    {
      name: "AI Solutions",
      subtitle: "AI-Powered Tools",
      features: [
        { text: "Perplexity AI", detail: "1 Year" },
        { text: "You.com AI", detail: "1 Year" },
        { text: "GitHub Copilot AI", detail: "1 Year" }
      ],
      bgGradient: "from-emerald-500/5 via-emerald-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/50",
      buttonClass: "bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/50"
    },
    {
      name: "Learning Platforms",
      subtitle: "Education & Development",
      features: [
        { text: "Coursera Plus", detail: "1 Year - Inquire" },
        { text: "edX Unlimited", detail: "1 Year - Inquire" }
      ],
      bgGradient: "from-blue-500/5 via-blue-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/50",
      buttonClass: "bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/50"
    },
    {
      name: "Entertainment Hub",
      subtitle: "Premium Streaming Services",
      features: [
        { text: "Netflix Premium 4K", detail: "1 Month" },
        { text: "Amazon Prime Video", detail: "6 Months" },
        { text: "Disney+ Hotstar", detail: "12 Months" },
        { text: "SonyLIV Premium", detail: "12 Months" },
        { text: "ZEE5 Premium", detail: "12 Months" },
        { text: "YouTube Premium", detail: "12 Months" },
        { text: "IPTV Premium", detail: "6 Months" },
        { text: "IPTV Premium", detail: "12 Months" }
      ],
      bgGradient: "from-red-500/5 via-red-500/10 to-transparent",
      borderColor: "group-hover:border-red-500/50",
      buttonClass: "bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50"
    }
  ]

  const renderCard = (plan, index) => (
    <div 
      key={index} 
      className={`relative border border-zinc-800/50 rounded-xl overflow-hidden
        transition-all duration-500 group hover:scale-[1.02] ${plan.borderColor}
        backdrop-blur-sm hover:shadow-lg hover:shadow-black/20`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-60`} />
      
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      
      {/* Content */}
      <div className="relative p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
            {plan.name}
            {plan.name === "Entertainment Hub" && (
              <span className="text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                Popular
              </span>
            )}
          </h3>
          <p className="text-zinc-400">{plan.subtitle}</p>
        </div>

        <div className="space-y-3 mb-6">
          {plan.name === "Entertainment Hub" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {plan.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col p-4 rounded-lg bg-black/40 hover:bg-black/60
                    transition-all duration-300 border border-zinc-800/30 hover:border-red-500/30"
                >
                  <span className="text-white/90 font-medium mb-1">{feature.text}</span>
                  <span className="text-zinc-400 text-sm">{feature.detail}</span>
                </div>
              ))}
            </div>
          ) : (
            plan.features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg
                  bg-black/40 hover:bg-black/60 transition-all duration-300
                  border border-zinc-800/30"
              >
                <span className="text-white/90">{feature.text}</span>
                <span className="text-zinc-400">{feature.detail}</span>
              </div>
            ))
          )}
        </div>

        <Button 
          variant="secondary"
          href="https://wa.me/9029151181"
          className={`w-full justify-center transition-all duration-300 
            border border-zinc-800/50 ${plan.buttonClass}`}
        >
          Get Access
        </Button>
      </div>
    </div>
  )

  return (
    <div id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative border-[1px] border-zinc-800/50 rounded-xl p-8 md:p-12 overflow-hidden bg-zinc-950/80">
          {/* Subtle Glow Effects */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          
          <div className="relative z-10">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Premium Digital Tools
              </h2>
              <p className="text-blue-400 text-lg font-medium mb-2">
                100% Genuine & Private Access
              </p>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Choose from our wide range of premium tools and services
              </p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-8">
              {/* Professional Tools Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingPlans.slice(0, 3).map((plan, index) => renderCard(plan, index))}
              </div>

              {/* AI & Learning Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pricingPlans.slice(3, 5).map((plan, index) => renderCard(plan, index))}
              </div>

              {/* Entertainment Hub Section */}
              <div className="w-full">
                {pricingPlans.slice(5).map((plan, index) => renderCard(plan, index))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <div className="p-6 border border-zinc-800 rounded-xl bg-black/20">
                <h3 className="text-xl font-bold text-white mb-2">Looking for Bundle Deals?</h3>
                <p className="text-zinc-400 mb-6">
                  Contact us for special discounts on multiple tools or bulk purchases
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
    </div>
  )
}

export default Plans