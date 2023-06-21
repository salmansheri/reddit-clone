'use client'; 

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { FC, ReactNode } from 'react'

interface ProviderProps {
    children: ReactNode; 
  
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >

    <SessionProvider>
        {children}
    </SessionProvider>
    </QueryClientProvider>
  )
}

export default Provider; 