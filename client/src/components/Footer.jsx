import { RiInstagramFill, RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import FooterItem from "./FooterItem";

const Footer = () => {
  return (
    <footer className="flex h-96 w-full items-center justify-center bg-[#A5A5A5]">
      <div className="grid grid-cols-4 grid-rows-2 place-items-center">
        {/* Stay Connected */}
        <div className="flex h-16 w-80 items-center justify-center text-[#3A405A]">
          <p className="w-11/12 border text-2xl font-bold">
            Stay Connected with Us!
          </p>
        </div>
        <FooterItem title={"Company"} className={"text-2xl font-bold"} />
        <FooterItem title={"Site"} className={"text-2xl font-bold"} />
        <FooterItem title={"Help"} className={"text-2xl font-bold"} />
        {/* Socials */}
        <div className="flex h-16 w-80 items-center justify-center">
          <div className="flex w-11/12 space-x-4 border">
            <RiInstagramFill className="size-10" />
            <RiGithubFill className="size-10" />
            <RiTwitterXFill className="size-10" />
          </div>
        </div>
        <FooterItem title={"About"} className={"font-light"} />
        <FooterItem title={"Status"} className={"font-light"} />
        <FooterItem title={"FAQ"} className={"font-light"} />
        {/* All Rights */}
        <div className="flex h-16 w-80 items-center justify-center">
          <p className="w-11/12 border">2024, GoBudget. All Rights Reserved.</p>
        </div>
        <FooterItem title={"Careers"} className={"font-light"} />
        <FooterItem title={"What's New"} className={"font-light"} />
        <FooterItem title={"Email Us"} className={"font-light"} />
      </div>
    </footer>
  );
};

export default Footer;
