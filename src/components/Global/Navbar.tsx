"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/(user)/themeprovider";
import logo from "../../logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/UI/navigation-menu";

import { Nav } from "@/payload-types";

type NavbarProps = {
  navbarData: Nav;
};

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="navbar fixed top-0 z-30 mb-16 rounded-b-3xl bg-[#2e046d] p-0 px-2 sm:px-4 w-full">
      {/* Logo - Left Side */}
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl normal-case hover:bg-white/10 transition-all duration-200">
          <Image src={logo.src} alt="Logo" height={36} width={36} className="rounded-lg" />
        </Link>
      </div>

      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="navbar-start lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-ghost hover:bg-white/10 transition-all duration-200"
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-white transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Navigation - Center */}
      <div className="navbar-center hidden text-white lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {navbarData.items.map((item, index) => {
              return (
                <NavigationMenuItem key={index}>
                  {item.links && item.links.length === 1 ? (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.links[0]?.url || "#"}
                        className="text-white hover:text-gray-200 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:text-gray-200 hover:bg-white/10 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 data-[state=open]:bg-white/10 data-[state=open]:text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-1 p-3 bg-[#2e046d] rounded-xl shadow-2xl border border-white/10">
                          {item.links?.map((link) => {
                            return (
                              <li key={link.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={link.url || "#"}
                                    className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-[#3a0a7a] hover:text-white focus:bg-[#3a0a7a] focus:text-white focus:ring-2 focus:ring-white/20"
                                  >
                                    <div className="text-sm font-medium leading-none text-white">
                                      {link.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right Side Actions */}
      <div className="navbar-end">
        {/* Theme Toggle - Hidden on very small screens */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost mr-2 sm:mr-3 hover:bg-white/10 transition-all duration-200 hidden sm:flex"
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

        {/* Donate Button - Responsive sizing */}
        <Link
          href="https://forms.gle/EmNHNTtJQ6tq3Wv47"
          className="btn btn-secondary mr-2 sm:mr-3 p-2 sm:p-3 text-primary duration-200 hover:scale-105 hover:shadow-lg transition-all text-xs sm:text-sm"
        >
          Donate
        </Link>

        {/* Auth Buttons - Responsive sizing */}
        <div className="dropdown dropdown-end">
          <div className="">
            <SignedOut>
              <div className="btn btn-secondary mx-1 sm:mx-2 mr-2 sm:mr-4 p-2 sm:p-3 text-primary duration-200 hover:scale-105 hover:shadow-lg transition-all text-xs sm:text-sm">
                {" "}
                <SignInButton
                  fallbackRedirectUrl={pathname}
                  signUpFallbackRedirectUrl={"/onboarding"}
                />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="mx-1 sm:mx-2">
                {" "}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 sm:w-10 sm:h-10",
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-20 left-4 right-4 bg-[#2e046d] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                {navbarData.items.map((item, index) => {
                  return (
                    <div key={index} className="border-b border-white/10 last:border-b-0">
                      {item.links && item.links.length === 1 ? (
                        <Link
                          className="block w-full text-left text-white hover:text-gray-200 hover:bg-white/10 rounded-lg px-4 py-3 transition-all duration-200 text-base font-medium"
                          href={item.links[0]?.url || "#"}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <details className="group">
                          <summary className="flex items-center justify-between w-full text-left text-white hover:text-gray-200 hover:bg-white/10 rounded-lg px-4 py-3 transition-all duration-200 text-base font-medium cursor-pointer">
                            {item.label}
                            <svg
                              className="w-5 h-5 transition-transform duration-200 group-open:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-2 ml-4 space-y-1">
                            {item.links?.map((link, linkIndex) => {
                              return (
                                <Link
                                  key={linkIndex}
                                  className="block w-full text-left text-gray-200 hover:text-white hover:bg-white/10 rounded-lg px-4 py-2 transition-all duration-200 text-sm"
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
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full btn btn-ghost text-white hover:bg-white/10 transition-all duration-200 justify-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 mr-3"
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
                  className="w-full btn btn-secondary text-primary hover:scale-105 transition-all duration-200 justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
