import React from 'react'
import { useDeletePost, usePost } from '@/queries/posts'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

type DialogContentProps = {
  id: number
  children: React.ReactNode
}
export const DeleteDialog = ({ id, children }: DialogContentProps) => {
  const post = usePost(id)
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
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-1 rounded-lg p-6 max-w-[660px] w-[90vw] data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide">
          <form onSubmit={handleSubmit}>
            <AlertDialog.Title className="text-xl font-semibold">
              Are you sure you want to delete this item?
            </AlertDialog.Title>
            <p className="text-center text-lg my-10">
              <em>{post.data?.title}</em>
            </p>
            <div className="flex justify-end gap-4">
              <AlertDialog.Cancel
                type="button"
                className="h-9 px-8 border border-gray-7 rounded-lg hover:bg-gray-3 duration-150"
              >
                Cancel
              </AlertDialog.Cancel>
              <button
                type="submit"
                disabled={postDeleteMutation.isLoading}
                className="h-9 px-8 rounded-lg bg-red-500 disabled:bg-gray-5 disabled:cursor-default text-white hover:bg-red-600 duration-150"
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
