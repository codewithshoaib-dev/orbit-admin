import React from 'react';

const Hero = () => {
    return (
        <section className="flex justify-center items-center h-screen bg-gray-100 text-center px-5">
            <div className="max-w-3xl">
                <h1 className="text-4xl font-bold mb-5 text-gray-800">Welcome to Launchkit</h1>
                <p className="text-xl mb-8 text-gray-600">
                    Your one-stop solution to kickstart your projects effortlessly.
                </p>
                <button className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;
