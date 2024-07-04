'use server'
import { unstable_noStore as noStore } from 'next/cache';

export default async function getJoke() {
  noStore()

  try {
    const data = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit&type=single')
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