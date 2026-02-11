import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'
import { client } from '../lib/contentful'
import { BlogListSkeleton } from '../Components/BlogSkeleton'

// Helper to extract text from Contentful Rich Text
const extractTextFromContent = (content) => {
    if (!content || !content.content) return '';
    if (Array.isArray(content.content)) {
        return content.content.map(node => {
            if (node.nodeType === 'text') return node.value;
            return extractTextFromContent(node);
        }).join(' ');
    }
    return '';
};


const BlogCard = memo(({ post }) => (
    <article
        className="group relative flex flex-col h-full bg-white border border-slate-100 
      rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-blue-100"
    >
        <Link
            to={`/blog/${post.slug || post.id}`}
            className="absolute inset-0 z-0"
            aria-label={`Read ${post.title}`}
        />
        {/* Image Section */}
        <div className="aspect-video w-full relative overflow-hidden">
            {post.imageUrl ? (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${post.imageGradient || 'from-blue-600/20 to-blue-400/20'} flex items-center justify-center`}>
                    <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        {post.icon || '📝'}
                    </span>
                </div>
            )}

            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white text-blue-600 rounded-full shadow-sm border border-slate-100">
                    {post.category || 'General'}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col relative z-10 pointer-events-none">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{post.date}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.excerpt}
            </p>

            {/* Footer Action */}
            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                    Read Article
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </span>
            </div>
        </div>
    </article>
));

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
                            <p className="text-sm font-bold text-[#1e293b]">{post.author || 'PremiumToolsHub Team'}</p>
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
));


const Blog = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState("All");

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

                    // Fallback excerpt from mainContent if shortDescription is missing
                    let fallbackExcerpt = '';
                    if (!item.fields.shortDescription && item.fields.mainContent) {
                        const rawText = extractTextFromContent(item.fields.mainContent);
                        fallbackExcerpt = rawText.slice(0, 160) + (rawText.length > 160 ? '...' : '');
                    }

                    return {
                        id: item.sys.id,
                        slug: item.fields.slug, // Map the slug field
                        title: item.fields.title,
                        excerpt: item.fields.shortDescription || fallbackExcerpt,
                        category: item.fields.category,
                        author: typeof item.fields.author === 'object'
                            ? (item.fields.author?.fields?.name || 'PremiumToolsHub Team')
                            : (item.fields.author || 'PremiumToolsHub Team'),
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

    // Get unique categories from all posts
    const categories = ["All", ...new Set(posts.map(post => post.category).filter(Boolean))];

    const filteredPosts = latestPosts.filter(post =>
        activeCategory === "All" || post.category === activeCategory
    );



    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    // Reset page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Optional: Scroll to top of grid
        const gridElement = document.getElementById('blog-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    if (loading) {
        return <BlogListSkeleton />
    }

    return (
        <div className="min-h-screen py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4">


                {/* Featured Post - Only on 'All' */}
                {/* We use a transition wrapper to make the disappearance smoother, or just keep it simple logic but better structured */}
                <div className={`transition-all duration-500 ease-in-out ${activeCategory === "All" ? "opacity-100 max-h-[800px] mb-16" : "opacity-0 max-h-0 mb-0 overflow-hidden"}`}>
                    {featuredPost && (
                        <FeaturedBlogCard post={featuredPost} />
                    )}
                </div>

                {/* Category Filter - Clean Minimal Tabs */}
                <div className="sticky top-20 z-30 mb-8 bg-[#f8fafc]/80 rounded-2xl backdrop-blur-sm border-b border-slate-200/60 -mx-4 px-4 shadow-sm">
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide py-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`
                                        relative py-4 text-sm font-bold transition-all duration-300 whitespace-nowrap
                                        ${activeCategory === category
                                            ? 'text-blue-600'
                                            : 'text-slate-500 hover:text-slate-800'
                                        }
                                    `}
                                >
                                    {category}
                                    {activeCategory === category && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full layout-id-active-tab" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Latest Articles Grid */}
                <section className="mb-24" id="blog-grid">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-bold text-slate-800">
                            {activeCategory === "All" ? "Latest Articles" : `${activeCategory}`}
                        </h2>
                        <span className="text-sm font-medium text-slate-400">
                            Showing {currentPosts.length} of {filteredPosts.length} Articles
                        </span>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {currentPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                                    >
                                        Prev
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => paginate(i + 1)}
                                            className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === i + 1
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-32 bg-white/50 border border-slate-100 rounded-3xl backdrop-blur-sm">
                            <div className="text-6xl mb-4 grayscale opacity-50">📝</div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No articles found</h3>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                View All Posts
                            </button>
                        </div>
                    )}
                </section>

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
