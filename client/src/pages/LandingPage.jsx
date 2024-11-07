import HeaderSection from "../components/HeaderSection";
import ContentSection from "../components/ContentSection";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#D9D9D9]">
      <div className="flex justify-between">
        <SideNav />
        <div className="flex flex-grow flex-col items-center">
          <HeaderSection />
          <ContentSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
