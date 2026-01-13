"use client"
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

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

    const handleCategoryClick = (category: Category) => {
        const params = new URLSearchParams(searchParams);

        // If clicking "All" (id: '0'), remove the category param to show all posts
        if (category.id === '0') {
            params.delete('category');
        } else {
            params.set('category', category.id);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });

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
                <div className="dropdown dropdown-bottom w-full max-w-xs mx-auto" ref={dropdownRef}>
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-outline btn-primary w-full justify-between normal-case font-semibold"
                    >
                        <span>{currentCategory?.title || 'Select a category'}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-full max-w-xs p-2 shadow-lg border border-base-300">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <a className={`${currentCategory?.id === category.id ? 'bg-primary text-primary-content font-semibold' : 'hover:bg-base-200'}`}>
                                    {category.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex justify-center">
                <div className="inline-flex gap-2 p-1 bg-base-200 rounded-lg">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                ${currentCategory?.id === category.id
                                    ? 'bg-primary text-primary-content shadow-md'
                                    : 'text-base-content/70 hover:text-primary hover:bg-base-300'
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
