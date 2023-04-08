import { useMutation, useQueryClient } from '@tanstack/react-query'

type Payload = {
  username: string
  title: string
  content: string
}

async function createPost(payload: Payload) {
  const response = await fetch('https://dev.codeleap.co.uk/careers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
