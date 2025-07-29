// src/TuskyContext.tsx
/* eslint-disable react-refresh/only-export-components */
import { Tusky } from '@tusky-io/ts-sdk/web';
import { useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';   

interface TuskyContextType {
  tusky: Tusky | null;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

export const TuskyContext = createContext<TuskyContextType | undefined>(undefined);

export function TuskyProvider({ children }: { children: ReactNode }) {
  const [tusky, setTusky] = useState<Tusky | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const account = useCurrentAccount();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  useEffect(() => {
    if (account) {
      const tuskyClient = new Tusky({
        wallet: { 
          signPersonalMessage, 
          account: {
            ...account,
            publicKey: new Uint8Array(account.publicKey)
          }
        },
      });
      setTusky(tuskyClient);
    }
  }, [account, signPersonalMessage]);

  const signIn = async () => {
    if (tusky) {
      try {
        await tusky.auth.signIn();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    // Tusky SDK doesn’t provide a signOut method; reset state as needed
  };

  return (
    <TuskyContext.Provider value={{ tusky, isAuthenticated, signIn, signOut }}>
      {children}
    </TuskyContext.Provider>
  );
}