"use client"
import React from 'react'
import { useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface Category {
    title: string,
    id: string
}
interface ButtonGroupProps {
    categories: Category[];

}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ categories }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get current category from URL, default to first category (All)
    const currentCategoryId = searchParams.get('category') || categories[0]?.id || '0';
    const currentCategory = categories.find(cat => cat.id === currentCategoryId) || categories[0];

    const getUrlWithParams = (params: URLSearchParams) => {
        const queryString = params.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    };

    const handleCategoryClick = (category: Category) => {
        const params = new URLSearchParams(searchParams);

        // If clicking "All" (id: '0'), remove the category param to show all posts
        if (category.id === '0') {
            params.delete('category');
        } else {
            params.set('category', category.id);
        }

        replace(getUrlWithParams(params), { scroll: false });

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
                <div className="dropdown dropdown-bottom mx-auto w-full" ref={dropdownRef}>
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-outline btn-primary h-12 w-full justify-between rounded-md normal-case font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <span>{currentCategory?.title || 'Select a category'}</span>
                        <ChevronDown size={16} aria-hidden />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] mt-3 w-full rounded-md border border-base-300 bg-base-100 p-2 shadow-lg">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleCategoryClick(category)}
                                    className={`text-left ${currentCategory?.id === category.id ? 'bg-primary text-primary-content font-semibold' : 'hover:bg-base-200'}`}
                                >
                                    {category.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex justify-start">
                <div className="inline-flex max-w-full flex-wrap justify-start gap-1">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className={`
                                rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                                ${currentCategory?.id === category.id
                                    ? 'border-primary bg-primary text-primary-content'
                                    : 'border-base-content/15 text-base-content/70 hover:border-primary/35 hover:text-primary'
                                }
                            `}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ButtonGroup
