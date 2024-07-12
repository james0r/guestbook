import React from 'react'
// import FetchedData from '@/components/FetchedData'
import { FaGithub } from "react-icons/fa"
import { cn } from '@/lib/utils'

export const fetchCache = 'force-no-store'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 flex justify-start items-center relative">
      {/* <FetchedData /> */}
      <div className={cn([
        'ml-auto',
        'flex',
        'items-center'
      ])}>
        <div className={cn([
          'flex',
          'items-center',
          'gap-4'
        ])}>
          <span className="text-xs sm:text-sm tracking-wide ml-4">
            Made by <a href="https://jamesauble.com" target="_blank" className="underline">James Auble</a>
          </span>
          <a
            href="https://github.com/james0r/guestbook"
            target="_blank"
            title="Source Code"
            className={cn([
              'text-sm',
              'flex',
              'items-center',
              'gap-2'
            ])}
          >
            <FaGithub size={32} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer