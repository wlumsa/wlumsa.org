"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "../../logo.png";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/(user)/themeprovider";
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
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // const productData = useSelector((state: RootState) => state.shopper.cart);
  // const [totalAmt, setTotalAmt] = useState("");
  // useEffect(() => {

  //   let price = 0;
  //   productData.forEach((item: CartItem) => {
  //     if (item.product.hasSizes) {
  //       price += (item.quantities.S || 0) * item.product.price;
  //       price += (item.quantities.M || 0) * item.product.price;
  //       price += (item.quantities.L || 0) * item.product.price;
  //     } else {
  //       price += (item.quantities.overall || 0) * item.product.price;
  //     }
  //   });
  //   setTotalAmt(price.toFixed(2));
  // }, [productData]);

  return (
    <div className="navbar fixed top-0 z-30 mb-16 rounded-b-3xl bg-primary p-0 px-2 sm:w-full ">
      {/* Mobile */}
      <div className="navbar-start text-white">
        <div className="dropdown">
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
            {navbarData.items.map((item, index) => {
              return (
                <li className="" key={index}>
                  {item.links && item.links.length === 1 ? (
                    <Link
                      className="min-w-0 flex-shrink active:bg-secondary"
                      href={item.links[0]?.url || "#"}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <details>
                      <summary>{item.label}</summary>
                      {item.links && (
                        <ul className="w-fit rounded-t-none bg-primary">
                          {item.links.map((link, index) => {
                            return (
                              <li key={index}>
                                <Link
                                  className="min-w-0 flex-shrink"
                                  href={link.url || "#"}
                                >
                                  {link.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          <Image src={logo.src} alt="Logo" height={32} width={32} />
        </Link>
      </div>

      {/* Desktop */}
      <div className="navbar-center hidden text-base-100 lg:flex ">
        <ul className="menu menu-horizontal gap-2 px-2" tabIndex={0}>
          {navbarData.items.map((item, index) => {
            return (
              <ul
                className="menu menu-horizontal gap-2 px-2"
                tabIndex={0}
                key={index}
              >
                {item.links && item.links.length === 1 ? (
                  <li>
                    <Link
                      className="min-w-0 flex-shrink"
                      href={item.links[0]?.url || "#"}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li className="dropdown dropdown-hover">
                    <div className="">{item.label}</div>
                    <ul className="menu dropdown-content rounded-sm bg-primary shadow-lg">
                      {item.links?.map((link) => {
                        return (
                          <li key={link.title}>
                            <Link
                              className="min-w-0 flex-shrink"
                              href={link.url || "#"}
                            >
                              {link.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                )}
              </ul>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost mr-2"
          aria-label="Toggle theme"
        >
          {theme === "darkTheme" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-base-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-base-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>
        <Link
          href="https://forms.gle/EmNHNTtJQ6tq3Wv47"
          className="btn btn-secondary mr-2 p-2 text-primary duration-200 hover:scale-105"
        >
          Donate
        </Link>
        <div className="dropdown dropdown-end">
          <div className="">
            <SignedOut>
              <div className="btn btn-secondary mx-2 mr-4 p-2 text-primary duration-200 hover:scale-105 ">
                {" "}
                <SignInButton
                  fallbackRedirectUrl={pathname}
                  signUpFallbackRedirectUrl={"/onboarding"}
                />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="mx-2 ">
                {" "}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-blue-100",
                      userButtonPopoverActionButton: "text-primary",
                    },
                  }}
                />{" "}
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
