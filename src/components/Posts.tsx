import { TrashIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { formatDistanceToNow } from 'date-fns'
import { usePosts } from '@/queries/posts'
import { DeleteDialog } from '@/components/DeleteAlertDialog'
import { EditDialog } from '@/components/EditDialog'
import { Spinner } from './Spinner'
import clsx from 'clsx'
import { useScrollToBottomAction } from '@/hooks/use-scroll-to-bottom-action'

type PostsProps = {
  username?: string
  error: boolean
}
export const Posts = (props: PostsProps) => {
  const postsQuery = usePosts()

  if (postsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center mt-6">
        <Spinner />
      </div>
    )
  }

  if (props.error) {
    return (
      <div className="mt-6 text-center border border-gray-6 p-6 max-w-max mx-auto rounded-lg flex flex-col items-center gap-6">
        <p className="text-lg font-bold">Something went wrong when try to loading the posts</p>
        <button
          className="bg-primary text-white h-10 px-6 rounded-lg hover:bg-primary-400 duration-150"
          onClick={() => postsQuery.refetch()}
        >
          Try again
        </button>
      </div>
    )
  }

  return <PostsImpl username={props.username} />
}

type PostsImplProps = {
  username?: string
}
const PostsImpl = (props: PostsImplProps) => {
  const postsQuery = usePosts()

  useScrollToBottomAction(postsQuery.fetchNextPage, 100)

  return (
    <>
      <div
        className={clsx('flex justify-end items-center p-4', !postsQuery.isFetching && 'invisible')}
      >
        <Spinner />
      </div>
      <ul className="flex flex-col gap-6">
        {postsQuery.data?.pages?.map((page) =>
          page.results.map((post) => (
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
                <div className="flex flex-wrap items-center justify-between">
                  <p className="text-lg font-bold text-gray-11 line-clamp-1 max-w-[75%]">
                    @{post.username}
                  </p>
                  <p className="text-lg text-gray-11 whitespace-nowrap">
                    {formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true })}
                  </p>
                </div>
                <p className="whitespace-pre-wrap text-lg">{post.content}</p>
              </div>
            </li>
          )),
        )}
      </ul>
      <div
        className={clsx(
          'flex justify-center items-center p-4',
          !postsQuery.isFetchingNextPage && 'invisible',
        )}
      >
        <Spinner />
      </div>
    </>
  )
}
