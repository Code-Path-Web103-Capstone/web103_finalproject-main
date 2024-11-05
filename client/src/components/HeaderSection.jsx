const HeaderSection = () => {
  return (
    <div className="relative flex w-full items-center">
      <button className="absolute left-10 mt-10 flex h-16 items-center justify-center rounded-lg bg-[#A5A5A5] px-16 py-5 text-3xl font-semibold text-[#D9D9D9] hover:bg-[#777777] focus:outline-none">
        Login
      </button>
      <h1 className="mx-auto mt-10 text-8xl font-extrabold uppercase underline">
        Landing Page
      </h1>
    </div>
  );
};

export default HeaderSection;
