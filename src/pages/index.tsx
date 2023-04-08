import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { EditDialog } from '@/components/EditDialog'
import { DeleteDialog } from '@/components/DeleteAlertDialog'
import { usePosts } from '@/queries/posts'
import { CreatPostForm } from '@/components/CreatePostForm'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getPosts } from '@/queries/posts/list'
import { formatDistanceToNow } from 'date-fns'

export default function Home() {
  const postsQuery = usePosts()

  return (
    <main className="h-screen max-w-[800px] mx-auto">
      <header className="bg-primary h-20 flex items-center">
        <h1 className="text-[1.375rem] font-semibold leading-none text-white pl-9">
          CodeLeap Network
        </h1>
      </header>
      <div className="bg-white border border-gray-6 p-6">
        <CreatPostForm />
        <ul className="mt-6 flex flex-col gap-6">
          {postsQuery.data?.results.map((post) => (
            <li key={post.id} className="border border-gray-6 rounded-lg overflow-hidden">
              <div className="bg-primary text-white p-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <div className="flex items-center gap-6">
                  <DeleteDialog id={post.id}>
                    <button
                      aria-label={`Delete ${post.title} post`}
                      className="hover:bg-primary-400 w-8 h-8 flex items-center justify-center rounded-md duration-150"
                    >
                      <TrashIcon aria-hidden width={24} height={24} />
                    </button>
                  </DeleteDialog>
                  <EditDialog id={post.id}>
                    <button
                      aria-label={`Edit ${post.title} post`}
                      className="hover:bg-primary-400 w-8 h-8 flex items-center justify-center rounded-md duration-150"
                    >
                      <Pencil2Icon aria-hidden width={24} height={24} />
                    </button>
                  </EditDialog>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-11">@{post.username}</p>
                  <p className="text-lg text-gray-11">
                    {formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true })}
                  </p>
                </div>
                <p className="whitespace-pre-wrap text-lg">{post.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['posts'], getPosts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
