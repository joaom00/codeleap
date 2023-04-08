import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import nookies, { destroyCookie } from 'nookies'
import { EditDialog } from '@/components/EditDialog'
import { DeleteDialog } from '@/components/DeleteAlertDialog'
import { usePosts } from '@/queries/posts'
import { CreatPostForm } from '@/components/CreatePostForm'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getPosts } from '@/queries/posts/list'
import { formatDistanceToNow } from 'date-fns'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type HomeProps = {
  username?: string
}

export default function Home(props: HomeProps) {
  const postsQuery = usePosts()
  const router = useRouter()

  const handleLogout = () => {
    destroyCookie(null, '@codeleap:name')
    router.reload()
  }

  return (
    <main className="h-screen max-w-[800px] mx-auto">
      <header className="bg-primary h-20 flex items-center justify-between px-9">
        <h1 className="text-[1.375rem] font-semibold leading-none text-white">CodeLeap Network</h1>
        {props.username ? (
          <button
            className="bg-primary-500 hover:bg-primary-400 text-white h-10 px-6 rounded-lg duration-150 flex items-center justify-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/signup"
            className="bg-primary-500 hover:bg-primary-400 text-white h-10 px-6 rounded-lg duration-150 flex items-center justify-center"
          >
            Login
          </Link>
        )}
      </header>
      <div className="bg-white border border-gray-6 p-6">
        {props.username && <CreatPostForm username={props.username} />}
        <ul className="mt-6 flex flex-col gap-6">
          {postsQuery.data?.results.map((post) => (
            <li key={post.id} className="border border-gray-6 rounded-lg overflow-hidden">
              <div className="bg-primary text-white p-6 flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">{post.title}</h3>
                <div className="flex items-center gap-6">
                  {props.username === post.username && (
                    <>
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
                    </>
                  )}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const username = cookies['@codeleap:name']

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['posts'], getPosts)

  if (username) {
    return {
      props: {
        username,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
