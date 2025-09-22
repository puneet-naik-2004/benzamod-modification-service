



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/FeatuerService.css";
import { getCategories } from "Services/categories";

// ✅ Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeatureService = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setCategories([]);
        } else {
          setCategories(data || []);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
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
        {categories.map((each) => (
          <SwiperSlide key={each._id}>
            <button
              className="nav-btn"
              onClick={() => navigate(`/service/${each.name?.toLowerCase()}`)}
            >
              <img src={each?.photo} alt={each.name} className="btn-icon" />
              <span>{each.name}</span>
              <p>{each.description} </p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureService;
