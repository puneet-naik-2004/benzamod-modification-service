// import React from 'react'
// import './HeroBanner.css'
// import  HeroImage from "../Images/pexels-nicholas-dias-1119542-2116475.jpg"
// const HeroBanner = () => {
  
//   return (
//     <div>
//       <img className='HeroImage red-background' id='hero' src={HeroImage}></img>
//       <div class="hero-text">
//       <h1> welcome to our bike parts store </h1>
//       {/* <h2>Transform your bike</h2> */}
//       <button className="btn">SHOP NOW</button>
//       </div>
//     </div>
//   )
// }

// export default HeroBanner
// import React from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import
// import "./HeroBanner.css";
// // import HeroImage from "../Images/pexels-nicholas-dias-1119542-2116475.jpg";
// // import HeroImage from "https://i.pinimg.com/236x/a6/f2/ed/a6f2ed182e14725629a28690554578af.jpg"
// const HeroBanner = () => {
//   const navigate = useNavigate(); // ✅ hook for navigation

//   return (
//     <div>
//       <img
//         className="HeroImage red-background"
//         id="hero"
//         src={"https://i.pinimg.com/236x/a6/f2/ed/a6f2ed182e14725629a28690554578af.jpg"}
//         src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSut4-F-84sqta69EtN8-hriEcSHAeyemV0oQ&s"}
//         alt="Hero Banner"
//       />
//       <div className="hero-text">
//         <h1>Welcome to our bike parts store</h1>
//         {/* <h2>Transform your bike</h2> */}
//         <button className="btn" onClick={() => navigate("/feature-service")}>
//           SHOP NOW
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;



import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // slider library
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Style/HeroBanner.css";

const HeroBanner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      img: "https://th.bing.com/th/id/R.509e82cf8056147a9647dbedd6fcdb6d?rik=MEiYzV%2baK5X1kg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-xty2YvCsO_o%2fTZg9Uv1MZ1I%2fAAAAAAAADP8%2fV3hq30eGji0%2fs1600%2fharley_davidson_wallpapers.jpg&ehk=bz4q%2bZ3wVl44l1cY3878jv79JG9nXyILOXAYewIuigw%3d&risl=&pid=ImgRaw&r=0",
      text: "Unleash the Power of Modification 🚀",
      
    },
    {
      id: 2,
      img: "https://static.vecteezy.com/system/resources/previews/047/734/576/non_2x/sleek-futuristic-electric-car-featuring-neon-lights-showcasing-advanced-automotive-design-in-a-night-urban-setting-photo.jpg",
      text: "Custom Bikes & Cars, Built for Legends 🔥",
    },
   
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="hero-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="hero-slide">
            <img src={slide.img} alt="Hero Banner" className="hero-image" />
            <div className="hero-text">
              <h1>{slide.text}</h1>
              <button className="btn" onClick={() => navigate("/feature-service")}>
                🔧 Explore Mods
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
