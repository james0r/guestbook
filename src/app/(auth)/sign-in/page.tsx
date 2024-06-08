import React from 'react'
import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import GoogleSignIn from '@/components/auth/GoogleSignIn'
import Link from 'next/link'
import SignInForm from './SignInForm'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign In',
}


function SignIn() {
  return (
    <GenericAuthLayout
      title="Sign In"
    >
      <SignInForm />
      <div className='px-2 text-center'>Or continue with</div>
      <div className='flex items-center justify-center space-x-4'>
        <GoogleSignIn />
      </div>
      <div className='mt-6 flex items-center justify-center'>
        <div className='flex flex-wrap gap-1 text-sm text-gray-500 dark:text-gray-400'>
          <span>
            Don&rsquo;t have an account?
          </span>
          <Link
            className='font-medium text-blue-500 hover:underline'
            href='/sign-up'
          >
            Sign up
          </Link>
        </div>
      </div>
    </GenericAuthLayout>
  )
}

export default SignIn