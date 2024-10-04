import React from 'react'
import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import type { Metadata } from "next";
import AddPasswordForm from './AddPasswordForm'
import { getVerificationToken } from '@/db/queries/token'
import { TokenNotFound } from '@/components/TokenNotFound'

export const metadata: Metadata = {
  title: 'Add Password',
}

export default async function AddPassword({
  searchParams
}: {
  searchParams?: {
    token?: string
  }
}) {
  const token = searchParams?.token || '';

  const data = await getVerificationToken(token);

  if (data.data?.expires! < new Date()) {
    return (
      <TokenNotFound
        header='Token expired'
        description='Token expired, please try again with a new token.'
        url='/profile'
        buttonText='Try again'
      />
    );
  }

  if (!data.success) {
    return (
      <TokenNotFound
        header='Token is invalid'
        description='Token is invalid, please try again with a new token.'
        url='/profile'
        buttonText='Sign Up'
      />
    );
  }

  return (
    <GenericAuthLayout
      title="Add Password"
      description="Enter your new strong and unique password."
    >

      <AddPasswordForm email={data.data?.identifier!} />
    </GenericAuthLayout>
  )
}
