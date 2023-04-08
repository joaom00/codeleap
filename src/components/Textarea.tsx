import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { clsx } from 'clsx'

type TextareaElement = React.ElementRef<typeof TextareaAutosize>
type TextareaProps = React.ComponentPropsWithoutRef<typeof TextareaAutosize>

export const Textarea = React.forwardRef<TextareaElement, TextareaProps>((props, forwardedRef) => {
  const { minRows = 3, maxRows = 12, className, ...textAreaProps } = props
  return (
    <TextareaAutosize
      minRows={minRows}
      maxRows={maxRows}
      className={clsx(
        'border border-gray-7 text-sm rounded-lg p-2 resize-none placeholder:text-gray-11',
        className,
      )}
      {...textAreaProps}
      ref={forwardedRef}
    />
  )
})

Textarea.displayName = 'Textarea'
