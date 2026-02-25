
import React, { memo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { serviceDetails } from '../data/servicesData';
import { motion } from 'framer-motion';
import { MdArrowBack, MdCheck, MdSmartphone, MdOpenInNew } from 'react-icons/md';
import SEO from '../Components/SEO';

const ServiceDetail = () => {
    const { id } = useParams();
    const service = serviceDetails[id];

    if (!service) {
        return <Navigate to="/404" replace />;
    }

    const { title, subtitle, icon: Icon, description, color, gradient, features, plans, metaTitle, metaDescription } = service;

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            <SEO
                title={metaTitle || `${title} | Premium Tools Hub`}
                description={metaDescription || description}
            />
            {/* Hero Section */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} text-white pt-32 pb-20 md:pt-40 md:pb-32 px-4`}>
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

                <div className="container mx-auto relative z-10 max-w-5xl">
                    <Link
                        to="/#services"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                    >
                        <MdArrowBack className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Services</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row items-center md:items-start gap-8"
                    >
                        <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                            <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" />
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{title}</h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl">
                                {subtitle}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Description Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                        >
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Overview</h2>
                            <div className="text-[#52525b] leading-relaxed text-lg space-y-4">
                                {description}
                            </div>
                        </motion.div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 transition-colors"
                                >
                                    <div className={`w-10 h-10 rounded-lg ${color} bg-opacity-10 flex items-center justify-center mb-4 text-${color.replace('bg-', '')}`}>
                                        <MdCheck className={`w-5 h-5 text-slate-700`} />
                                    </div>
                                    <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-[#52525b] leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Pricing */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {plans.map((plan, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (0.1 * idx) }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200"
                                >
                                    <div className={`h-2 ${service.color}`} />
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-[#52525b] mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                                            {plan.originalPrice && (
                                                <span className="text-sm text-slate-400 line-through decoration-red-400">
                                                    {plan.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                            {plan.features.map((item, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-3 text-sm text-[#52525b]">
                                                    <MdCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <a
                                            href={`https://wa.me/919029151181?text=Hi, I'm interested in ${title} - ${plan.name} plan.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white transition-transform active:scale-95 shadow-md bg-gradient-to-r ${gradient} hover:shadow-lg`}
                                        >
                                            <MdSmartphone className="w-5 h-5" />
                                            Get this Plan
                                        </a>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                                <p className="text-sm text-[#52525b] mb-2">Need a custom plan?</p>
                                <a
                                    href="https://wa.me/919029151181"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1e293b] font-medium hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                                >
                                    Chat with us <MdOpenInNew className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default memo(ServiceDetail);
