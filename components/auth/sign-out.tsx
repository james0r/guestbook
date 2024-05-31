"use client"

import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"
 
export function SignOut() {

  return (
    <button onClick={() => signOut()}>Sign out</button>
  )
} 