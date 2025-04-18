import React from "react";
import { FaLock, FaCreditCard, FaEnvelope, FaRocket } from "react-icons/fa";

const Features = () => {
    const features = [
        {
            icon: <FaLock className="text-blue-500 text-4xl" />,
            title: "Authentication",
            description: "Secure and reliable user authentication.",
        },
        {
            icon: <FaCreditCard className="text-green-500 text-4xl" />,
            title: "Payments",
            description: "Seamless payment integration for your app.",
        },
        {
            icon: <FaEnvelope className="text-red-500 text-4xl" />,
            title: "Email",
            description: "Effortless email communication and notifications.",
        },
        {
            icon: <FaRocket className="text-purple-500 text-4xl" />,
            title: "Launch",
            description: "Quickly launch your product with ease.",
        },
    ];

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 text-center"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;