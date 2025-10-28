import React, { useEffect, useState, useRef } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use .env

const HeroSection = () => {
  const [slidesData, setSlidesData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  // Fetch slides from backend API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/slides`);
        const data = await res.json();
        setSlidesData(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);

  // Auto-slide interval
  useEffect(() => {
    if (slidesData.length > 0) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      }, 7000);
    }
    return () => clearInterval(slideInterval.current);
  }, [slidesData]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 7000);
  };

  const renderColoredTitle = (text) => {
    const colors = ["rgb(247, 244, 46)", "rgb(23, 207, 220)", "rgb(242, 30, 167)"];
    return text.split("").map((char, i) => (
      <span key={i} style={{ color: colors[i % colors.length] }}>
        {char}
      </span>
    ));
  };

  if (slidesData.length === 0) {
    return (
      <section className="hero relative h-screen flex items-center justify-center bg-black text-white">
        <p>Loading slides...</p>
      </section>
    );
  }

  return (
    <section className="hero relative h-screen overflow-hidden">
      {/* Slide wrapper */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out absolute top-0 left-0 w-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slidesData.map((slide, index) => (
          <div
            key={slide._id || index}
            className="w-full flex-shrink-0 h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKEND_URL}${slide.bg})` }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

      {/* Hero content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-start px-8 max-w-5xl text-white space-y-6 md:ml-4">
        {/* Logo */}
        <img
          src={`${BACKEND_URL}/welcomeSlide/logo.avif`}
          alt="STEM Inspires Logo"
          className="w-32 mb-4 rounded-md"
        />

        {/* Title */}
        <h1 className="text-5xl font-bold text-blue-500">
          {renderColoredTitle("STEM Inspires")}
        </h1>

        {/* Subtitle */}
        <p className="text-lg max-w-xl">
          Inspiring the Next Generation of Innovators Through Inclusive, Exciting,
          and Hands-On Robotics Curriculums
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <a
            href="/about"
            className="bg-purple-700 text-white px-6 py-3 rounded-full"
          >
            Learn About STEM Inspires
          </a>
          <a
            href="/ourProjects"
            className="border-white text-white border px-6 py-3 rounded-full"
          >
            See Events
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              index === currentSlide
                ? "bg-red-500 scale-125"
                : "bg-white opacity-50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
