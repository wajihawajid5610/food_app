"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const quaryClient = new QueryClient()
type Props = {
    children:React.ReactNode;
}

const QuaryProvider = ({children}:Props) => {
    
  return (
   <QueryClientProvider client={quaryClient}>
         {children}
   </QueryClientProvider>
  )
}

export default QuaryProvider
