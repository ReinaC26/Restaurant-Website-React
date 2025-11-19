import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GallerySlider from '../components/GallerySlider';

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [cartIcon, setCartIcon] = useState('cart1.png');
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navbar scroll effect + cart icon
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
        setCartIcon('cart2.png');
      } else {
        setScrolled(false);
        setCartIcon('cart1.png');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gallery slider
  useEffect(() => {
    const wrapper = sliderRef.current;
    const slides = wrapper?.querySelectorAll('.slide');
    if (!wrapper || !slides?.length) return;

    const totalSlides = slides.length;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wrapper = sliderRef.current;
    if (wrapper) {
      wrapper.style.transition = 'transform 0.5s ease-in-out';
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? sliderRef.current.querySelectorAll('.slide').length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % sliderRef.current.querySelectorAll('.slide').length);

  return (
    <>
      <Navbar/>
      <main>
        <Hero />
        <GallerySlider ref={sliderRef} prev={prevSlide} next={nextSlide} />
      </main>
    </>
  );
}

export default Home;
