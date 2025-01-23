"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "../../logo.png";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import { SignInButton, UserButton } from "@clerk/nextjs";
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

import { Nav } from "@/payload-types";

type NavbarProps = {
  navbarData: Nav;
};

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleClick = (url: string) => {
    setActiveLink(url);
  };

  return (
    <nav className="navbar fixed top-0 z-30 rounded-b-3xl bg-primary sm:w-full mb-16 p-4 shadow-lg">
      {/* Mobile View */}
      <div className="navbar-start text-base-100 flex items-center">
        <div className="dropdown">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-md z-[1] w-72 rounded-box bg-primary p-2 shadow-lg"
          >
            {navbarData.items.map((item, index) => (
              <li key={index} className="py-1">
                {item.links?.length === 1 ? (
                  <Link
                    href={item.links[0]?.url || "#"}
                    className={`active:bg-secondary px-2 py-1 hover:bg-secondary hover:text-primary ${activeLink === item.links[0]?.url ? "bg-secondary text-primary" : ""}`}
                    onClick={() => handleClick(item.links[0]?.url || "#")}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <details>
                    <summary className="cursor-pointer px-2 py-1">
                      {item.label}
                    </summary>
                    <ul className="w-fit rounded-t-none bg-primary ml-4">
                      {item.links?.map((link, linkIndex) => (
                        <li key={linkIndex} className="py-1">
                          <Link
                            href={link.url || "#"}
                            className={`px-2 py-1 hover:bg-secondary hover:text-primary ${activeLink === link.url ? "bg-secondary text-primary" : ""}`}
                            onClick={() => handleClick(link.url || "#")}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl normal-case ml-4">
          <Image src={logo.src} alt="Logo" height={32} width={32} />
        </Link>
      </div>

      {/* Desktop View */}
      <div className="navbar-center hidden text-base-100 lg:flex">
        <ul className="menu menu-horizontal gap-4 px-2">
          {navbarData.items.map((item, index) => (
            <li key={index} className="relative group">
              {item.links?.length === 1 ? (
                <Link
                  href={item.links[0]?.url || "#"}
                  className={`px-3 py-2 hover:bg-secondary hover:text-primary rounded-md ${activeLink === item.links[0]?.url ? "bg-secondary text-primary" : ""}`}
                  onClick={() => handleClick(item.links[0]?.url || "#")}
                >
                  {item.label}
                </Link>
              ) : (
                <div className="dropdown dropdown-hover">
                  <span className="cursor-pointer px-3 py-2 hover:bg-secondary hover:text-primary rounded-md">
                    {item.label}
                  </span>
                  <ul className="menu dropdown-content rounded-md bg-primary shadow-lg mt-2">
                    {item.links?.map((link, linkIndex) => (
                      <li key={linkIndex} className="py-1">
                        <Link
                          href={link.url || "#"}
                          className={`px-3 py-2 hover:bg-secondary hover:text-primary ${activeLink === link.url ? "bg-secondary text-primary" : ""}`}
                          onClick={() => handleClick(link.url || "#")}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right-End Actions */}
      <div className="navbar-end flex items-center">
        <Link
          href="https://forms.gle/EmNHNTtJQ6tq3Wv47"
          className="btn btn-secondary text-primary duration-200 hover:scale-105 p-2 mr-2"
        >
          Donate
        </Link>
        <div className="dropdown dropdown-end">
          {/* <div className="">
            <SignedOut>
              <div className="mx-2 btn btn-secondary text-primary duration-200 hover:scale-105 p-2 mr-4">
                <SignInButton mode="modal" />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="mx-2">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-blue-100",
                      userButtonPopoverActionButton: "text-primary",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
