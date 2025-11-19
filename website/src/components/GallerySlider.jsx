import React, { useState } from 'react';

const images = [
  'french_toast.jpg',
  'avocado_toast.jpg',
  'interior.jpg',
  'interior2.jpg',
  'shrimp_pasta.jpg',
  'chicken_waffle.jpg',
  'food.jpg',
  'egg_croissant.jpg'
];

function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <section className="py-[30px] text-center">
      <h2 className="text-[40px] text-[#e76f51] font-serif mb-8 max-sm:text-[28px]">
        Gallery
      </h2>

      <div className="
        relative 
        h-[400px]
        w-11/12 max-w-[1000px] mx-auto 
        overflow-hidden rounded-[10px] 
        bg-[#feecd8] p-8 shadow-lg
        max-sm:h-[260px] max-sm:p-3
      ">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-full flex justify-center px-2">
              <img
                src={img}
                alt={img}
                className="
                  w-3/5 h-[350px] object-cover rounded-[10px] mt-[25px]
                  shadow-[1px_3px_6px_rgba(0,0,0,0.2)]
                  hover:scale-105 transition-transform duration-500 block mx-auto

                  max-sm:w-[85%] max-sm:h-[180px] max-sm:mt-[10px]
                "
              />
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="
            absolute top-1/2 left-[40px] -translate-y-1/2 
            bg-[#ff9f68]/90 text-[white] 
            p-[10px] rounded-[50px] text-[50px] border-0 shadow
            hover:scale-105 transition-transform duration-500

            max-sm:text-[28px] max-sm:left-[10px] max-sm:p-[6px]
          "
        >
          &#10094;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="
            absolute top-1/2 right-[40px] -translate-y-1/2 
            bg-[#ff9f68]/90 text-[white] 
            p-[10px] rounded-[50px] text-[50px] border-0 shadow
            hover:scale-105 transition-transform duration-500

            max-sm:text-[28px] max-sm:right-[10px] max-sm:p-[6px]
          "
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default GallerySlider;
