"use server"

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn as signInUser, signOut } from '@/auth';
import {
  savePassword,
} from '@/db/queries/user';
import { deleteToken } from '@/db/queries/token';

// =============================== signIn ===============================
const signInSchema = z.object({
  username: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
});

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  try {
    await signInUser('credentials', {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (error: any) {
    if (error.code === 'invalid-credentials') {
      return {
        type: 'error',
        errors: {
          username: undefined,
          password: undefined,
        },
        message: error.message,
      };
    } else {
      return {
        type: 'error',
        errors: {
          username: undefined,
          password: undefined,
        },
        message: 'Something went wrong. Please try again.',
      };
    }
  }
  redirect('/profile');
}

// =============================== resetPassword ===============================
const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  password2: z.string(),
});
export async function resetPassword(
  email: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = resetPasswordSchema.safeParse({
    password: formData.get('password'),
    password2: formData.get('password2'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  // check for password match
  if (validatedFields.data.password !== validatedFields.data.password2) {
    return {
      type: 'error',
      errors: {
        password: undefined,
        password2: undefined,
      },
      message: 'Passwords do not match.',
    };
  }

  try {
    let user = await savePassword(false, email, validatedFields.data.password);

    if (!user.success) {
      return {
        type: 'error',
        errors: {
          password: undefined,
          password2: undefined,
        },
        message: user.message || 'Failed to reset password.',
      };
    }

    // delete the token
    await deleteToken(email);

    return {
      type: 'success',
      errors: null,
      message: user.message || 'Password reset successfully.',
    };
  } catch (error: any) {
    console.error('Failed to reset password.', error);
    return {
      type: 'error',
      errors: {
        password: undefined,
        password2: undefined,
      },
      message: error.message || 'Failed to reset password.',
    };
  }
}