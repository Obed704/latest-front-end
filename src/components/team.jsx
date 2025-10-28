import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use .env

const TeamSection = () => {
  const [teamMembers, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/team`);
        const data = await res.json();

        // Prepend BACKEND_URL to images
        const formatted = data.map((member) => ({
          ...member,
          image: `${BACKEND_URL}${member.image}`,
        }));

        setTeam(formatted);
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-primary dark:text-blue-400 mb-12">
        Our Team
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center p-5 flex flex-col items-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 shadow-sm"
            />

            <h3 className="text-lg font-bold text-gray-800 mb-1 capitalize break-words text-center">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize break-words text-center">
              {member.role}
            </p>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-sm break-all text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline text-center"
              >
                {member.email}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
