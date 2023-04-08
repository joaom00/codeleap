import clsx from 'clsx'
import React from 'react'

type LabelElement = React.ElementRef<'label'>
type LabelProps = React.ComponentPropsWithoutRef<'label'>

export const Label = React.forwardRef<LabelElement, LabelProps>((props, forwardedRef) => {
  return (
    <label
      {...props}
      className={clsx('w-max', props.className)}
      onMouseDown={(event) => {
        props.onMouseDown?.(event)
        // prevent text selection when double clicking label
        if (event.detail > 1) event.preventDefault()
      }}
      ref={forwardedRef}
    />
  )
})

Label.displayName = 'Label'
