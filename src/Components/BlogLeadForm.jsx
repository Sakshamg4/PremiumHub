import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogLeadForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        tool: '',
        consent: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = {
            name: formData.name,
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phone}`,
            tool: formData.tool,
            message: `Lead from Blog - Interested in: ${formData.tool}`,
            source: 'Blog Lead Form'
        };

        try {
            const response = await fetch("https://formspree.io/f/movgnnry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                navigate('/thank-you');
            } else {
                // If email fails, open WhatsApp as fallback? Or just alert.
                // User said "not whats", but maybe fallback is okay?
                // I'll stick to alert to respect "not whats".
                alert('Submission failed. Please try again or contact us directly on WhatsApp.');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert('Something went wrong. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 font-display">
                Have questions? Contact us
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name*"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-700 placeholder:text-slate-400 text-sm transition-all"
                    />
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email ID*"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-700 placeholder:text-slate-400 text-sm transition-all"
                    />
                </div>

                {/* Phone Row */}
                <div className="flex gap-3">
                    <input
                        type="text"
                        name="countryCode"
                        placeholder="+91"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="px-3 py-3 w-16 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-700 text-sm text-center transition-all bg-white"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Contact Number*"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-2/3 px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 outline-none text-slate-700 placeholder:text-slate-400 text-sm transition-all"
                    />
                </div>

                {/* Program/Interest Dropdown */}
                <div>
                    <select
                        name="tool"
                        required
                        value={formData.tool}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 outline-none text-slate-700 text-sm bg-white"
                    >
                        <option value="" disabled>Select Tool</option>
                        <option value="LinkedIn Premium">LinkedIn Premium</option>
                        <option value="Sales Navigator">Sales Navigator</option>
                        <option value="Recruiter Lite">Recruiter Lite</option>
                        <option value="Other Tool">Other Premium Tool</option>
                    </select>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2 pt-1">
                    <input
                        type="checkbox"
                        name="consent"
                        id="form-consent"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600"
                    />
                    <label htmlFor="form-consent" className="text-xs text-slate-500 leading-snug">
                        I accept the <a href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms & Conditions</a>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg shadow-lg active:scale-[0.98] disabled:active:scale-100 transition-all duration-200 text-sm tracking-wide uppercase flex justify-center items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        'Submit'
                    )}
                </button>
            </form>
        </div>
    );
};

export default BlogLeadForm;
