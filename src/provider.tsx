
import React from "react";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { networkConfig, network } from "./contract";
// import { Toaster } from "sonner";
import "@mysten/dapp-kit/dist/index.css";
import { TuskyProvider } from './context/TuskyClient'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={network}>
        <WalletProvider autoConnect={false}>
          <TuskyProvider>
            {children}
          </TuskyProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
