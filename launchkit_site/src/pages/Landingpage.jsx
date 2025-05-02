import React, { useState, useEffect } from "react";
import {
  LockClosedIcon,
  CreditCardIcon,
  MailIcon,
  CloudUploadIcon,
  ChartBarIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import { Linkedin, MessageCircle, User } from 'lucide-react';
import api from "../api/axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [posts, setPosts] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", formData);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/content");
        setPosts(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-center py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Custom Landing Pages & CMS Builds</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          I design and build conversion-focused landing pages with integrated CMS features — tailored for startups, creators, and small businesses.
        </p>
        <button
          onClick={scrollToContact}
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 shadow-lg hover:scale-105 transition"
        >
          Book a Free Demo
        </button>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What I Offer</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { Icon: LockClosedIcon, title: "Secure User Auth", description: "JWT-based secure login with optional email verification." },
              { Icon: CreditCardIcon, title: "Payment Integrations", description: "Stripe, Razorpay or PayPal setup for your app in days." },
              { Icon: MailIcon, title: "Email Features", description: "Setup for welcome emails, password resets, and notifications." },
              { Icon: CloudUploadIcon, title: "Media Storage", description: "Fast and scalable media uploads via AWS S3 or Cloudflare R2." },
              { Icon: ChartBarIcon, title: "Custom Dashboards", description: "Built-in analytics and content management views." },
              { Icon: SupportIcon, title: "Ongoing Support", description: "Priority fixes and improvements after delivery." },
            ].map(({ Icon, title, description }) => (
              <div key={title} className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition">
                <Icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-base">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CMS Showcase */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">CMS Features Preview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { img: "/screenshots/dashboard.png", text: "Intuitive dashboard for managing posts, pages, and users." },
              { img: "/screenshots/editor.png", text: "Rich text editor with media uploads and SEO-friendly options." },
              { img: "/screenshots/analytics.png", text: "Built-in post performance and traffic analytics." },
              { img: "/screenshots/users.png", text: "User management with role-based permissions." },
            ].map(({ img, text }, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <img src={img} alt={`CMS feature ${idx}`} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <p className="text-gray-700">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-form" className="py-20">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Get In Touch</h2>
          <form onSubmit={handleContactSubmit} className="bg-white p-8 rounded-xl shadow space-y-6">
            <input type="text" name="name" placeholder="Your Name" onChange={handleChange} className="w-full border rounded-lg p-3 focus:ring-blue-600 focus:border-blue-600" required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full border rounded-lg p-3 focus:ring-blue-600 focus:border-blue-600" required />
            <textarea name="message" rows="3" placeholder="Message" onChange={handleChange} className="w-full border rounded-lg p-3 focus:ring-blue-600 focus:border-blue-600" required></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* existing LaunchKit, Product, Company, Legal blocks here */}
      </div>

      {/* Social Links */}
      <div className="mt-10 flex justify-center space-x-6">
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-300 transition">
          <Linkedin className="h-6 w-6" />
        </a>
        <a href="https://www.fiverr.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Fiverr" className="hover:text-gray-300 transition">
          <User className="h-6 w-6" />
        </a>
        <a href="https://discord.gg/yourdiscordinvite" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:text-gray-300 transition">
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>

      <div className="border-t border-blue-500 mt-8 pt-6 text-center text-sm">
        <p>&copy; 2025 LaunchKit. All rights reserved.</p>
      </div>
     </footer>

    </div>
  );
};

export default LandingPage;
