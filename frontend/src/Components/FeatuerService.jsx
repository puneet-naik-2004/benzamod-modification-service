



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/FeatuerService.css";
import { getServices } from "Services/service";

// ✅ Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeatureService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data.error) {
          setServices([]);
        } else {
          setServices(data || []);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="feature-service">
      <h2>FEATURED SERVICE</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        className="feature-swiper"
        breakpoints={{
          0: {
            slidesPerView: 1, // ✅ Mobile: 1 card
          },
          640: {
            slidesPerView: 2, // ✅ Small tablets
          },
          1024: {
            slidesPerView: 3, // ✅ Desktop
          },
        }}
      >
        {services.map((each) => (
          <SwiperSlide key={each._id}>
            <button
              className="nav-btn"
              onClick={() => navigate(`/product/${each.name?.toLowerCase()}`)}
            >
              <img src={each?.photo} alt={each.name} className="btn-icon" />
              <span>{each.name}</span>
              <div>{each.description}</div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureService;
