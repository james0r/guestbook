import React from 'react'
import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import GoogleSignIn from '@/components/auth/GoogleSignIn'
import Link from 'next/link';
import SignUpForm from './SignUpForm'

const SignUp = () => {
  return (
    <GenericAuthLayout
      title="Sign Up"
      description="Enter your email below to create your account."
    >
      <SignUpForm />
      <div className="px-2 text-center">Or continue with</div>
      <div className="flex items-center justify-center space-x-4">
        <GoogleSignIn />
      </div>
      <div className="mt-6 flex items-center justify-center">
        <div className="flex flex-wrap gap-1 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Already have an account?
          </span>
          <Link
            className="font-medium text-blue-500 hover:underline"
            href="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </div>
    </GenericAuthLayout>
  )
}

export default SignUp