import { SignIn } from '@clerk/nextjs'
const page = () => {
  return (
    <div className='flex-center glassmorphism h-screen w-full'>
        <SignIn />
    </div>
  )
}

export default page