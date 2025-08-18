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
      <footer id="footer" className="footer bg-base-100 p-10 text-base-content">
        {footerGroups.items.map((item) => (
          <div key={item.id}>
            <span className="footer-title">{item.label}</span>
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

      <footer className="footer border-0 bg-base-100 px-10 py-4 text-base-content">
        <div className="grid-flow-col items-center">
          <Link prefetch={false} href='/'>
            <Image src={logo} alt="Logo" className="mr-2 h-6 w-6" />
          </Link>
          <p>
            Wilfrid Laurier University <br />
            Muslim Students' Association
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
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
                  className="hover:fill-secondary-focus h-6 w-6 fill-secondary"
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
