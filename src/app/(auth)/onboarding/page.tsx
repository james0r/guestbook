import { getVerificationToken } from '@/db/queries/token'
import OnBoardingForm from './OnBoardingForm'
import { TokenNotFound } from '@/components/TokenNotFound'
import GenericAuthLayout from '@/components/auth/GenericAuthLayout'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Onboarding',
}


export default async function OnBoarding({
  searchParams,
}: {
  searchParams?: {
    code?: string
  }
}) {
  const token = searchParams?.code || ''
  if (token === '') {
    return (
      <TokenNotFound
        header='Token not found'
        description='Please check your email for the token'
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
    <GenericAuthLayout
      title='Create Account'
      description='Fill these details to get started.'
    >
      <OnBoardingForm email={data.data?.identifier!} />

    </GenericAuthLayout>
  )
}