import { useQuery } from '@tanstack/react-query'

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

export async function getPosts(): Promise<PostsResponse> {
  const response = await fetch('https://dev.codeleap.co.uk/careers/')
  const data = await response.json()
  return data
}

export function usePosts<T = PostsResponse>(select?: (data: PostsResponse) => T) {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 30, // 30 seconds
    select,
  })
}

export function usePost(id: number) {
  return usePosts((data) => data.results.find((post) => post.id === id))
}
