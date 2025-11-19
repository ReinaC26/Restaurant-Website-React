import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
    // Underline link when it's active
    const links = document.querySelectorAll('.nav-links li a');
    const currentPath = window.location.pathname;
    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) link.classList.add('active');
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
        <Navbar />
        <main className="pt-[8vh] bg-[#fffaf3] px-6 md:px-16">
            <section className="contact-section py-20">
            <h1 className="text-[50px] md:text-5xl text-[#e76f51] text-center mb-12">
                Contact Us
            </h1>

            <div className="contact-wrapper flex flex-row md:flex-row items-start justify-center gap-[3vw] flex-wrap max-w-[1300px] mx-auto">
                {/* Google Map */}
                <div className="map-container flex-1-[400px] w-[600px] rounded-[15px] overflow-hidden mt-[7vh]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d689.0896034243143!2d-73.96199657750266!3d40.76810618583445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258ea40102cdf%3A0xf2c3b6442c44c0fd!2s206%20E%2070th%20St%2C%20New%20York%2C%20NY%2010021!5e1!3m2!1sen!2sus!4v1759622900355!5m2!1sen!2sus&maptype=roadmap"
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container flex-1-1-[400px] h-[580px] w-[600px]">
                <form
                    className="contact-form flex flex-col gap-[20px] bg-[white] p-[30px] md:p-12 rounded-[15px] shadow-[0px_8px_20px_rgba(0,0,0,0.2)]"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name" className="font-semibold text-gray-700">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="p-[15px] border border-gray-300 rounded-[10px] text-gray-700"
                    />

                    <label htmlFor="email" className="font-semibold text-gray-700">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-[15px] border border-gray-300 rounded-[10px] text-gray-700"
                    />

                    <label htmlFor="message" className="font-semibold text-gray-700">
                    Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="p-[15px] border border-gray-300 rounded-[10px] text-gray-700 resize-y"
                    ></textarea>

                    <button
                    type="submit"
                    className="bg-[#e76f51] text-[18px] text-[white] p-[15px] text-lg rounded-[10px] border-[0px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                    Send Message
                    </button>

                    {submitted && (
                    <p className="text-green-600 font-semibold mt-3">
                        Thank you! Your message has been sent.
                    </p>
                    )}
                </form>
                </div>
            </div>
            </section>
        </main>
        </>
    );
}

export default Contact;
