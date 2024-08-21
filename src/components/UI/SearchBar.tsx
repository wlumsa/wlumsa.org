'use client'
import React from 'react'
import { useSearchParams , usePathname, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


/**
 * Represents a search bar component.
 * @returns {JSX.Element} The rendered search bar component.
 */

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
       
        replace(`${pathname}?${params.toString()}`);
      }, 200 ) //this code runs 300ms after user stops typing

  return (
    <div className="mx-2 rounded-xl bg-white px-4">
          <label className="input input-bordered flex items-center my-2">
            <input type="text" className="grow" placeholder="Search" 
            onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get('query')?.toString()}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
  )
}

export default SearchBar