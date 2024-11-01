import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-items-center p-3 min-h-screen'>
      <SignIn />
    </div>
  )
}