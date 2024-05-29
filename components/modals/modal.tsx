"use client"

import React from 'react'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import Backdrop from './backdrop'

interface Props {
  children: React.ReactNode
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
}

const newspaper = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Modal = ({ children }: Props) => {
  const searchParams = useSearchParams()
  const modal = searchParams.get("modal")

  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={cn([
          'bg-white',
          'px-4',
          'py-6',
          'rounded-md',
          'w-[min(90vw,_400px)]',
        ])}
        variants={newspaper}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>
  )
}

export default Modal