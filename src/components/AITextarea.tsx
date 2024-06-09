"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { WandSparkles } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { useCompletion } from 'ai/react'
import { Button } from '@/components/ui/Button'
import { LoaderCircle } from 'lucide-react'

export interface AiTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string
  setCommentCharCount?: (count: number) => void
  placeholder?: string
  className?: string
  name?: string
}

const AITextarea = React.forwardRef<HTMLTextAreaElement, AiTextareaProps>(
  (props: AiTextareaProps, ref) => {
    const {
      setCommentCharCount,
      placeholder,
      className,
      name
    } = props

    const {
      completion,
      input,
      setInput,
      handleSubmit,
      isLoading
    } = useCompletion({
      api: '/api/completion',
    })

    const [textareaValue, setTextareaValue] = React.useState('')

    React.useEffect(() => {
      if (!completion) return
      setTextareaValue(completion)
      setCommentCharCount && setCommentCharCount(completion.length)
    }, [completion, setCommentCharCount])

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value)
      setInput(e.target.value)
      if (setCommentCharCount) {
        setCommentCharCount(e.target.value.length)
      }
    }

    const customHandleSubmit = (e: any) => {
      e.preventDefault()
      // setShowPrompt(false)
      handleSubmit(e)
    }

    return (
      <div className={cn([
        'relative'
      ])}>
        <a
          id="textarea-ai-assist-tooltip"
          className={cn([
            'absolute',
            'top-3',
            'right-3',
            'cursor-pointer',
            'hover:outline-none',
            'hover:ring-2',
            'ring-gray-900',
            'ring-offset-4',
            'rounded-sm',
          ])}
          onClick={customHandleSubmit}
        >
          {
            isLoading ? (
              <LoaderCircle size={20} className="animate-spin" />
            ) : (
              <WandSparkles size={20} />
            )
          }
          <span className="sr-only">Use AI Assist</span>
        </a>
        <Tooltip
          anchorSelect="#textarea-ai-assist-tooltip"
          content="AI Assist"
        />
        <textarea
          name={name}
          value={textareaValue}
          onChange={handleTextareaChange}
          placeholder={placeholder}
          rows={4}
          className={cn('no-scrollbar', className)}
          ref={ref}
        />
      </div>
    )
  }
)
AITextarea.displayName = 'AITextarea'

export default AITextarea