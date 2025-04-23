import React from "react";
import { useState } from "react";
import { LockClosedIcon, CreditCardIcon, MailIcon } from "@heroicons/react/outline";
import api from "../api/axios";

const LandingPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
             const response = await api.post("/contact", formData);
            alert("Message sent successfully!");
            console.log(response)
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };

    const scrollToContact = () => {
        document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to LaunchKit</h1>
                <p className="text-lg md:text-xl mb-6">Your all-in-one solution for launching your product.</p>
                <button
                    onClick={scrollToContact}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                            <LockClosedIcon className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-4">Authentication</h3>
                            <p>Secure and seamless user authentication for your platform.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                            <CreditCardIcon className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-4">Payment Integration</h3>
                            <p>Integrate with popular payment gateways effortlessly.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                            <MailIcon className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-4">Email Automation</h3>
                            <p>Automate your email campaigns and notifications with ease.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About/FAQ/Testimonial Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
                    <p className="text-center mb-8">
                        LaunchKit is dedicated to helping startups and businesses launch their products with ease.
                    </p>
                    <h3 className="text-2xl font-semibold mb-6">FAQs</h3>
                    <ul className="list-disc pl-6 mb-8">
                        <li>How does LaunchKit work?</li>
                        <li>What integrations are supported?</li>
                        <li>Is there a free trial available?</li>
                    </ul>
                    <h3 className="text-2xl font-semibold mb-6">Testimonials</h3>
                    <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>"LaunchKit made our product launch seamless and stress-free!"</p>
                        <cite className="block mt-4 text-right">- Happy Customer</cite>
                    </blockquote>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact-form" className="py-16 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
                    <form onSubmit={handleContactSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="2"
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className=" bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-600 text-white py-6">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="mb-4">Follow us on:</p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="hover:text-gray-300">Twitter</a>
                        <a href="#" className="hover:text-gray-300">LinkedIn</a>
                        <a href="#" className="hover:text-gray-300">GitHub</a>
                    </div>
                    <p className="mt-4">&copy; 2025 LaunchKit. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;