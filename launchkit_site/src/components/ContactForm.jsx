import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/contact", formData);
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex-grow flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>&copy; {new Date().getFullYear()} Launchkit. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ContactForm;