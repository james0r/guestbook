"use server"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createGuest } from '@/db/queries'

const schema = z.object({
  name: z.string().max(40, {
    message: 'Name must be less than 40 characters',
  }),
  comment: z.string().max(200, {
    message: 'Comment must be less than 200 characters',
  }),
})

export async function addGuest(prevState: any, formData: FormData) {
  'use server'

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    comment: formData.get('comment'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await createGuest({
      name: validatedFields.data.name,
      comment: validatedFields.data.comment,
    })
  } catch (error) {
    return {
      errors: {
        general: 'An error occurred while processing your request. Please try again.',
      },
    }
  }

  revalidatePath('/')
  redirect('/')

  return {
    message: "Form data processed"
  }

}