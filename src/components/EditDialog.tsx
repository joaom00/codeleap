import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { usePost, useUpdatePost } from '@/queries/posts'
import { Spinner } from '@/components/Spinner'
import { Textarea } from '@/components/Textarea'
import { Label } from '@/components/Label'
import { useToast } from './Toast'

type DialogProps = {
  id: number
  children: React.ReactNode
}
export const EditDialog = ({ id, children }: DialogProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />

        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-1 rounded-lg p-6 max-w-[660px] w-[95vw] data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide">
          <Dialog.Title className="text-xl font-semibold">Edit item</Dialog.Title>

          <Content id={id} onSuccess={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type ContentProps = {
  id: DialogProps['id']
  onSuccess: () => void
}
const Content = ({ id, onSuccess }: ContentProps) => {
  const toast = useToast()
  const post = usePost(id)
  const updatePostMutation = useUpdatePost()

  const [title, setTitle] = React.useState(post.data?.title ?? '')
  const [content, setContent] = React.useState(post.data?.content ?? '')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const payload = { id, title: title.trim(), content: content.trim() }
    updatePostMutation.mutate(payload, {
      onSuccess: () => {
        toast.success({
          title: 'Post has been updated successfully!',
        })
        onSuccess()
      },
      onError: () => {
        toast.error({
          title: 'Something went wrong',
        })
      },
    })
  }

  const disableSave = React.useMemo(
    () =>
      JSON.stringify({ title: post.data?.title, content: post.data?.content }) ===
      JSON.stringify({ title: title.trim(), content: content.trim() }),
    [post.data?.title, post.data?.content, title, content],
  )
  return (
    <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <input
          id="title"
          name="title"
          className="h-10 border border-gray-7 text-sm rounded-lg p-2"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
      </div>
      <div className="flex justify-end items-center gap-4">
        <Dialog.Close
          type="button"
          className="h-9 px-8 border border-gray-7 rounded-lg hover:bg-gray-3 duration-150"
        >
          Cancel
        </Dialog.Close>
        <button
          type="submit"
          disabled={updatePostMutation.isLoading || disableSave}
          className="h-9 px-8 rounded-lg bg-green-500 flex items-center gap-2 disabled:cursor-default disabled:bg-gray-5 hover:bg-green-600 duration-150 text-white"
        >
          {updatePostMutation.isLoading && <Spinner />}
          Save
        </button>
      </div>
    </form>
  )
}
