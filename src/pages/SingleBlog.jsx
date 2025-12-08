import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import { client } from '../lib/contentful'

const SingleBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                // Check if ID is numeric (local data)
                if (!isNaN(id)) {
                    const foundPost = LOCAL_POSTS.find(p => p.id === parseInt(id))
                    if (foundPost) {
                        setPost(foundPost)
                    } else {
                        navigate('/blog')
                    }
                    setLoading(false)
                    return
                }

                // Try fetching from Contentful
                if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
                    // If no credentials and ID is not numeric, we can't find it locally (unless we assume local IDs are strings too, but they are numbers in the file)
                    // But wait, if the user clicked a link from the Blog page which was populated by local data, the ID would be numeric.
                    // If they clicked a link populated by Contentful, the ID would be a string.
                    // So if we are here, and credentials are missing, we probably can't fetch it.
                    navigate('/blog')
                    return
                }

                const entry = await client.getEntry(id)


                setPost({
                    id: entry.sys.id,
                    title: entry.fields.title,
                    excerpt: entry.fields.excerpt,
                    category: entry.fields.category,
                    date: new Date(entry.sys.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    imageGradient: entry.fields.imageGradient,
                    icon: entry.fields.icon,
                    content: entry.fields.content // Assuming this is HTML string or we render it appropriately. If Rich Text, we'd need a renderer.
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
                    <div className={`h-64 md:h-96 w-full bg-gradient-to-br ${post.imageGradient || 'from-blue-600/20 to-blue-400/20'} relative flex items-center justify-center`}>
                        <span className="text-8xl md:text-9xl filter drop-shadow-lg animate-pulse">
                            {post.icon || '📝'}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent" />
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
                        <div
                            className="prose prose-lg max-w-none text-[#334155] prose-headings:text-[#1e293b] prose-a:text-[#9aa6b2] hover:prose-a:text-[#7e8c9d]"
                            dangerouslySetInnerHTML={{ __html: post.content?.content?.[0]?.content?.[0]?.value }}
                        />
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
