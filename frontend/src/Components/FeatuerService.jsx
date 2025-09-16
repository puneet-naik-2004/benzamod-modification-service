// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Style/FeatuerService.css";
// import { getCategories } from "Services/category";

// const FeatureService = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   useEffect(() => {
//     getCategories()
//       .then((data) => {
//         if (data.error) {
//           setCategories([]);
//         } else {
//           setCategories(data || []);
//         }
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);
//   return (
//     <div className="feature-service">
//       <h2>Featured Products</h2>
//       <div className="feature-buttons">
//         {categories.map((each) => {
//           return (
//             <button
//             key={each._id}
//               className="nav-btn"
//               onClick={() => navigate(`/product/${each.name?.toLowerCase()}`)}
//             >
//               <img
//                 src={each?.photo} // Replace with real image link
//                 alt="Wraps"
//                 className="btn-icon"
//               />
//               <span>{each.name}</span>
//               <div>{each.description}</div>
//             </button>
//           );
//         })}
       
//       </div>
//     </div>
//   );
// };

// export default FeatureService;




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
      <h2>Featured Products</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}   // ✅ Show 3 at a time
        navigation          // ✅ Arrows
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        className="feature-swiper"
      >
        {services.map((each) => (
          <SwiperSlide key={each._id}>
            <button
              className="nav-btn"
              onClick={() => navigate(`/product/${each.name?.toLowerCase()}`)}
            >
              <img
                src={each?.photo}
                alt={each.name}
                className="btn-icon"
              />
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
