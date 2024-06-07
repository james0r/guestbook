import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { signIn, signOut } from '@/auth';

export default function GoogleSignIn() {
  return (
    <form
      className='w-full'
      action={async () => {
        'use server'
        await signIn('google', {
          redirectTo: '/dashboard/profile',
          redirect: true,
          callbackUrl: '/',
        })
      }}
    >
      <Button className='w-full' variant='outline'>
        <Icons.google className='mr-2 h-4 w-4' />
        Google
      </Button>
    </form>
  )
}