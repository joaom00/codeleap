import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { clsx } from 'clsx'

type TextareaElement = React.ElementRef<typeof TextareaAutosize>
type TextareaProps = React.ComponentPropsWithoutRef<typeof TextareaAutosize>

const submitEvent = new Event('submit', {
  cancelable: true,
  bubbles: true,
})

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
      onKeyDown={(event) => {
        props.onKeyDown?.(event)

        if (['Enter'].includes(event.key) && event.ctrlKey) {
          const textarea = event.currentTarget
          const form = textarea.form
          if (form) form.dispatchEvent(submitEvent)
        }
      }}
    />
  )
})

Textarea.displayName = 'Textarea'
