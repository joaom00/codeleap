import { useCreatePost } from '@/queries/posts'
import React from 'react'
import { Spinner } from './Spinner'

export const CreatPostForm = () => {
  const postCreateMutation = useCreatePost()
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    postCreateMutation.mutate(
      { username: 'Vitor', title, content },
      {
        onSuccess: () => {
          setTitle('')
          setContent('')
        },
      },
    )
  }

  return (
    <form className="border border-gray-6 p-6 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">What&apos;s on your mind?</h2>

      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="h-10 rounded-lg border border-gray-7 mt-2 px-2"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="h-10 rounded-lg border border-gray-7 mt-2 px-2"
            value={content}
            onChange={(event) => setContent(event.currentTarget.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={postCreateMutation.isLoading || !title || !content}
        className="flex ml-auto items-center gap-2 h-10 px-9 rounded-lg bg-primary mt-6 text-white cursor-pointer disabled:bg-gray-5 disabled:cursor-default"
      >
        {postCreateMutation.isLoading && <Spinner />}
        Create
      </button>
    </form>
  )
}
