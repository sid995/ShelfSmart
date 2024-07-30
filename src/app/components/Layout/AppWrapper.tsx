'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProviderWrapper } from '@/context/ThemeContext';
import React, { ReactNode } from 'react';

interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <ThemeProviderWrapper>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProviderWrapper>
  );
};