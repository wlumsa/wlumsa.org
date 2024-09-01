"use client"
import React from 'react'
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


interface Category {
    title:string,
    id:string
}
interface ButtonGroupProps {
    categories: Category[];
  }
export const ButtonGroup:React.FC<ButtonGroupProps> = ({categories}) => {
    const [selectBtn, setSelectBtn] = useState<Category | null>(categories[0] || null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleCategoryClick = (category: Category) => {
        setSelectBtn(category);
        const params = new URLSearchParams(searchParams);
        params.set('category', category.id);
        console.log(params)
       replace(`${pathname}?${params.toString()}`);
      };
  return (
    <div>
         <div className=" text-center">
        <ul className="menu menu-horizontal text-lg text-primary">
        {categories.map((category, index) => ( 
           <li key={index} className={`rounded m-2 ${selectBtn?.title === category.title ? 'bg-secondary text-white ' : ' '}   `}
           onClick={() => handleCategoryClick(category)} ><a>{category.title}</a></li>
       ))}
      </ul>
        </div>
    </div>
  )
}

export default ButtonGroup