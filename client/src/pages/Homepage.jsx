import ContentSection from "../components/homepage/ContentSection";
import Footer from "../components/footer/Footer";
import FeatureSection from "../components/homepage/FeatureSection";

const Homepage = () => {
  return (
    <>
      <main className="mt-10 flex h-auto w-full flex-col items-center border-t border-gray-500 bg-[#D9D9D9]">
        <ContentSection />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
