import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import InlinePromo from '../Components/InlinePromo'
import BlogLeadForm from '../Components/BlogLeadForm'
import { client } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { SingleBlogSkeleton } from '../Components/BlogSkeleton'
import StickyLeadBanner from '../Components/StickyLeadBanner'
import { FaWhatsapp } from 'react-icons/fa'

const SingleBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showEnquiryModal, setShowEnquiryModal] = useState(false)
    const [showAllToc, setShowAllToc] = useState(false)

    // Robust text extraction helper needed for ID generation
    const extractTextFromContent = (content) => {
        if (!content) return '';
        return content.map(node => {
            if (node.nodeType === 'text') return node.value;
            if (node.content) return extractTextFromContent(node.content);
            return '';
        }).join('');
    };

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
                    navigate('/blog')
                    return
                }

                const response = await client.getEntries({
                    content_type: 'premiumhub',
                    'fields.slug': id
                });

                if (!response.items.length) {
                    navigate('/blog');
                    return;
                }

                const entry = response.items[0];
                const featuredImage = entry.fields.featuredImage?.[0];
                const imageUrl = featuredImage?.fields?.file?.url;

                setPost({
                    id: entry.sys.id,
                    title: entry.fields.title,
                    excerpt: entry.fields.shortDescription,
                    category: entry.fields.category,
                    date: entry.fields.publishDate
                        ? new Date(entry.fields.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : new Date(entry.sys.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    imageUrl: imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl} ` : imageUrl) : null,
                    imageGradient: 'from-blue-600/20 to-blue-400/20',
                    icon: '📝',
                    content: entry.fields.mainContent
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

    const [scrollProgress, setScrollProgress] = useState(0);

    // Calculate Scroll Progress
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

    // Calculate Reading Time
    const readingTime = useMemo(() => {
        if (!post?.content?.content) return "1 min read";
        let totalWords = 0;
        post.content.content.forEach((node) => {
            const text = extractTextFromContent([node]);
            totalWords += text.split(/\s+/).length;
        });
        const wordsPerMinute = 225;
        const minutes = Math.ceil(totalWords / wordsPerMinute);
        return `${minutes} min read`;
    }, [post]);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
                    navigate('/blog')
                    return
                }

                const response = await client.getEntries({
                    content_type: 'premiumhub',
                    'fields.slug': id
                });

                if (!response.items.length) {
                    navigate('/blog');
                    return;
                }

                const entry = response.items[0];
                const featuredImage = entry.fields.featuredImage?.[0];
                const imageUrl = featuredImage?.fields?.file?.url;

                setPost({
                    id: entry.sys.id,
                    title: entry.fields.title,
                    excerpt: entry.fields.shortDescription,
                    category: entry.fields.category,
                    date: entry.fields.publishDate
                        ? new Date(entry.fields.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : new Date(entry.sys.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    imageUrl: imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl} ` : imageUrl) : null,
                    imageGradient: 'from-blue-600/20 to-blue-400/20',
                    icon: '📝',
                    content: entry.fields.mainContent
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

    // Extract Headings for Table of Contents
    const tocItems = useMemo(() => {
        if (!post?.content?.content) return [];
        const items = [];

        post.content.content.forEach((node) => {
            if (node.nodeType === 'heading-2') {
                const text = extractTextFromContent(node.content);
                if (text) {
                    items.push({
                        id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                        text: text,
                        level: 2
                    });
                }
            }
        });
        return items;
    }, [post]);

    const faqSchema = useMemo(() => {
        if (!post?.content?.content) return null;
        const faqs = [];
        let currentQuestion = null;
        let currentAnswer = "";
        const questionIndicators = ['who', 'what', 'where', 'when', 'why', 'how', 'can', 'could', 'should', 'would', 'is', 'are', 'do', 'does'];

        for (const node of post.content.content) {
            if (['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6'].includes(node.nodeType)) {
                if (currentQuestion && currentAnswer.trim()) {
                    faqs.push({ "@type": "Question", "name": currentQuestion, "acceptedAnswer": { "@type": "Answer", "text": currentAnswer.trim() } });
                }
                currentQuestion = null;
                currentAnswer = "";
                const text = extractTextFromContent(node.content).trim();
                const lowerText = text.toLowerCase();
                const isQuestion = text && (text.endsWith('?') || questionIndicators.some(w => lowerText.startsWith(w + ' ')));
                if (isQuestion) currentQuestion = text;
            } else if (currentQuestion) {
                const text = extractTextFromContent(node.content).trim();
                if (text) currentAnswer += (currentAnswer ? " " : "") + text;
            }
        }
        if (currentQuestion && currentAnswer.trim()) {
            faqs.push({ "@type": "Question", "name": currentQuestion, "acceptedAnswer": { "@type": "Answer", "text": currentAnswer.trim() } });
        }
        if (faqs.length === 0) return null;
        return { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs };
    }, [post]);

    // Social Sharing Handlers
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareToTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post?.title || '')}`, '_blank');
    const shareToLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(post?.title || '')}`, '_blank');
    const shareToWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(post?.title + ' ' + pageUrl)}`, '_blank');
    const copyToClipboard = () => {
        navigator.clipboard.writeText(pageUrl);
        alert('Link copied to clipboard!');
    };

    if (loading) return <SingleBlogSkeleton />

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="text-xl text-slate-500">Post not found</div>
            </div>
        )
    }

    let adCount = 0;
    let headingCount = 0;

    const richTextOptions = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const url = node.data.target.fields?.file?.url;
                if (!url) return null;
                return (
                    <figure className="my-0.5 overflow-hidden rounded-2xl border border-slate-100 shadow-sm bg-slate-50">
                        <img
                            src={`https:${url}`}
                            alt={node.data.target.fields?.title || 'Blog Image'}
                            className="w-full h-auto object-cover"
                        />
                        {node.data.target.fields?.description && (
                            <figcaption className="p-3 text-center text-sm text-slate-500 border-t border-slate-100 italic">
                                {node.data.target.fields.description}
                            </figcaption>
                        )}
                    </figure>
                );
            },
            [BLOCKS.HEADING_2]: (node, children) => {
                headingCount++;
                const showAd = headingCount > 1 && headingCount % 2 === 0 && adCount < 3;
                if (showAd) adCount++;

                const rawText = extractTextFromContent(node.content);
                const id = rawText ? rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

                return (
                    <>
                        {showAd && <div className="mb-8"><InlinePromo /></div>}
                        <h2 id={id} className="scroll-mt-[120px] text-[1.65rem] md:text-[2rem] font-bold text-slate-900 mt-6 mb-4 tracking-tight leading-tight">
                            {children}
                        </h2>
                    </>
                );
            },
            [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-[1.35rem] md:text-[1.5rem] font-bold text-slate-800 mt-4 mb-3 tracking-tight leading-snug">{children}</h3>,
            [BLOCKS.PARAGRAPH]: (node, children) => {
                const text = extractTextFromContent(node.content);
                const isProTip = text && /pro\s*tip\s*:/i.test(text);

                if (isProTip) {
                    return (
                        <div className="my-6 rounded-xl bg-gradient-to-br from-indigo-50/80 to-blue-50/50 border border-indigo-100/50 shadow-sm relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-blue-500"></div>
                            <div className="p-5 sm:p-6 relative z-10 pl-8">
                                <div className="text-slate-700 text-[1.05rem] sm:text-[1.125rem] leading-[1.7] font-medium tracking-wide">
                                    {children}
                                </div>
                            </div>
                        </div>
                    );
                }
                // Much softer line height and relaxed letter spacing for standard paragraphs
                return <p className="mb-4 text-[#334155] leading-[1.65] md:leading-[1.7] text-[1.05rem] md:text-[1.125rem] tracking-tight">{children}</p>;
            },
            [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-5 mb-4 space-y-1.5 md:space-y-2 text-[#334155] marker:text-indigo-500 text-[1.05rem] md:text-[1.125rem] leading-[1.65] md:leading-[1.7] [&_p]:mb-0">{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 md:space-y-2 text-[#334155] marker:text-indigo-500 marker:font-bold text-[1.05rem] md:text-[1.125rem] leading-[1.65] md:leading-[1.7] [&_p]:mb-0">{children}</ol>,
            [BLOCKS.QUOTE]: (node, children) => (
                <blockquote className="relative p-5 sm:p-6 my-6 border-l-2 border-slate-900 bg-white shadow-[8px_8px_0px_rgba(15,23,42,0.05)] italic text-slate-700 text-[1.15rem] md:text-[1.3rem] leading-[1.7]">
                    <svg className="absolute top-4 left-4 w-8 h-8 text-slate-100 -z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    <div className="relative z-10">{children}</div>
                </blockquote>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
                <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:text-indigo-800 border-b border-indigo-200 hover:border-indigo-600 transition-all duration-300 pb-0.5">
                    {children}
                </a>
            ),
            [BLOCKS.TABLE]: (node, children) => (
                <div className="my-8 rounded-lg border border-slate-300 bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <tbody>{children}</tbody>
                        </table>
                    </div>
                </div>
            ),
            [BLOCKS.TABLE_ROW]: (node, children) => (
                <tr className="border-b border-slate-300 last:border-0 bg-white hover:bg-slate-50 transition-colors [&:first-child]:bg-slate-200 [&:first-child>td]:font-bold [&:first-child>td]:text-slate-900">
                    {children}
                </tr>
            ),
            [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
                <th className="px-5 py-3 font-bold text-slate-900 text-[1.05rem] align-middle border-r border-slate-300 last:border-r-0">
                    {children}
                </th>
            ),
            [BLOCKS.TABLE_CELL]: (node, children) => (
                <td className="px-5 py-3 text-slate-700 text-[1rem] leading-relaxed align-middle [&_p]:m-0 border-r border-slate-300 last:border-r-0">
                    {children}
                </td>
            ),
        }
    }

    return (
        <div className="min-h-screen relative pt-20 pb-20 bg-[#fafafa]" >
            {faqSchema && (
                <Helmet>
                    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                </Helmet>
            )}

            {/* Reading Progress Bar (Fixed Top) */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 z-50">
                <div
                    className="h-full bg-slate-900 transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            {/* Main Content Layout (Perfectly Centered) */}
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:pt-8">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">

                    {/* Left Column: Social & TOC (Sticky) */}
                    <div className="hidden lg:block lg:w-[30%] xl:w-[28%] relative flex-shrink-0">
                        <div className="sticky top-22 space-y-12 pr-2 xl:pr-6">



                            {/* Minimal TOC */}
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

                    {/* Center Column: Article Content */}
                    <div className="w-full lg:w-[70%] xl:w-[72%] bg-white/0 rounded-none p-0">

                        {/* Integrated Article Header (Title Above Image) */}
                        <header className="mb-8 md:mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[0.8rem] font-bold uppercase tracking-widest mb-5 border border-indigo-100">
                                {post.category || 'Article'}
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>

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

                        {/* Featured Image inside content column */}
                        <div className="w-full relative overflow-hidden bg-slate-50 mb-12 rounded-2xl border border-slate-100 shadow-sm flex justify-center items-center">
                            {post.imageUrl ? (
                                <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-contain rounded-2xl" />
                            ) : (
                                <div className={`w-full aspect-video bg-gradient-to-br ${post.imageGradient} flex items-center justify-center`}>
                                    <span className="text-[6rem] animate-pulse opacity-50">{post.icon}</span>
                                </div>
                            )}
                        </div>

                        {/* Mobile TOC */}
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

                        {/* Article Content */}
                        <article className="prose prose-base md:prose-lg prose-slate max-w-none 
                            prose-p:text-[#334155] prose-p:leading-[1.65] md:prose-p:leading-[1.7]
                            prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                            prose-a:text-indigo-600 prose-a:no-underline
                            prose-img:rounded-xl prose-img:border prose-img:border-slate-100 prose-img:shadow-sm
                            prose-strong:text-slate-900 prose-strong:font-bold
                            prose-li:text-[#334155]
                        ">
                            {documentToReactComponents(post.content, richTextOptions)}
                        </article>



                        {/* Clean End Indicator */}
                        <div className="flex justify-center mt-12 mb-16 opacity-30">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-1"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-1"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-1"></span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Floating Contact Sidebar (Right Edge) */}
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

            {/* Sticky Bottom Banner */}
            <StickyLeadBanner />

            {/* Modal Overlay for Enquiry Form */}
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
