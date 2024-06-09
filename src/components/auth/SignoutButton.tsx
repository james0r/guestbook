"use client"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"
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
        onClick={() => signOut({
          callbackUrl: '/'
        })}
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