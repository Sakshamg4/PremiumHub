import React, { memo } from 'react';
import { useData } from '../context/DataContext';
import ContactForm from './ContactForm';

// Reusable Feature Item Component
const FeatureItem = memo(({ text }) => (
  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#f8fafc]/40 border border-[#bcccdc]/30 hover:border-green-500/20 transition-colors">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/10 flex items-center justify-center">
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
    </div>
    <span className="text-[#52525b] text-sm sm:text-base font-medium">{text}</span>
  </div>
));

// Reusable WhatsApp Button Component
const WhatsAppButton = memo(({ onClick }) => (
  // Add aria-label to WhatsApp button for better accessibility
  <button
    onClick={onClick}
    aria-label="Chat with us on WhatsApp"
    className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-green-500 
      text-white text-sm p-4 sm:p-5 rounded-xl font-semibold transition-all duration-300
      hover:shadow-xl hover:shadow-green-500/20 transform hover:scale-[1.02]
      border border-green-500/20 w-full"
  >
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] 
      bg-[length:250%_250%] bg-[0%_0%] hover:bg-[100%_100%] transition-all duration-1000" />

    <div className="relative flex items-center justify-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
        </svg>
      </div>
      <span className="text-sm sm:text-base">Chat on WhatsApp</span>
    </div>
  </button>
));

// Main Contact Component
const Contact = () => {
  const { contactInfo } = useData();
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank');
  };

  return (
    <div className="relative py-8 md:py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Content with Background */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f8fafc,#d9eafd)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(154,166,178,0.1),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(188,204,220,0.1),transparent_40%)]" />
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-4 sm:p-6">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-[#1e293b]">
                Need Help?
              </h2>
              <p className="text-base sm:text-lg text-[#52525b] font-medium">
                Our support team is just a message away
              </p>
            </div>




            {/* Contact Card */}
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-[#f8fafc]/50 backdrop-blur-xl border border-[#bcccdc]/50 rounded-2xl shadow-[0_0_30px_-12px] shadow-[#9aa6b2]/10">
                {/* Card Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-5 sm:p-6">
                  {/* Left Column - Contact Form */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-4">
                      Send us a Message
                    </h3>
                    <ContactForm />
                  </div>

                  {/* Right Column - Info & WhatsApp */}
                  <div className="flex flex-col gap-5 sm:gap-6 justify-center border-t md:border-t-0 md:border-l border-[#bcccdc]/30 pt-6 md:pt-0 md:pl-6 lg:pl-8">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-2">
                        Quick Support
                      </h3>
                      <p className="text-[#52525b] text-sm font-medium">
                        Instant responses on WhatsApp Business
                      </p>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <FeatureItem text="Response within 2-4 hours" />
                      <FeatureItem text={`Available ${contactInfo.hours}`} />
                      <FeatureItem text="Secure payment options" />
                    </div>

                    <WhatsAppButton onClick={handleWhatsAppClick} />

                    <div className="p-3 rounded-xl bg-[#f8fafc]/40 border border-[#bcccdc]/30 text-center">
                      <p className="text-[#52525b] text-xs font-medium mb-1">Or email us at</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-[#18181b] font-semibold text-sm hover:underline">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);