import React from 'react'

import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import ForgotPasswordForm from './ForgotPasswordForm'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Forgot Password',
}

const ForgotPassword: React.FC = () => {
  return (
    <GenericAuthLayout
      title='Forgot Password'
      description='Enter your email address to reset your password.'
    >
      <ForgotPasswordForm />
    </GenericAuthLayout>
  )
}

export default ForgotPassword