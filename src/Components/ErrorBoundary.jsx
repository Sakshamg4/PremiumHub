import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen py-24 bg-[#020617] text-white flex flex-col items-center justify-center p-4">
                    <div className="max-w-xl text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse">
                                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
                            Oops! Something went wrong.
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            We encountered an unexpected error while trying to load this content. Please try refreshing the page or contact our support team if the issue persists.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-600/20"
                            >
                                Reload Page
                            </button>
                            <a
                                href="/"
                                className="px-8 py-3 rounded-full bg-[#1e293b] hover:bg-[#334155] text-white font-semibold transition-all duration-300 border border-[#334155]"
                            >
                                Go Back Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
