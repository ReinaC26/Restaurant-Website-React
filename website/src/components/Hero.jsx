import React from 'react';

function Hero() {
  return (
    <section
      className="
        relative w-full h-[90vh] flex justify-center items-center text-center
        max-sm:h-[70vh] max-sm:px-4
      "
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('main.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="
        relative z-10 max-w-3xl p-5 text-[white]
        max-sm:max-w-[90%] max-sm:p-2
      ">
        <h1
          className="
            text-[70px] md:text-8xl lg:text-9xl mb-[2px] tracking-tight font-extrabold
            max-sm:text-[38px] max-sm:leading-[1.1]
          "
        >
          Between the Bites
        </h1>

        <p
          className="
            text-[20px] md:text-2xl mb-[25px] font-medium
            max-sm:text-[16px] max-sm:mb-[15px]
          "
        >
          Enjoy the delicious moments, any time of day.
        </p>

        <a
          href="/menu"
          className="
            inline-block text-[white] no-underline p-[10px] bg-[#f4a261]
            rounded-[5px] font-bold hover:bg-[#e76f51] hover:scale-105 
            transition-transform duration-500 block mx-auto

            max-sm:text-[14px] max-sm:p-[8px] max-sm:w-[150px]
          "
        >
          View Our Menu
        </a>
      </div>
    </section>
  );
}

export default Hero;
