import { Link } from "react-router-dom";

const ContentSection = () => {
  return (
    <div className="flex w-1/2 items-center justify-center">
      <section className="flex h-[600px] w-[700px] flex-col items-center justify-between">
        <h2 className="text-7xl font-extrabold uppercase">Title</h2>
        <p className="w-3/5 text-center text-4xl font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          neque autem praesentium deleniti beatae non repudiandae sequi et
          necessitatibus? Officia assumenda iste vero reprehenderit eveniet
          porro quas quisquam nisi at!
        </p>
        <Link
          to="/signup"
          className="flex w-4/6 items-center justify-center rounded-lg bg-[#A5A5A5] px-4 py-5 text-3xl font-semibold text-[#D9D9D9] hover:cursor-pointer hover:bg-[#777777]"
        >
          Action Button
        </Link>
      </section>
    </div>
  );
};

export default ContentSection;
