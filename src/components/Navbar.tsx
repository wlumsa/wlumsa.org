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
  useEffect(() => {

    
    const showDropdown = (dropdownMenu: HTMLElement | null) => {
      if (dropdownMenu) {
        dropdownMenu.style.display = 'block';
      }
    };

    // Function to hide the dropdown
    const hideDropdown = (dropdownMenu: HTMLElement | null) => {
      if (dropdownMenu) {
        dropdownMenu.style.display = 'none';
      }
    };

    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-hover');

    mobileDropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown-content');

      // Mouse enter event listener
      const handleMouseEnter = () => showDropdown(dropdownMenu as HTMLElement | null);
      // Mouse leave event listener
      const handleMouseLeave = () => hideDropdown(dropdownMenu as HTMLElement | null);

      dropdown.addEventListener('mouseenter', handleMouseEnter);
      dropdown.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function for this specific dropdown
      return () => {
        dropdown.removeEventListener('mouseenter', handleMouseEnter);
        dropdown.removeEventListener('mouseleave', handleMouseLeave);
      };
    });


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
    const dropdowns = document.querySelectorAll('.hover-dropdown');

    dropdowns.forEach(dropdown => {
      const details = dropdown.querySelector('details');
      if (details) { // Check if details is not null
        dropdown.addEventListener('mouseenter', () => {
          details.open = true;
        });
        dropdown.addEventListener('mouseleave', () => {
          details.open = false;
        });
      }
      
      
      
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  return (
    <div className="navbar bg-primary fixed top-0 z-30 rounded-b-3xl sm:w-full ">
      {/* Mobile */}
      <div className="navbar-start text-base-100">
        <div className="dropdown dropdown-hover ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content menu menu-sm   z-[1] p-2 shadow bg-primary rounded-box w-52">
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
      <div className="navbar-center hidden lg:flex text-base-100">
        <ul className="menu menu-horizontal px-2 gap-2" tabIndex={0}>
          <li className="dropdown hover-dropdown">
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
          
            <li className="dropdown hover-dropdown">
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
          <li className="dropdown hover-dropdown">
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
          <li><label className="cursor-pointer grid place-items-center">
            <input type="checkbox" value="light" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          </label>
      </li>
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

