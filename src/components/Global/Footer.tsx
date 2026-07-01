import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../logo.png";
import { Footer, Social } from "@/payload-types";

interface FooterProps {
  footerGroups: Footer;
  socialData: Social[];
}

const FooterComponent: React.FC<FooterProps> = ({
  footerGroups,
  socialData,
}) => {
  return (
    <div className="">
      <footer
        id="footer"
        className="footer bg-base-100 p-6 text-base-content md:p-10"
      >
        {footerGroups.items.map((item) => (
          <div key={item.id}>
            <span className="footer-title mb-3 opacity-80">{item.label}</span>
            {item.links &&
              item.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="link-hover link "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              ))}
          </div>
        ))}
      </footer>

      <footer className="flex flex-col gap-6 border-0 bg-base-100 px-6 py-6 text-base-content md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <Link prefetch={false} href="/">
            <Image src={logo} alt="Logo" className="h-8 w-8 md:h-6 md:w-6" />
          </Link>
          <p className="text-sm leading-tight md:text-base">
            Wilfrid Laurier University <br />
            Muslim Students' Association
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="flex gap-5">
            {socialData.map((social, index) => (
              <a
                key={index}
                href={typeof social.link === "object" ? social.link.url : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="hover:fill-secondary-focus h-7 w-7 fill-secondary md:h-6 md:w-6"
                >
                  <path key={index} d={social.icon}></path>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
