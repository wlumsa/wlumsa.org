'use client'

import React, { useState, useEffect, forwardRef } from 'react'
import { useSearchParams , usePathname, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, X } from 'lucide-react';

type SearchBarProps = {
  className?: string;
  inputClassName?: string;
  inputElementClassName?: string;
  showIcon?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
  inputId?: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  spellCheck?: boolean;
};


/**
 * Represents a search bar component.
 * @returns {JSX.Element} The rendered search bar component.
 */

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className = "w-full",
      inputClassName = "flex h-12 w-full items-center gap-3 rounded-md border border-base-content/15 bg-base-100 px-4 text-base-content transition focus-within:border-primary/55 focus-within:ring-2 focus-within:ring-primary/10",
      inputElementClassName = "min-w-0 grow bg-transparent text-sm outline-none placeholder:text-base-content/45",
      showIcon = true,
      placeholder = "Search",
      label = "Search",
      name = "query",
      autoComplete = "off",
      inputId,
      type = "search",
      inputMode,
      spellCheck = false,
    },
    ref
  ) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [inputValue, setInputValue] = useState(searchParams.get('query') || '');

    const getUrlWithParams = (params: URLSearchParams) => {
      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    }

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }

        replace(getUrlWithParams(params));
      }, 200 ) //this code runs 200ms after user stops typing

    const clearSearch = () => {
      setInputValue('');
      const params = new URLSearchParams(searchParams);
      params.delete('query');
      replace(getUrlWithParams(params));
    }

    // Sync input value with URL changes
    useEffect(() => {
        setInputValue(searchParams.get('query') || '');
    }, [searchParams]);

  return (
    <div className={className}>
          <label className={inputClassName}>
            <span className="sr-only">{label}</span>
            {showIcon && (
              <Search className="h-4 w-4 shrink-0 text-base-content/55" aria-hidden />
            )}
            <input
              ref={ref}
              id={inputId}
              type={type}
              name={name}
              autoComplete={autoComplete}
              aria-label={label}
              inputMode={inputMode}
              spellCheck={spellCheck}
              className={inputElementClassName}
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            {inputValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-md p-1 text-base-content/55 transition hover:bg-base-200 hover:text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </label>
        </div>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
