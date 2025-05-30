import React, { memo } from 'react';

// Constants
const CONTACT_INFO = {
  phone: "+91 9029151181",
  email: "officallinkedinseller@gmail.com",
  whatsapp: "+919151181",
  hours: "24/7 Support Available",
  location: "Global Business Support"
};

// Reusable Feature Item Component
const FeatureItem = memo(({ text }) => (
  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-black/40 border border-zinc-700/30 hover:border-green-500/20 transition-colors">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/10 flex items-center justify-center">
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
    </div>
    <span className="text-zinc-300 text-sm sm:text-base">{text}</span>
  </div>
));

// Reusable WhatsApp Button Component
const WhatsAppButton = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-green-500 
      text-white text-sm sm:text-base p-6 sm:p-8 rounded-xl font-semibold transition-all duration-300
      hover:shadow-2xl hover:shadow-green-500/20 transform hover:scale-[1.02]
      border border-green-500/20"
  >
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] 
      bg-[length:250%_250%] bg-[0%_0%] hover:bg-[100%_100%] transition-all duration-1000" />
    
    <div className="relative flex flex-col items-center gap-2 sm:gap-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center">
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
        </svg>
      </div>
      <span className="text-base sm:text-xl">Chat on WhatsApp</span>
    </div>
  </button>
));

// Main Contact Component
const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`, '_blank');
  };

  return (
    <div className="relative py-10 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content with Background */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,#000000)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,100,255,0.1),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,200,100,0.1),transparent_40%)]" />
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-6 sm:p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
                Need Help?
              </h2>
              <p className="text-lg sm:text-xl text-zinc-400">
                Our support team is just a message away
              </p>
            </div>

            {/* Contact Card */}
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-[0_0_50px_-12px] shadow-blue-500/10">
                {/* Card Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                  {/* Left Column - Info */}
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                        Support Available
                      </h3>
                      <p className="text-zinc-400 text-sm sm:text-base">
                        Get responses to all your queries through WhatsApp Business
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 sm:space-y-4">
                      <FeatureItem text="Response within 24 hours" />
                      <FeatureItem text="Available 9 AM to 11 PM" />
                    </div>

                    {/* Email */}
                    <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-zinc-700/30 hover:border-blue-500/20 transition-colors">
                      <p className="text-zinc-400 text-sm sm:text-base mb-1 sm:mb-2">Email us at:</p>
                      <a 
                        href={`mailto:${CONTACT_INFO.email}`} 
                        className="text-blue-400 hover:text-blue-300 text-sm sm:text-base transition-colors"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Right Column - WhatsApp Button */}
                  <div className="flex flex-col justify-center">
                    <WhatsAppButton onClick={handleWhatsAppClick} />
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