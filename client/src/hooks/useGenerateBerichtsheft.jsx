import { useMutation, useQueryClient } from 'react-query'

//
//

const generateFile = async () => {
  //
  const response = await fetch('/api/berichtsheft/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    throw new Error('Failed to generate file')
  }

  return response.json()
}

//
//

export default function useGenerateBerichtsheft() {
  const queryClient = useQueryClient()

  const { mutate, data } = useMutation(generateFile, {
    onSuccess: () => {
      queryClient.invalidateQueries('downloadLink')
    },
  })

  return { mutate, data }
}
