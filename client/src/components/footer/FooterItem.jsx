import { twMerge } from "tailwind-merge";

const FooterItem = ({ title, className }) => {
  return (
    <div
      className={twMerge(
        "flex h-16 w-80 items-center justify-center text-[#3A405A]",
        className
      )}
    >
      <p className="w-2/3 border">{title}</p>
    </div>
  );
};

export default FooterItem;
