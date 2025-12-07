import React from 'react'
import Button from './Button'

const CTAButton = (props) => {
    return (
        <div className="relative group bg-[#f8fafc]/50 backdrop-blur-xl border border-[#bcccdc]/50 rounded-xl 
              overflow-hidden transition-all duration-300 hover:shadow-2xl text-center p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9aa6b2]/10 via-[#9aa6b2]/5 to-transparent" />
            <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold text-[#18181b] mb-4">
                    {props.title}
                </h3>
                <p className="text-[#52525b] mb-8 max-w-2xl mx-auto">
                    {props.description}
                </p>
                <Button
                    variant="primary"
                    href="https://wa.me/9029151181"
                    className="bg-[#9aa6b2] hover:bg-[#7e8c9d] transition-all duration-300 inline-flex px-6"
                >
                    Chat on WhatsApp
                </Button>
            </div>
        </div>
    )
}

export default CTAButton
