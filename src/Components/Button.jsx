import React, { memo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const BUTTON_VARIANTS = {
  primary: 'bg-[#9aa6b2] text-white border-[1px] border-[#9aa6b2] hover:bg-[#7e8c9d]',
  secondary: 'bg-[#f8fafc] text-[#18181b] border-[1px] border-[#bcccdc] hover:bg-[#d9eafd]',
  outline: 'bg-transparent border-[1px] border-[#9aa6b2] text-[#18181b] hover:bg-[#9aa6b2]/10',
  gradient: 'bg-gradient-to-r from-[#9aa6b2] to-[#7e8c9d] text-white hover:from-[#7e8c9d] hover:to-[#64748b]'
}

const Button = ({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  icon = <FaWhatsapp className="w-5 h-5" />,
  showIcon = true,
  disabled = false,
  type = 'button',
  loading = false,
  target = "_blank"
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const buttonStyle = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  const content = (
    <>
      {showIcon && icon && <span className="flex-shrink-0">{icon}</span>}
      {loading ? (
        <span className="inline-flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <span className="truncate">{children}</span>
      )}
    </>
  )

  if (href && !disabled) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`${baseStyles} ${buttonStyle} ${className}`}
        target={target}
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${buttonStyle} ${className}`}
    >
      {content}
    </button>
  )
}

// Prevent unnecessary re-renders
export default memo(Button)