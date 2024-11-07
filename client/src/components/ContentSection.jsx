import { Link } from "react-router-dom";

const ContentSection = () => {
  return (
    <div className="m-10 flex w-5/6">
      {/* Text */}
      <div className="flex w-1/2 items-center justify-center">
        <section className="flex h-[600px] w-[700px] flex-col items-center justify-between">
          <h2 className="text-7xl font-extrabold uppercase">Title</h2>
          <p className="w-3/4 text-center text-4xl font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            neque autem praesentium deleniti beatae non repudiandae sequi et
            necessitatibus? Officia assumenda iste vero reprehenderit eveniet
            porro quas quisquam nisi at!
          </p>
          <Link
            to="/auth/signup"
            className="flex w-4/6 items-center justify-center rounded-lg bg-[#778DA9] px-4 py-5 text-3xl font-semibold text-[#D9D9D9] hover:cursor-pointer hover:bg-[#3A405A]"
          >
            Action Button
          </Link>
        </section>
      </div>
      {/* Image */}
      <div className="flex h-auto w-1/2 items-center justify-center">
        <img
          src="https://images.pexels.com/photos/5909813/pexels-photo-5909813.jpeg?auto=compress&cs=tinysrgb&w=1200"
          className="h-[650px] w-[700px] rounded-xl object-cover"
          alt="Landing Page Visual"
        />
      </div>
    </div>
  );
};

export default ContentSection;
