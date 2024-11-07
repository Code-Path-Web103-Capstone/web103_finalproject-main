const FeatureSection = () => {
  return (
    <section className="container my-5 flex border-2 border-blue-600">
      <div className="container m-8 flex justify-center border border-purple-600">
        <Feature />
        <Feature />
        <Feature />
      </div>
    </section>
  );
};

const Feature = () => {
  return <div className="border-2 p-20">Feature</div>;
};

export default FeatureSection;
