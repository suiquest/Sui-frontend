import { useContext } from 'react';
import { TuskyContext } from '../context/TuskyClient';

export function useTusky() {
  const context = useContext(TuskyContext);
  if (!context) {
    throw new Error('useTusky must be used within a TuskyProvider');
  }
  return context;
} 