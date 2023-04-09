import { useMutation, useQueryClient } from '@tanstack/react-query'

async function deletePost(id: number) {
  const response = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error()
  }
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
