import Link from 'next/link'
import DashboardLayout from './_components/DashboardLayout'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
    >
      <DashboardContent />
    </DashboardLayout>
  )
}

function DashboardContent() {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-lg font-medium'>Your Profile</h3>
        <p className='text-gray-500 dark:text-gray-400'>
          View and update your profile information.
        </p>
        <Link className='text-blue-500 hover:underline' href='/dashboard/profile'>
          Go to profile
        </Link>
      </div>
      <div>
        <h3 className='text-lg font-medium'>Settings</h3>
        <p className='text-gray-500 dark:text-gray-400'>
          Customize your app settings.
        </p>
        <Link className='text-blue-500 hover:underline' href='/dashboard/settings'>
          Go to settings
        </Link>
      </div>
    </div>
  )
}