import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import InlinePromo from '../Components/InlinePromo'
import SEO from '../Components/SEO'
import BlogLeadForm from '../Components/BlogLeadForm'
import { SingleBlogSkeleton } from '../Components/BlogSkeleton'
import StickyLeadBanner from '../Components/StickyLeadBanner'
import { FaWhatsapp } from 'react-icons/fa'

const decodeHTMLEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
};

const stripHTML = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

const SingleBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showEnquiryModal, setShowEnquiryModal] = useState(false)
    const [showAllToc, setShowAllToc] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                // Assuming ID is actually the slug
                const response = await fetch(`https://premiumtoolshub.orphicsolution.com/wp-json/wp/v2/posts?slug=${id}&_embed`);
                if (!response.ok) {
                    navigate('/blog')
                    return
                }

                const data = await response.json();
                if (!data || data.length === 0) {
                    navigate('/blog');
                    return;
                }

                const entry = data[0];
                const terms = entry._embedded && entry._embedded['wp:term'] ? entry._embedded['wp:term'] : [];
                const categories = terms.length > 0 ? terms[0] : [];
                const category = categories.length > 0 ? categories[0].name : 'General';

                const authorInfo = entry._embedded && entry._embedded.author ? entry._embedded.author[0].name : 'PremiumToolsHub Team';

                const featuredMedia = entry._embedded && entry._embedded['wp:featuredmedia'] ? entry._embedded['wp:featuredmedia'][0] : null;
                let imageUrl = null;
                if (featuredMedia) {
                    imageUrl = featuredMedia.source_url || featuredMedia.media_details?.sizes?.full?.source_url;
                }

                const rawExcerpt = stripHTML(entry.excerpt.rendered);
                const fallbackExcerpt = rawExcerpt.slice(0, 160) + (rawExcerpt.length > 160 ? '...' : '');

                // WP Yoast SEO integration from _yoast_wpseo_title etc, if available
                let seoTitle = decodeHTMLEntities(entry.title.rendered);
                let seoDescription = fallbackExcerpt;

                if (entry.yoast_head_json) {
                    seoTitle = entry.yoast_head_json.title || seoTitle;
                    seoDescription = entry.yoast_head_json.description || seoDescription;
                }

                setPost({
                    id: entry.id,
                    title: decodeHTMLEntities(entry.title.rendered),
                    excerpt: seoDescription,
                    seoTitle: seoTitle,
                    seoDescription: seoDescription,
                    category: decodeHTMLEntities(category),
                    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    imageUrl: imageUrl,
                    imageGradient: 'from-blue-600/20 to-blue-400/20',
                    icon: '📝',
                    author: authorInfo,
                    content: entry.content.rendered
                })

            } catch (error) {
                console.error('Error fetching post:', error)
                navigate('/blog')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
        window.scrollTo(0, 0)
    }, [id, navigate])

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(scroll);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const readingTime = useMemo(() => {
        if (!post?.content) return "1 min read";
        const totalWords = stripHTML(post.content).split(/\s+/).length;
        const wordsPerMinute = 225;
        const minutes = Math.ceil(totalWords / wordsPerMinute);
        return `${minutes} min read`;
    }, [post]);

    const tocItems = useMemo(() => {
        if (!post?.content) return [];
        const items = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content, 'text/html');
        const headings = doc.querySelectorAll('h2');

        headings.forEach((heading) => {
            const text = heading.textContent;
            if (text) {
                items.push({
                    id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                    text: text,
                    level: 2
                });
            }
        });
        return items;
    }, [post]);

    const faqSchema = useMemo(() => {
        if (!post?.content) return null;
        const faqs = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content, 'text/html');
        const elements = doc.body.children;

        let currentQuestion = null;
        let currentAnswer = "";
        const questionIndicators = ['who', 'what', 'where', 'when', 'why', 'how', 'can', 'could', 'should', 'would', 'is', 'are', 'do', 'does'];

        for (let i = 0; i < elements.length; i++) {
            const node = elements[i];
            const tagName = node.tagName.toLowerCase();

            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                if (currentQuestion && currentAnswer.trim()) {
                    faqs.push({ "@type": "Question", "name": currentQuestion, "acceptedAnswer": { "@type": "Answer", "text": currentAnswer.trim() } });
                }
                currentQuestion = null;
                currentAnswer = "";

                const text = node.textContent.trim();
                const lowerText = text.toLowerCase();
                const isQuestion = text && (text.endsWith('?') || questionIndicators.some(w => lowerText.startsWith(w + ' ')));

                if (isQuestion) currentQuestion = text;
            } else if (currentQuestion) {
                const text = node.textContent.trim();
                if (text) currentAnswer += (currentAnswer ? " " : "") + text;
            }
        }

        if (currentQuestion && currentAnswer.trim()) {
            faqs.push({ "@type": "Question", "name": currentQuestion, "acceptedAnswer": { "@type": "Answer", "text": currentAnswer.trim() } });
        }

        if (faqs.length === 0) return null;
        return { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs };
    }, [post]);

    const renderContentWithPromos = () => {
        if (!post?.content) return null;
        let htmlContent = post.content;

        // Ensure all links open in a new tab for WordPress content
        htmlContent = htmlContent.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

        // Split HTML by <h2> tags.
        const parts = htmlContent.split(/(<h2[^>]*>.*?<\/h2>)/i);

        let adCount = 0;
        let headingCount = 0;

        return parts.map((part, index) => {
            if (/^<h2/i.test(part)) {
                headingCount++;
                const showAd = headingCount > 1 && headingCount % 2 === 0 && adCount < 3;

                const textMatch = part.match(/<h2[^>]*>(.*?)<\/h2>/i);
                let text = textMatch ? textMatch[1].replace(/<[^>]+>/g, '') : '';
                text = decodeHTMLEntities(text);
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                const styledH2 = `<h2 id="${id}" class="scroll-mt-[120px] text-[1.65rem] md:text-[2rem] font-bold text-slate-900 mt-6 mb-4 tracking-tight leading-tight">${textMatch ? textMatch[1] : ''}</h2>`;

                if (showAd) {
                    adCount++;
                    return (
                        <React.Fragment key={index}>
                            <div className="mb-8"><InlinePromo /></div>
                            <div dangerouslySetInnerHTML={{ __html: styledH2 }} />
                        </React.Fragment>
                    );
                }

                return <div key={index} className="wp-heading-wrapper" dangerouslySetInnerHTML={{ __html: styledH2 }} />;
            }

            if (!part.trim()) return null;
            return <div key={index} className="wp-content-wrapper" dangerouslySetInnerHTML={{ __html: part }} />;
        });
    };

    if (loading) return <SingleBlogSkeleton />

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="text-xl text-slate-500">Post not found</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative pt-20 pb-20 bg-[#fafafa]" >
            <SEO
                title={post.seoTitle || post.title}
                description={post.seoDescription || post.excerpt || post.title}
                author="Premium Tools Hub"
                keywords="Premium Tools Hub, digital tools, services, premium, tools, services, digital life"
                ogTitle={post.seoTitle || post.title}
                ogDescription={post.seoDescription || post.excerpt || post.title}
                ogImage={post.imageUrl || undefined}
                faqSchema={faqSchema}
            />

            <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 z-50">
                <div
                    className="h-full bg-slate-900 transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:pt-8">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">

                    <div className="hidden lg:block lg:w-[30%] xl:w-[28%] relative flex-shrink-0">
                        <div className="sticky top-22 space-y-12 pr-2 xl:pr-6">
                            {tocItems.length > 0 && (
                                <div className="p-5 bg-white shadow-[8px_8px_0px_rgba(38,90,231,0.25)] border border-slate-100 rounded-lg">
                                    <p className="text-[1.1rem] font-bold uppercase tracking-widest text-[#265ae7] mb-4">Table of Contents</p>
                                    <ul className="space-y-3">
                                        {(showAllToc ? tocItems : tocItems.slice(0, 7)).map((item, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`#${item.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    }}
                                                    className="text-slate-500 hover:text-indigo-600 text-[0.85rem] transition-all duration-200 leading-snug line-clamp-2"
                                                >
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    {tocItems.length > 7 && (
                                        <button
                                            onClick={() => setShowAllToc(!showAllToc)}
                                            className="mt-4 text-[#265ae7] font-semibold text-sm flex items-center gap-1 hover:text-blue-800 transition-colors"
                                        >
                                            {showAllToc ? 'View Less' : `View All (${tocItems.length - 7} more)`}
                                            <svg className={`w-4 h-4 transition-transform duration-200 ${showAllToc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-[70%] xl:w-[72%] bg-white/0 rounded-none p-0">

                        <header className="mb-8 md:mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[0.8rem] font-bold uppercase tracking-widest mb-5 border border-indigo-100">
                                {post.category || 'Article'}
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight" dangerouslySetInnerHTML={{ __html: post.title }} />

                            <div className="flex flex-wrap items-center justify-between gap-6 text-[0.95rem] pb-8 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                        PH
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-slate-900 m-0 leading-tight">PremiumToolsHub</p>
                                        <p className="text-slate-500 text-sm m-0 leading-tight">Editorial Team</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-slate-500 font-medium whitespace-nowrap">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1.5 text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {readingTime}
                                    </span>
                                </div>
                            </div>
                        </header>

                        <div className="w-full relative overflow-hidden bg-slate-50 mb-12 rounded-2xl border border-slate-100 shadow-sm flex justify-center items-center">
                            {post.imageUrl ? (
                                <img src={post.imageUrl} alt={post.title.replace(/<[^>]*>?/gm, '')} className="w-full h-auto max-h-[500px] object-contain rounded-2xl" />
                            ) : (
                                <div className={`w-full aspect-video bg-gradient-to-br ${post.imageGradient} flex items-center justify-center`}>
                                    <span className="text-[6rem] animate-pulse opacity-50">{post.icon}</span>
                                </div>
                            )}
                        </div>

                        {tocItems.length > 0 && (
                            <div className="lg:hidden bg-white/50 border border-slate-200 rounded-xl p-6 mb-12">
                                <p className="text-[0.8rem] font-bold uppercase tracking-widest text-slate-900 mb-4">Table of Contents</p>
                                <ul className="space-y-3">
                                    {tocItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }}
                                                className="text-slate-600 hover:text-indigo-600 text-[0.95rem] transition-colors"
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <article className="prose font-[inherit] prose-base md:prose-lg prose-slate max-w-none 
                            prose-p:text-[#334155] prose-p:leading-[1.65] md:prose-p:leading-[1.7]
                            prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                            prose-a:text-indigo-600 prose-a:no-underline
                            prose-img:rounded-xl prose-img:border prose-img:border-slate-100 prose-img:shadow-sm
                            prose-strong:text-slate-900 prose-strong:font-bold
                            prose-li:text-[#334155]
                            wp-content-article
                        ">
                            {renderContentWithPromos()}
                        </article>

                        <div className="flex justify-center mt-12 mb-16 opacity-30">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-1"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-1"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-1"></span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-50">
                <button
                    onClick={() => setShowEnquiryModal(true)}
                    className="bg-[#265ae7] hover:bg-[#1d5cd0] text-white font-bold cursor-pointer py-3.5 px-4 rounded-l-md shadow-[-4px_4px_15px_rgba(0,0,0,0.1)] transition-colors flex flex-col items-center text-[0.8rem] tracking-wide gap-0.5"
                >
                    {'ENQUIRY'.split('').map((char, index) => (
                        <span key={index} className="block leading-none select-none uppercase">{char}</span>
                    ))}
                </button>
                <a
                    href="https://wa.me/919029151181"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-l-md shadow-[-4px_4px_15px_rgba(0,0,0,0.1)] transition-colors flex justify-center items-center"
                >
                    <FaWhatsapp className="w-[1.6rem] h-[1.6rem]" />
                </a>
            </div>

            <StickyLeadBanner />

            {showEnquiryModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowEnquiryModal(false)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white text-slate-900 rounded-full flex items-center justify-center text-xl font-bold hover:bg-slate-100 shadow-xl z-10 transition-transform active:scale-90"
                        >
                            &times;
                        </button>
                        <BlogLeadForm />
                    </div>
                </div>
            )}
        </div >
    )
}

export default SingleBlog
