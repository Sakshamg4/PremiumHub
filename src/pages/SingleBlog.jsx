import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../Components/Button'
import { client } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

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
                    console.warn(`No post found with slug: ${id}`);
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
                    imageUrl: imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : null,
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

    if (loading || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9aa6b2]"></div>
            </div>
        )
    }

    const richTextOptions = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const url = node.data.target.fields?.file?.url;
                if (!url) return null;
                return (
                    <img
                        src={`https:${url}`}
                        alt={node.data.target.fields?.title || 'Blog Image'}
                        className="w-full rounded-xl my-8 object-cover max-h-[500px]"
                    />
                );
            },
            [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] mt-8 mb-4">{children}</h2>,
            [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl md:text-2xl font-bold text-[#1e293b] mt-6 mb-3">{children}</h3>,
            [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4 text-[#334155] leading-relaxed text-lg">{children}</p>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-5 mb-4 space-y-2 text-[#334155]">{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-[#334155]">{children}</ol>,
            [BLOCKS.QUOTE]: (node, children) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50/50 rounded-r-lg italic text-[#475569]">
                    {children}
                </blockquote>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
                <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
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
        <div className="min-h-screen py-24 bg-[#f8fafc]">
            {faqSchema && (
                <Helmet>
                    <script type="application/ld+json">
                        {JSON.stringify(faqSchema)}
                    </script>
                </Helmet>
            )}
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <div className="max-w-4xl mx-auto mb-8">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-[#64748b] hover:text-[#1e293b] transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blog
                    </Link>
                </div>

                <article className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm border border-[#bcccdc]/50 rounded-2xl overflow-hidden shadow-sm">
                    {/* Hero Image / Header */}
                    <div className="h-64 md:h-96 w-full relative overflow-hidden">
                        {post.imageUrl ? (
                            <>
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </>
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient} flex items-center justify-center`}>
                                <span className="text-8xl md:text-9xl filter drop-shadow-lg animate-pulse">
                                    {post.icon}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Meta Data */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                            <span className="px-3 py-1 bg-[#d9eafd] text-[#1e293b] rounded-full font-medium">
                                {post.category || 'General'}
                            </span>
                            <span className="text-[#64748b] flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {post.date}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold text-[#1e293b] mb-8 leading-tight">
                            {post.title}
                        </h1>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none text-[#334155] prose-headings:text-[#1e293b] prose-a:text-blue-600">
                            {documentToReactComponents(post.content, richTextOptions)}
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="bg-[#f8fafc] p-8 md:p-12 border-t border-[#bcccdc]/50 text-center">
                        <h3 className="text-2xl font-bold text-[#1e293b] mb-4">
                            Enjoyed this article?
                        </h3>
                        <p className="text-[#64748b] mb-8 max-w-2xl mx-auto">
                            Join our community to get more insights like this and exclusive access to premium tools.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                                variant="primary"
                                className="justify-center w-full sm:w-auto"
                            >
                                Join Discussion on WhatsApp
                            </Button>
                        </div>
                    </div>
                </article>
            </div >
        </div >
    )
}

export default SingleBlog
