'use client';

import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const RoommateFilter: React.FC = () => {
  const [gender, setGender] = useState('');
  const [rent, setRent] = useState('');
  const [propertyType, setProperty] = useState('');
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)




  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const genderOptions = [
    { id: 1, label: 'Sisters' },
    { id: 2, label: 'Brothers' },
  ];
  const rentOptions = [
    { id: 1, label: '$800 and lower' },
    { id: 2, label: '$800 - $900' },
    { id: 3, label: '$900 - $1000' },
    { id: 4, label: '$1000 - $1100' },
    { id: 5, label: '$1100 - $1200' },
    { id: 6, label: '$1200 - $1300' },
    { id: 7, label: '$1300 and above' },

];
const propertyOptions = [
    { id: 1, label: 'House' },
    { id: 2, label: 'Apartment' },
    { id: 3, label: 'Condo' },
    { id: 4, label: 'Townhouse' },
];

  const handleFilterChange = (type:string, selectedId: number) => {
    if(type === 'gender') {
        setGender(selectedId.toString());
    }
 
    if(type === 'propertyType') {
        setProperty(selectedId.toString());
    }

    if (type === 'rent') {
      setRent(selectedId.toString());
    }
    
const params = new URLSearchParams(searchParams);
    if (selectedId) {
      params.set(type, selectedId.toString());
    } else {
      params.delete(type);
    }

    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <div className='flex  flex-col md:flex-row justify-center gap-4'>
    <div className="justify-center ">
      {/* Gender  */}
      <div className="relative w-64 dropdown">
        <div
          tabIndex={0}
          className="py-3 px-4 rounded-xl border border-gray-400 cursor-pointer"
        >
          <button  tabIndex={0} className="w-full flex justify-between items-center">
          <span>
  {
    gender
      ? genderOptions.find(option => option.id === parseInt(gender))?.label 
      : 'Select a gender'
  }
</span>            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Gender - Dropdown Menu */}
      
          <ul  tabIndex={0}
            className="absolute z-[1] bg-white rounded-md shadow-lg mt-2 w-full overflow-hidden dropdown-content  menu"
          >

            {genderOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleFilterChange("gender",option.id)}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  gender === option.label ? 'bg-secondary text-white' : ''
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        
      </div>
    </div>



    <div className="justify-center ">
      {/* property filter */}
      <div className="relative w-64 dropdown">
        <div
        
          className="py-3 px-4 rounded-xl border border-gray-400 cursor-pointer"
        >
          <button tabIndex={0} className="w-full flex justify-between items-center">
          <span>
  {
    propertyType
      ? propertyOptions.find(option => option.id === parseInt(propertyType))?.label 
      : 'All property types'
  }
</span>            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
          <ul tabIndex={0}
            className="absolute z-[1] bg-white rounded-md shadow-lg mt-2 w-full overflow-hidden dropdown-content  menu"
          >
            {propertyOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleFilterChange("propertyType",option.id)}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    propertyType === option.label ? 'bg-secondary text-white' : ''
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        
      </div>
    </div>

    <div className="justify-center ">
      {/* property filter */}
      <div className="relative w-64 dropdown">
        <div
        
          className="py-3 px-4 rounded-xl border border-gray-400 cursor-pointer"
        >
          <button tabIndex={0} className="w-full flex justify-between items-center">
          <span>
  {
    rent
      ? rentOptions.find(option => option.id === parseInt(rent))?.label 
      : 'All rent prices'
  }
</span>            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
          <ul tabIndex={0}
            className="absolute z-[1] bg-white rounded-md shadow-lg mt-2 w-full overflow-hidden dropdown-content  menu"
          >
            {rentOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleFilterChange("rent",option.id)}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    rent === option.label ? 'bg-secondary text-white' : ''
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        
      </div>
    </div>
    <button className='btn bg-gray-300 px-2 py-2 ' onClick={() => replace(`${pathname}?${""}`)}   >Clear Filters</button>

    </div>
  );
};

export default RoommateFilter;
