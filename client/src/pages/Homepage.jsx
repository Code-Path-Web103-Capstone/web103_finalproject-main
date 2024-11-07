import Header from "../components/Header";
import ContentSection from "../components/homepage/ContentSection";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import FeatureSection from "../components/homepage/FeatureSection";

const Homepage = () => {
  return (
    <div className="flex h-dvh w-full flex-col bg-[#D9D9D9]">
      <div className="flex justify-between">
        <div className="flex flex-grow flex-col items-center">
          <Header />
          <NavBar />
          <ContentSection />
          <FeatureSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
