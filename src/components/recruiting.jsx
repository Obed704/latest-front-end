import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // your .env variable

const RecruitingProcess = () => {
  const [processSteps, setProcessSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/process`);
        const data = await res.json();
        setProcessSteps(data);
      } catch (error) {
        console.error("Error fetching process steps:", error);
      }
    };
    fetchSteps();
  }, []);

  return (
    <section className="bg-gray-200 p-20 md:px-24 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold uppercase text-blue-700 tracking-wide">
          Recruiting Schools: The Process
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 max-w-7xl mx-auto text-center">
        {processSteps.map((step) => (
          <div key={step._id} className="flex flex-col items-center px-6">
            <img
              src={`${BACKEND_URL}${step.img}`} // use env variable here
              alt={step.alt}
              className="w-48 h-48 rounded-full object-cover mb-8 shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-xs whitespace-pre-line">
              {step.description.split("\n").map((line, idx) => (
                <span
                  key={idx}
                  className={line.includes("Why are they waiting?") ? step.highlight : ""}
                >
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecruitingProcess;
