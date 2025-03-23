import React from 'react';

const Banner = () => {
    return (
        <div className="bg-yellow-300 flex flex-col sm:flex-row items-center justify-center gap-6 text-center py-4 px-6 w-11/12 sm:w-3/5 mx-auto rounded-lg">
            <p className="text-lg font-medium mb-2 sm:mb-0 font-mono">
                Join our WhatsApp channel
            </p>
            <a href="#" className="inline-block">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-mono font-medium">
                    Join Group
                </button>
            </a>
            <a href="#" className="inline-block">
                <button className="bg-blue-200 text-black px-4 py-2 rounded hover:bg-blue-600 font-mono font-medium">
                    DM Us!
                </button>
            </a>
        </div>
    );
};

export default Banner;
