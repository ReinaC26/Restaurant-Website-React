import React from 'react';

function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex justify-center items-center text-center text-white"
      style={{ backgroundImage: "url('main.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-2xl p-5">
        <h1 className="text-6xl mb-5 tracking-wide">Between the Bites</h1>
        <p className="text-xl mb-8">Enjoy the delicious moments, any time of day.</p>
        <a
          href="/menu"
          className="inline-block px-7 py-3 bg-[#f4a261] rounded-lg font-bold hover:bg-[#e76f51] transition transform hover:scale-105"
        >
          View Our Menu
        </a>
      </div>
    </section>
  );
}

export default Hero;
