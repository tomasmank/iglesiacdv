import React from 'react';
import { Button, Box, Stack, Typography, ButtonProps } from '@mui/material';
import { useFormData } from '../../hooks/useFormData';
import { useFormContext } from '../../hooks/FormContext';

interface FormActionsProps {
  // Acciones principales
  onSubmit: (e:React.FormEvent) => void;
  
  // Estados
  isSubmitted?: boolean;
  
  // Textos personalizables
  submitText?: string;
  resetText?: string;
  addAnotherText?: string;
  keepChildrenText?: string;
  successMessage?: string;
  
  // Props personalizables
  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;
}

const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  isSubmitted = false,
  submitText = 'Guardar',
  resetText = 'Limpiar',
  addAnotherText = 'Cargar otra Persona',
  keepChildrenText = '¿Deseas mantener los datos de tus hijos para cargar tu pareja?',
  successMessage = '¡Gracias por completar el formulario!',
  submitButtonProps = {},
  resetButtonProps = {},
}) => {
  const {
      showAdditionalActions,
      resetForm,
      handleAddAnother,
    } = useFormContext();
  if (isSubmitted) {
    return (
      <Stack spacing={2} sx={{ textAlign: 'center', mt: 3, mb: 5 }}>
        {!showAdditionalActions && handleAddAnother && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddAnother}
            fullWidth
          >
            {addAnotherText}
          </Button>
        )}
        
        {showAdditionalActions && (
          <>
            <Typography variant="h6">{keepChildrenText}</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => resetForm(true)}
              >
                Mantener
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => resetForm(false)}
              >
                No Mantener
              </Button>
            </Stack>
          </>
        )}
        
        {!showAdditionalActions && (
          <Typography variant="h5" color="success.main">
            {successMessage}
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2,
      mt: 3,
      px: 1,
      mb: 5
    }}>
      {resetForm && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={()=> resetForm()}
          {...resetButtonProps}
        >
          {resetText}
        </Button>
      )}
      
      <Button
        type="submit" 
        variant="contained"
        color="primary"
        onClick={onSubmit}
        {...submitButtonProps}
      >
        {submitText}
      </Button>
    </Box>
  );
};

export default React.memo(FormActions) as typeof FormActions;