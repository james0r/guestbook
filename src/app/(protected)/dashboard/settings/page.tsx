import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import DashboardLayout from '../_components/DashboardLayout'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Settings',
}


const Settings = () => {
  return (
    <DashboardLayout
      title="Settings"
      description="Customize your app settings."
    >
      <div>
        <div>
          Settings Page
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Settings