"use server"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createGuest } from '@/db/queries'

const schema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }).max(40, {
    message: 'Name must be less than 40 characters',
  }),
  comment: z.string().min(1, {
    message: 'Comment is required',
  }).max(200, {
    message: 'Comment must be less than 200 characters',
  }),
})

export async function addGuest(prevData: FormData ,formData: FormData) {
  'use server'

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    comment: formData.get('comment'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  let result: any

  try {
    result = await createGuest({
      name: validatedFields.data.name,
      comment: validatedFields.data.comment,
    })
  } catch (error) {
    result = {
      errors: {
        general: 'An error occurred while processing your request. Please try again.',
      },
    }
  }

  revalidatePath('/')
  redirect('/')

  return result
  
  // return {
  //   message: "Form data processed"
  // }
}