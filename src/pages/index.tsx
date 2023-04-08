import nookies, { destroyCookie } from 'nookies'
import { CreatPostForm } from '@/components/CreatePostForm'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getPosts } from '@/queries/posts/list'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Posts } from '@/components/Posts'
import { USERNAME_KEY_COOKIE } from '@/constants'
import { Spinner } from '@/components/Spinner'
import clsx from 'clsx'

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
  await queryClient.fetchQuery(['posts'], getPosts).catch(() => {
    error = true
  })

  if (username) {
    return {
      props: {
        error,
        username,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

  return {
    props: {
      error,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
