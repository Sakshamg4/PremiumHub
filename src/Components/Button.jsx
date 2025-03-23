import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Button = ({ variant = 'primary', href, onClick, children, className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 cursor-pointer inline-flex'
  
  const buttonStyle = variant === 'primary' 
    ? 'bg-black text-white border-[1px] border-zinc-700 hover:bg-zinc-800'
    : 'bg-white text-black hover:bg-gray-100'

  return (
    <a 
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${buttonStyle} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        <FaWhatsapp className="w-5 h-5" />
      </span>
      <span>{children}</span>
    </a>
  )
}

export default Button