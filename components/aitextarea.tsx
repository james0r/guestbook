import React from 'react'
import { cn } from '@/lib/utils'
import { WandSparkles } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

export interface AiTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const AITextarea = React.forwardRef<HTMLTextAreaElement, AiTextareaProps>(
  (props: AiTextareaProps, ref) => {
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={cn(className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
AITextarea.displayName = 'AITextarea'

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
          'cursor-pointer',
          'hover:outline-none',
          'hover:ring-2',
          'ring-gray-900',
          'ring-offset-4',
          'rounded-sm',
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