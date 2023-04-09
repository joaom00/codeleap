import nookies, { destroyCookie } from 'nookies'
import { CreatPostForm } from '@/components/CreatePostForm'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getPosts } from '@/queries/posts/list'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Posts } from '@/components/Posts'
import { USERNAME_KEY_COOKIE } from '@/constants'

type HomeProps = {
  username?: string
  error: boolean
}

export default function Home(props: HomeProps) {
  const router = useRouter()

  const handleLogout = () => {
    destroyCookie(null, USERNAME_KEY_COOKIE)
    router.reload()
  }

  return (
    <main className="min-h-screen max-w-[800px] mx-auto">
      <header className="bg-primary h-20 flex items-center justify-between px-9 sticky top-0">
        <h1 className="text-[1.375rem] font-semibold leading-none text-white">CodeLeap Network</h1>
        <div className="flex items-center gap-2">
          {props?.username && <p className="text-white">Olá, {props.username}</p>}
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
        </div>
      </header>
      <div className="bg-white border border-gray-6 p-6">
        {props.username && <CreatPostForm username={props.username} />}
        <Posts username={props.username} error={props.error} />
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const username = cookies[USERNAME_KEY_COOKIE]
  const queryClient = new QueryClient()

  let error = false
  await queryClient.fetchInfiniteQuery(['posts'], getPosts).catch(() => {
    error = true
  })

  if (username) {
    return {
      props: {
        error,
        username,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    }
  }

  return {
    props: {
      error,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}
