import React, { memo } from 'react';
import Button from './Button';
import { useData } from '../Context/DataContext';

// Reusable Components
const FeatureItem = memo(({ feature }) => (
  <li className="flex items-center gap-3 text-[#64748b] text-sm">
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
    </svg>
    {feature}
  </li>
));

const FeaturesList = memo(({ features }) => (
  <ul className="space-y-3">
    {features.map((feature, idx) => (
      <FeatureItem key={idx} feature={feature} />
    ))}
  </ul>
));

const CardIcon = memo(({ icon }) => (
  <div className="w-16 h-16 rounded-full bg-[#f8fafc]/50 border border-[#bcccdc]/50 
    flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
    {icon}
  </div>
));

const CardButton = memo(({ link }) => (
  <div className="mt-6 pt-6 border-t border-[#bcccdc]/50">
    <Button
      href={link}
      variant="secondary"
      className="w-full justify-center bg-[#f8fafc]/20 hover:bg-[#f8fafc]/40 
        transition-all duration-300 border border-[#bcccdc] group-hover:border-[#9aa6b2] text-[#1e293b] hover:text-[#1e293b]"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our community on WhatsApp"
    >
      Join Our Community Now!
    </Button>
  </div>
));

const WhatsAppCard = memo(({ card }) => (
  <div
    className={`relative bg-[#f8fafc]/50 backdrop-blur-xl border border-[#bcccdc]/50 rounded-xl 
      overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] 
      hover:shadow-2xl ${card.borderHover} group h-full`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient}`} />
    <div className="relative p-6 flex flex-col h-full">
      <CardIcon icon={card.icon} />
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-[#1e293b] mb-3">
          {card.title}
        </h3>
        <p className="text-[#64748b] mb-4 text-sm">
          {card.description}
        </p>
        <FeaturesList features={card.features} />
      </div>
      <CardButton link={card.link} />
    </div>
  </div>
));

const SectionHeader = memo(() => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1e293b] via-[#9aa6b2] to-[#1e293b]">
      Join Our Communities
    </h2>
    <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
      Connect with like-minded people, get exclusive updates, and stay informed about our latest offerings
    </p>
  </div>
));

const BackgroundEffects = memo(() => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f8fafc,#d9eafd)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(154,166,178,0.1),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(188,204,220,0.1),transparent_40%)]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
  </div>
));

const WhatsAppCards = () => {
  const { whatsAppCards } = useData();
  return (
    <section className="relative py-10 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <BackgroundEffects />
          <div className="relative p-8 md:p-12">
            <SectionHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatsAppCards.map((card, index) => (
                <WhatsAppCard key={index} card={card} />
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(WhatsAppCards);