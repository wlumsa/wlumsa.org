import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../logo.png"
import { Footer, Social } from "@/payload-types";

interface FooterProps {
  footerGroups: Footer,
  socialData: Social[],
}

const FooterComponent: React.FC<FooterProps> = ({ footerGroups, socialData }) => {
  return (
    <div className=''>
      <footer id="footer" className="footer bg-base-100 p-6 md:p-10 text-base-content">
        {footerGroups.items.map((item) => (
          <div key={item.id}>
            <span className="footer-title opacity-80 mb-3">{item.label}</span>
            {item.links && (
              item.links.map((link, index) => (
                <a key={index} href={link.url} className="link-hover link " target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              ))
            )}
          </div>
        ))}
      </footer>

      <footer className="border-0 bg-base-100 px-6 md:px-10 py-6 text-base-content flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <Link prefetch={false} href='/'>
            <Image src={logo} alt="Logo" className="h-8 w-8 md:h-6 md:w-6" />
          </Link>
          <p className="text-sm md:text-base leading-tight">
            Wilfrid Laurier University <br />
            Muslim Students' Association
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="flex gap-5">
            {socialData.map((social, index) => (
              <a
                key={index}
                href={typeof social.link === 'object' ? social.link.url : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="hover:fill-secondary-focus h-7 w-7 md:h-6 md:w-6 fill-secondary"
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
