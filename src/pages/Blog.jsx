import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'
import { client } from '../lib/contentful'

const BlogCard = memo(({ post }) => (
    <article
        className="group relative flex flex-col h-full bg-[#f8fafc]/50 backdrop-blur-sm border border-[#bcccdc]/50 
      rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
        <Link
            to={`/blog/${post.slug || post.id}`}
            className="absolute inset-0 z-0"
            aria-label={`Read ${post.title}`}
        />
        {/* Image Placeholder / Gradient */}
        <div className="h-48 w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500 pointer-events-none">
            {post.imageUrl ? (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${post.imageGradient || 'from-blue-600/20 to-blue-400/20'} flex items-center justify-center`}>
                    <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        {post.icon || '📝'}
                    </span>
                </div>
            )}

            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-semibold bg-white/90 text-[#1e293b] rounded-full shadow-sm">
                    {post.category || 'General'}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col relative z-10 pointer-events-none">
            <div className="flex items-center gap-3 text-xs text-[#64748b] mb-3">
                <span>{post.date}</span>
            </div>

            <h3 className="text-xl font-bold text-[#1e293b] mb-3 line-clamp-2 group-hover:text-[#9aa6b2] transition-colors">
                {post.title}
            </h3>

            <p className="text-[#64748b] text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.excerpt}
            </p>

            <div className="mt-auto pt-4 border-t border-[#bcccdc]/30 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1e293b] group-hover:text-[#9aa6b2] transition-colors flex items-center gap-2">
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </div>
    </article>
))

const FeaturedBlogCard = memo(({ post }) => (
    <div className="relative w-full bg-white/50 backdrop-blur-sm border border-[#bcccdc]/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 mb-16 group">
        <Link
            to={`/blog/${post.slug || post.id}`}
            className="absolute inset-0 z-0"
            aria-label={`Read ${post.title}`}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 pointer-events-none">
            {/* Image Section - Left (or Top on mobile) */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
                <div className="absolute top-6 left-6 z-10">
                    <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-blue-600/90 text-white rounded-full shadow-lg">
                        Featured
                    </span>
                </div>
                {post.imageUrl ? (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient || 'from-blue-600/20 to-blue-400/20'} flex items-center justify-center`}>
                        <span className="text-8xl filter drop-shadow-lg opacity-50">{post.icon}</span>
                    </div>
                )}
            </div>

            {/* Content Section - Right (or Bottom on mobile) */}
            <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 text-sm text-[#64748b] mb-4 font-medium">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {post.category || 'General'}
                    </span>
                    <span>{post.date}</span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-[#1e293b] mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h2>

                <p className="text-[#64748b] text-sm lg:text-base leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#bcccdc]/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {post.author ? post.author[0] : 'P'}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#1e293b]">{post.author || 'PremiumHub Team'}</p>
                            <p className="text-xs text-[#64748b]">5 min read</p>
                        </div>
                    </div>
                    <span
                        className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors"
                    >
                        Read Article
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
))


const Blog = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Check if credentials are set
                if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
                    console.warn('Contentful credentials not found. Check .env file.')
                    setLoading(false)
                    return
                }

                const response = await client.getEntries({
                    content_type: 'premiumhub', // Updated to match the Content Type Name "Premiumhub" seen in screenshots (likely lowercase ID)
                    order: '-sys.createdAt'
                })

                const formattedPosts = response.items.map(item => {
                    const featuredImage = item.fields.featuredImage?.[0]; // "Media, many files" is an array
                    const imageUrl = featuredImage?.fields?.file?.url;

                    return {
                        id: item.sys.id,
                        slug: item.fields.slug, // Map the slug field
                        title: item.fields.title,
                        excerpt: item.fields.shortDescription,
                        category: item.fields.category,
                        author: typeof item.fields.author === 'object'
                            ? (item.fields.author?.fields?.name || 'PremiumHub Team')
                            : (item.fields.author || 'PremiumHub Team'),
                        date: item.fields.publishDate
                            ? new Date(item.fields.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                            : new Date(item.sys.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        imageUrl: imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : null,
                        imageGradient: 'from-blue-600/20 to-blue-400/20',
                        icon: '📝',
                        content: item.fields.mainContent
                    }
                })


                setPosts(formattedPosts)
            } catch (error) {
                console.error('Error fetching posts from Contentful:', error)
                // setPosts([]) // Optional: clear posts or show error state
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const featuredPost = posts[0];
    const latestPosts = posts.slice(1);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9aa6b2]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4">


                {/* Featured Post */}
                {featuredPost && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                            <h2 className="text-2xl font-bold text-[#1e293b]">Featured Article</h2>
                        </div>
                        <FeaturedBlogCard post={featuredPost} />
                    </section>
                )}

                {/* Latest Articles Grid */}
                {latestPosts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                            <h2 className="text-2xl font-bold text-[#1e293b]">Latest Articles</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Newsletter / CTA */}
                <div className="relative rounded-3xl overflow-hidden bg-[#d9eafd]/30 border border-[#bcccdc]/50 p-8 md:p-12 text-center">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-4">
                            Never Miss an Update
                        </h2>
                        <p className="text-[#64748b] mb-8">
                            Join our community to get the latest articles, exclusive deals, and premium tool updates directly to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                                variant="primary"
                                className="justify-center w-full sm:w-auto"
                            >
                                Join WhatsApp Community
                            </Button>
                        </div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#bcccdc]/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9aa6b2]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
