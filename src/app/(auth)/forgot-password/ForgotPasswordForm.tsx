"use client"

import React, { useState, useEffect } from 'react'
import { forgotPassword } from '@/actions/authActions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { SubmitButton } from '@/components/SubmitButton'

const initialState = {
  type: '',
  message: '',
  errors: null,
}

const ForgotPasswordForm = () => {
  const [state, submitAction] = useFormState(forgotPassword, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message)
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <>
      {state.errors && (
        <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
          <p className='text-red-500'>{state.message}</p>
        </div>
      )}
      <form action={submitAction}>
        <div className='grid gap-4 mt-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              name='email'
              required
            />
            {state.errors?.email && (
              <p className='text-red-500'>{state.errors.email}</p>
            )}
          </div>
          <SubmitButton text="Send reset email" />
        </div>
      </form>
    </>
  )
}

export default ForgotPasswordForm