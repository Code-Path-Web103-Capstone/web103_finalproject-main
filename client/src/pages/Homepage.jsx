import ContentSection from "../components/homepage/ContentSection";
import Footer from "../components/footer/Footer";
// import FeatureSection from "../components/homepage/FeatureSection";
import PageLayout from "../layouts/PageLayout";

const Homepage = () => {
  return (
    <>
      <PageLayout>
        <ContentSection />
        {/* <FeatureSection /> */}
      </PageLayout>
      <Footer />
    </>
  );
};

export default Homepage;
