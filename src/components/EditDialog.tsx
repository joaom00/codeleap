import * as DialogPrimitive from '@radix-ui/react-dialog'

export const EditDialog = DialogPrimitive.Root
export const EditDialogTrigger = DialogPrimitive.Trigger
export const EditDialogTitle = DialogPrimitive.Title
export const EditDialogClose = DialogPrimitive.Close

type DialogContentProps = {
  children: React.ReactNode
}
export const EditDialogContent = ({ children }: DialogContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
      <DialogPrimitive.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-1 rounded-lg p-6 max-w-[660px] w-full data-[state=open]:animate-contentShow">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
