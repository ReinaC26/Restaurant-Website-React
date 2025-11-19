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
    <section className="py-16 text-center">
      <h2 className="text-4xl text-[#e76f51] font-serif mb-8">Gallery</h2>
      <div className="relative w-11/12 max-w-[1000px] mx-auto overflow-hidden rounded-xl bg-[#feecd8] p-8 shadow-lg">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((img, index) => (
            <div key={index} className="min-w-full flex justify-center px-2">
              <img
                src={`${img}`}
                alt={img}
                className="w-3/5 h-[350px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 -translate-y-1/2 bg-[#ff9f68]/90 text-white p-3 rounded-full text-2xl hover:scale-110"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 -translate-y-1/2 bg-[#ff9f68]/90 text-white p-3 rounded-full text-2xl hover:scale-110"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default GallerySlider;
