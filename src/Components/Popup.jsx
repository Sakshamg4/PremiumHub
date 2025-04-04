import React, { useState, useEffect } from 'react'
import Button from './Button'

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const services = [
    'LinkedIn Premium',
    'Canva Pro',
    'Adobe Creative Cloud',
    'You.com AI',
    'Other'
  ]

  // Show popup after 3 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.name || !formData.email || !formData.service) {
      alert('Please fill all fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      // Direct WhatsApp redirection without API call for testing
      const message = `New Inquiry:\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}`
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/9029151181?text=${encodedMessage}`

      window.open(whatsappUrl, '_blank')
      setIsOpen(false)

      // After confirming WhatsApp works, uncomment the API call

    } catch (error) {
      console.error('Submission error:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative bg-slate-900 rounded-xl p-8 max-w-md w-full border border-zinc-700">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Get Premium Access</h2>
            <p className="text-zinc-400">Fill out this form to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 bg-slate-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 bg-slate-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-zinc-400 mb-1">
                Select Service
              </label>
              <select
                id="service"
                required
                className="w-full px-4 py-2 bg-slate-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center mt-6"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault()
                handleSubmit(e)
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit & Continue to WhatsApp'}
            </Button>
          </form>
        </div>
      </div>
    )
  )
}

export default Popup