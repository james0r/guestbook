"use client"

import { motion } from "framer-motion";
import { cn } from '@/lib/utils'
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}


const Backdrop = ({ children }: Props) => {
  const router = useRouter()

  const handleClickOutside = (e: any) => {
    router.push('/')
  }
  
  return (
    <motion.div
      onClick={handleClickOutside}
      className={cn([
        "fixed inset-0 bg-black bg-opacity-50 z-50",
        "flex items-center justify-center",
      ])}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;