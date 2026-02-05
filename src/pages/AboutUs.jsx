import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaShieldAlt, FaHandshake, FaUserClock, FaLightbulb, FaArrowRight, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Button from '../Components/Button';
import { useData } from '../context/DataContext';

const TrustIndicators = ({ activeMembers }) => (
    <div className="pt-8 border-t border-[#bcccdc]/50 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white relative overflow-hidden shadow-sm">
                        <img
                            src={`https://i.pravatar.cc/100?img=${i + 15}`}
                            alt={`User ${i}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm relative z-10">
                    {activeMembers}
                </div>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex text-amber-400 gap-0.5 text-sm">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                </div>
                <p className="text-slate-600 text-sm font-semibold">
                    Trusted Community
                </p>
            </div>
        </div>
        <p className="text-slate-500 text-xs font-medium">
            Rated 4.8/5 by professionals worldwide
        </p>
    </div>
);

const AboutUs = () => {
    const { aboutStats } = useData();

    const activeMembers = useMemo(() => {
        return aboutStats?.find(s => s.label === 'Active Members')?.number || '5000+';
    }, [aboutStats]);

    return (
        <main className="container mx-auto px-4 pt-20 pb-20">
            <Helmet>
                <title>About Us - PremiumToolsHub | Our Story & Mission</title>
                <meta name="description" content="Discover PremiumToolsHub's mission to democratize access to premium software. Learn why thousands trust us for affordable, genuine digital tools." />
                <link rel="canonical" href="https://www.premiumtoolshub.in/about-us" />
            </Helmet>

            {/* Hero Section - Nested Container to match Home Page Alignment */}
            <div className="min-h-screen py-10 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="relative border-[1px] border-[#bcccdc]/50 rounded-xl p-8 md:p-12 overflow-hidden">
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-[#f8fafc]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#d9eafd_0%,transparent_75%)] opacity-60" />
                        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] bg-[radial-gradient(circle_at_center,#bcccdc_0%,transparent_70%)] opacity-30 blur-3xl" />
                        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[80%] bg-[radial-gradient(circle_at_center,#9aa6b2_0%,transparent_70%)] opacity-15 blur-3xl" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />

                        <div className="relative z-10 space-y-8 text-center max-w-4xl mx-auto">

                            {/* Badge */}
                            <div className="flex justify-center">
                                <div className="relative group cursor-default">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500" />
                                    <div className="relative overflow-hidden rounded-full p-[1px]">
                                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F1F5F9_0%,#3B82F6_50%,#F1F5F9_100%)]" />
                                        <div className="relative inline-flex items-center gap-3 px-4 py-2 bg-white/95 backdrop-blur-xl rounded-full">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-100 shadow-sm text-blue-500">
                                                ℹ️
                                            </span>
                                            <span className="text-md md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 tracking-tight">
                                                Our Story & Mission
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Heading */}
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col items-center gap-2 text-[#18181b]">
                                    Empowering Creators With
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                                        Premium Possibilities
                                    </span>
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-[#52525b] leading-relaxed max-w-3xl mx-auto font-medium">
                                We bridge the gap between enterprise-grade software and ambitious individuals. Access the world's best tools without the barrier of high costs.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-2">
                                <Button href="#mission" variant="gradient" className="min-w-[160px] justify-center" showIcon={false} icon={null}>
                                    Read Our Mission
                                </Button>
                                <Button href="/#services" variant="secondary" className="min-w-[160px] justify-center">
                                    Browse Tools
                                </Button>
                            </div>

                            {/* Trust Indicators */}
                            <TrustIndicators activeMembers={activeMembers} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <section id="mission" className="mb-24 scroll-mt-32">
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Mission Card */}
                    <div className="group relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-8 text-3xl shadow-inner">
                                🚀
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To democratize access to premium productivity. We believe financial constraints shouldn't limit creativity. By providing affordable shared access, we level the playing field for students, freelancers, and startups.
                            </p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="group relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-purple-100/50 rounded-2xl flex items-center justify-center mb-8 text-3xl shadow-inner">
                                💡
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                A digital landscape where tool availability is universal. We envision a future where every creator has the full stack of premium software at their fingertips, enabling them to build, design, and innovate without limits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Why Trust Us?</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                        More than just a marketplace. We are your partners in productivity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                        {
                            icon: <FaShieldAlt />,
                            title: "100% Legitimate",
                            desc: "We strictly refrain from using cracked or stolen accounts. All access is provisioned through legitimate corporate or shared licensing.",
                            color: "text-green-600",
                            bg: "bg-green-50"
                        },
                        {
                            icon: <FaHandshake />,
                            title: "Instant Delivery",
                            desc: "Time is money. Our automated systems and dedicated team ensure you get access to your tools within minutes of purchase.",
                            color: "text-blue-600",
                            bg: "bg-blue-50"
                        },
                        {
                            icon: <FaUserClock />,
                            title: "Human Support",
                            desc: "Real people, real answers. Our WhatsApp support line is open to resolve any issues you might face instantly.",
                            color: "text-purple-600",
                            bg: "bg-purple-50"
                        },
                        {
                            icon: <FaLightbulb />,
                            title: "Unbeatable Value",
                            desc: "Save up to 85% compared to official pricing without compromising on features or reliability.",
                            color: "text-orange-600",
                            bg: "bg-orange-50"
                        }
                    ].map((item, index) => (
                        <div key={index} className="group bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-24">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is this service legal?", a: "Absolutely. We leverage family plans, team licenses, and authorized reseller programs to bring costs down. You are joining a legitimate shared workspace." },
                            { q: "What happens if a tool stops working?", a: "We offer a full warranty on your subscription period. If any issue arises, simply message us, and we will fix it or replace the account immediately." },
                            { q: "How do I receive my product?", a: "Delivery is typically done via WhatsApp or Email. Ensure you provide correct contact details during checkout for the fastest service." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white/60 backdrop-blur border border-slate-200 rounded-2xl p-6 hover:bg-white/80 transition-colors">
                                <h3 className="font-bold text-slate-900 text-lg mb-2">{faq.q}</h3>
                                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="">
                <div className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay" />

                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/30 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/30 blur-[100px] rounded-full" />

                    <div className="relative z-10 p-12 md:p-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Ready to Upgrade Your Toolkit?
                        </h2>
                        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                            Join the community of 5,000+ smart professionals saving big on premium software today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                href="/#services"
                                target="_self"
                                variant="gradient"
                                className="px-8 py-4 text-lg shadow-blue-500/25 shadow-xl"
                                showIcon={false}
                                icon={<FaArrowRight />}
                            >
                                Explore Plans
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
