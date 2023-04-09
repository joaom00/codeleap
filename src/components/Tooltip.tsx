import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipElement = React.ComponentRef<typeof TooltipPrimitive.Trigger>
type TooltipProps = {
  children: React.ReactNode
  content: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & TooltipPrimitive.TooltipTriggerProps

export const Tooltip = React.forwardRef<TooltipElement, TooltipProps>((props, forwardedRef) => {
  const { children, content, open, defaultOpen, onOpenChange, ...triggerProps } = props

  return (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild ref={forwardedRef} {...triggerProps}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side="top"
        align="center"
        sideOffset={5}
        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-white px-4 py-2.5 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] text-gray-12 text-sm"
      >
        {content}
        <TooltipPrimitive.Arrow width={11} height={5} className="fill-white" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
})

Tooltip.displayName = 'Tooltip'
