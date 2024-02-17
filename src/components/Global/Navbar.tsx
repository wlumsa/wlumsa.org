"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "../../logo.png";

/* Readd donate button */
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

interface LinkItem {
  link?: string;
  name: string;
}

interface NavbarGroup {
  Group: string;
  CustomGroup?: string;
  NoGroup?: string;
  NoGroupLink?: string;
  links: LinkItem[];
}

interface NavbarProps {
  navbarData: NavbarGroup[];
}

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const productData = useSelector((state: RootState) => state.shopper.cart);
  const [totalAmt, setTotalAmt] = useState("");

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
    <div className="navbar fixed top-0 z-30 rounded-b-3xl bg-primary sm:w-full ">
      <div className="navbar-start text-base-100">
        <div className="dropdown dropdown-hover ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-md z-[1] w-72  rounded-box bg-primary p-2 shadow"
          >
            {navbarData.map((item) => {
              if (item.Group === "SingleLink") {
                return (
                  <li key={item.NoGroup}>
                    <Link
                      className="min-w-0 flex-shrink"
                      href={item.NoGroupLink || "#"}
                      prefetch={false}
                    >
                      {item.NoGroup}
                    </Link>
                  </li>
                );
              } else {
                const title =
                  item.Group === "Custom" && item.CustomGroup
                    ? item.CustomGroup
                    : item.Group;

                return item.Group && item.Group !== "NoGroup" ? (
                  <li key={item.Group} className="menu-item">
                    <details>
                      <summary className="">{title}</summary>
                      <ul className=" rounded-t-none bg-primary">
                        {item.links.map((link, index) => (
                          <li key={index}>
                            {link.link && (
                              <Link
                                className="min-w-0 flex-shrink"
                                href={link.link}
                                prefetch={false}
                              >
                                {link.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.NoGroup}>
                    {item.NoGroupLink && (
                      <Link
                        className="min-w-0 flex-shrink"
                        href={item.NoGroupLink}
                        prefetch={false}
                      >
                        {item.NoGroup}
                      </Link>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <Link
          prefetch={false}
          href="/"
          className="btn btn-ghost text-xl normal-case"
        >
          <Image src={logo.src} alt="Logo" height={32} width={32} />
        </Link>
      </div>
      <div className="navbar-center hidden text-base-100 lg:flex">
        <ul className="navItems menu menu-horizontal gap-2 px-2" tabIndex={0}>
          {navbarData.map((item) => {
            if (item.Group === "SingleLink") {
              return (
                <li key={item.NoGroup}>
                  <Link prefetch={false} href={item.NoGroupLink || "#"}>
                    {item.NoGroup}
                  </Link>
                </li>
              );
            } else {
              const title =
                item.Group === "Custom" && item.CustomGroup
                  ? item.CustomGroup
                  : item.Group;

              return item.Group && item.Group !== "NoGroup" ? (
                <li key={item.Group} className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="text-white">
                    {title}
                  </div>
                  {""}
                  {/* Updated this line */}
                  {item.links && item.links.length > 0 && (
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[1] rounded-sm bg-primary shadow-lg"
                    >
                      {item.links.map((link, index) => (
                        <li key={index}>
                          {link.link && (
                            <Link prefetch={false} href={link.link}>
                              {link.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : item.NoGroup ? (
                <li key={item.NoGroup}>
                  {item.NoGroupLink && (
                    <Link prefetch={false} href={item.NoGroupLink}>
                      {item.NoGroup}
                    </Link>
                  )}
                </li>
              ) : null;
            }
          })}
        </ul>
      </div>

      <div className="navbar-end">
        <Link
          href="https://forms.gle/EmNHNTtJQ6tq3Wv47"
          className="btn btn-secondary text-primary duration-200 hover:scale-105 p-2 mr-2"
        >
          Donate
        </Link>
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
            className="card dropdown-content card-compact z-[1] mt-3 w-64 bg-primary shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold text-secondary">
                {productData.length > 0 ? productData.length : 0} Items
              </span>
              <span className="text-white">${totalAmt} CAD</span>
              <div className="card-actions">
                <Link prefetch={false} href={"/cart"}>
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
