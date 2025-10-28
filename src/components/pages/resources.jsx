// DownloadsPage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Header";
import Footer from "../Footer";


const brandColors = {
  yellow: "rgb(247, 244, 46)",
  cyan: "rgb(23, 207, 220)",
  pink: "rgb(242, 30, 167)",
};

const DownloadsPage = () => {
  const [downloads, setDownloads] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingDownloads, setLoadingDownloads] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use this instead of localhost

useEffect(() => {
  // Fetch downloads from backend
  const fetchDownloads = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/downloads`);
      if (!res.ok) throw new Error("Failed to fetch downloads");
      const data = await res.json();

      // Prepend backend URL to image path
      const formatted = data.map((d) => ({
        ...d,
        image: `${BACKEND_URL}/${d.image}`,
      }));

      setDownloads(formatted);
    } catch (err) {
      console.error("Error fetching downloads:", err);
    } finally {
      setLoadingDownloads(false);
    }
  };

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/videos`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoadingVideos(false);
    }
  };

  fetchDownloads();
  fetchVideos();
}, []);


  return (
    <>
      <Navbar />

      {/* Downloads Section */}
      <section className="max-w-full mx-auto px-6 py-32 bg-blue-900">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: brandColors.pink }}
        >
          Download Files
        </h2>

        {loadingDownloads ? (
          <p className="text-white text-center">Loading downloads...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {downloads.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl w-full max-w-[280px] border border-gray-600 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full max-h-44 object-cover rounded-t-2xl"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: brandColors.cyan }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 flex-1">
                    {item.description}
                  </p>
                  {item.fileType && item.fileSize && (
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span>{item.fileType}</span>
                      <span>{item.fileSize}</span>
                    </div>
                  )}
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-white py-2 rounded-lg text-sm transition"
                    style={{ backgroundColor: brandColors.pink }}
                  >
                    {item.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Videos Section */}
      <section
        className="max-w-full mx-auto px-6 py-32"
        style={{
          background: `linear-gradient(135deg, ${brandColors.pink}, ${brandColors.cyan})`,
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: brandColors.yellow }}
        >
          🎥 Watch Our Playlists
        </h2>

        {loadingVideos ? (
          <p className="text-white text-center">Loading videos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {videos.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl w-full max-w-[360px] border border-gray-600 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
              >
                <div className="w-full h-80 sm:h-96 lg:h-96">
                  <iframe
                    src={item.embedUrl}
                    title={item.title}
                    className="w-full h-full rounded-t-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: brandColors.cyan }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {item.description}
                  </p>
                  <a
                    href={item.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-center text-white py-2 rounded-lg text-sm transition"
                    style={{ backgroundColor: brandColors.pink }}
                  >
                    Open Playlist
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default DownloadsPage;