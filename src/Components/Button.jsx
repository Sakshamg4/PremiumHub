import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';

const Button = () => {
    const navBtn = ["Join", "Chat"];
    return (
        <div className='hidden md:flex items-center space-x-4'>
            {navBtn.map((btn, index) => (
                <button
                    key={index}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 cursor-pointer ${index === 0
                        ? "bg-black text-white border-[1px] border-zinc-700"
                        : "bg-white text-black hover:bg-gray-100"
                        }`}
                >
                    <span>
                        <FaWhatsapp className="w-5 h-5" />
                    </span>
                    <span>{btn}</span>
                </button>
            ))}
        </div>
    )
}

export default Button