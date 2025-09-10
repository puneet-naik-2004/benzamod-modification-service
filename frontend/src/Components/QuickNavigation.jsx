// import React from "react";
// import { useNavigate } from "react-router-dom";
// import '../Style/QuickNavigation.css'

// const QuickNavigation = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="quick-nav">
//       <h2>Quick Navigation</h2>
//        <div className='quick-buttons'>
//       <button className="nav-btn" onClick={() => navigate("/service/car")}>Shop by Car</button>
//       <button className="nav-btn" onClick={() => navigate("/service/bike")}>Shop by Bike</button>
//     </div>
//     </div>
//   );
// };

// export default QuickNavigation;




import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/QuickNavigation.css";

const QuickNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="quick-nav">
      <h2>Quick Navigation</h2>
      <div className="quick-buttons">

        {/* 🚗 Car Button */}
        <button className="nav-btn" onClick={() => navigate("/service/car")}>
          <img 
            src="https://i1.wp.com/www.stugon.com/wp-content/uploads/2013/12/Exotic-Car-Wallpapers-HD-Edition-stugon.com-10.jpg" 
            alt="Car" 
            className="nav-icon"
          />
          <span>Shop by Car</span>
        </button>

        {/* 🏍 Bike Button */}
        <button className="nav-btn" onClick={() => navigate("/service/bike")}>
          <img 
            src="https://tse1.mm.bing.net/th/id/OIP.bilD5PPjwYa72xbiWhdXUgHaE8?r=0&cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3" 
            alt="Bike" 
            className="nav-icon"
          />
          <span>Shop by Bike</span>
        </button>

      </div>
    </div>
  );
};

export default QuickNavigation;
