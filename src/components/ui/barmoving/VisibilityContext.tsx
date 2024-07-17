// src/components/ui/barmoving/VisibilityContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VisibilityContextProps {
  isBarMovingVisible: boolean;
  setBarMovingVisible: (visible: boolean) => void;
}

interface VisibilityProviderProps {
  children: ReactNode;
}

const VisibilityContext = createContext<VisibilityContextProps | undefined>(undefined);

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [isBarMovingVisible, setBarMovingVisible] = useState(true);

  return (
    <VisibilityContext.Provider value={{ isBarMovingVisible, setBarMovingVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};
