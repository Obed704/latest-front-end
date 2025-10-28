import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use .env

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/sponsors`);
        const data = await res.json();

        // Prepend BACKEND_URL to sponsor images
        const formatted = data.map((sponsor) => ({
          ...sponsor,
          img: `${BACKEND_URL}${sponsor.img}`,
        }));

        setSponsors(formatted);
      } catch (err) {
        console.error("Error fetching sponsors:", err);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <section className="p-16 px-4 md:px-12 max-w-7xl mx-auto bg-gray-200">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        🌟 Our Sponsors
      </h2>

      <div className="grid gap-2 grid-cols-3 md:grid-cols-7 md:px-16">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer max-w-x group"
          >
            <img
              src={sponsor.img}
              alt={sponsor.name}
              className="w-full h-full object-cover block transition-opacity duration-300"
            />

            <div
              className={`absolute inset-0 bg-gradient-to-br ${sponsor.gradient} text-white md:p-6 flex flex-col justify-center items-center space-y-2 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300`}
            >
              <h3 className="text-lg font-semibold">{sponsor.name}</h3>
              <p className="text-xs opacity-90">{sponsor.description}</p>
              <button
                className={`mt-2 px-4 py-1 bg-white font-semibold rounded-full text-xs ${sponsor.btnColor} transition duration-300`}
              >
                See Partner
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsorsSection;
