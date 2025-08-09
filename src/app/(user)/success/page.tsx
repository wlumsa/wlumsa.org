import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-4 h-screen justify-center items-center  mx-auto px-4' >
      <h1 className='text-2xl text-center'>Thank you for your donation! </h1>
      <h2 className='text-xl text-center'> If you have any more questions please contact msa@wlu.ca</h2>
      <Link href='/'>
        <button className='btn btn-primary text-white '>Back to homepage </button>
      </Link>
    </div>
  )
}


export default page