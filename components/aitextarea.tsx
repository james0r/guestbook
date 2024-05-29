import React from 'react'
import { cn } from '@/lib/utils'
import { WandSparkles } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

interface AiTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const AITextarea = (props: AiTextareaProps) => {
  const {
    value,
    onChange,
    placeholder,
    className
  } = props

  return (
    <div className={cn([
      'relative'
    ])}>
      <AiButton></AiButton>
      <textarea
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={cn(className)}
      />
    </div>
  )
}

export default AITextarea

const AiButton = () => {

  const handleClick = () => {
    alert('AI Assist not yet implemented!')
  }

  return (
    <>
      <a
        id="textarea-ai-assist-tooltip"
        className={cn([
          'absolute',
          'top-3',
          'right-3',
          'cursor-pointer'
        ])}
        onClick={handleClick}
      >
        <WandSparkles size={20} />
        <span className="sr-only">Use AI Assist</span>
      </a>
      <Tooltip
        anchorSelect="#textarea-ai-assist-tooltip"
        content="AI Assist"
      />
    </>
  )
}