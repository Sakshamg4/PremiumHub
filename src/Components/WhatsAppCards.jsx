import React from 'react';
import Button from './Button';

const WhatsAppCards = () => {
  const cards = [
    {
      title: "Premium Hub Community",
      description: "Join our exclusive community for premium digital tools and services. Get instant updates about:",
      features: [
        "LinkedIn Premium & Sales Navigator deals",
        "Creative Cloud & Canva Pro offers",
        "OTT Platform subscription updates",
        "Early access to new services"
      ],
      icon: "💎",
      link: "https://chat.whatsapp.com/IGWImnBiXJx1wJ6CGTuE8w",
      bgGradient: "from-blue-600/10 via-blue-600/5 to-transparent",
      borderHover: "hover:border-blue-500/50"
    },
    {
      title: "XYLE OTT Network",
      description: "Your gateway to premium streaming entertainment. Connect with us for:",
      features: [
        "Netflix, Prime & Hotstar updates",
        "New releases & content alerts",
        "Special streaming packages",
        "Technical support & assistance"
      ],
      icon: "🎬",
      link: "https://chat.whatsapp.com/IEka2OGQwHyKqlaBNClozP",
      bgGradient: "from-red-600/10 via-red-600/5 to-transparent",
      borderHover: "hover:border-red-500/50"
    },
    {
      title: "LinkedIn Authors Hub",
      description: "Network with professional LinkedIn content creators. Benefits include:",
      features: [
        "Content creation strategies",
        "Premium account tips & tricks",
        "Networking opportunities",
        "Career growth resources"
      ],
      icon: "👔",
      link: "https://chat.whatsapp.com/IP0IZVJymid5IQwDq7YtO3",
      bgGradient: "from-[#0A66C2]/10 via-[#0A66C2]/5 to-transparent",
      borderHover: "hover:border-[#0A66C2]/50"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content with Background */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,#000000)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,100,255,0.1),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,200,100,0.1),transparent_40%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                Join Our Communities
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Connect with like-minded people, get exclusive updates, and stay informed about our latest offerings
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div 
                  key={index} 
                  className={`relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
                    overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] 
                    hover:shadow-2xl ${card.borderHover} group h-full`}
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient}`} />
                  
                  <div className="relative p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-zinc-800/50 border border-zinc-700/50 
                      flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {card.title}
                      </h3>
                      <p className="text-zinc-400 mb-4 text-sm">
                        {card.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3">
                        {card.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-zinc-300 text-sm">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button Section */}
                    <div className="mt-6 pt-6 border-t border-zinc-800/50">
                      <Button
                        href={card.link}
                        variant="secondary"
                        className="w-full justify-center bg-black/20 hover:bg-black/40 
                          transition-all duration-300 border border-zinc-800 group-hover:border-zinc-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Group
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCards;