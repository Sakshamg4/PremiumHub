import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../Components/Button'
import InlinePromo from '../Components/InlinePromo'
import BlogLeadForm from '../Components/BlogLeadForm'
import { client } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { SingleBlogSkeleton } from '../Components/BlogSkeleton'
import StickyLeadBanner from '../Components/StickyLeadBanner'

const SingleBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

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
                    <img
                        src={`https:${url}`}
                        alt={node.data.target.fields?.title || 'Blog Image'}
                        className="w-full rounded-xl my-8 shadow-sm border border-slate-100"
                    />
                );
            },
            [BLOCKS.HEADING_2]: (node, children) => {
                headingCount++;
                const showAd = headingCount > 1 && headingCount % 2 === 0 && adCount < 3;
                if (showAd) adCount++;

                // Consistent ID generation using raw content, matching TOC logic
                const rawText = extractTextFromContent(node.content);
                const id = rawText ? rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

                return (
                    <>
                        {showAd && <InlinePromo />}
                        <h2 id={id} className="scroll-mt-32 text-2xl md:text-3xl font-bold text-slate-800 mt-10 mb-5 tracking-tight">{children}</h2>
                    </>
                );
            },
            [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4 tracking-tight">{children}</h3>,
            [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 text-slate-600 leading-8 text-lg">{children}</p>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600 marker:text-[#005c45]">{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-5 mb-6 space-y-2 text-slate-600 marker:text-[#005c45] font-medium">{children}</ol>,
            [BLOCKS.QUOTE]: (node, children) => (
                <blockquote className="relative pl-6 py-4 my-8 border-l-4 border-[#005c45] bg-emerald-50/50 rounded-r-xl italic text-slate-700">
                    {children}
                </blockquote>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
                <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-[#005c45] font-semibold hover:text-[#004d3a] hover:underline decoration-2 underline-offset-2 transition-all">
                    {children}
                </a>
            ),
            [BLOCKS.TABLE]: (node, children) => (
                <div className="overflow-x-auto my-8 rounded-lg shadow-sm border border-slate-400">
                    <table className="w-full text-left border-collapse bg-white">
                        <tbody>{children}</tbody>
                    </table>
                </div>
            ),
            [BLOCKS.TABLE_ROW]: (node, children) => (
                <tr className="border-b border-slate-400 last:border-b-0 hover:bg-slate-50 transition-colors">
                    {children}
                </tr>
            ),
            [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
                <th className="px-6 py-4 bg-slate-200 text-slate-900 font-bold border-r border-slate-400 last:border-r-0 text-sm uppercase tracking-wider align-top">
                    {children}
                </th>
            ),
            [BLOCKS.TABLE_CELL]: (node, children) => (
                <td className="px-6 py-4 text-slate-800 border-r border-slate-400 last:border-r-0 align-top text-sm font-medium">
                    {children}
                </td>
            ),
        }
    }

    return (
        <div className="min-h-screen relative bg-white pt-24 pb-20">
            {faqSchema && (
                <Helmet>
                    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                </Helmet>
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 2-Column Layout */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: Article Content (Spans 8 cols) */}
                    <div className="lg:col-span-8">

                        {/* Clean Editorial Header */}
                        <header className="mb-8">
                            {/* Back Link */}
                            <div className="mb-6">
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#005c45] transition-colors font-medium text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Articles
                                </Link>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight">
                                {post.title}
                            </h1>

                            {/* Meta Row: Author & Date */}
                            <div className="flex flex-wrap items-center justify-between gap-4 text-sm border-b border-slate-100 pb-6 mb-6">
                                <span className="font-bold text-[#005c45]">
                                    By PremiumToolsHub Team
                                </span>
                                <span className="text-slate-500">
                                    Posted on {post.date}
                                </span>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="w-full aspect-[16/9] relative overflow-hidden bg-slate-100 mb-10 rounded-xl shadow-sm border border-slate-100">
                            {post.imageUrl ? (
                                <img src={post.imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient} flex items-center justify-center`}>
                                    <span className="text-8xl animate-pulse opacity-50">{post.icon}</span>
                                </div>
                            )}
                        </div>

                        {/* Table of Contents (After Image, Visible on ALL screens) */}
                        {tocItems.length > 0 && (
                            <div className="bg-white rounded-lg border border-slate-300 p-4 mb-8 shadow-sm max-w-lg">
                                <h4 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                                    Table of Contents
                                </h4>
                                <ul className="space-y-1.5">
                                    {tocItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }}
                                                className="text-slate-600 hover:text-blue-600 hover:underline text-sm font-medium flex items-start gap-2 transition-colors leading-snug"
                                            >
                                                <span className="text-slate-400 mt-0.5">-</span>
                                                <span>{item.text}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Article Content */}
                        <article className="prose prose-lg prose-slate max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold
                            prose-a:text-[#005c45] prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-xl prose-img:border prose-img:border-slate-100
                        ">
                            {documentToReactComponents(post.content, richTextOptions)}
                        </article>

                        {/* Footer CTA (In-Stream) */}
                        <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                Keep the conversation going
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Join our community discussion on WhatsApp.
                            </p>
                            <Button
                                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                                className="inline-flex justify-center"
                            >
                                Join WhatsApp Group
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar (Spans 4 cols) */}
                    {/* Removed 'hidden' to show on mobile at the bottom */}
                    <div className="lg:col-span-4 relative lg:pl-4 mt-12 lg:mt-0">
                        <div className="lg:sticky lg:top-28 space-y-6">

                            {/* Lead Form */}
                            <BlogLeadForm />

                        </div>
                    </div>

                </div>
            </div>

            {/* Sticky Bottom Banner */}
            <StickyLeadBanner />
        </div>
    )
}

export default SingleBlog
