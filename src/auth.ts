import NextAuth, { AuthError } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { encode, decode } from 'next-auth/jwt'
import { db } from '@/db'
import {
  getUserById,
  // getUserByProviderAccountId,
  loginUser,
} from './db/queries/user'

class InvalidCredentialsError extends AuthError {
  code = 'invalid-credentials';
  message = 'Invalid credentials';
}

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  adapter: DrizzleAdapter(db),
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
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        //   // check if user already exists with this account.providerAccountId
        //   const existingUser = await getUserByProviderAccountId(
        //     account?.providerAccountId as string,
        //   );
        //   if (existingUser) {
        //     throw new OAuthAccountNotLinked();
        //   } else {
        //     return true;
        //   }
      }
      return true
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const paths = ['/dashboard/profile', '/dashboard']
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      )

      const publicPath = ['/sign-in', '/sign-up']
      const isPublic = publicPath.some((path) =>
        nextUrl.pathname.startsWith(path),
      )

      if (isPublic && isLoggedIn) {
        return Response.redirect(new URL('/dashboard/profile', nextUrl.origin))
      }

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/sign-in', nextUrl.origin)
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href)
        return Response.redirect(redirectUrl)
      }
      return true
    },
    jwt: async ({ token }) => {
      const user = await getUserById(token.sub!)

      if (user) {
        token.user = user
        return token
      } else {
        return null
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user = token.user
        session.user.id = token.sub!
        return session
      }
      return session
    },
  },
  session: { strategy: 'jwt' },
  jwt: { encode, decode },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
})