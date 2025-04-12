import React from 'react'

const Contact = () => {
  const contactInfo = {
    phone: "+91 9029151181",
    email: "officallinkedinseller@gmail.com",
    whatsapp: "+919029151181",
    hours: "24/7 Support Available",
    location: "Global Business Support"
  }

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border-[1px] border-zinc-700 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
              Contact Support
            </h2>
            <p className="text-lg text-zinc-300">
              Get instant support through WhatsApp Business
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">💬</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white/90">WhatsApp Business Support</h3>
                  <p className="text-zinc-400 mt-2">{contactInfo.hours}</p>
                </div>

                <div className="space-y-6 text-center">
                  <div className="flex items-center justify-center gap-4 text-zinc-300">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      Quick Response
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      24/7 Support
                    </span>
                  </div>
                  
                  <button
                    onClick={handleWhatsAppClick}
                    className="group bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center mx-auto gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                    </svg>
                    Chat on WhatsApp
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="pt-6 border-t border-zinc-700/50">
                  <p className="text-zinc-400 text-center">
                    You can also reach us at:
                    <a href={`mailto:${contactInfo.email}`} className="block mt-1 text-blue-400 hover:text-blue-300 transition-colors">
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact