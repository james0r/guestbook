import React from 'react'
import AuthCard from '@/components/auth/GenericAuthLayout'
import ResetPasswordForm from './ResetPasswordForm'
import { TokenNotFound } from '@/components/TokenNotFound'
import { getVerificationToken } from '@/db/queries/token'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reset Password',
}


const ResetPassword = async ({
  searchParams,
}: {
  searchParams?: {
    token?: string
  }
}) => {

  const token = searchParams?.token || ''

  if (token === '') {
    return (
      <TokenNotFound
        header='Token not provided'
        description='Please try the link in your email again.'
        url='/'
        buttonText='Back to home'
      />
    )
  }

  const data = await getVerificationToken(token)

  // check expires of token
  if (data.data?.expires! < new Date()) {
    return (
      <TokenNotFound
        header='Token expired'
        description='Token expired, please try again with a new token.'
        url='/sign-up'
        buttonText='Try again'
      />
    )
  }

  if (!data.success) {
    return (
      <TokenNotFound
        header='Token is invalid'
        description='Token is invalid, please try again with a new token.'
        url='/sign-up'
        buttonText='Sign Up'
      />
    )
  }

  return (
    <AuthCard
      title="Reset Password"
      description="Enter your new strong and unique password."
    >
      <ResetPasswordForm email={data.data?.identifier!} />
    </AuthCard>
  )
}

export default ResetPassword