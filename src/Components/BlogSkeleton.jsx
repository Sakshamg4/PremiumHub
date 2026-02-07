import React from 'react';

// Common skeleton pulse animation class is 'animate-pulse'

export const BlogListSkeleton = () => {
    return (
        <div className="min-h-screen py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4">

                {/* Featured Post Skeleton */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
                    </div>

                    <div className="w-full h-[500px] lg:h-96 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm p-6 animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                            <div className="bg-slate-200 rounded-2xl w-full h-full min-h-[200px]"></div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="flex gap-2">
                                    <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                                    <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                                </div>
                                <div className="h-10 w-3/4 bg-slate-200 rounded"></div>
                                <div className="h-4 w-full bg-slate-200 rounded"></div>
                                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                                <div className="h-4 w-4/6 bg-slate-200 rounded"></div>
                                <div className="pt-4 flex items-center justify-between">
                                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs Skeleton */}
                <div className="mb-8 flex gap-3 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 w-24 bg-slate-200 rounded-full animate-pulse shrink-0"></div>
                    ))}
                </div>

                {/* Latest Articles Grid Skeleton */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden h-[400px] animate-pulse flex flex-col">
                                <div className="h-48 bg-slate-200 w-full aspect-video"></div>
                                <div className="p-6 flex-1 flex flex-col space-y-3">
                                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                    <div className="h-6 w-full bg-slate-200 rounded"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded mt-2"></div>
                                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SingleBlogSkeleton = () => {
    return (
        <div className="min-h-screen relative bg-white pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-8 animate-pulse">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="h-4 w-32 bg-slate-200 rounded mb-6"></div>
                            <div className="h-8 md:h-12 w-3/4 bg-slate-200 rounded mb-4"></div>
                            <div className="h-8 md:h-12 w-1/2 bg-slate-200 rounded mb-6"></div>
                            <div className="flex gap-4 border-b border-slate-100 pb-6 mb-6">
                                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="w-full aspect-[16/9] bg-slate-200 rounded-xl mb-10"></div>

                        {/* TOC Skeleton */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-10 w-full max-w-lg">
                            <div className="h-6 w-40 bg-slate-200 rounded mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
                                <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
                                <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                        {/* Content Paragraphs */}
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-slate-200 rounded"></div>
                            <div className="h-4 w-full bg-slate-200 rounded"></div>
                            <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                            <div className="h-4 w-full bg-slate-200 rounded"></div>
                            <br />
                            <div className="h-4 w-full bg-slate-200 rounded"></div>
                            <div className="h-4 w-11/12 bg-slate-200 rounded"></div>
                            <div className="h-4 w-full bg-slate-200 rounded"></div>
                        </div>
                    </div>

                    {/* Right Column Skeleton (Sidebar) */}
                    <div className="hidden lg:block lg:col-span-4 relative pl-4">
                        <div className="sticky top-28 space-y-6 animate-pulse">
                            {/* Lead Form Box */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-[400px]">
                                <div className="h-6 w-3/4 bg-slate-200 rounded mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-10 w-full bg-slate-200 rounded"></div>
                                    <div className="h-10 w-full bg-slate-200 rounded"></div>
                                    <div className="h-10 w-full bg-slate-200 rounded"></div>
                                    <div className="h-10 w-full bg-slate-200 rounded"></div>
                                    <div className="h-12 w-full bg-slate-300 rounded mt-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
