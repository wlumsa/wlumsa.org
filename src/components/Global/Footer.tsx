import React from 'react';
import logo from 'public/logo.png';

interface FooterGroup {
  Group: string;
  CustomGroup?: string;
  NoGroup?: string;
  NoGroupLink: string;
  createdAt: Date;
  Links: FooterItem[];
}

interface FooterItem {
  name: string;
  link: string;
  createdAt: Date;
}

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

interface FooterProps {
  footerGroups: FooterGroup[];
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ footerGroups, socialLinks }) => {
  return (
    <>
      <footer id="member" className="footer bg-base-100 p-10 text-base-content">
        {footerGroups.map((group, index) => (
          <div key={index}>
            <span className="footer-title">{group.Group}</span>
            {group.Links.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="link-hover link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            ))}
          </div>
        ))}
      </footer>

      <footer className="footer border-0 bg-base-100 px-10 py-4 text-base-content">
        <div className="grid-flow-col items-center">
          <img src={logo.src} alt="WLU MSA Logo" className="mr-2 h-6 w-6" />
          <p>
            Wilfrid Laurier University <br />
            Muslim Students' Association
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="flex flex-row items-center justify-center gap-4">
            {socialLinks.map((social, index) => (
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