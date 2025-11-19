import React from 'react';

function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex justify-center items-center text-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('main.jpg')`, // Added gradient overlay
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="relative z-10 max-w-3xl p-5 text-[white]">
        <h1 className="text-[70px] md:text-8xl lg:text-9xl mb-[2px] tracking-tight font-extrabold">Between the Bites</h1>
        <p className="text-[20px] md:text-2xl mb-[25px] font-medium">Enjoy the delicious moments, any time of day.</p>
        <a
          href="/menu"
          className="inline-block text-[white] no-underline p-[10px] bg-[#f4a261] rounded-[5px] font-bold hover:bg-[#e76f51] hover:scale-105 transition-transform duration-500 block mx-auto"
        >
          View Our Menu
        </a>
      </div>
    </section>
  );
}

export default Hero;
