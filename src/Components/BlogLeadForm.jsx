import React, { useState } from 'react';

const BlogLeadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        tool: '',
        consent: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic (e.g., redirect to WhatsApp or API)
        const text = `New Lead Enquiry via Blog:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\nTool: ${formData.tool}`;
        const whatsappUrl = `https://wa.me/919029151181?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200 text-sm tracking-wide uppercase"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BlogLeadForm;
