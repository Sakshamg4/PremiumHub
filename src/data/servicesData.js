
import {
    SiLinkedin,
    SiGoogle,
    SiOpenai,
    SiAdobe,
    SiNotion,
    SiReplit
} from 'react-icons/si';
import { MdElectricBolt, MdDashboard, MdCode, MdSmartToy } from 'react-icons/md';

export const serviceDetails = {
    "linkedin": {
        id: "linkedin",
        title: "LinkedIn Premium",
        subtitle: "Accelerate your career, find top talent, and generate high-quality leads.",
        icon: SiLinkedin,
        description: "Unlock the full potential of the world's largest professional network. LinkedIn Premium gives you exclusive access to powerful tools for job searching, networking, and business growth. Whether you're looking to get hired, find the perfect candidate, or generate B2B sales leads, our premium plans provide the insights and direct access you need to succeed.",
        metaTitle: "LinkedIn Premium Tools & Subscriptions | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get LinkedIn Premium access & advanced LinkedIn tools at big discounts — up to 80% off. Boost networking, insights & visibility with affordable plans. Learn more!",
        color: "bg-[#0077b5]",
        gradient: "from-[#0077b5] to-[#00a0dc]",
        features: [
            {
                title: "InMail Messaging",
                description: "Directly contact hiring managers and prospects outside your network. InMail is 2.6x more effective than cold emails for generating leads suitable for sales and recruitment."
            },
            {
                title: "Who Viewed Your Profile",
                description: "Turn profile views into opportunities. See the full list of who's viewed you in the last 90 days and reveal interesting insights to grow your network."
            },
            {
                title: "LinkedIn Learning",
                description: "Upskill with unlimited access to over 20,000 expert-led courses in business, creative, and technology topics. Earn certificates to showcase on your profile."
            },
            {
                title: "Premium Business Insights",
                description: "Get exclusive data on company growth, hiring trends, and functional distribution to make smarter career and business decisions."
            }
        ],
        plans: [
            {
                name: "Career",
                price: "₹899",
                originalPrice: "₹1,950",
                features: ["5 InMails/month", "See Who Viewed Your Profile", "Applicant Insights", "Open Profile"]
            },
            {
                name: "Business",
                price: "₹1,499",
                originalPrice: "₹4,500",
                features: ["15 InMails/month", "Unlimited People Browsing", "Business Insights", "Career features"]
            },
            {
                name: "Sales Navigator",
                price: "₹2,499",
                originalPrice: "₹7,200",
                features: ["50 InMails/month", "Advanced Lead Search", "Lead & Account Lists", "Real-time Alerts"]
            }
        ]
    },
    "gemini": {
        id: "gemini",
        title: "Gemini Advanced",
        subtitle: "Google's most capable AI, Ultra 1.0, built for your complex creative and coding tasks.",
        icon: SiGoogle,
        description: "Step into the future of AI with Gemini Advanced. Powered by the Ultra 1.0 model, it is Google's most capable AI ever. From complex coding and logical reasoning to creative collaboration and nuanced content creation, Gemini Advanced is integrated seamlessly into your Google Workspace to supercharge your productivity.",
        metaTitle: "Google Gemini AI Premium Access | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Unlock Google Gemini AI premium access and tools at up to 80% off. Enhance content creation, research & productivity with powerful AI models. Explore now!",
        color: "bg-[#4285F4]",
        gradient: "from-[#4285F4] to-[#DB4437]",
        features: [
            {
                title: "Ultra 1.0 Model",
                description: "Access Google's state-of-the-art AI model designed for highly complex tasks, including advanced coding, logical reasoning, and creative collaboration."
            },
            {
                title: "2TB Cloud Storage",
                description: "Get a massive 2TB of storage in Google One for all your original quality photos, heavy files, documents, and emails."
            },
            {
                title: "Workspace Integration",
                description: "Use Gemini directly within Google Docs, Gmail, Drive, and Slides to draft emails, create images, and summarize documents instantly."
            },
            {
                title: "Advanced Coding Partner",
                description: "A Python-centric coding partner that can write, explain, and debug detailed code snippets in multiple languages including Java, C++, and Go."
            }
        ],
        plans: [
            {
                name: "12 Months",
                price: "₹2,999",
                originalPrice: "₹19,500",
                features: ["Gemini Advanced", "2TB Google One Storage", "Gemini in Workspace", "Priority Access"]
            }
        ]
    },
    "chatgpt": {
        id: "chatgpt",
        title: "ChatGPT Plus",
        subtitle: "Supercharge your productivity with GPT-4, DALL·E 3, and advanced data analysis.",
        icon: SiOpenai,
        description: "Experience the world's most popular AI at its peak. ChatGPT Plus grants you access to OpenAI's smartest model, GPT-4, offering faster response times, priority access during peak hours, and exclusive features like DALL·E 3 for image generation and advanced data analysis for complex problem-solving.",
        metaTitle: "ChatGPT Premium Access & Tools | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Unlock ChatGPT premium subscriptions & advanced tools at up to 80% off. Get smarter AI access for productivity, marketing, and innovation. See affordable plans!",
        color: "bg-[#10a37f]",
        gradient: "from-[#10a37f] to-[#12c498]",
        features: [
            {
                title: "GPT-4 Intelligence",
                description: "Access our most capable model in text, code, and image understanding. GPT-4 solves difficult problems with greater accuracy and creativity."
            },
            {
                title: "DALL·E 3 Image Generation",
                description: "Create stunning, high-quality images from simple conversational prompts directly within ChatGPT. No complex prompt engineering required."
            },
            {
                title: "Advanced Data Analysis",
                description: "Upload spreadsheets, PDFs, or code files. ChatGPT can analyze data, create charts, perform math, and even write and run Python code for you."
            },
            {
                title: "Voice & Vision",
                description: "Have back-and-forth voice conversations with ChatGPT on mobile and show it images to get instant understanding and feedback."
            }
        ],
        plans: [
            {
                name: "Monthly",
                price: "₹499",
                originalPrice: "₹1,999",
                features: ["GPT-4o Access", "DALL·E 3 Generation", "Data Analyst", "Priority Access"]
            }
        ]
    },
    "loveable": {
        id: "loveable",
        title: "Lovable",
        subtitle: "The AI Web Engineer that turns your ideas into fully functional web apps.",
        icon: MdElectricBolt,
        description: "Lovable is not just an assistant; it's an AI web engineer. Describe your idea in plain English, and Lovable creates a full-stack web application for you in minutes. It handles the database, backend, and frontend, allowing you to iterate via conversation and deploy to production instantly.",
        metaTitle: "Loveable Premium Tools & Access | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get Loveable premium tools and features at up to 80% off. Boost creativity, productivity & workflows with affordable access. Explore plans & save big!",
        color: "bg-[#ff4f6e]",
        gradient: "from-[#ff4f6e] to-[#ff8f9e]",
        features: [
            {
                title: "Idea to App",
                description: "Simply describe your application idea, and watch it come to life. Lovable builds the UI, the logic, and the database schema automatically."
            },
            {
                title: "Full-Stack Generation",
                description: "Unlike simple code generators, Lovable builds production-ready full-stack apps with real databases (Supabase) and authentication built-in."
            },
            {
                title: "Iterative Refinement",
                description: "Not happy with a section? Just tell Lovable to change it. Update designs, add features, and fix bugs using natural language commands."
            },
            {
                title: "One-Click Deploy",
                description: "Go from chat to a live URL in seconds. Lovable handles the hosting and deployment, so you can share your app with the world instantly."
            }
        ],
        plans: [
            {
                name: "Pro",
                price: "Inquire",
                features: ["Unlimited Projects", "Premium Support", "Priority Generation", "Custom Domains"]
            }
        ]
    },
    "n8n": {
        id: "n8n",
        title: "n8n",
        subtitle: "The extendable workflow automation tool for technical people.",
        icon: MdCode,
        description: "n8n (nodemation) allows you to build complex automations 10x faster. It is a source-available, fair-code workflow automation tool that lets you connect anything to everything via its node-based editor. With over 700+ native integrations and the ability to run custom JavaScript, n8n handles your most advanced workflows with ease.",
        metaTitle: "n8n Automation Tools & Plans | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get n8n automation workflows & premium access at up to 80% off. Streamline tasks, boost productivity, and save on powerful automation tools. Check plans now!",
        color: "bg-[#EA4B71]",
        gradient: "from-[#EA4B71] to-[#FF6B8D]",
        features: [
            {
                title: "Visual Workflow Editor",
                description: "A powerful node-based editor that lets you drag, drop, and connect services. Visualize your logic and debug in real-time."
            },
            {
                title: "700+ Native Integrations",
                description: "Connect to almost any app or service including Google Sheets, Slack, PostgreSQL, OpenAI, and hundreds more out of the box."
            },
            {
                title: "Advanced Logic & Code",
                description: "Go beyond simple triggers. Use JavaScript/TypeScript for complex data manipulation, conditional branching, and custom HTTP requests."
            },
            {
                title: "Self-Hostable & Secure",
                description: "Keep your data secure by hosting n8n on your own infrastructure or use their cloud. Perfect for GDPR compliance and data privacy."
            }
        ],
        plans: [
            {
                name: "Starter",
                price: "₹999",
                features: ["20 active workflows", "2.5k executions", "Community support", "Cloud Hosting"]
            }
        ]
    },
    "adobe": {
        id: "adobe",
        title: "Adobe Creative Cloud",
        subtitle: "The world's best creative apps and services for video, design, photography, and the web.",
        icon: SiAdobe,
        description: "Unleash your creativity with the ultimate toolkit. Adobe Creative Cloud gives you the entire collection of 20+ desktop and mobile apps, including Photoshop, Illustrator, Premiere Pro, and After Effects. Whether you're a designer, photographer, filmmaker, or dreamer, this is the industry standard for bringing your imagination to life.",
        metaTitle: "Adobe Premium Tools & Subscriptions | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get Adobe premium subscriptions & creative tools at up to 80% off. Access Photoshop, Illustrator, Premiere Pro & more for less. Check plans & save big!",
        color: "bg-[#FF0000]",
        gradient: "from-[#FF0000] to-[#FF4D4D]",
        features: [
            {
                title: "20+ Industry-Standard Apps",
                description: "Get full access to Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom, Acrobat Pro, and many more."
            },
            {
                title: "Generative Fill & AI",
                description: "Use Firefly-powered Generative Fill in Photoshop to add, extend, or remove content from images with simple text prompts."
            },
            {
                title: "Adobe Fonts & Stock",
                description: "Access a massive library of high-quality fonts and get access to stock assets to elevate your projects immediately."
            },
            {
                title: "Seamless Cloud Sync",
                description: "Start a project on your iPad and finish it on your desktop. Your files, fonts, and libraries sync automatically across devices."
            }
        ],
        plans: [
            {
                name: "All Apps",
                price: "₹2,999",
                originalPrice: "₹59,000",
                features: ["Photoshop & Illustrator", "Premiere & After Effects", "Acrobat Pro & Lightroom", "100GB Cloud Storage"]
            }
        ]
    },
    "gamma": {
        id: "gamma",
        title: "Gamma App",
        subtitle: "A new medium for presenting ideas, powered by AI. Design beautiful decks in minutes.",
        icon: MdDashboard,
        description: "Stop wasting time on slide formatting. Gamma is a modern alternative to slides that uses AI to generate beautiful presentations, documents, and webpages. Just start writing, and Gamma's powerful design engine does the rest, creating professional, engaging content that you can present live or share online.",
        metaTitle: "Gamma AI Tools & Premium Access | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Unlock Gamma AI premium tools and features at up to 80% off. Create smarter visual content, designs & workflows with affordable plans. Explore now!",
        color: "bg-[#966fd6]",
        gradient: "from-[#966fd6] to-[#bca5e8]",
        features: [
            {
                title: "AI Deck Generation",
                description: "Type a topic or paste your notes, and watch Gamma generate a complete, professionally designed presentation or document in seconds."
            },
            {
                title: "Interactive & Fluid",
                description: "Break free from static slides. Embed GIFs, videos, charts, and even live websites directly into your cards for a truly interactive experience."
            },
            {
                title: "Smart Design Engine",
                description: "Restyle your entire deck with one click. Gamma handles alignment, fonts, and colors so you can focus entirely on your message."
            },
            {
                title: "Present Anywhere",
                description: "Present live with a dedicated mode, or share a link that lets viewers read through your content at their own pace on any device."
            }
        ],
        plans: [
            {
                name: "Pro",
                price: "₹799",
                features: ["Unlimited AI Decks", "Remove Gamma Branding", "Advanced Analytics", "Custom Fonts"]
            }
        ]
    },
    "replit": {
        id: "replit",
        title: "Replit Core",
        subtitle: "The collaborative browser-based IDE to build software fast, from anywhere.",
        icon: SiReplit,
        description: "Replit is the best place to start coding, and Replit Core is for those who are serious about building. It's a fully collaborative, cloud-based IDE that lets you code in 50+ languages with zero setup. With powerful AI tools, boosted performance, and private projects, you can go from idea to deployed app in record time.",
        metaTitle: "Replit Premium Access & Tools | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get Replit premium access and developer tools at up to 80% off. Boost coding, collaboration & cloud dev workflows with affordable plans. Explore now!",
        color: "bg-[#F26207]",
        gradient: "from-[#F26207] to-[#FF8C42]",
        features: [
            {
                title: "Boosted Performance",
                description: "Experience lightning-fast coding with 4x faster CPUs and 8GB of RAM. Handle heavier workloads and compile large projects without lag."
            },
            {
                title: "Ghostwriter AI",
                description: "Code faster with an intelligent AI pair programmer. Ghostwriter can autocomplete code, explain complex logic, and generate entire functions."
            },
            {
                title: "Unlimited Private Repls",
                description: "Keep your intellectual property safe. Create as many private projects as you want without exposing your code to the public."
            },
            {
                title: "Always-On Deployments",
                description: "Keep your apps running 24/7. Core ensures your bots, APIs, and websites stay online even when you close your browser tab."
            }
        ],
        plans: [
            {
                name: "Core",
                price: "₹999",
                features: ["Boosted Speed", "Unlimited Private Repls", "Ghostwriter AI", "Always-On"]
            }
        ]
    },
    "bolt": {
        id: "bolt",
        title: "Bolt Pro",
        subtitle: "The world's most advanced AI web development agent.",
        icon: MdCode,
        description: "Bolt.new is rewriting the rules of web development. It allows you to prompt, run, edit, and deploy full-stack web applications entirely within your browser. With WebContainers technology, you get a full Node.js environment without any local setup, powered by state-of-the-art AI models that understand your entire codebase.",
        metaTitle: "Bolt Premium Access & Tools | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get Bolt premium tools and features at up to 80% off. Supercharge your workflow with affordable access to top Bolt services. Explore plans & save big!",
        color: "bg-[#000000]",
        gradient: "from-[#1a1a1a] to-[#333333]",
        features: [
            {
                title: "Browser-Based Node.js",
                description: "Run a full stack dev environment in Chrome. execute commands, install npm packages, and run servers directly in the browser."
            },
            {
                title: "Context-Aware AI",
                description: "Bolt understands your file structure and dependencies. Ask it to 'add a payment page' and it will create files, install packages, and write code."
            },
            {
                title: "Instant Preview",
                description: "See your changes live as the AI writes code. The hot-reloading preview lets you iterate on designs and logic in real-time."
            },
            {
                title: "One-Click Deploy",
                description: "Finished your build? Deploy directly to Netlify or Vercel with a single click and get a production-ready URL instantly."
            }
        ],
        plans: [
            {
                name: "Pro",
                price: "Inquire",
                features: ["Unlimited Tokens", "Priority Queue", "Private Projects", "Fast Speed"]
            }
        ]
    },
    "notion": {
        id: "notion",
        title: "Notion Business",
        subtitle: "The all-in-one connected workspace for your wiki, docs, and projects.",
        icon: SiNotion,
        description: "Notion is more than a doc. It's a connected workspace where better, faster work happens. Notion Business empowers teams to break down silos with unlimited spaces, advanced permission controls, and SAML SSO security. Whether you're managing a roadmap, a knowledge base, or meeting notes, Notion keeps everyone aligned.",
        metaTitle: "Notion Premium Plans & Tools | Up to 80% Off | Premium Tools Hub",
        metaDescription: "Get Notion premium access and advanced workspace tools at up to 80% off. Organize notes, projects & teams with affordable plans. Check offers now!",
        color: "bg-[#000000]",
        gradient: "from-[#2C2C2C] to-[#4A4A4A]",
        features: [
            {
                title: "Unlimited Teamspaces",
                description: "Create a dedicated home for every team, project, or department. Organize work your way with infinite nesting and custom databases."
            },
            {
                title: "Advanced Security (SAML SSO)",
                description: "Manage access securely at scale. Enforce single sign-on (SSO) to ensure only the right people can access your company's intellectual property."
            },
            {
                title: "Granular Permissions",
                description: "Control exactly who can view, edit, or share content. Set permissions at the page, database, or teamspace level for maximum security."
            },
            {
                title: "Page Analytics",
                description: "See how your team is engaging with your content. Track views and engagement to understand what documentation is most effective."
            }
        ],
        plans: [
            {
                name: "Business",
                price: "₹499",
                originalPrice: "₹1,250",
                features: ["SAML SSO", "Private Teamspaces", "Bulk PDF Export", "Page Analytics"]
            }
        ]
    },
};
