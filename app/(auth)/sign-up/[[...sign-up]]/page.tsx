import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex-center glassmorphism h-screen w-full'>
        <SignUp />
    </div>
  )
}

export default page