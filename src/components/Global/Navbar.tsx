import Link from "next/link";
import logo from "public/logo.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import db from "~/firebase" // Adjust this path to your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number;
  sizes: { S?: number; M?: number; L?: number };
  tags: string[];
}

interface CartItem {
  product: Product;
  quantities: { S?: number; M?: number; L?: number; overall?: number };
}

interface NavbarLink {
  name: string;
  link: string;
}

interface NavbarGroup {
  group: string;
  links: NavbarLink[];
}

const Navbar: React.FC = () => {
  const productData = useSelector((state: any) => state.shopper.cart);
  const [totalAmt, setTotalAmt] = useState("");
  const [navbarData, setNavbarData] = useState<NavbarGroup[]>([]);

  useEffect(() => {
    let price = 0;
    productData.forEach((item: CartItem) => {
      if (item.product.hasSizes) {
        price += (item.quantities.S || 0) * item.product.price;
        price += (item.quantities.M || 0) * item.product.price;
        price += (item.quantities.L || 0) * item.product.price;
      } else {
        price += (item.quantities.overall || 0) * item.product.price;
      }
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  useEffect(() => {
    const fetchNavbarData = async () => {
      const navbarQuerySnapshot = await getDocs(collection(db, 'Navbar'));
      const navbarGroups = await Promise.all(navbarQuerySnapshot.docs.map(async doc => {
        const group = doc.data().Group || doc.data().CustomGroup;
        const linksQuerySnapshot = await getDocs(collection(db, `Navbar/${doc.id}/Links`));
        const links = linksQuerySnapshot.docs.map(linkDoc => linkDoc.data() as NavbarLink);
        return { group, links };
      }));
      setNavbarData(navbarGroups);
    };
    fetchNavbarData();
  }, []);

  return (
    <div className="navbar fixed top-0 z-30 rounded-b-3xl bg-primary sm:w-full ">
      <div className="navbar-start text-base-100">
        <div className="dropdown dropdown-hover ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* Menu icon */}
          </div>
          <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] w-52 rounded-box bg-primary p-2 shadow">
            {navbarData.map(group => (
              <li key={group.group} className="menu-item">
                <details>
                  <summary>{group.group}</summary>
                  <ul className="w-fit rounded-t-none bg-primary">
                    {group.links.map((link, index) => (
                      <li key={index}>
                        <Link href={link.link}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          <Image src={logo.src} alt="Logo" height={32} width={32} />
        </Link>
      </div>
      <div className="navbar-center hidden text-base-100 lg:flex">
        <ul className="menu menu-horizontal gap-2 px-2" tabIndex={0}>
          {navbarData.map(group => (
            <li key={group.group} className="dropdown dropdown-hover">
              <div className="">{group.group}</div>
              <ul className="menu dropdown-content rounded-sm bg-primary shadow-lg">
                {group.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
      
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-secondary"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge indicator-item badge-sm">
                {productData.length > 0 ? productData.length : 0}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-primary shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold text-secondary">
                {productData.length > 0 ? productData.length : 0} Items
              </span>
              <span className=" text-white">${totalAmt} CAD</span>
              <div className="card-actions">
                <Link href={"/cart"}>
                  <button className="btn btn-secondary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
          </div>
          </div>
      
    </div>
  );
};

export default Navbar;
