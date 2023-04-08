import React from 'react'
import { useDeletePost } from '@/queries/posts'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

type DialogContentProps = {
  id: number
  children: React.ReactNode
}
export const DeleteDialog = ({ id, children }: DialogContentProps) => {
  const postDeleteMutation = useDeletePost()

  const [open, setOpen] = React.useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    postDeleteMutation.mutate(id, {
      onSuccess: () => {
        setOpen(true)
      },
    })
  }
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-1 rounded-lg p-6 max-w-[660px] w-full data-[state=open]:animate-contentShow">
          <form onSubmit={handleSubmit}>
            <AlertDialog.Title className="text-xl font-semibold">
              Are you sure you want to delete this item?
            </AlertDialog.Title>
            <div className="flex justify-end gap-4 mt-10">
              <AlertDialog.Cancel
                type="button"
                className="h-9 px-8 border border-gray-7 rounded-lg"
              >
                Cancel
              </AlertDialog.Cancel>
              <button
                type="submit"
                disabled={postDeleteMutation.isLoading}
                className="h-9 px-8 rounded-lg bg-red-500 disabled:bg-gray-5 disabled:cursor-default"
              >
                Delete
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
