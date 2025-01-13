import React from 'react'
import Link from 'next/link'
const notFound = () => {
  return (
    <div className='flex flex-col gap-4 h-screen justify-center items-center' >
        <h1 className='text-2xl'>404 Error</h1>
        <h1 className='text-2xl'>We can't seem to find the page you're looking for. </h1>
        <Link href='/'>
          <button className='btn btn-primary text-white '>Back to homepage </button>
        </Link>
    </div>
  )
}

export default notFound