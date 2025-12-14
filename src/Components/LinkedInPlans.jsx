import React, { memo } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { useData } from '../context/DataContext';

const FeatureItem = memo(({ text }) => (
    <div className="flex items-start gap-3 text-sm text-[#52525b]">
        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>{text}</span>
    </div>
));

const PlanCard = memo(({ plan }) => (
    <div className={`group relative bg-[#0077b5]/5 backdrop-blur-sm border border-[#0077b5]/20 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full hover:bg-[#0077b5]/10`}>
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${plan.bgColor}`} />

        <div className="mb-6">
            <div className={`w-12 h-12 rounded-xl ${plan.bgColor}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FaLinkedin className={`w-6 h-6 ${plan.color}`} />
            </div>
            <h3 className="text-xl font-bold text-[#1e293b] mb-2">{plan.name}</h3>
            <p className="text-[#64748b] text-sm font-medium">{plan.description}</p>
        </div>

        <div className="space-y-3 mb-8 flex-1">
            {plan.features.map((feature, idx) => (
                <FeatureItem key={idx} text={feature} />
            ))}
        </div>

        <a
            href="https://wa.me/919029151181"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] ${plan.bgColor} hover:brightness-110`}
        >
            Get Started
        </a>
    </div>
));

const LinkedInPlans = () => {
    const { linkedInPlans } = useData();
    return (
        <section id="linkedin-plans" className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#0077b5]/10 text-[#0077b5] font-semibold text-sm mb-4">
                        <FaLinkedin className="w-4 h-4" />
                        Official Partner
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1e293b] mb-6 flex flex-col md:flex-row items-center justify-center gap-3">
                        <span>Unlock the Full Power of</span>
                        <span className="text-[#0077b5] flex items-center">
                            LinkedIn
                        </span>
                    </h2>
                    <p className="text-lg text-[#64748b] leading-relaxed">
                        Choose the perfect plan to accelerate your career, grow your business, or find top talent.
                        Authentic upgrades at unbeatable prices.
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <a
                        href="/linkedin-compare"
                        className="inline-flex items-center gap-2 bg-white border border-[#0077b5]/20 text-[#0077b5] px-6 py-3 rounded-full font-bold hover:bg-[#0077b5]/5 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        <span>⚖️ Compare Prices & Save</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {linkedInPlans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(LinkedInPlans);
