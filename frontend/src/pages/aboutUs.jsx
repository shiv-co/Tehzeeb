import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FDD7D7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 md:p-16 relative overflow-hidden">
        {/* Subtle background floral element */}
        <div className="absolute -top-20 -right-20 opacity-10 select-none" aria-hidden>
          <svg width="350" height="350" viewBox="0 0 350 350" fill="none">
            <ellipse cx="175" cy="175" rx="175" ry="175" fill="#63B17B" />
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#3B7046] mb-4 text-center tracking-tight">
            About <span className="text-[#F9A9AC]">Tehzeeb Creations</span>
          </h1>
          <p className="text-lg text-[#3B7046] text-center mb-8">
            Where timeless tradition meets modern elegance. <br />
            Discover ethnic wear that celebrates Indian craftsmanship — and your unique style.
          </p>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#3B7046] flex items-center gap-2 mb-3">
              <span role="img" aria-label="flower">🌸</span> Our Story
            </h2>
            <p className="text-[#3B7046] mb-2">
              Founded to revive and redefine ethnic fashion, <b>Tehzeeb Creations</b> blends age-old weaving, handcrafted details, and contemporary silhouettes in every outfit. Each piece is a story of craftsmanship and care, from sarees and lehengas to chic fusion wear.
            </p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#3B7046] flex items-center gap-2 mb-3">
              <span role="img" aria-label="thread">🧵</span> Our Craftsmanship
            </h2>
            <ul className="list-disc list-inside text-[#3B7046] mb-2 pl-1">
              <li>Authentic handwork & intricate embroidery</li>
              <li>Premium, ethically sourced fabrics</li>
              <li>Impeccable stitching, fit, and finish</li>
            </ul>
            <p className="text-[#3B7046]">
              We work with passionate artisans to ensure every garment is rooted in tradition and finished to perfection.
            </p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#3B7046] flex items-center gap-2 mb-3">
              <span role="img" aria-label="sparkle">💫</span> Our Philosophy
            </h2>
            <p className="text-[#3B7046] mb-2">
              Elegance is in simplicity, and tradition never fades. Our designs are made for women who cherish their roots and celebrate every occasion with grace.
            </p>
            <ul className="list-disc list-inside text-[#3B7046] pl-1">
              <li>Weddings & festive moments</li>
              <li>Family gatherings & cultural events</li>
              <li>Everyday elegance, always</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#3B7046] flex items-center gap-2 mb-3">
              <span role="img" aria-label="heart">🤍</span> Why Choose Us
            </h2>
            <ul className="list-disc list-inside text-[#3B7046] pl-1">
              <li>Timeless ethnic designs with a modern edge</li>
              <li>Handcrafted with love by skilled artisans</li>
              <li>Exclusive collections for every style</li>
              <li>Trusted quality, lasting comfort</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-[#3B7046] flex items-center gap-2 mb-3">
              <span role="img" aria-label="leaf">🌿</span> Our Promise
            </h2>
            <p className="text-[#3B7046]">
              At Tehzeeb Creations, we promise more than just clothing — we promise an experience. One that honors your individuality, uplifts Indian artistry, and brings elegance to every moment.
            </p>
          </section>
        </div>
        {/* Decorative bottom-left accent */}
        <div className="absolute left-0 bottom-0 w-32 h-32 rounded-tr-full bg-[#F9A9AC] opacity-30"></div>
      </div>
    </div>
  );
}