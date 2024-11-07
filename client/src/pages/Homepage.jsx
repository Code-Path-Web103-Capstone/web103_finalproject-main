import ContentSection from "../components/homepage/ContentSection";
import Footer from "../components/footer/Footer";
import FeatureSection from "../components/homepage/FeatureSection";

const Homepage = () => {
  return (
    <>
      <main className="flex h-auto w-full flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
        <ContentSection />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
