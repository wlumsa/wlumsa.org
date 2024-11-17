import React from 'react'
import { SignIn } from '@clerk/nextjs'
const page = () => {
  return (
    <div className='flex  flex-col justify-center items-center m-12' >
        <SignIn appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-slate-400 text-lg',
              },
            }}/>
    </div>
  )
}

export default page