import React from 'react';
import Button from './Button';

const WhatsAppCards = () => {
  const cards = [
    {
      title: "Premium Hub",
      description: "Join our exclusive Premium Hub community for latest updates, discussions, and premium content sharing.",
      image: "https://placehold.co/600x400/0077B5/ffffff?text=Premium+Hub",
      link: "https://chat.whatsapp.com/IGWImnBiXJx1wJ6CGTuE8w",
      bgGradient: "from-blue-600/20 to-blue-800/20",
    },
    {
      title: "XYLE OTT",
      description: "Connect with XYLE OTT enthusiasts, get streaming updates, and share your favorite content.",
      image: "https://placehold.co/600x400/11111/ffffff?text=XYLE+OTT",
      link: "https://chat.whatsapp.com/IEka2OGQwHyKqlaBNClozP",
      bgGradient: "from-zinc-800/40 to-zinc-900/40",
    },
    {
      title: "LinkedIn Author Seller",
      description: "Network with LinkedIn content creators and sellers. Share strategies and grow together Join with as.",
      image: "https://placehold.co/600x400/0A66C2/ffffff?text=LinkedIn+Seller",
      link: "https://chat.whatsapp.com/IP0IZVJymid5IQwDq7YtO3",
      bgGradient: "from-blue-500/20 to-blue-700/20",
    }
  ];

  return (
    <section className="min-h-screen ">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${card.bgGradient} rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl`}
              >
                <div className="p-2">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-48 object-cover rounded-lg opacity-90 hover:opacity-100 transition-opacity shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-white/70 mb-6 text-sm leading-relaxed">
                    {card.description}
                  </p>
                  <Button
                    href={card.link}
                    variant="secondary"
                    className="w-full justify-center group hover:bg-white/15 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join WhatsApp Group
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCards;