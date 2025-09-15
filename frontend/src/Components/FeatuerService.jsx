import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/FeatuerService.css";
import { getCategories } from "Services/category";

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
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  return (
    <div className="feature-service">
      <h2>Featured Products</h2>
      <div className="feature-buttons">
        {categories.map((each) => {
          return (
            <button
            key={each._id}
              className="nav-btn"
              onClick={() => navigate(`/product/${each.name?.toLowerCase()}`)}
            >
              <img
                src={each?.photo} // Replace with real image link
                alt="Wraps"
                className="btn-icon"
              />
              <span>{each.name}</span>
              <div>{each.description}</div>
            </button>
          );
        })}
        {/* <button className="nav-btn" onClick={() => navigate("/product/wraps")}>
          <img
            src="https://yeahmotor.com/wp-content/uploads/2019/05/carwrap13.jpg" // Replace with real image link
            alt="Wraps"
            className="btn-icon"
          />
          <span>Wraps</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/product/lights")}>
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.EkygyruzyegE3Hce2hCp5AHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3" // Replace with real image link
            alt="Lights"
            className="btn-icon"
          />
          <span>Lights</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/product/exhausts")}
        >
          <img
            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqmg9JObpeK3cmQWCEz4rWdtaTx-NnTxhatYskz-lgD6uixsuYX6lO9In3V3YOt97gnT-zwgpeD7YOfOygtTom_ffcUppdzmbNnFq7czvcqjrrLOw9NOSiPQ" // Replace with real image link
            alt="Exhausts"
            className="btn-icon"
          />
          <span>Exhausts</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/product/seats")}>
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.QUpZsogWiX6-QWoE870sNgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3" // Replace with real image link
            alt="Seats"
            className="btn-icon"
          />
          <span>Seats</span>
        </button> */}
      </div>
    </div>
  );
};

export default FeatureService;
