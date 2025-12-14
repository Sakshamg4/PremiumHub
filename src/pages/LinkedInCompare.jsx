import React, { memo } from 'react';
import { FaLinkedin, FaCheck, FaTimes } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const PlanComparisonCard = memo(({ plan, originalPrice }) => (
    <div className={`relative bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden group`}>
        {/* Accent Top */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${plan.bgColor}`} />

        <div className="mb-6 text-center">
            <div className={`w-16 h-16 mx-auto rounded-2xl ${plan.bgColor}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FaLinkedin className={`w-8 h-8 ${plan.color}`} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm font-medium mb-4">{plan.description}</p>

            {/* Pricing Section */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Price</span>
                    <div className="text-xl font-bold text-slate-400 line-through decoration-red-400 decoration-2">
                        {originalPrice}
                    </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Our Offer</span>
                    <div className="text-3xl font-black text-slate-800 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent transform scale-100 group-hover:scale-105 transition-transform">
                        70-80% OFF
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">*Exact price on request</p>
                </div>
            </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8 flex-1">
            {plan.features.slice(0, 5).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className={`mt-0.5 p-0.5 rounded-full ${plan.bgColor}/10 shrink-0`}>
                        <FaCheck className={`w-2.5 h-2.5 ${plan.color}`} />
                    </div>
                    <span>{feature}</span>
                </div>
            ))}
            {plan.features.length > 5 && (
                <p className="text-xs text-center text-slate-400 italic mt-2">+ more premium features</p>
            )}
        </div>

        {/* Call to Action */}
        <a
            href={`https://wa.me/919029151181?text=Hi,%20I%20want%20to%20know%20the%20price%20for%20LinkedIn%20${plan.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 rounded-xl font-bold text-center text-white shadow-lg shadow-${plan.color.split('-')[1]}-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 ${plan.bgColor}`}
        >
            Get Price Quote
        </a>
    </div>
));

const LinkedInCompare = () => {
    const { linkedInPlans } = useData();

    // Approximate Market Prices for display purposes
    const marketPrices = {
        "Career": "₹2,500/mo", // Approx
        "Business": "₹4,500/mo", // Approx
        "Sales Navigator": "₹7,000/mo", // Approx
        "Recruiter Lite": "₹13,000/mo" // Approx
    };

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                        Why Pay Full Price? <br />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Save up to 80%
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Get the exact same premium features you love, at a fraction of the cost.
                        Fully legal, secure, and instant activation.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                    {linkedInPlans.map((plan, index) => (
                        <PlanComparisonCard
                            key={index}
                            plan={plan}
                            originalPrice={marketPrices[plan.name] || "$$$"}
                        />
                    ))}
                </div>

                {/* Detailed Comparison Table */}
                <div className="max-w-6xl mx-auto mb-20 overflow-x-auto rounded-3xl border border-slate-200 shadow-xl bg-white">
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-1/4 sticky left-0 bg-slate-50 z-10">Features</th>
                                {linkedInPlans.map((plan, idx) => (
                                    <th key={idx} className={`p-6 text-center w-[18%]`}>
                                        <div className={`text-lg font-bold mb-1 ${plan.color}`}>{plan.name}</div>
                                        <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
                                            {marketPrices[plan.name] || 'Custom'}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {/* InMail Credits */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-semibold text-slate-700 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">InMail Credits / Month</td>
                                <td className="p-6 text-center text-slate-600">5</td>
                                <td className="p-6 text-center text-slate-600 font-medium">15</td>
                                <td className="p-6 text-center text-slate-800 font-bold bg-emerald-50/30">50</td>
                                <td className="p-6 text-center text-slate-800 font-bold bg-purple-50/30">30</td>
                            </tr>

                            {/* Profile Views */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-semibold text-slate-700 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Who Viewed Your Profile</td>
                                <td className="p-6 text-center text-slate-600">Last 90 Days</td>
                                <td className="p-6 text-center text-slate-600">Last 365 Days</td>
                                <td className="p-6 text-center text-slate-600">Last 365 Days</td>
                                <td className="p-6 text-center text-slate-600">Last 365 Days</td>
                            </tr>

                            {/* Search */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-semibold text-slate-700 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Unlimited People Browsing</td>
                                <td className="p-6 text-center">
                                    <FaTimes className="w-5 h-5 text-slate-300 mx-auto" />
                                </td>
                                <td className="p-6 text-center">
                                    <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                                </td>
                                <td className="p-6 text-center bg-emerald-50/30">
                                    <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                                </td>
                                <td className="p-6 text-center bg-purple-50/30">
                                    <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                                </td>
                            </tr>

                            {/* Advanced Search */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-semibold text-slate-700 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Advanced Search Filters</td>
                                <td className="p-6 text-center">
                                    <FaTimes className="w-5 h-5 text-slate-300 mx-auto" />
                                </td>
                                <td className="p-6 text-center">
                                    <FaTimes className="w-5 h-5 text-slate-300 mx-auto" />
                                </td>
                                <td className="p-6 text-center bg-emerald-50/30">
                                    <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Lead & Account</span>
                                </td>
                                <td className="p-6 text-center bg-purple-50/30">
                                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">Candidate</span>
                                </td>
                            </tr>

                            {/* Best For */}
                            <tr className="bg-slate-50/80">
                                <td className="p-6 font-bold text-slate-800 sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Best For</td>
                                <td className="p-6 text-center text-sm font-medium text-slate-600">Job Seekers</td>
                                <td className="p-6 text-center text-sm font-medium text-slate-600">Networking & Growth</td>
                                <td className="p-6 text-center text-sm font-bold text-emerald-700 bg-emerald-50/30 relative">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500/20"></div>
                                    Sales Professionals
                                </td>
                                <td className="p-6 text-center text-sm font-bold text-purple-700 bg-purple-50/30">Recruiters & HR</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-bold text-slate-800 mb-1">100% Genuine</h4>
                        <p className="text-sm text-slate-500">Official activation on your own account</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaLinkedin className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-slate-800 mb-1">No Ban Risk</h4>
                        <p className="text-sm text-slate-500">Safe methods compliant with policies</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-1">Instant Access</h4>
                        <p className="text-sm text-slate-500">Get upgraded typically within 15 mins</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkedInCompare;
