"use client"
import { signOut } from "next-auth/react"
import { ButtonHTMLAttributes } from "react"

const SignoutButton = (
  {
    children,
    className
  }: {
    children: React.ReactNode
    className?: string
  },
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {

  return (
    <>
      <button
        onClick={() => signOut()}
        className={className}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
SignoutButton.displayName = 'LogoutButton'

export default SignoutButton