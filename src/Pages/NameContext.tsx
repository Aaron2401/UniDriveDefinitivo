import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NameContextType {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
}

interface NameProviderProps {
  children: ReactNode;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export const NameProvider = ({ children }: NameProviderProps) => {
  const [name, setName] = useState<string | null>(null);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('useName must be used within a NameProvider');
  }
  return context;
};
