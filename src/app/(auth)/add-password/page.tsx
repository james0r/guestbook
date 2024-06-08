import React from 'react'
import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Password',
}

export default function AddPassword() {
  return (
    <GenericAuthLayout
      title="Add Password"
      description="Enter your new strong and unique password."
    >

      some children
    </GenericAuthLayout>
  )
}
