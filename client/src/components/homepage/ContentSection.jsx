import ImageSection from "./ImageSection.jsx";
import GetStartedButton from "./GetStartedButton.jsx";

const ContentSection = () => {
  return (
    <div className="m-10 flex w-5/6">
      {/* Text */}
      <div className="flex w-1/2 items-center justify-center">
        <section className="flex h-[600px] w-[700px] flex-col items-center justify-between">
          <h2 className="font-manrope text-6xl">
            <span className="font-light"> Money, </span>
            <span className="font-bold">Simplified</span>{" "}
          </h2>
          <p className="font-manrope w-3/4 text-4xl font-light leading-relaxed tracking-wide">
            <span className="font-bold">gobudget</span> lets you save
            effortlessly, spend mindfully, and reach your goals faster. Say
            goodbye to financial stress and hello to a life where every dollar
            works for you.
          </p>
          <GetStartedButton />
        </section>
      </div>
      {/* Image */}
      <ImageSection />
    </div>
  );
};

export default ContentSection;
