"use server"

import { db } from '@/db'
import { guest } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

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

  // const rawFormData = {

  //   created_at: Date.now()
  // }

  const result = await db.insert(guest).values(rawFormData)

  return {
    message: "Form data processed"
  }

  revalidatePath('/')
}