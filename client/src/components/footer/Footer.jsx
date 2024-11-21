import { RiInstagramFill, RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import FooterItem from "./FooterItem";

const Footer = () => {
  return (
    <footer className="flex h-48 w-full items-center justify-center bg-[#A5A5A5] font-anonymous">
      <div className="flex w-10/12 justify-between">
        {/* Column 1 */}
        <div className="flex flex-col items-start space-y-4">
          <p className="text-2xl font-bold text-[#3A405A]">Stay Connected!</p>
          <div className="flex space-x-4">
            <RiInstagramFill className="size-10" />
            <RiGithubFill className="size-10" />
            <RiTwitterXFill className="size-10" />
          </div>
          <div className="text-center text-xs text-[#3A405A]">
            2024, GoBudget. All Rights Reserved.
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-start space-y-2">
          <FooterItem title={"Company"} className={"text-xl font-bold"} />
          <FooterItem title={"About"} className={"py-0.5 font-light"} />
          <FooterItem title={"Careers"} className={"py-0.5 font-light"} />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-start space-y-2">
          <FooterItem title={"Site"} className={"text-xl font-bold"} />
          <FooterItem title={"Status"} className={"py-0.5 font-light"} />
          <FooterItem title={"What's New"} className={"py-0.5 font-light"} />
        </div>

        {/* Column 4 */}
        <div className="flex flex-col items-start space-y-2">
          <FooterItem title={"Help"} className={"text-xl font-bold"} />
          <FooterItem title={"FAQ"} className={"py-0.5 font-light"} />
          <FooterItem title={"Email Us"} className={"py-0.5 font-light"} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
