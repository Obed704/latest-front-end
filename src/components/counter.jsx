// StatsSection.jsx
import React, { useEffect, useRef, useState } from "react";

// Data for stats
const statsData = [
  { id: 1, label: "Teams Started", target: 125, color: "text-red-600" },
  { id: 2, label: "Students Learning", target: 2500, color: "text-green-700", plus: true },
  { id: 3, label: "Competitions", target: 13, color: "text-blue-700" },
];

const StatsSection = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const statRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = statRefs.current.indexOf(entry.target);
            if (index === -1) return;

            const target = statsData[index].target;
            const speed = 20;
            let count = 0;
            const increment = Math.ceil(target / 100);

            const countUp = () => {
              count += increment;
              if (count > target) count = target;

              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = count;
                return newCounts;
              });

              if (count < target) {
                setTimeout(countUp, speed);
              }
            };

            countUp();
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 1 }
    );

    statRefs.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <section id="stats" className="py-16 bg-yellow-300 text-black font-sans">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 text-center gap-10">
        {statsData.map((stat, idx) => (
          <div
            key={stat.id}
            ref={(el) => (statRefs.current[idx] = el)}
            className="opacity-0 translate-y-6 transition duration-700 ease-out stat-item"
          >
            <h3 className={`text-5xl font-extrabold counter ${stat.color}`}>
              {counts[idx]}{stat.plus && counts[idx] === stat.target ? "+" : stat.plus ? "+" : ""}
            </h3>
            <p className="mt-2 text-lg font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
