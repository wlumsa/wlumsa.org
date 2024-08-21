import React from 'react'

/**
 * Represents a component that filters items by category.
 * @param {string[]} items - A list of the categoires
 * @returns {JSX.Element} The rendered button component.
 */

interface FilterButtonsProps {
    items:string[];
    activeTag:string;
}
const FilterButtons: React.FC<FilterButtonsProps>  = ({items, activeTag}) => {

  return (
    <div>
        {items.map((item, index) => (
            
            <div key={index} className={`btn text-primary m-4`}>{item}</div>
          ))}
    </div>
  )
}

export default FilterButtons