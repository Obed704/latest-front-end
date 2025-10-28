import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use .env

const MissionVision = () => {
  const [cards, setCards] = useState([]);

  // Fetch from backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/mission-vision`);
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error("Error fetching mission/vision:", err);
      }
    };

    fetchCards();
  }, []);

  // Helper to color letters with custom RGB colors
  const renderColoredTitle = (text) => {
    const title = text || "Untitled"; // fallback if text is undefined/null
    const colors = ["rgb(247, 244, 46)", "rgb(23, 207, 220)", "rgb(242, 30, 167)"];
    return title.split("").map((char, i) => (
      <span key={i} style={{ color: colors[i % colors.length] }}>
        {char}
      </span>
    ));
  };

  if (!cards.length) {
    return (
      <section className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Our Mission & Vision</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-center mb-16 text-white">
        Our Mission & Vision
      </h2>

      {/* Cards container */}
      <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 items-stretch">
        {cards.map((card) => (
          <div
            key={card._id}
            className={`flex-1 h-full min-h-[360px] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 shadow-xl ${card.borderColor || "border-blue-600"} ${card.shadowColor || "hover:shadow-blue-400/50"} transition duration-500 ease-in-out hover:scale-[1.02] group flex flex-col justify-between`}
          >
            <div>
              {/* Colored title */}
              <h3 className="text-2xl font-semibold mb-4">
                {renderColoredTitle(card.title)}
              </h3>
              <p className="text-gray-300 leading-relaxed lg:leading-8">
                {card.description || "No description provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
