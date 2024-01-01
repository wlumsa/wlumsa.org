import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import logo from "public/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { setResources, setForms, setLocalMosques, setSocialLinks, setOtherLinks } from 'src/redux/footerSlice';
import { RootState } from 'src/redux/store';

interface FooterItem {
  name: string;
  link: string;
}

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const resources = useSelector((state: RootState) => state.footer.resources);
  const forms = useSelector((state: RootState) => state.footer.forms);
  const localMosques = useSelector((state: RootState) => state.footer.localMosques);
  const socialLinks = useSelector((state: RootState) => state.footer.socialLinks);
  const otherLinks = useSelector((state: RootState) => state.footer.otherLinks);

  const fetchFooterItems = async (
    collectionName: string,
    actionCreator: (items: FooterItem[] | SocialLink[]) => any
  ) => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const itemsData = querySnapshot.docs.map(
      (doc) => doc.data() as FooterItem | SocialLink
    );
    dispatch(actionCreator(itemsData));
  };

  useEffect(() => {
    fetchFooterItems("Resources", setResources);
    fetchFooterItems("Forms", setForms);
    fetchFooterItems("LocalMosques", setLocalMosques);
    fetchFooterItems("Other", setOtherLinks);
  }, []);

  return (
    <>
      <footer id="member" className="footer bg-base-100 p-10 text-base-content">
        <div>
          <span className="footer-title">Resources</span>
          {resources.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Forms</span>
          {forms.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Local Mosques</span>
          {localMosques.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Other</span>
          {otherLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
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