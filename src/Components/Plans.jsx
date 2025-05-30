import React, { memo, useState, useEffect } from 'react'
import Button from './Button'
import CTAButton from './CTAButton'
const Plans = () => {
  const [visibleSection, setVisibleSection] = useState('none');

  // Performance optimization: Use Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Only trigger once when section becomes visible
          setVisibleSection('all');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px 0px' } // Start loading earlier
    );

    const section = document.getElementById('pricing');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Pricing data
  const pricingPlans = [
    {
      name: "LinkedIn Premium Plans",
      subtitle: "Professional Growth, Sales & Marketing",
      features: [
        { text: "LinkedIn Career Plan", detail: "Available" },
        { text: "LinkedIn Business Plan", detail: "Available" },
        { text: "Sales Navigator", detail: "Available" },
        { text: "Recruiter Lite", detail: "Available" },
        { text: "Linkedin Ads Credit", detail: "Available" }
      ],
      bgColor: "bg-[#0077B5]/15",
      borderColor: "group-hover:border-[#0077B5]/50",
      buttonClass: "bg-[#0077B5]/10 hover:bg-[#0077B5]/20" // LinkedIn section
    },
    {
      name: "Creative Tools",
      subtitle: "Design & Content",
      features: [
        { text: "Adobe Creative Cloud", detail: "Available" },
        { text: "Canva Pro", detail: "Available" },
        { text: "Autodesk All Apps", detail: "Available" },
        { text: "Loom Premium", detail: "Available" }
      ],
      bgColor: "bg-purple-500/5",
      borderColor: "group-hover:border-purple-500/50",
      buttonClass: "bg-purple-500/10 hover:bg-purple-500/20"
    },
    {
      name: "AI & Learning",
      subtitle: "AI-Powered Tools, Learning",
      features: [
        { text: "Perplexity AI", detail: "Available" },
        { text: "You.com AI", detail: "Available" },
        { text: "GitHub Copilot AI", detail: "Available" },
        { text: "Coursera Plus", detail: "Available" },
        { text: "edX Unlimited", detail: "Available" }
      ],
      bgColor: "bg-emerald-500/5",
      borderColor: "group-hover:border-emerald-500/50",
      buttonClass: "bg-emerald-500/10 hover:bg-emerald-500/20" // AI & Learning section
    }
  ]

  // Optimized card render function with minimal expensive properties
  const renderCard = (plan, index) => (
    <div 
      key={index} 
      className={`relative border border-zinc-800/50 rounded-xl overflow-hidden ${plan.borderColor}
        bg-black/40 ${plan.bgColor} h-full`}
    >
      {/* Content - simplified structure */}
      <div className="relative p-6 h-full flex flex-col">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
            {plan.name}
            {plan.name === "Entertainment Hub" && (
              <span className="text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                Popular
              </span>
            )}
          </h3>
          <p className="text-zinc-400">{plan.subtitle}</p>
        </div>

        <div className="space-y-2 flex-grow mb-5">
          {plan.features.map((feature, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg
                bg-black/40 border border-zinc-800/30"
            >
              <span className="text-white/90">{feature.text}</span>
              <span className="text-zinc-400">{feature.detail}</span>
            </div>
          ))}
        </div>

        <Button 
          variant="secondary"
          href="https://wa.me/9029151181"
          className={`w-full justify-center border border-zinc-100/50 ${plan.buttonClass}`}
        >
          Get Pricing
        </Button>
      </div>
    </div>
  )

  // Performance-optimized section render
  const renderSection = (plans, className) => (
    <div className={className}>
      {plans.map((plan, index) => renderCard(plan, index))}
    </div>
  );

  return (
    <div id="pricing" className="py-10 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative border-[1px] border-zinc-800/50 rounded-xl p-8 md:p-12 bg-zinc-950/90">
          {/* Simplified border effect - single element */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          
          <div className="relative z-10">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Premium Digital Tools
              </h2>
              <span className="inline-block bg-blue-950/40 rounded-full px-4 py-1 mb-2">
                <p className="text-blue-400 text-lg font-medium m-0">
                  100% Genuine & Private Access
                </p>
              </span>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Choose from our wide range of premium tools and services
              </p>
            </div>

            {/* Main Grid Layout - Only rendered when visible */}
            {visibleSection === 'all' && (
              <div className="grid grid-cols-1 gap-6">
                {/* Professional Tools Section */}
                {renderSection(
                  pricingPlans.slice(0, 3),
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6"
                )}
              </div>
            )}

            {/* Bottom Note - Simplified */}
            <CTAButton title="Looking for Bundle Deals?" description="Contact us for special discounts on multiple tools or bulk purchases" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Plans)