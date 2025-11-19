import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
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
    return (
        <>
        <Navbar />
        <main className="pt-[50px] bg-[#fffaf3] flex flex-col items-center gap-10 px-[20vw] md:px-16">
            <section className="story-section flex flex-col md:flex-row items-center gap-[6vh]">
            <div className="story-content max-w-xl text-center md:text-left text-[20px]">
                <h1 className="text-[50px] md:text-5xl text-[#e76f51] mb-6">Our Story</h1>
                <p className="text-gray-700 mb-4">
                <strong>Between the Bites</strong> was born from a love of gathering around the table where time slows down and conversation flows. 
                Here, every dish is an invitation to pause for a moment to enjoy your life.
                </p>
                <p className="text-gray-700 mb-4">
                While we are inspired by blending classic morning favorites with fresh, lively midday flavors, 
                we're not limited to brunch alone. From fruit pancakes and buttery croissants to crisp salads, handmade sandwiches, and satisfying dinner dishes, 
                every meal is crafted to be enjoyed at your own pace.
                </p>
                <p className="text-gray-700">
                We believe the best memories happen in those little pauses. Share a toast with friends, sip a perfectly brewed latte, or simply take a quiet moment 
                while the world keeps moving :) Our mission is to provide you with a space to relax and feel the simple joys of the day.
                </p>
            </div>
            <div className="story-image">
                <img
                src="/logo.png"
                alt="logo"
                className="mb-[10vh] w-[70%] max-w-[700px] rounded-[15px] shadow-[0px_8px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500 block mx-auto"
                />
            </div>
            </section>
        </main>
        </>
    );
}

export default About;
