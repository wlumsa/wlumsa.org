"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import {UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/(user)/themeprovider";
import logo from "../../logo.png";
import { Nav } from "@/payload-types";

type NavbarProps = {
  navbarData: Nav;
};

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed top-0 z-30 mb-16 w-full rounded-b-3xl bg-[#2e046d] p-0 px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center">
        {/* Logo - Left Side */}
        <div className="mr-4 flex-shrink-0">
          <Link
            href="/"
            className="btn btn-ghost text-xl normal-case transition-all duration-200 hover:bg-white/10"
          >
            <Image
              src={logo.src}
              alt="Logo"
              height={36}
              width={36}
              className="rounded-lg"
            />
          </Link>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="mr-2 flex-shrink-0 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95 ${
              isMobileMenuOpen ? "bg-white/10" : ""
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Toggle mobile menu</span>
            <span className="flex flex-col items-center justify-center gap-1">
              <span
                className={`h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                  isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                  isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center justify-center text-white lg:flex">
          <div className="flex items-center justify-center gap-6">
            {navbarData.items.map((item, index) => {
              return (
                <div key={index} className="group relative">
                  {item.links && item.links.length === 1 ? (
                    <Link
                      href={item.links[0]?.url || "#"}
                      className="whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 hover:text-gray-200 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-transparent px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white/20">
                        {item.label}
                        <svg
                          className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="invisible absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 transform opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <ul className="grid w-[220px] min-w-[200px] gap-1 rounded-xl border border-white/10 bg-[#2e046d] p-3 shadow-2xl">
                          {item.links?.map((link) => {
                            return (
                              <li key={link.title}>
                                <Link
                                  href={link.url || "#"}
                                  className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-[#3a0a7a] hover:text-white focus:bg-[#3a0a7a] focus:text-white focus:ring-2 focus:ring-white/20"
                                >
                                  <div className="text-sm font-medium leading-none text-white">
                                    {link.title}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 top-2 flex flex-shrink-0 items-center gap-3 sm:right-6 lg:right-8">
          {/* Theme Toggle - Hidden on very small screens */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost hidden transition-all duration-200 hover:bg-white/10 sm:flex"
            aria-label="Toggle theme"
          >
            {theme === "darkTheme" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-white"
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
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>

          {/* Donate Button */}
          {/* <Link
            href="https://forms.gle/EmNHNTtJQ6tq3Wv47"
            className="btn btn-secondary text-primary duration-200 hover:scale-105 hover:shadow-lg transition-all text-xs sm:text-sm"
          >
            Donate
          </Link> */}

          {/* Sign In/Sign Up Button */}
          {/* <SignedOut>
            <Link
              href="/sign-up"
              className="btn btn-secondary text-primary duration-200 hover:scale-105 hover:shadow-lg transition-all text-xs sm:text-sm"
            >
              Sign Up
            </Link>
          </SignedOut> */}

          {/* User Button - When signed in */}
          {/* <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 sm:w-10 sm:h-10",
                  userButtonPopoverCard: "bg-blue-100",
                  userButtonPopoverActionButton: "text-primary",
                },
              }}
            />
          </SignedIn> */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="animate-in fade-in fixed inset-0 bg-black/40 backdrop-blur-[2px] duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div
            id="mobile-nav"
            className="animate-in fade-in zoom-in-95 fixed left-4 right-4 top-20 overflow-hidden rounded-2xl border border-white/10 bg-[#2e046d] shadow-2xl duration-200"
          >
            <div className="max-h-[70vh] overflow-y-auto p-4">
              <div className="space-y-2">
                {navbarData.items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      {item.links && item.links.length === 1 ? (
                        <Link
                          className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-white transition-all duration-200 hover:bg-white/10 hover:text-gray-200"
                          href={item.links[0]?.url || "#"}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <details className="group">
                          <summary className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium text-white transition-all duration-200 hover:bg-white/10 hover:text-gray-200">
                            {item.label}
                            <svg
                              className="h-5 w-5 transition-transform duration-200 group-open:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </summary>
                          <div className="ml-4 mt-2 space-y-1">
                            {item.links?.map((link, linkIndex) => {
                              return (
                                <Link
                                  key={linkIndex}
                                  className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                  href={link.url || "#"}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {link.title}
                                </Link>
                              );
                            })}
                          </div>
                        </details>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Action Buttons */}
              <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
                <button
                  onClick={toggleTheme}
                  className="btn btn-ghost w-full justify-start text-white transition-all duration-200 hover:bg-white/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-3 h-5 w-5"
                  >
                    {theme === "darkTheme" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    )}
                  </svg>
                  {theme === "darkTheme" ? "Light Mode" : "Dark Mode"}
                </button>

                <Link
                  href="https://forms.gle/EmNHNTtJQ6tq3Wv47"
                  className="btn btn-secondary w-full justify-start text-primary transition-all duration-200 hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
