import React from 'react'
import { useCreatePost } from '@/queries/posts'
import { Spinner } from '@/components/Spinner'
import { Textarea } from '@/components/Textarea'
import { Label } from '@/components/Label'
import { useToast } from './Toast'

type CreatPostFormProps = {
  username: string
}
export const CreatPostForm = ({ username }: CreatPostFormProps) => {
  const toast = useToast()
  const postCreateMutation = useCreatePost()
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const payload = { username, title: title.trim(), content: content.trim() }
    postCreateMutation.mutate(payload, {
      onSuccess: () => {
        setTitle('')
        setContent('')
        toast.success({
          title: 'Post created successfully!',
        })
      },
      onError: () => {
        toast.error({
          title: 'Something went wrong',
        })
      },
    })
  }

  return (
    <form className="border border-gray-6 p-6 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">What&apos;s on your mind?</h2>

      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            placeholder="Hello world"
            className="h-10 rounded-lg border border-gray-7 p-2 placeholder:text-gray-11 text-sm"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Content here"
            value={content}
            onChange={(event) => setContent(event.currentTarget.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={postCreateMutation.isLoading || !title.trim() || !content.trim()}
        className="flex ml-auto items-center gap-2 h-10 px-9 rounded-lg bg-primary mt-6 text-white cursor-pointer disabled:bg-gray-5 disabled:cursor-default"
      >
        {postCreateMutation.isLoading && <Spinner />}
        Create
      </button>
    </form>
  )
}
