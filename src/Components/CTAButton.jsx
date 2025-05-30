import React from 'react'
import Button from './Button'

const CTAButton = (props) => {
    return (
        <div className="relative group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl 
              overflow-hidden transition-all duration-300 hover:shadow-2xl text-center p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-transparent" />
            <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {props.title}
                </h3>
                <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                    {props.description}
                </p>
                <Button
                    variant="primary"
                    href="https://wa.me/9029151181"
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 inline-flex px-6"
                >
                    Chat on WhatsApp
                </Button>
            </div>
        </div>
    )
}

export default CTAButton
