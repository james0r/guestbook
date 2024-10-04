import React from 'react'
import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import type { Metadata } from "next";
import AddPasswordForm from './AddPasswordForm'
import { getVerificationToken } from '@/db/queries/token'

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

  return (
    <GenericAuthLayout
      title="Add Password"
      description="Enter your new strong and unique password."
    >

      <AddPasswordForm email={data.data?.identifier!} />
    </GenericAuthLayout>
  )
}
