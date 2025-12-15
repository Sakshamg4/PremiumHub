import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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

                const entry = await client.getEntry(id)

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
                    imageUrl: imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : null,
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
        }
    }

    return (
        <div className="min-h-screen py-24 bg-[#f8fafc]">
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
