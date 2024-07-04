'use server'

import { revalidateTag } from "next/cache"

export async function getJoke() {
  try {
    const data = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit&type=single', {
      next: {
        tags: ['joke']
      }
    })
    const res = await data.json()
    return {
      success: res,
      joke: res.joke
    }
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
      return {
        error: "Failed to fetch joke"
      }
  }
}

export async function revalidateJoke() {
  revalidateTag('joke')
}
  