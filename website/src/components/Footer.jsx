import React from "react";

function Footer() {
  return (
    <footer className="bg-[#ffbb93df] text-black font-serif py-10 px-5 mt-auto">
      <div className="flex flex-[col] md:flex-row items-center justify-center gap-[5vw] mb-5">
        {/* Social Media Links */}
        <div className="social-media flex gap-[20px]">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold no-underline text-[black] hover:text-[#fff9f5] transform hover:scale-110 transition"
            style={{ fontWeight: '700' }}
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold no-underline text-[black] hover:text-[#fff9f5] transform hover:scale-110 transition"
            style={{ fontWeight: '700' }}
          >
            Instagram
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold no-underline text-[black] hover:text-[#fff9f5] transform hover:scale-110 transition"
            style={{ fontWeight: '700' }}
          >
            Twitter
          </a>
        </div>

        {/* Business Hours */}
        <div className="business-hours text-center md:text-left">
          <h3 className="text-lg font-semibold">Business Hours</h3>
          <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
          <p>Sat - Sun: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
