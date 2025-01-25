import { RouterProvider } from 'react-router-dom'
import { router } from '@/common/config/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App
