import HeaderSection from "../components/HeaderSection";
import ContentSection from "../components/ContentSection";
import ImageSection from "../components/ImageSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="flex w-full flex-grow bg-[#D9D9D9]">
      <div className="flex w-full flex-col items-center">
        <HeaderSection />
        <div className="m-10 flex h-full w-5/6">
          <ContentSection />
          <ImageSection />
        </div>
      <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
