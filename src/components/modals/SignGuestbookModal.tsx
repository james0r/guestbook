"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter, redirect } from "next/navigation"
import { useFormStatus, useFormState } from 'react-dom'
import { AnimatePresence } from "framer-motion"
import { LoaderCircle } from 'lucide-react'
import { useSession } from "next-auth/react"
import { SubmitButton } from '@/components/SubmitButton'

import { cn } from "@/lib/utils"
import { addGuest } from '@/actions/guestActions'
import Modal from './Modal'
import { Button } from '@/components/ui/Button'
import AITextarea from '@/components/AITextarea'

const SignModal = () => {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const modal = searchParams.get("modal")
  const [commentCharCount, setCommentCharCount] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState(null as any)
  const router = useRouter()

  const handleCancelClick = () => {
    setErrors(null)
    setCommentCharCount(0)
    // setName('')
    // setComment('')
    router.push('/')
  }

  const handleCommentChange = (e: any) => {
    // setComment(e.target.value)
    setCommentCharCount(e.target.value.length)
  }

  const initialState = {
    success: null,
    errors: null
  }
  const [state, formAction] = useFormState(addGuest, initialState)

  useEffect(() => {
    if (state?.errors) {
      setErrors(state.errors)
    }

    if (state?.success) {
      setErrors(null)
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  if (!session?.user) return (
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
          Not Authorized
        </Modal>
      )}
    </AnimatePresence>
  )

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
              autoFocus
              placeholder="Name"
              className={cn([
                'py-2',
                'px-4',
                'w-full',
                'mb-4',
                'border-2',
                'border-black/25',
                'rounded-md',
                'focus-within:outline-none',
                'focus-within:ring-2',
                'ring-gray-900',
                'ring-offset-2'
              ])} />
            <div className={cn([
              'mb-4'
            ])}>
              <AITextarea
                name="comment"
                onChange={handleCommentChange}
                placeholder="Comment"
                className={cn([
                  'py-2',
                  'px-4',
                  'w-full',
                  'border-2',
                  'border-black/25',
                  'rounded-md',
                  'focus-within:outline-none',
                  'focus-within:ring-2',
                  'ring-gray-900',
                  'ring-offset-2'
                ])}
                rows={4}
              />
              <p className={cn([
                'text-sm',
                'mt-1',
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
                  'text-sm',
                  'px-4',
                  'py-3',
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
              'justify-end',
              'mt-8',
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
              <SubmitButton text="Sign" />
            </div>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default SignModal



