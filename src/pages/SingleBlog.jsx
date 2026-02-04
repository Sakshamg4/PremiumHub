import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../Components/Button'
import InlinePromo from '../Components/InlinePromo'
import { client } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { SingleBlogSkeleton } from '../Components/BlogSkeleton'

const SingleBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

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
                    console.warn(`No post found with slug: ${id} `);
                    navigate('/blog');
                    return;
                }

                const entry = response.items[0];

                const featuredImage = entry.fields.featuredImage?.[0]; // Access first image in "Many files" array
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
                // Try fallback to ID if slug lookup failed? Or assume 404
                navigate('/blog')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
        window.scrollTo(0, 0)
    }, [id, navigate])

    // Generate FAQ Schema from Content
    const faqSchema = useMemo(() => {
        if (!post?.content?.content) return null;

        const faqs = [];
        let currentQuestion = null;
        let currentAnswer = "";

        // Common question starters to detect questions without '?'
        const questionIndicators = ['who', 'what', 'where', 'when', 'why', 'how', 'can', 'could', 'should', 'would', 'is', 'are', 'do', 'does'];

        // Helper to extract plain text from rich text nodes recursively
        const extractText = (node) => {
            if (node.nodeType === 'text') {
                return node.value;
            }
            if (node.content) {
                return node.content.map(extractText).join('');
            }
            return '';
        };

        // Iterate through top-level nodes
        for (const node of post.content.content) {
            // Check for Headings (Start of a new section/question)
            if (['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6'].includes(node.nodeType)) {
                // If we were building a previous FAQ and it has an answer, save it
                if (currentQuestion && currentAnswer.trim()) {
                    faqs.push({
                        "@type": "Question",
                        "name": currentQuestion,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": currentAnswer.trim()
                        }
                    });
                }

                // Reset for the new potential question
                currentQuestion = null;
                currentAnswer = "";

                // Check if this new heading is a question
                const text = extractText(node).trim();
                const lowerText = text.toLowerCase();

                // We check if it ends with '?' OR starts with common question words
                const isQuestion = text && (
                    text.endsWith('?') ||
                    questionIndicators.some(w => lowerText.startsWith(w + ' '))
                );

                if (isQuestion) {
                    currentQuestion = text;
                }
            }
            // If it's a paragraph, list, or quote, treat it as part of the answer
            else if (currentQuestion) {
                const text = extractText(node).trim();
                if (text) {
                    // Add a space if appending to existing answer
                    currentAnswer += (currentAnswer ? " " : "") + text;
                }
            }
        }

        // Push the last collected FAQ if valid
        if (currentQuestion && currentAnswer.trim()) {
            faqs.push({
                "@type": "Question",
                "name": currentQuestion,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": currentAnswer.trim()
                }
            });
        }

        if (faqs.length === 0) {
            return null;
        }

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs
        };
    }, [post]);

    if (loading) {
        return <SingleBlogSkeleton />
    }

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
                        className="w-full rounded-2xl my-10 shadow-lg border border-slate-100"
                    />
                );
            },
            [BLOCKS.HEADING_2]: (node, children) => {
                headingCount++;
                // Skip the first heading so ads start from the middle/later sections
                // Also skip every other heading to spacing them out (show on 2nd, 4th, 6th...)
                const showAd = headingCount > 1 && headingCount % 2 === 0 && adCount < 3;
                if (showAd) adCount++;
                return (
                    <>
                        {showAd && <InlinePromo />}
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight">{children}</h2>
                    </>
                );
            },
            [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4 tracking-tight">{children}</h3>,
            [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 text-slate-600 leading-8 text-lg">{children}</p>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-6 mb-6 space-y-3 text-slate-600 marker:text-blue-500">{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-6 mb-6 space-y-3 text-slate-600 marker:text-blue-500 font-medium">{children}</ol>,
            [BLOCKS.QUOTE]: (node, children) => (
                <blockquote className="relative pl-6 py-4 my-8 border-l-4 border-blue-500 bg-blue-50/30 rounded-r-xl italic text-slate-700">
                    <span className="absolute -top-4 left-4 text-4xl text-blue-200">"</span>
                    {children}
                </blockquote>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
                <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline decoration-2 underline-offset-2 transition-all">
                    {children}
                </a>
            ),
            [BLOCKS.TABLE]: (node, children) => (
                <div className="overflow-x-auto my-8">
                    <table className="w-full text-left border-collapse border border-zinc-500 [&_tr:first-child_td]:font-bold [&_tr:first-child_td]:bg-zinc-50 [&_tr:first-child_td_p]:font-bold">
                        <tbody>{children}</tbody>
                    </table>
                </div>
            ),
            [BLOCKS.TABLE_ROW]: (node, children) => (
                <tr className="border-b border-zinc-500 last:border-b-0">
                    {children}
                </tr>
            ),
            [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
                <th className="px-2 py-2 bg-zinc-50 text-zinc-900 font-bold border-r border-zinc-500 last:border-r-0 align-top [&_p]:font-bold [&_p]:m-0">
                    {children}
                </th>
            ),
            [BLOCKS.TABLE_CELL]: (node, children) => (
                <td className="px-2 py-2 text-zinc-700 border-r border-zinc-500 last:border-r-0 align-top [&_p]:m-0">
                    {children}
                </td>
            ),
        }
    }

    return (
        <div className="min-h-screen relative bg-[#f1f5f9] pt-32 pb-24 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-400/10 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-multiply" />
            <div className="absolute top-40 -right-20 w-[600px] h-[600px] bg-purple-400/10 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-multiply" />
            <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-indigo-400/10 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-multiply" />

            {faqSchema && (
                <Helmet>
                    <script type="application/ld+json">
                        {JSON.stringify(faqSchema)}
                    </script>
                </Helmet>
            )}

            <div className="container mx-auto px-4">
                {/* Clean Back Navigation */}
                <div className="max-w-4xl mx-auto mb-10">
                    <Link
                        to="/blog"
                        className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
                    >
                        <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-blue-400 group-hover:text-blue-600 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </span>
                        <span>Back to Articles</span>
                    </Link>
                </div>

                {/* Premium Glass Card */}
                <article className="relative max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden">

                    {/* Hero Header Section */}
                    <div className="px-8 pt-12 pb-8 md:px-16 md:pt-16 text-center">
                        {/* Meta Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            <span className="px-4 py-1.5 bg-blue-50 text-blue-700/90 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100/50 shadow-sm">
                                {post.category || 'Article'}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium px-3 py-1.5 bg-white/50 rounded-full border border-slate-100">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {post.date}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        {/* Author/Meta Row */}
                        <div className="flex items-center justify-center gap-4 border-t border-slate-200/60 pt-8 mt-8 max-w-lg mx-auto">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
                                    PH
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-slate-900 leading-none mb-1">PremiumToolsHub Team</p>
                                <p className="text-xs text-slate-500 font-medium">Verified Author</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image - Edge to Edge */}
                    <div className="w-full aspect-[21/9] md:aspect-[2/1] relative overflow-hidden bg-slate-100 mt-4 mx-2 md:mx-4 rounded-3xl shadow-lg border border-black/5">
                        {post.imageUrl ? (
                            <>
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                            </>
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient} flex items-center justify-center`}>
                                <span className="text-9xl filter drop-shadow-2xl animate-pulse opacity-80">
                                    {post.icon}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="px-8 py-12 md:px-16 md:py-16">
                        <div className="prose prose-lg md:prose-xl prose-slate max-w-none mx-auto 
                            prose-headings:font-bold prose-headings:text-slate-900 
                            prose-p:text-slate-600 prose-p:leading-8 
                            prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-slate-100
                        ">
                            {documentToReactComponents(post.content, richTextOptions)}
                        </div>
                    </div>

                    {/* Premium Footer CTA */}
                    <div className="bg-[#0f172a] mx-2 mb-2 md:mx-4 md:mb-4 rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden group">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Keep the conversation going
                            </h3>
                            <p className="text-slate-400 mb-8 text-lg">
                                Have thoughts on this? Join our private community of creators and developers to discuss more.
                            </p>
                            <Button
                                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                                className="justify-center w-full sm:w-auto"
                            >
                                Join Discussion on WhatsApp
                            </Button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default SingleBlog
