import { twMerge } from "tailwind-merge";

const FooterItem = ({ title, className }) => {
  return (
    <div
      className={twMerge(
        "flex w-80 items-center justify-center text-[#3A405A]",
        className
      )}
    >
      <p className="w-2/3">{title}</p>
    </div>
  );
};

export default FooterItem;
