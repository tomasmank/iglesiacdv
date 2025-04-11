import { createContext, useContext, ReactNode } from 'react';
import { useFormData } from './useFormData';

const FormContext = createContext<ReturnType<typeof useFormData> | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const form = useFormData();

  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext debe usarse dentro de un FormProvider');
  }
  return context;
};
