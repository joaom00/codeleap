import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

export const DeleteDialog = AlertDialogPrimitive.Root
export const DeleteDialogTrigger = AlertDialogPrimitive.Trigger
export const DeleteDialogTitle = AlertDialogPrimitive.Title
export const DeleteDialogCancel = AlertDialogPrimitive.Cancel

type DialogContentProps = {
  children: React.ReactNode
}
export const DeleteDialogContent = ({ children }: DialogContentProps) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
      <AlertDialogPrimitive.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-1 rounded-lg p-6 max-w-[660px] w-full data-[state=open]:animate-contentShow">
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  )
}
