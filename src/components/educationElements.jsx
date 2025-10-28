// frontend/src/components/EducationElements.jsx
import React, { useEffect, useState } from "react";

// Load backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EducationElements = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/education`);
        if (!res.ok) throw new Error("Failed to fetch education data");

        const data = await res.json();
        setElements(data);
      } catch (err) {
        console.error("Error fetching education data:", err);
        setError("Failed to load education elements.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 text-center">
        <p className="text-gray-700">Loading education elements…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-300 py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          Elements of Education
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          There are three key parts we focus on to equip and educate our program
          participants for the best chances of commitment and success.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
        {elements.map(({ _id, title, description, img, alt, borderColor }) => (
          <div
            key={_id}
            className="bg-gray-300 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition"
          >
            <img
              src={`${BACKEND_URL}${img}`}
              alt={alt || title}
              className={`w-44 h-44 object-cover rounded-full mx-auto mb-6 border-4 ${borderColor} shadow-md`}
            />
            <h3 className="text-xl font-semibold uppercase text-gray-800 mb-3">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="contact.html"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          Take It to Your School
        </a>
      </div>
    </section>
  );
};

export default EducationElements;
