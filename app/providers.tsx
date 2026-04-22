'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "#fff",
              color: "#1a1c1c",
              fontWeight: "700",
              border: "1px solid #e4e4e7",
              borderRadius: "12px",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#fff",
              color: "#af101a",
              fontWeight: "700",
              border: "1px solid #fecaca",
              borderRadius: "12px",
            },
          },
        }}
      />
      {children}
    </QueryClientProvider>
  )
}