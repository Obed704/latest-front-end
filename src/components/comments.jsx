// frontend/src/components/TestimonialsCards.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TestimonialCard = ({ t }) => (
  <div
    className="p-8 rounded-3xl bg-blue-950"
    style={{
      border: `3px solid ${t.borderColor}`,
      boxShadow: `0 4px 12px ${t.borderColor}33`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
  >
    <p
      style={{
        fontFamily: t.font,
        color: t.textColor,
        fontStyle: "italic",
        lineHeight: 1.6,
        fontSize: "1.1rem",
      }}
      className="mb-6"
    >
      “{t.text}”
    </p>
    <h3
      style={{
        fontFamily: t.font,
        color: t.textColor,
        fontSize: "1.25rem",
        fontWeight: 700,
      }}
    >
      {t.name}
    </h3>
    <p style={{ color: t.textColor, opacity: 0.9 }}>{t.role}</p>
  </div>
);

const TestimonialsCards = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/testimonials`);
        if (!res.ok) throw new Error("Failed to fetch testimonials");

        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-blue-900 flex justify-center">
        <div className="text-white">Loading…</div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 bg-blue-900 flex justify-center">
        <div className="text-white">No testimonials available.</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-blue-900 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        What People Say About STEM Inspires
      </h2>

      {/* Desktop grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8 w-full max-w-6xl px-6">
        {testimonials.map((t) => (
          <TestimonialCard key={t._id} t={t} />
        ))}
      </div>

      {/* Swiper on mobile/tablet */}
      <div className="w-full max-w-2xl px-6 lg:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsCards;
