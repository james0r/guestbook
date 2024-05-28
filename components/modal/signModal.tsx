"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { addGuest } from '@/app/action'
import { useFormStatus, useFormState } from 'react-dom'
import Backdrop from './backdrop'
import { motion, AnimatePresence } from "framer-motion"

const SignModal = () => {
  const searchParams = useSearchParams()
  const modal = searchParams.get("signModal")
  const [commentCharCount, setCommendCharCount] = useState(0)

  const handleCommentChange = (e: any) => {
    setCommendCharCount(e.target.value.length)
  }

  const { pending } = useFormStatus()
  const initialState = {
    message: '',
  }

  const [state, formAction] = useFormState(addGuest, initialState)

  return (

    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      mode="wait"
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      {modal && (
        <Backdrop>
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn([
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
                  rows={4}
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
                  {commentCharCount > 200
                    ? `You have exceeded the character limit by ${commentCharCount - 200} characters!`
                    : `Keep going, you have ${200 - commentCharCount} characters left!`}
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
        </Backdrop>
      )}
    </AnimatePresence>
  )
}

export default SignModal