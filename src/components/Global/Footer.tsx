import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFooterData } from '~/redux/footerSlice'; // Adjust the import path
import { RootState, AppDispatch } from '../../redux/store'; // Adjust the import path
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo.png'; // Adjust the path

const Footer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { footerGroups, socialLinks } = useSelector((state: RootState) => state.footer);

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  return (
    <>
      <footer id="member" className="footer bg-base-100 p-10 text-base-content">
        {footerGroups && footerGroups.map((group) => (
          <div key={group.Group}>
            <span className="footer-title">{group.CustomGroup || group.Group}</span>
            {group.Links && group.Links.map((link, index) => (
              <a key={index} href={link.link} className="link-hover link" target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        ))}
      </footer>


      <footer className="footer border-0 bg-base-100 px-10 py-4 text-base-content">
        <div className="grid-flow-col items-center">
          <Image src={logo} alt="Logo" className="mr-2 h-6 w-6" />
          <p>
            Company Name<br />
            Tagline or Address
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
