import GetStartedButton from "./GetStartedButton.jsx";

const ContentSection = () => {
  return (
    <div className="container my-5 flex">
      <ContentText />
      <ContentImage />
    </div>
  );
};

const ContentText = () => {
  return (
    <div className="flex w-1/2 items-center justify-center">
      <section className="items-left m-8 flex flex-col justify-between space-y-12">
        <h2 className="font-manrope text-6xl">
          <span className="font-light"> Money, </span>
          <span className="font-bold">Simplified</span>{" "}
        </h2>
        <p className="font-manrope text-3xl font-light leading-relaxed tracking-wide">
          <span className="font-bold">gobudget</span> lets you save
          effortlessly, spend mindfully, and reach your goals faster. Say
          goodbye to financial stress and hello to a life where every dollar
          works for you.
        </p>
        <GetStartedButton />
      </section>
    </div>
  );
};

const ContentImage = () => {
  return (
    <div className="flex w-1/2 items-center justify-center">
      <div className="m-20 aspect-square w-full overflow-hidden rounded-xl">
        <img
          src="https://images.pexels.com/photos/5909813/pexels-photo-5909813.jpeg?auto=compress&cs=tinysrgb&w=1200"
          className="h-full w-full object-cover"
          alt="Landing Page Visual"
        />
      </div>
    </div>
  );
};

export default ContentSection;
