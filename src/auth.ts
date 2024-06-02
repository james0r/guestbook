import NextAuth, { AuthError } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'
import { loginUser } from '@/db/queries/user';
import bcrypt from 'bcryptjs';

class InvalidCredentialsError extends AuthError {
  code = 'invalid-credentials';
  message = 'Invalid credentials';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials.username as string)

          if (user.length === 0) {
            throw new InvalidCredentialsError()
          }

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user[0].password!,
          )

          if (!isValid) {
            throw new InvalidCredentialsError()
          }
          return user[0]
        } catch (error: any) {
          if (error instanceof AuthError) {
            throw new InvalidCredentialsError(error.message)
          } else {
            throw error
          }
        }
      },
    }),
  ],
})