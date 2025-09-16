// import Product from "Components/Product";
import Hedder from "Components/Hedder";
import HeroBanner from "Components/HeroBanner";
import QuickNavigation from "Components/QuickNavigation";
import ClientReviews from "Components/ClientReviews";
import FeatuerService from "Components/FeatuerService";
import Contact from "Components/Contact";
import Footer from "Components/Footer";
import Review from "Components/Review";
import {InquiryList} from "Components/InquiryList";
// import Service from "Components/Service";




function HomePage() {
  return (
    <>
      <Hedder />
      <HeroBanner />
      <QuickNavigation />
      <FeatuerService />
      <ClientReviews />
      <Contact />
      <Review/>
      <Footer />
      {/* <Service/> */}
      {/* <InquiryList/> */}
    
    
    </>
  );
}

export default HomePage;
