"use client";
import React, { useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Category {
  title: string;
  id: string;
}
interface ButtonGroupProps {
  categories: Category[];
}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ categories }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Get current category from URL, default to first category (All)
  const currentCategoryId =
    searchParams.get("category") || categories[0]?.id || "0";
  const currentCategory =
    categories.find((cat) => cat.id === currentCategoryId) || categories[0];

  const getUrlWithParams = (params: URLSearchParams) => {
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const handleCategoryClick = (category: Category) => {
    const params = new URLSearchParams(searchParams);

    // If clicking "All" (id: '0'), remove the category param to show all posts
    if (category.id === "0") {
      params.delete("category");
    } else {
      params.set("category", category.id);
    }

    replace(getUrlWithParams(params), { scroll: false });
    setIsMobileDropdownOpen(false);

    // Close the dropdown by removing focus
    if (dropdownRef.current) {
      const activeElement = document.activeElement as HTMLElement;
      activeElement?.blur();
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Dropdown */}
      <div className="lg:hidden">
        <div
          className="dropdown dropdown-bottom mx-auto w-full"
          ref={dropdownRef}
        >
          <div
            tabIndex={0}
            role="button"
            aria-expanded={isMobileDropdownOpen}
            aria-haspopup="listbox"
            onClick={() => setIsMobileDropdownOpen((isOpen) => !isOpen)}
            className="flex h-12 w-full items-center justify-between rounded-md border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content shadow-sm transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>{currentCategory?.title || "Select a category"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isMobileDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </div>
          {isMobileDropdownOpen && (
            <ul
              tabIndex={0}
              role="listbox"
              className="menu dropdown-content z-[1] mt-2 w-full rounded-md border border-base-300 bg-base-100 p-2 shadow-xl"
            >
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={currentCategory?.id === category.id}
                    onClick={() => handleCategoryClick(category)}
                    className={`rounded-md text-left text-sm ${
                      currentCategory?.id === category.id
                        ? "bg-primary font-semibold text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {category.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden justify-center lg:flex">
        <div className="inline-flex max-w-full flex-wrap gap-1 rounded-md border border-base-300 bg-base-200/70 p-1">
          {categories.map((category) => {
            const isActive = currentCategory?.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                aria-pressed={isActive}
                className={[
                  "min-h-10 rounded px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "bg-base-100 text-primary shadow-sm"
                    : "text-base-content/65 hover:bg-base-100/70 hover:text-base-content",
                ].join(" ")}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;
