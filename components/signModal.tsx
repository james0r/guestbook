"use client"

import React, { useRef, useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { addGuest } from '@/app/action'
import { useFormStatus, useFormState } from 'react-dom'

const SignModal = () => {
  const searchParams = useSearchParams()
  const modal = searchParams.get("signModal")
  const pathname = usePathname()
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>()
  const [commentCharCount, setCommendCharCount] = useState(0)

  const handleCommentChange = (e: any) => {
    setCommendCharCount(e.target.value.length)
  }

  const { pending } = useFormStatus()
  const initialState = {
    message: '',
  }

  const [state, formAction] = useFormState(addGuest, initialState)

  const handleClickOutside = (e: any) => {
    if (e.target !== overlayRef.current) return

    router.push('/')
  }

  return (
    <>
      {
        modal && (
          <div
            onClick={handleClickOutside}
            ref={overlayRef as React.RefObject<HTMLDivElement>}
            className={cn([
              "fixed inset-0 bg-black bg-opacity-50 z-50",
              "flex items-center justify-center",
            ])}>
            <div className={cn([
              'bg-white',
              'px-4',
              'py-6',
              'rounded-md',
              'w-[min(90vw,_400px)]',
            ])}>
              <h2 className={cn([
                'text-2xl',
                'font-semibold',
                'mb-4'
              ])}>
                Sign Guestbook
              </h2>
              <form action={formAction}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={cn([
                    'py-2',
                    'px-4',
                    'w-full',
                    'mb-4',
                    'border-2',
                    'border-black/25',
                    'rounded-md'
                  ])} />
                <div className={cn([
                  'mb-4'
                ])}>
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    onChange={handleCommentChange}
                    className={cn([
                      'py-2',
                      'px-4',
                      'w-full',
                      'border-2',
                      'border-black/25',
                      'rounded-md'
                    ])} />
                  <p className={cn([
                    'text-xs',
                    commentCharCount > 200 ? 'text-red-500' : 'text-gray-500'
                  ])}>
                    {
                      commentCharCount > 200
                        ? `You have exceeded the character limit by ${commentCharCount - 200} characters!`
                        : `Keep going, you have ${200 - commentCharCount} characters left!`
                    }
                  </p>
                </div>
                <p aria-live="polite" className="sr-only">
                  {state?.message}
                </p>
                <div className={cn([
                  'flex',
                  'justify-end'
                ])}>
                  <input
                    type="submit"
                    value="Submit"
                    disabled={pending}
                    className={cn([
                      'block',
                      'bg-gray-900',
                      'hover:bg-gray-950',
                      'text-white',
                      'py-2',
                      'px-4',
                      'rounded-md',
                      'cursor-pointer',
                      'disabled:bg-gray-500',
                      'disabled:cursor-not-allowed'
                    ])}
                  />

                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SignModal