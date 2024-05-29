"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import { addGuest } from '@/app/action'
import { useFormStatus, useFormState } from 'react-dom'
import Modal from './modal'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react';

const SignModal = () => {
  const searchParams = useSearchParams()
  const modal = searchParams.get("modal")
  const [commentCharCount, setCommendCharCount] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState(null as any)
  const router = useRouter()


  const handleCancelClick = () => {
    setErrors(null)
    setCommendCharCount(0)
    // setName('')
    // setComment('')
    router.push('/')
  }

  const handleCommentChange = (e: any) => {
    // setComment(e.target.value)
    setCommendCharCount(e.target.value.length)
  }

  const initialState = {
    message: '',
  }
  const [state, formAction] = useFormState(addGuest, initialState)

  useEffect(() => {
    if (state?.errors) {
      setErrors(state.errors)
    }
  }, [state])

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
      {modal === 'sign' && (
        <Modal>
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
            {
              errors && (
                <div className={cn([
                  'bg-red-100',
                  'text-red-500',
                  'p-4',
                  'rounded-md',
                  'mb-4'
                ])}>
                  <ul>
                    {Object.values(errors).map((error: any) => (
                      <li key={error}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            <div className={cn([
              'flex',
              'justify-end'
            ])}>
              <Button
                type="button"
                variant="ghost"
                className={cn([
                  'mr-2'
                ])}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <SubmitButton />
            </div>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default SignModal

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn([
        'flex',
        'items-center',
        'justify-center',
        'min-w-[65px]',
        'bg-gray-900',
        'hover:bg-gray-950',
        'text-white',
        'py-2',
        'px-4',
        'rounded-md',
        'cursor-pointer',
        'disabled:cursor-not-allowed'
      ])}
    >
      {pending ? <LoadingSpinner /> : 'Sign'}
      <span className="sr-only">
        {pending ? 'Loading...' : ''}
      </span>
    </button>
  )
}

function LoadingSpinner() {
  return (
    <LoaderCircle 
      size={20}
      className={cn([
        'animate-spin'
      ])}
    />
  )
}