import Link from "next/link";
import logo from "public/logo.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";

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

const Navbar: React.FC = () => {
  const productData = useSelector((state: any) => state.shopper.cart)

  const [totalAmt, setTotalAmt] = useState("")

  const [theme, setTheme] = useState('mytheme'); //Added Theme State

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'mytheme';
    setTheme(savedTheme); // Set theme from localStorage or default
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => { // Add toggle theme function
    const newTheme = theme === 'mytheme' ? 'mydark' : 'mytheme';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

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

  return (
    <div className="navbar bg-[#2e046d]  fixed top-0 z-30 rounded-b-3xl sm:w-full">
      {/* Mobile */}
      <div className="navbar-start text-white">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
            <li className="menu-item">
              <details>
                <summary>About</summary>
                <ul className="bg-primary rounded-t-none w-fit">
                  <li><Link href="/about">Our Mission</Link></li>
                  <li><Link href="/IIA">WLU IIA</Link></li>
                  <li><Link href="/about#team">Meet the Team</Link></li> 
                  <li><Link href="/about#constiuion">Constitution</Link></li>
                  <li><Link href="/about#services">Services Offered</Link></li>
                </ul>
              </details>
            </li>
            <li className="menu-item">
              <details>
                <summary>Contact</summary>
                <ul className="bg-primary rounded-t-none w-fit">
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/contact/Support">Support Form</Link></li>
                  <li><Link href="/contact/Volunteer">Volunteer</Link></li>
                  <li><Link href="/contact/Incident">Incident Report</Link></li>
                </ul>
              </details>
            </li>
            <li className="menu-item">
              <details>
                <summary>Resources</summary>
                <ul className="bg-primary rounded-t-none w-fit">
                  <li><Link href="/prayerinfo">Prayer Information</Link></li>
                  <li><Link href="/events">Events</Link></li>
                  <li><Link href="/contact/fiqh">Fiqh Q&A</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/products">Merch</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo.src} alt="Logo" className="h-8 w-8" />
        </Link>
      </div>

      {/* Desktop */}
      <div className="navbar-center hidden lg:flex text-white">
        <ul className="menu menu-horizontal px-2 gap-2" tabIndex={0}>
          <li className="">
            <details>
              <summary className="w-32">About</summary>
              <ul className="bg-primary rounded-t-none shadow-lg">
                <li><Link href="/about">Our Mission</Link></li>
                <li><Link href="/IIA">WLU IIA</Link></li>
                <li><Link href="/about#team">Meet the Team</Link></li>
                <li><Link href="/about#constiuion">Constitution</Link></li>
                <li><Link href="/about#services">Services Offered</Link></li>
              </ul>
            </details>
          </li>
          
          <li className="">
            <details>
              <summary className="w-32">Contact</summary>
              <ul className="bg-primary rounded-t-none  shadow-lg ">
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/contact/Support">Support Form</Link></li>
                <li><Link href="/contact/Volunteer">Volunteer</Link></li>
                <li><Link href="/contact/Incident">Incident Report</Link></li>
              </ul>
            </details>
          </li>
          <li className="">
            <details>
              <summary className="w-32">Resources</summary>
              <ul className="bg-primary rounded-t-none shadow-lg ">
                <li><Link href="/prayerinfo">Prayer Information</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/contact/fiqh">Fiqh Q&A</Link></li>
              </ul>
            </details>
          </li>
          <li><Link href="/products">Merch</Link></li>
          {/* Here is where you can add more to the navbar if needed */}

        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-secondary btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">{productData.length > 0 ? productData.length : 0}</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-primary shadow">
            <div className="card-body">
              <span className="font-bold text-lg text-secondary">{productData.length > 0 ? productData.length : 0} Items</span>
              <span className=" text-white">${totalAmt} CAD</span>
              <div className="card-actions">
                <Link href={'/cart'}>
                  <button className="btn btn-secondary btn-block">View cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

