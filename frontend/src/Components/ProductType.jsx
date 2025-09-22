import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/ProductType.css";

const ProductType = () => {
  const navigate = useNavigate();

  return (
    <div className="product-type">
      <h2>Featured Products</h2>
      <div className="feature-buttons">
        <button className="nav-btn" onClick={() => navigate("/product/wraps")}>
          <img
            src="https://yeahmotor.com/wp-content/uploads/2019/05/carwrap13.jpg"
            alt="Wraps"
            className="btn-icon"
          />
          <span>Wraps</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/product/light")}>
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.EkygyruzyegE3Hce2hCp5AHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3"
            alt="Lights"
            className="btn-icon"
          />
          <span>Lights</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/product/exhaust")}>
          <img
            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqmg9JObpeK3cmQWCEz4rWdtaTx-NnTxhatYskz-lgD6uixsuYX6lO9In3V3YOt97gnT-zwgpeD7YOfOygtTom_ffcUppdzmbNnFq7czvcqjrrLOw9NOSiPQ"
            alt="Exhausts"
            className="btn-icon"
          />
          <span>Exhausts</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/product/seats")}>
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.QUpZsogWiX6-QWoE870sNgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Seats"
            className="btn-icon"
          />
          <span>Seats</span>
        </button>

        
        <button className="nav-btn" onClick={() => navigate("/product/suspension")}>
          <img
            src="https://th.bing.com/th/id/OIP.qwWQTv6uKgNXK7BW1QP3mwHaEO?w=202&h=150&c=6&r=0&o=7&dpr=1.1&pid=1.7&rm=3"
            alt="suspension"
            className="btn-icon"
          />
          <span>suspension</span>
        </button>
      </div>
    </div>
  );
};

export default ProductType;
