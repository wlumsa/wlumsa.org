import React from 'react'
import { ReactNode } from 'react'

interface TagProps {
    icon: ReactNode;
    text?: string;

}
const Tag:React.FC<TagProps>  = ({ text, icon }) => {
  return (
    <div className='flex flex-row gap-2 p-2 m-2 bg-secondary text-primary font-bold rounded-lg max-w-fit'>
        {icon}
        <div>
            <h1 className=''>{text}</h1>
        </div>
    </div>
  )
}

export default Tag