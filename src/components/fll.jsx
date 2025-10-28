// src/components/MainContent.jsx
import React from "react";

// Load backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Fll = () => {
  return (
    <main className="pt-36 px-4 pb-20 space-y-16 max-w-7xl mx-auto">
      {/* Main Card */}
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full p-10 space-y-10">
        {/* Heading + Logo */}
        <div className="flex items-center justify-center gap-4 flex-wrap text-center md:text-left">
          {/* Logo */}
          <img
            src={`${BACKEND_URL}/getInvolved/fll-logo.jpeg`}
            alt="FIRST LEGO League Logo"
            className="w-20 md:w-24 h-auto object-contain"
            onError={(e) => (e.target.src = "/fallback-logo.png")}
          />

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
            <span className="text-black">FIRST</span>{" "}
            <span className="text-red-600">LEGO</span>{" "}
            <span className="text-black">League</span>
          </h1>
        </div>

        {/* Body Text */}
        <div className="text-center space-y-6 px-4 md:px-10">
          <p className="text-lg leading-relaxed">
            <span className="font-medium text-black">FIRST </span>
            <span className="font-medium text-red-600">LEGO </span>
            <span className="font-medium text-black"> League</span> introduces
            science, technology, engineering, and math (STEM) to children ages
            9–16 through fun and exciting hands-on learning. Participants gain
            real-world problem-solving experiences through a guided, global
            robotics program, helping today&apos;s students and teachers build a
            better future together.
          </p>

          <p className="text-xl font-semibold text-black">
            We are bringing this to central Africa!
          </p>

          <p className="text-lg font-medium text-black">
            Check out the schools we are connecting:
          </p>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-white py-16 px-6 md:px-20 rounded-3xl shadow-md">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Schools We&apos;re Connecting
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here&apos;s where we&apos;re bringing the FIRST LEGO League program
            across Central Africa. Explore the locations of participating
            schools.
          </p>

          <iframe
            src="https://www.google.com/maps/d/embed?mid=1YEB-ekeeOGA44BvLrk5FFcMhKfc531U&ehbc=2E312F"
            width="100%"
            height="480"
            loading="lazy"
            title="Participating Schools Map"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Fll;
