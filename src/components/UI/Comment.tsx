import React from 'react'

interface CommentProps {
    author: string;
    message: string;
    date: string;
}
const Comment:React.FC<CommentProps> = ({author, message, date}) => {
  return (
    <div className='my-4'>
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-primary font-bold '>{author}</h1>
                <p className='text-gray-400'>{date}</p>
            </div>
            <p className=''>{message}</p>
        </div>
    </div>
  )
}

export default Comment