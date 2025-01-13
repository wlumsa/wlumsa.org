import React from 'react'
import { ReactNode } from 'react'

interface TagProps {
    icon: ReactNode;
    text?: string;

}
const Tag:React.FC<TagProps>  = ({ text, icon }) => {
  return (
    <div className='flex flex-row p-2 m-2 bg-secondary text-sm md:text-md text-primary md:font-bold rounded-lg max-w-fit items-center'>
        {icon}
       { text && <div>
            <h1 className='pl-[0.5rem]'>{text}</h1>
        </div>
}
    </div>
  )
}

export default Tag