// src/components/FTCLanding.jsx
import React from "react";

// Load backend URL from environment variables (Vite/React)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function FTCLanding() {
  const schools = [
    {
      id: 1,
      name: "College Saint Andrew",
      img: "/ftc/saint-andre.jpg",
      location: "Kigali",
      website: "https://collegesaintandre.ac.rw",
    },
    {
      id: 2,
      name: "Christ Roi Nyanza",
      img: "/ftc/christ-rio2.jpg",
      location: "Rwanda",
      website: "https://collegeduchristroi.ac.rw",
    },
    {
      id: 3,
      name: "Gashora Girls Academy",
      img: "/ftc/gashora.webp",
      location: "Rwanda",
      website: "https://www.ggast.org/",
    },
    {
      id: 4,
      name: "Maranyundo Girls Schools",
      img: "/ftc/maranyundo-2.jpg",
      location: "Rwanda",
      website: "http://maranyundogirlsschool.org",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${BACKEND_URL}/ftc/first-tech-challenge.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Introducing <span className="text-blue-400">FIRST Tech Challenge</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Inspiring the next generation of innovators through robotics, teamwork, and real-world problem solving.
          </p>
          <button
            onClick={() =>
              (window.location.href = "/contact?subject=Joining%20The%20Challenge")
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg"
          >
            Join the Challenge
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-300 text-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-600">About the Competition</h2>
            <p className="text-lg leading-relaxed mb-6">
              FIRST® Tech Challenge students work together with their mentors to design and build robots to compete in a dynamic and exciting challenge released every September.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md">
              Learn More
            </button>
          </div>
          <div>
            <img
              src={`${BACKEND_URL}/ftc/ftc-1.jpg`}
              alt="FTC Competition"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-20 bg-gray-200 text-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-600">Schools Connected</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {schools.map((school) => (
              <a
                key={school.id}
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
              >
                <img
                  src={`${BACKEND_URL}${school.img}`}
                  alt={school.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{school.name}</h3>
                  <p className="text-sm text-gray-600">{school.location}</p>
                </div>
              </a>
            ))}
          </div>
          <button
            onClick={() =>
              (window.location.href = "/contact?subject=Take%20It%20To%20Your%20School")
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg"
          >
            Take It To Your School
          </button>
        </div>
      </section>
    </>
  );
}
