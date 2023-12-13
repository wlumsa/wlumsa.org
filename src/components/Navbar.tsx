import Link from "next/link";
import logo from "public/logo.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
    const productData = useSelector((state:any) => state.shopper.cart)
   
    const [totalAmt,setTotalAmt] = useState("")
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
        <div className="navbar bg-primary fixed top-0 z-30 rounded-b-3xl sm:w-full p">
            {/* Mobile */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-100 hover:scale-105 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 text-base-100">
                        <li><Link href="/#prayer_info" className="hover:scale-105 duration-200">Prayer Info</Link></li>
                        <li><Link href="/events" className="hover:scale-105 duration-200">Events</Link></li>
                        <li><Link href="/about" className="hover:scale-105 duration-200">About us</Link></li>
                        <li><Link href="/resources" className="hover:scale-105 duration-200">Resources</Link></li>
                        <li><Link href="/#member" className="hover:scale-105 duration-200">Member Signup</Link></li>
                        <li><Link href="/products" className="hover:scale-105 duration-200">Merch</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost normal-case text-xl text-base-100">
                    <img src={logo.src} alt="WLU MSA Logo" className="h-8 w-8 hover:scale-105 duration-200" />
                </Link>
            </div>
            {/* Desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base-100">
                    <li><Link href="/#prayer_info" className="hover:scale-105 duration-200">Prayer Info</Link></li>
                        <li><Link href="/events" className="hover:scale-105 duration-200">Events</Link></li>
                        <li><Link href="/about" className="hover:scale-105 duration-200">About us</Link></li>
                        <li><Link href="/resources" className="hover:scale-105 duration-200">Resources</Link></li>
                        <li><Link href="/#member" className="hover:scale-105 duration-200">Member Signup</Link></li>
                        <li><Link href="/products" className="hover:scale-105 duration-200">Merch</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-secondary btn-circle ">
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">{productData.length>0 ? productData.length :0 }</span>
                    </div>
                </div>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-primary shadow">
                    <div className="card-body">
                    <span className="font-bold text-lg text-secondary">{productData.length>0 ? productData.length :0 } Items</span>
                    <span className=" text-white">${totalAmt} CAD</span>
                    <div className="card-actions">
                        <Link href={'/cart'}>
                            <button className="btn btn-secondary btn-block">View cart</button>
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn  btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
