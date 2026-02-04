import { createContext, useContext, useMemo } from 'react';
import { SiAdobe, SiCanva, SiLinkedin, SiNotion, SiGrammarly, SiCoursera, SiNetflix, SiGoogle } from 'react-icons/si';

import { serviceDetails } from '../data/servicesData';

// Define Data Constants
const MENU_ITEMS = [
    { href: '#home', label: 'Home', icon: '🏠' },
    {
        href: '#services',
        label: 'Services',
        icon: '⚡',
        subItems: Object.values(serviceDetails).map(s => ({
            label: s.title,
            href: `/services/${s.id}`,
            icon: s.icon // We can use the icon component
        }))
    },
    { href: '#pricing', label: 'Pricing', icon: '💎' },
    { href: '#testimonials', label: 'Testimonials', icon: '💬' },
    { href: '/blog', label: 'Blog', icon: '📰' },
    { href: '#contact', label: 'Contact', icon: '📱' },
    { href: '#about', label: 'About', icon: 'ℹ️' }
];

const SOCIAL_LINKS = [
    {
        name: 'WhatsApp',
        href: 'https://wa.me/919029151181',
        icon: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
        )
    },

];

const PRICING_PLANS = [
    {
        name: "AI & Productivity",
        subtitle: "Perplexity, Notion, Grammarly",
        features: [
            { text: "Perplexity Pro (1Y)", detail: "Available" },
            { text: "Notion Premium (3M)", detail: "Available" },
            { text: "Grammarly Premium (1Y)", detail: "Available" },
            { text: "Otter.ai Pro (1Y)", detail: "Available" },
            { text: "Superhuman Starter (1Y)", detail: "Available" }
        ],
        bgColor: "bg-emerald-500/5",
        borderColor: "group-hover:border-emerald-500/50",
        buttonClass: "bg-emerald-500/10 hover:bg-emerald-500/20"
    },
    {
        name: "Business Elite",
        subtitle: "LinkedIn, Gemini, Jasper",
        features: [
            { text: "Sales Navigator Core (3M)", detail: "Available" },
            { text: "LinkedIn Business (3M)", detail: "Available" },
            { text: "Gemini Advanced (12M)", detail: "Available" },
            { text: "Jasper AI (1M)", detail: "Available" },
            { text: "Microsoft 365 (1Y)", detail: "Available" }
        ],
        bgColor: "bg-[#0077B5]/15",
        borderColor: "group-hover:border-[#0077B5]/50",
        buttonClass: "bg-[#0077B5]/10 hover:bg-[#0077B5]/20"
    },
    {
        name: "Creative Suite",
        subtitle: "Adobe, Canva, Figma",
        features: [
            { text: "Adobe CC Pro Plus (1Y)", detail: "Available" },
            { text: "Canva Pro (1Y)", detail: "Available" },
            { text: "CorelDRAW Suite", detail: "Available" },
            { text: "Descript Creator (1Y)", detail: "Available" },
            { text: "Loom Premium (1Y)", detail: "Available" }
        ],
        bgColor: "bg-purple-500/5",
        borderColor: "group-hover:border-purple-500/50",
        buttonClass: "bg-purple-500/10 hover:bg-purple-500/20"
    },
    {
        name: "Developer Tools",
        subtitle: "JetBrains, Copilot, Replit",
        features: [
            { text: "JetBrains All Products (1Y)", detail: "Available" },
            { text: "GitHub Copilot (1Y)", detail: "Available" },
            { text: "Replit Core (1Y)", detail: "Available" },
            { text: "Warp.dev Pro (1Y)", detail: "Available" },
            { text: "Postman Basic (1Y)", detail: "Available" }
        ],
        bgColor: "bg-orange-500/5",
        borderColor: "group-hover:border-orange-500/50",
        buttonClass: "bg-orange-500/10 hover:bg-orange-500/20"
    },
    {
        name: "Learning Hub",
        subtitle: "Coursera, edX, DataCamp",
        features: [
            { text: "Coursera Plus (1Y)", detail: "Available" },
            { text: "edX Unlimited (1Y)", detail: "Available" },
            { text: "DataCamp Premium (1Y)", detail: "Available" },
            { text: "Brilliant (12M)", detail: "Available" },
            { text: "Duolingo Super (3M)", detail: "Available" }
        ],
        bgColor: "bg-blue-500/5",
        borderColor: "group-hover:border-blue-500/50",
        buttonClass: "bg-blue-500/10 hover:bg-blue-500/20"
    },
    {
        name: "Entertainment & Utils",
        subtitle: "Streaming, VPNs, Windows",
        features: [
            { text: "ZEE5 + SonyLIV 4K", detail: "Available" },
            { text: "NordVPN / Surfshark (1Y)", detail: "Available" },
            { text: "Windows 10/11 Pro Keys", detail: "Available" },
            { text: "YouTube Premium", detail: "Available" },
            { text: "Spotify Premium", detail: "Available" }
        ],
        bgColor: "bg-red-500/5",
        borderColor: "group-hover:border-red-500/50",
        buttonClass: "bg-red-500/10 hover:bg-red-500/20"
    }
];

const SERVICES = [
    {
        title: "AI & Productivity",
        description: "Supercharge your workflow with top-tier AI and productivity tools.",
        icon: "🤖",
        features: [
            {
                name: "Advanced AI Assistants",
                details: "Perplexity Pro, Gemini Advanced, You.com Pro, Claude 3 & More"
            },
            {
                name: "Productivity Suite",
                details: "Notion Premium, Grammarly Premium, Otter.ai, Superhuman"
            },
            {
                name: "Automation & Workflow",
                details: "Zapier Pro, Make.com, n8n Starter, Raycast Pro"
            },
            {
                name: "Developer Tools",
                details: "GitHub Copilot, Replit Core, JetBrains All Products, Warp.dev"
            }
        ],
        bgGradient: "from-[#d9eafd]/50 to-[#bcccdc]/50"
    },
    {
        title: "Business & Career",
        description: "Accelerate your career and business growth with premium professional tools.",
        icon: "💼",
        features: [
            {
                name: "LinkedIn Growth",
                details: "Sales Navigator, Business Premium, Career Premium, Recruiter Lite"
            },
            {
                name: "Marketing & SEO",
                details: "Jasper AI, Ubersuggest, Phantombuster, Customer.io"
            },
            {
                name: "Business Operations",
                details: "Microsoft 365, Slack Pro, Zoom Pro, QONTO"
            },
            {
                name: "Analytics & Data",
                details: "Full Enrich, ZapDigits, Gummysearch, Postman"
            }
        ],
        bgGradient: "from-[#bcccdc]/50 to-[#9aa6b2]/30"
    },
    {
        title: "Creative & Design",
        description: "Industry-standard tools for designers, creators, and editors.",
        icon: "🎨",
        features: [
            {
                name: "Adobe Creative Cloud",
                details: "All Apps Pro Plus (1 Year) - Photoshop, Illustrator, Premiere & more"
            },
            {
                name: "Design Essentials",
                details: "Canva Pro, Figma Professional, CorelDRAW Suite"
            },
            {
                name: "Video & Media",
                details: "Descript Creator, Loom Premium, Wispr Flow Pro"
            },
            {
                name: "UI/UX & Web",
                details: "Webflow CMS, Framer Pro, Miro Business"
            }
        ],
        bgGradient: "from-[#d9eafd]/50 to-[#f8fafc]/50"
    },
    {
        title: "Learning & Entertainment",
        description: "Unlimited entertainment and world-class education at your fingertips.",
        icon: "📚",
        features: [
            {
                name: "Premium Education",
                details: "Coursera Plus, edX Unlimited, DataCamp, Brilliant"
            },
            {
                name: "Entertainment Bundle",
                details: "ZEE5 HD, SonyLIV 4K, YouTube Premium, Spotify"
            },
            {
                name: "Security & Utilities",
                details: "NordVPN, Surfshark VPN, Windows 10/11 Pro Keys"
            },
            {
                name: "Language & Skills",
                details: "Duolingo Super, Memrise Pro, Skillshare"
            }
        ],
        bgGradient: "from-[#bcccdc]/50 to-[#d9eafd]/50"
    }
];

const TESTIMONIALS = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Digital Marketer",
        feedback: "Premium Tools Hub has completely transformed my workflow. The LinkedIn Sales Navigator plan is a game-changer for lead generation. Highly recommended!",
        image: "https://placehold.co/300x600/18181b/FFF?text=Feedback-Coming"
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "Graphic Designer",
        feedback: "Getting the full Adobe Creative Cloud suite at this price is unbelievable. The access is stable, genuine, and the support team is super responsive.",
        image: "https://placehold.co/300x600/18181b/FFF?text=Feedback-Coming"
    },
    {
        id: 3,
        name: "Amit Kumar",
        role: "Software Engineer",
        feedback: "I use the GitHub Copilot and JetBrains pack daily. It saves me so much money compared to buying individual subscriptions. 10/10 service!",
        image: "https://placehold.co/300x600/18181b/FFF?text=Feedback-Coming"
    }
];

const LINKEDIN_PLANS = [
    {
        name: "Career",
        description: "Get hired and get ahead.",
        color: "text-blue-500",
        bgColor: "bg-blue-500",
        features: [
            "Stand out and get in touch with hiring managers",
            "See how you compare to other applicants",
            "Learn new skills to advance your career",
            "InMail credits: 5 / month",
            "Who Viewed Your Profile: Last 90 days",
            "Open Profile option"
        ]
    },
    {
        name: "Business",
        description: "Grow and nurture your network.",
        color: "text-amber-500",
        bgColor: "bg-amber-500",
        features: [
            "Everything in Career, plus:",
            "Find and contact the right people",
            "Promote and grow your business",
            "Learn new skills to enhance your professional brand",
            "InMail credits: 15 / month",
            "Unlimited People Browsing",
            "Business Insights"
        ]
    },
    {
        name: "Sales Navigator",
        description: "Unlock sales opportunities.",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500",
        features: [
            "Everything in Business, plus:",
            "Advanced Lead & Company Search",
            "Lead & Account Lists",
            "Sales Spotlights & Alerts",
            "InMail credits: 50 / month",
            "Extended Network Access",
            "Smart Links"
        ]
    },
    {
        name: "Recruiter Lite",
        description: "Find great talent, faster.",
        color: "text-purple-500",
        bgColor: "bg-purple-500",
        features: [
            "Everything in Business, plus:",
            "Time-saving hiring/recruiting tools",
            "Advanced Search with 20+ filters",
            "Automatic candidate tracking",
            "InMail credits: 30 / month",
            "Integrated Hiring Platform",
            "Smart Suggestions"
        ]
    }
];

const ABOUT_STATS = [
    {
        number: '650+',
        label: 'Active Members',
        description: 'Growing community of digital professionals',
        icon: '👥',
        color: 'from-blue-500/10 via-blue-500/5 to-transparent',
        ariaLabel: 'Active Members Statistics'
    },
    {
        number: '90%',
        label: 'Customer Satisfaction',
        description: 'Based on verified user reviews',
        icon: '⭐',
        color: 'from-green-500/10 via-green-500/5 to-transparent',
        ariaLabel: 'Customer Satisfaction Rate'
    },
    {
        number: '9 AM to 12 AM',
        label: 'Support Hours',
        description: 'Fast WhatsApp response (IST)',
        icon: '💬',
        color: 'from-purple-500/10 via-purple-500/5 to-transparent',
        ariaLabel: 'Support Hours Information'
    },
    {
        number: '15+',
        label: 'Countries',
        description: 'International client network',
        icon: '🌏',
        color: 'from-red-500/10 via-red-500/5 to-transparent',
        ariaLabel: 'Global Presence Statistics'
    },
];

const ABOUT_SERVICES = [
    {
        title: 'LinkedIn Solutions',
        icon: '💼',
        features: [
            'Premium Business & Career Plans',
            'Advanced Sales Navigator Tools',
            'Recruiter Lite Access',
            'Professional Career Support'
        ],
        gradient: 'from-[#0077B5]/10 via-[#0077B5]/5 to-transparent',
        ariaLabel: 'LinkedIn Professional Services'
    },
    {
        title: 'Creative Tools',
        icon: '🎨',
        features: [
            'Full Adobe Creative Cloud Suite',
            'Canva Pro with Premium Assets',
            'Autodesk Professional Apps',
            'Exclusive Design Resources'
        ],
        gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
        ariaLabel: 'Creative Design Tools'
    },
    {
        title: 'Streaming Services',
        icon: '🎬',
        features: [
            'Netflix Premium 4K HDR',
            'Amazon Prime Video & Benefits',
            'Disney+ Hotstar VIP',
            'YouTube Premium Ad-free'
        ],
        gradient: 'from-red-600/10 via-red-600/5 to-transparent',
        ariaLabel: 'Premium Streaming Services'
    },
    {
        title: 'Learning Platforms',
        icon: '📚',
        features: [
            'Coursera Plus Unlimited Access',
            'edX Verified Certificates',
            'Professional Skill Development',
            'Industry-recognized Certifications'
        ],
        gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
        ariaLabel: 'Educational Learning Platforms'
    },
];

const CONTACT_INFO = {
    phone: "+91 9029151181",
    email: "premiumhubtools@gmail.com",
    whatsapp: "919029151181",
    hours: "9 AM to 11 PM IST",
    location: "Global Business Support"
};


const FOOTER_LINKS = {
    services: [
        { label: 'LinkedIn Premium', href: '#services', icon: '💼' },
        { label: 'Creative Tools', href: '#services', icon: '🎨' },
        { label: 'OTT Platforms', href: '#services', icon: '🎬' },
        { label: 'AI Solutions', href: '#services', icon: '🤖' }
    ],
    support: [
        { label: 'WhatsApp Support', href: 'https://wa.me/919029151181', icon: '💬' },
        { label: 'Join Community', href: '#contact', icon: '👥' },
        { label: 'View Pricing', href: '#pricing', icon: '💎' },
        { label: 'premiumhubtools@gmail.com', href: 'mailto:premiumhubtools@gmail.com', icon: '📧' }
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true, icon: '🔒' },
        { label: 'Terms of Service', href: '/terms-and-conditions', isRoute: true, icon: '📜' },
        { label: 'About Us', href: '#about', icon: 'ℹ️' }
    ]
};


const WHATSAPP_CARDS = [
    {
        title: "Premium Tools Hub Community",
        description: "Join our exclusive community for premium digital tools and services. Get instant updates about:",
        features: [
            "LinkedIn Premium & Sales Navigator deals",
            "Creative Cloud & Canva Pro offers",
            "OTT Platform subscription updates",
            "Early access to new services"
        ],
        icon: "💎",
        link: "https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ",
        bgGradient: "from-[#0A66C2]/10 via-[#0A66C2]/5 to-transparent",
        borderHover: "hover:border-[#0A66C2]/50"
    },
    {
        title: "XYLE OTT Group",
        description: "Your gateway to premium streaming entertainment. Connect with us for:",
        features: [
            "Netflix, Prime & Hotstar updates",
            "New releases & content alerts",
            "Special streaming packages",
            "Technical support & assistance"
        ],
        icon: "🎬",
        link: "https://chat.whatsapp.com/IEka2OGQwHyKqlaBNClozP",
        bgGradient: "from-red-600/10 via-red-600/5 to-transparent",
        borderHover: "hover:border-red-500/50"
    },
    {
        title: "Premium Channel",
        description: "Network with professional LinkedIn content creators. Benefits include:",
        features: [
            "LinkedIn Career Plan",
            "LinkedIn Business Plan",
            "LinkedIn Sales Navigator",
            "LinkedIn Recruiter Lite",
            "LinkedIn Ads Credit",
        ],
        icon: "👔",
        link: "https://whatsapp.com/channel/0029VbB09k77oQhiUpSCyt0w",
        bgGradient: "from-[#0A66C2]/10 via-[#0A66C2]/5 to-transparent",
        borderHover: "hover:border-[#0A66C2]/50"
    }
];

const BRANDS = [
    { name: 'LinkedIn', icon: <SiLinkedin /> },
    { name: 'Adobe', icon: <SiAdobe /> },
    { name: 'Canva', icon: <SiCanva /> },
    { name: 'Notion', icon: <SiNotion /> },
    { name: 'Grammarly', icon: <SiGrammarly /> },
    { name: 'Coursera', icon: <SiCoursera /> },
    { name: 'Netflix', icon: <SiNetflix /> },
    { name: 'Gemini', icon: <SiGoogle /> },
];

const HERO_TYPE_SEQUENCE = [
    'Adobe Creative',
    1500,
    'LinkedIn Premium',
    1500,
    'Lovable AI',
    1500,
    'Perplexity AI',
    1500,
    'Gamma Pro',
    1500,
    'Coursera Plus',
    1500,
];

// Create Context
const DataContext = createContext();

// Provider Component
export const DataProvider = ({ children }) => {
    const value = useMemo(() => ({
        menuItems: MENU_ITEMS,
        socialLinks: SOCIAL_LINKS,
        pricingPlans: PRICING_PLANS,
        services: SERVICES,
        testimonials: TESTIMONIALS,
        linkedInPlans: LINKEDIN_PLANS,
        aboutStats: ABOUT_STATS,
        aboutServices: ABOUT_SERVICES,
        contactInfo: CONTACT_INFO,
        footerLinks: FOOTER_LINKS,
        whatsAppCards: WHATSAPP_CARDS,
        brands: BRANDS,
        heroTypeSequence: HERO_TYPE_SEQUENCE
    }), []);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

// Custom Hook
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
