import React, { createContext, useContext, ReactNode } from 'react';
import { useFormData } from './useFormData'; // Tu hook actual

const FormContext = createContext<ReturnType<typeof useFormData> | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const form = useFormData();

  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
};

// Hook para consumir el contexto
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext debe usarse dentro de un FormProvider');
  }
  return context;
};
