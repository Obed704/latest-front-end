import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // use .env

const ThumbnailCarouselFullScreen = ({
  apiUrl = `${BACKEND_URL}/api/project-slides`,
  mainHeight = "100vh",
  thumbHeight = 80,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        // Prepend BACKEND_URL to image paths
        const formattedData = data.map((img) => ({
          ...img,
          src: `${BACKEND_URL}${img.src}`,
        }));

        setImages(formattedData);
      } catch (err) {
        console.error("Error fetching project slides:", err);
      }
    }

    fetchSlides();
  }, [apiUrl]);

  if (images.length === 0)
    return <div className="p-6 text-center text-gray-500">No images to display.</div>;

  return (
    <div className="w-full relative">
      {/* Main Carousel */}
      <Swiper
        spaceBetween={10}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, Autoplay]}
        className="relative"
        style={{ height: mainHeight }}
        lazy={true}
      >
        {images.map((img) => (
          <SwiperSlide key={img._id}>
            <div className="relative w-full h-full">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {img.caption && (
                <p className="absolute bottom-4 md:bottom-20 left-1/2 -translate-x-1/2 text-white text-sm md:text-lg bg-black bg-opacity-50 px-4 py-2 rounded max-w-[90%] text-center">
                  {img.caption}
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Carousel */}
      <div className="absolute bottom-2 md:bottom-4 left-0 w-full px-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={Math.min(images.length, 8)}
          freeMode={true}
          watchSlidesProgress
          navigation
          breakpoints={{
            640: { slidesPerView: Math.min(images.length, 4) },
            768: { slidesPerView: Math.min(images.length, 6) },
            1024: { slidesPerView: Math.min(images.length, 8) },
          }}
          modules={[Thumbs, Navigation]}
          className="max-w-6xl mx-auto"
        >
          {images.map((img) => (
            <SwiperSlide key={img._id} style={{ height: thumbHeight }}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-lg border-2 border-transparent hover:border-blue-500 transition cursor-pointer"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarouselFullScreen;
