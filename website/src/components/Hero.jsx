import React from 'react';
import { Link } from "react-router-dom";
import './Hero.css';

function Hero() {
  return (
    <section
      className="hero-section relative w-full h-[90vh] flex justify-center items-center text-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('main.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-content relative z-10 max-w-3xl p-5 text-[white]">
        <h1 className="hero-title text-[70px] md:text-8xl lg:text-9xl mb-[2px] tracking-tight font-extrabold">
          Between the Bites
        </h1>

        <p className="hero-subtitle text-[20px] md:text-2xl mb-[25px] font-medium">
          Enjoy the delicious moments, any time of day.
        </p>

        <Link
          href="/menu"
          className="hero-button inline-block text-[white] no-underline p-[10px] bg-[#f4a261] rounded-[5px] font-bold hover:bg-[#e76f51] hover:scale-105 transition-transform duration-500 block mx-auto"
        >
          View Our Menu
        </Link>
      </div>
    </section>
  );
}

export default Hero;