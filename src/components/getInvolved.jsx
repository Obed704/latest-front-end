import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  const [involvementData, setInvolvementData] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Use .env

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/getinvolved`);
        const data = await res.json();

        const formatted = data.map((item) => ({
          ...item,
          img: `${BACKEND_URL}${item.img}`, // prepend backend URL
        }));

        setInvolvementData(formatted);
      } catch (error) {
        console.error("Error fetching involvement data:", error);
      }
    };
    fetchData();
  }, [BACKEND_URL]);

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900">
          Get Involved
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          You can make a difference by taking it further or supporting a team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-stretch px-4 md:px-20">
        {involvementData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="p-8 flex flex-col flex-grow text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow">
                {item.description}
              </p>

              {/* Button linking to contact page with subject */}
              <Link
                key={item.title}
                to={item.buttonLink} // use "to" instead of href
                className={`inline-block ${item.buttonColor} text-white px-6 py-3 rounded-full font-semibold transition`}
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetInvolved;
