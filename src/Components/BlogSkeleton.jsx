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

                    <div className="w-full h-[500px] lg:h-96 bg-white/50 backdrop-blur-sm border border-[#bcccdc]/50 rounded-3xl overflow-hidden shadow-lg p-6 animate-pulse">
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
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 w-24 bg-slate-200 rounded"></div>
                                            <div className="h-2 w-16 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Latest Articles Grid Skeleton */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-[#f8fafc]/50 border border-[#bcccdc]/50 rounded-2xl overflow-hidden h-96 animate-pulse flex flex-col">
                                <div className="h-48 bg-slate-200 w-full"></div>
                                <div className="p-6 flex-1 flex flex-col space-y-3">
                                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                    <div className="h-6 w-full bg-slate-200 rounded"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded mt-2"></div>
                                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between">
                                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
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
        <div className="min-h-screen py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4">
                {/* Back Button Skeleton */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>

                <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm border border-[#bcccdc]/50 rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    {/* Hero Image Skeleton */}
                    <div className="h-64 md:h-96 w-full bg-slate-200"></div>

                    <div className="p-8 md:p-12 space-y-6">
                        {/* Meta Data */}
                        <div className="flex gap-4">
                            <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                            <div className="h-6 w-32 bg-slate-200 rounded-full"></div>
                        </div>

                        {/* Title */}
                        <div className="space-y-3">
                            <div className="h-10 md:h-12 w-3/4 bg-slate-200 rounded"></div>
                            <div className="h-10 md:h-12 w-1/2 bg-slate-200 rounded"></div>
                        </div>

                        {/* Content Paragraphs */}
                        <div className="space-y-4 pt-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                                    <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
