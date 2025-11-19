import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GallerySlider from '../components/GallerySlider';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GallerySlider />
      </main>
    </>
  );
}

export default Home;