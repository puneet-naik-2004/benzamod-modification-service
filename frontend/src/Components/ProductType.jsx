// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../Style/ProductType.css";

// const ProductType = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="product-type">
//       <h2>Featured Products</h2>
//       <div className="feature-buttons">
//         <button className="nav-btn" onClick={() => navigate("/product/wraps")}>
//           <img
//             src="https://yeahmotor.com/wp-content/uploads/2019/05/carwrap13.jpg"
//             alt="Wraps"
//             className="btn-icon"
//           />
//           <span>Wraps</span>
//         </button>

//         <button className="nav-btn" onClick={() => navigate("/product/light")}>
//           <img
//             src="https://tse4.mm.bing.net/th/id/OIP.EkygyruzyegE3Hce2hCp5AHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3"
//             alt="Lights"
//             className="btn-icon"
//           />
//           <span>Lights</span>
//         </button>

//         <button className="nav-btn" onClick={() => navigate("/product/exhaust")}>
//           <img
//             src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqmg9JObpeK3cmQWCEz4rWdtaTx-NnTxhatYskz-lgD6uixsuYX6lO9In3V3YOt97gnT-zwgpeD7YOfOygtTom_ffcUppdzmbNnFq7czvcqjrrLOw9NOSiPQ"
//             alt="Exhausts"
//             className="btn-icon"
//           />
//           <span>Exhausts</span>
//         </button>

//         <button className="nav-btn" onClick={() => navigate("/product/seats")}>
//           <img
//             src="https://tse1.mm.bing.net/th/id/OIP.QUpZsogWiX6-QWoE870sNgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3"
//             alt="Seats"
//             className="btn-icon"
//           />
//           <span>Seats</span>
//         </button>

        
//         <button className="nav-btn" onClick={() => navigate("/product/suspension")}>
//           <img
//             src="https://th.bing.com/th/id/OIP.qwWQTv6uKgNXK7BW1QP3mwHaEO?w=202&h=150&c=6&r=0&o=7&dpr=1.1&pid=1.7&rm=3"
//             alt="suspension"
//             className="btn-icon"
//           />
//           <span>suspension</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductType;








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

const ProductType = () => {
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
      <h2>FEATURED PRODUCTS</h2>

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
              onClick={() => navigate(`/product/${each.name?.toLowerCase()}`)}
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

export default ProductType;
