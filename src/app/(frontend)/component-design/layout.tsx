import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function ComponentDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <>
      <div className='fixed top-3 right-16 z-50 lg:right-6'>
        <UserButton />
      </div>
      {children}
    </>
  )
}
