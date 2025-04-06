import React from 'react';
import Button from './Button';

const WhatsAppCards = () => {
  const cards = [
    {
      title: "Premium Hub",
      description: "Join our exclusive Premium Hub community for latest updates, discussions, and premium content sharing.",
      image: "https://placehold.co/600x400/0077B5/ffffff?text=Premium+Hub",
      link: "https://chat.whatsapp.com/IGWImnBiXJx1wJ6CGTuE8w",
    },
    {
      title: "XYLE OTT",
      description: "Connect with XYLE OTT enthusiasts, get streaming updates, and share your favorite content.",
      image: "https://placehold.co/600x400/11111/ffffff?text=XYLE+OTT",
      link: "https://chat.whatsapp.com/IEka2OGQwHyKqlaBNClozP",
      bgGradient: "bg-zinc-900 to-zinc-800",
    },
    {
      title: "LinkedIn Author Seller",
      description: "Network with LinkedIn content creators and sellers. Share strategies and grow together Join with as.",
      image: "https://placehold.co/600x400/0A66C2/ffffff?text=LinkedIn+Seller",
      link: "https://chat.whatsapp.com/IP0IZVJymid5IQwDq7YtO3",
    }
  ];

  return (
    <section className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl backdrop-blur-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300`}
            >
              <div className="p-1">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-48 object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white/90 mb-3">
                  {card.title}
                </h3>
                <p className="text-white/60 mb-6 text-sm leading-relaxed">
                  {card.description}
                </p>
                <Button
                  href={card.link}
                  variant="secondary"
                  className="w-full justify-center group"
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
    </section>
  );
};

export default WhatsAppCards;