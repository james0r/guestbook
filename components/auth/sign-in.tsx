import { signIn } from "@/auth"
 
export async function SignIn({ session }: any) {

  if (session?.user) return null

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", {
          callbackUrl: isDev ? 'http://localhost:3000/' : 'https://guestbook.jamesauble.com/'
        })
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 