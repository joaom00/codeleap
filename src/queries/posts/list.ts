import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query'

type PostsResponse = {
  count: number
  next: number | null
  previous: number | null
  results: {
    id: number
    username: string
    created_datetime: string
    title: string
    content: string
  }[]
}

type Context = QueryFunctionContext<string[], string>
export async function getPosts(ctx: Context): Promise<PostsResponse> {
  const next = ctx.pageParam
  const url = next ?? 'https://dev.codeleap.co.uk/careers/'
  const response = await fetch(url, { signal: ctx.signal })
  const data = await response.json()
  return data
}

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 30, // 30 seconds
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    keepPreviousData: true,
  })
}

export function usePost(id: number) {
  const queryClient = useQueryClient()

  const posts = queryClient.getQueryData<InfiniteData<PostsResponse>>(['posts'])
  return posts?.pages.map((page) => page.results.find((post) => post.id === id))[0]
}
