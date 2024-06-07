"use client"

import { LoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from '@/components/ui/Button'

interface SubmitButtonProps extends ButtonProps {
  text: string
  className?: string
}

export function SubmitButton({
  text,
  className
}: SubmitButtonProps, props: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={className}
      {...props}
    >
      {pending ? <LoadingSpinner /> : text}
      <span className="sr-only">
        {pending ? 'Loading...' : ''}
      </span>
    </Button>
  )
}

const LoadingSpinner = () => {
  return (
    <LoaderCircle
      size={20}
      className={cn([
        'animate-spin'
      ])}
    />
  )
}