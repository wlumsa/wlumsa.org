"use client"
import React from 'react'
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { fetchBlogPosts } from '@/Utils/datafetcher';

interface Category {
    title: string,
    id: string
}
interface ButtonGroupProps {
    categories: Category[];
   
}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ categories }) => {
    const [selectBtn, setSelectBtn] = useState<Category | null>(categories[0] || null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleCategoryClick = (category: Category) => {
        setSelectBtn(category);
        const params = new URLSearchParams(searchParams);
        params.set('category', category.id);
        replace(`${pathname}?${params.toString()}`);
    };
    const getAllPosts = () => {
      //  setSelectBtn({ title: 'All', id: '0' });
        const params = new URLSearchParams(searchParams);
        //params.set('');
        replace(`${pathname}`);
    }
     

    return (
        <div>
          
                <div className="text-center mt-4 justify-center">
                <div className="justify-center ">
                    <div className="dropdown w-64 ">
                        <div tabIndex={0} className="lg:hidden text-primary font-semibold bg-secondary py-2 px-6 rounded">
                            <button className="w-full items-center flex-row flex justify-between">
                                <span className=''>{selectBtn ? selectBtn.title : 'Select a category'}</span>
                                <svg className=""width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-b-md z-[1] mt-3 w-64 p-2 shadow">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`${selectBtn?.title === category.title ? 'bg-secondary text-white' : ''}`}
                                >
                                    <a>{category.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className=" text-center">
                        <ul className="menu menu-horizontal text-lg text-primary">
                            {categories.map((category, index) => (
                                <li key={index} className={`rounded m-2 ${selectBtn?.title === category.title ? 'bg-secondary text-primary font-semibold ' : ' '}   `}
                                    onClick={() => handleCategoryClick(category)} ><a>{category.title}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            

             
                
                
            
            
        </div>

    )
}

export default ButtonGroup