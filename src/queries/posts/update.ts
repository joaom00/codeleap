import { useMutation, useQueryClient } from '@tanstack/react-query'

type Payload = {
  id: number
  title: string
  content: string
}

async function updatePost({ id, ...payload }: Payload) {
  const response = await fetch(`https://dev.codeleap.co.uk/careers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error()
  }
  const data = await response.json()
  return data
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
