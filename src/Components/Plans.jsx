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
      name: "LinkedIn Premium",
      subtitle: "Professional Growth",
      features: [
        { text: "LinkedIn Business Plan", detail: "6 Months" },
        { text: "LinkedIn Business Plan", detail: "9 Months" },
        { text: "LinkedIn Business Plan", detail: "12 Months" },
        { text: "LinkedIn Career Plan", detail: "3 Months" },
        { text: "LinkedIn Career Plan", detail: "12 Months" }
      ],
      bgColor: "bg-[#0077B5]/5",
      borderColor: "group-hover:border-[#0077B5]/50",
      buttonClass: "bg-[#0077B5]/10 hover:bg-[#0077B5]/20"
    },
    {
      name: "LinkedIn Business",
      subtitle: "Sales & Marketing",
      features: [
        { text: "Sales Navigator Core", detail: "2 Months" },
        { text: "Sales Navigator Advance", detail: "2 Months" },
        { text: "Recruiter Lite", detail: "5 Month" },
        { text: "Linkedin Ads Credit", detail: "$100-$300" }
      ],
      bgColor: "bg-[#0A66C2]/5",
      borderColor: "group-hover:border-[#0A66C2]/50",
      buttonClass: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20"
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
      bgColor: "bg-purple-500/5",
      borderColor: "group-hover:border-purple-500/50",
      buttonClass: "bg-purple-500/10 hover:bg-purple-500/20"
    },
    {
      name: "AI Solutions",
      subtitle: "AI-Powered Tools",
      features: [
        { text: "Perplexity AI", detail: "1 Year" },
        { text: "You.com AI", detail: "1 Year" },
        { text: "GitHub Copilot AI", detail: "1 Year" }
      ],
      bgColor: "bg-emerald-500/5",
      borderColor: "group-hover:border-emerald-500/50",
      buttonClass: "bg-emerald-500/10 hover:bg-emerald-500/20"
    },
    {
      name: "Learning Platforms",
      subtitle: "Education & Development",
      features: [
        { text: "Coursera Plus", detail: "1 Year - Inquire" },
        { text: "edX Unlimited", detail: "1 Year - Inquire" }
      ],
      bgColor: "bg-blue-500/5",
      borderColor: "group-hover:border-blue-500/50",
      buttonClass: "bg-blue-500/10 hover:bg-blue-500/20"
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
          className={`w-full justify-center border border-zinc-800/50 ${plan.buttonClass}`}
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
        <div className="relative border-[1px] border-zinc-800/50 rounded-xl p-8 md:p-12 bg-zinc-950/80">
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

                {/* AI & Learning Section */}
                {renderSection(
                  pricingPlans.slice(3, 5),
                  "grid grid-cols-1 md:grid-cols-2 gap-5 mb-6"
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