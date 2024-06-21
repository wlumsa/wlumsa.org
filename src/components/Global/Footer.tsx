import React from 'react';



import Link from 'next/link';
import Image from 'next/image';
import logo from "../../logo.png"
interface FooterProps {
  FooterData: Array<{
    label: string;
    links: Link[];
  }>;
}

/**
 * Footer component.
 * 
 * @param {Object[]} footerGroups - An array of footer groups.
 * @param {Object[]} socialLinks - An array of social links.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC<FooterProps> = ({ footerGroups, socialLinks }) => {
 
  return (
    <>
       <footer id="footer" className="footer bg-base-100 p-10 text-base-content">
        {footerGroups && footerGroups.map((group) => (
  
          <div key={group.Group}>
            <span className="footer-title">{group.CustomGroup || group.Group}</span>
            {group.links.map((link, index) => ( 
              <a key={index} href={link.link} className="link-hover link " target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        ))}
      </footer>


      <footer className="footer border-0 bg-base-100 px-10 py-4 text-base-content">
        <div className="grid-flow-col items-center">
          <Link prefetch={false} href = '/'>
          <Image src={logo} alt="Logo" className="mr-2 h-6 w-6" />
          </Link>
          <p>
            Wilfrid Laurier University <br />
            Muslim Students' Association
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            {socialLinks && socialLinks.map((social, index) => (
              <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="duration-200 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="hover:fill-neutral-focus h-6 w-6 fill-neutral"
              >
                <path key={index} d={social.icon}></path>
              </svg>
            </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
