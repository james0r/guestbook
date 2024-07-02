"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from "next/navigation"
import { useFormState } from 'react-dom'
import { AnimatePresence } from "framer-motion"
import { Layers } from 'lucide-react'
import { cn } from "@/lib/utils"
import { addGuest } from '@/actions/guestActions'
import Modal from './Modal'
import { Button } from '@/components/ui/Button'

const TechStackModal = ({ session }: any) => {
  // const { data: session, status } = useSession()
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
      {modal === 'info' && (
        <Modal>
          <h2 className={cn([
            'flex',
            'items-center',
            'text-2xl',
            'font-semibold',
            'mb-4'
          ])}>
            <Layers size={24} className={cn([
              'inline-block',
              'mr-2'
            ])} />
            Tech Stack
          </h2>
          <p className={cn([
            'mb-4'
          ])}>
            This site was built using the following technologies:
          </p>
          <ul className={cn([
            'list-disc',
            'px-6',
            'py-2',
            'mb-4',
            'max-h-52',
            'overflow-y-auto',
            'border',
            'border-gray-200',
            'rounded-md'
          ])}>
            <li>Next.js</li>
            <li>React</li>
            <li>Typescript</li>
            <li>TailwindCSS</li>
            <li>Turso (LibSQL)</li>
            <li>Drizzle ORM</li>
            <li>Vercel AI SDK</li>
            <li>NextAuth.js</li>
            <li>ShadCN</li>
            <li>Lucide Icons</li>
            <li>Radix UI</li>
            <li>Framer Motion</li>
            <li>Heroicons</li>
            <li>OpenAI</li>
            <li>BcryptJS</li>
            <li>Class Variant Authority</li>
            <li>Resend</li>
            <li>Vercel Hosting</li>
            <li>Github</li>
          </ul>
          <div className={cn([
              'flex',
              'justify-end',
              'mt-8',
            ])}>
              <Button
                type="button"
                variant="default"
                className={cn([
                  'mr-2'
                ])}
                onClick={handleCancelClick}
              >
                Close
              </Button>
            </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default TechStackModal



