import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Button from './Button';
import '../styles/PhoneInputCustom.css'; // We will create this file for custom styling adjustments

const ContactForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', number: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/movgnnry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Open WhatsApp Community in new tab
                window.open('https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ', '_blank');
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                    // Clean form
                    setFormData({ name: '', email: '', number: '', message: '' });
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="py-8 text-center text-green-600 font-medium animate-pulse">
                <p className="text-xl">Request Sent Successfully! 🎉</p>
                <p className="text-sm mt-2 text-slate-500">We'll get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="space-y-1">
                <input
                    name="email"
                    type="email"
                    placeholder="Your Email Address"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div className="space-y-1">
                <PhoneInput
                    defaultCountry="IN"
                    placeholder="Phone Number"
                    value={formData.number}
                    onChange={(value) => setFormData({ ...formData, number: value || '' })}
                    className="phone-input-container w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all font-medium text-sm"
                />
            </div>
            <div className="space-y-1">
                <textarea
                    name="message"
                    placeholder="Your Requirements"
                    required
                    rows="2"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium resize-none text-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            <Button
                type="submit"
                variant="gradient"
                className="w-full justify-center py-3 text-lg shadow-lg shadow-blue-500/25"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Sending Request...' : 'Get Exclusive Access'}
            </Button>
            {submitStatus === 'error' && (
                <p className="text-center text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}
        </form>
    );
};

export default ContactForm;
