import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'

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
  console.log('alou')
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
  return { data: { username: 'vitor', title: 'seila', content: 'seila' } }
  // return usePosts((data) => data.results.find((post) => post.id === id))
}
