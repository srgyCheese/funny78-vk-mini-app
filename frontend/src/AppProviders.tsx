import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { trpc } from "./utils/trpc"
import { httpBatchLink } from "@trpc/client"
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui"

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `https://seveneight-backend.vercel.app/trpc`,
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: window.location.search,
        }
      },
    }),
  ],
  transformer: null
})

const AppProviders = ({ children }) => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default AppProviders
