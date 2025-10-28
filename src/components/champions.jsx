import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Load backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ChampionsSection = () => {
  const [champions, setChampions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch champions from API
  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/champions`);
        if (!res.ok) throw new Error("Failed to fetch champions");

        const data = await res.json();

        const formattedData = data.map((champion) => ({
          id: champion._id,
          name: champion.title,
          description: champion.description,
          image: champion.image, // store relative path from backend
          to: "/champions",
        }));

        setChampions(formattedData);
      } catch (err) {
        console.error("Error fetching champions:", err);
      }
    };

    fetchChampions();
  }, []);

  const displayLimit = 3;
  const hasMore = champions.length > displayLimit;
  const displayedChampions = champions.slice(0, displayLimit);

  return (
    <section id="champions" className="py-16 bg-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Champions in recent years
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedChampions.map((champion) => (
            <div
              key={champion.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={`${BACKEND_URL}${champion.image}`}
                alt={champion.name}
                className="w-full h-48 object-cover"
                loading="lazy" // improves performance
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {champion.name}
                </h3>
                <p className="text-gray-600 mb-4">{champion.description}</p>
              </div>
              <div className="text-blue-400 text-2xl font-bold mb-2 px-4">
                <Link to={champion.to}>more</Link>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
            >
              View More
            </button>
          </div>
        )}

        {/* Modal for extra champions */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative overflow-y-auto max-h-[80vh]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
                All Champions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {champions.map((champion) => (
                  <div
                    key={champion.id}
                    className="bg-gray-100 rounded-xl overflow-hidden shadow p-4 flex flex-col"
                  >
                    <img
                      src={`${BACKEND_URL}${champion.image}`}
                      alt={champion.name}
                      className="w-full h-36 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">
                      {champion.name}
                    </h4>
                    <p className="text-gray-700 text-sm">{champion.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChampionsSection;
