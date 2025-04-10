import React from 'react';
import { Button, Box, Stack, Typography, ButtonProps } from '@mui/material';

interface FormActionsProps {
  // Acciones principales
  onSubmit: () => void;
  onReset?: () => void;
  
  // Acciones secundarias
  onAddAnother?: () => void;
  onKeepChildren?: (keep: boolean) => void;
  
  // Estados
  isSubmitted?: boolean;
  showAdditionalActions?: boolean;
  hasChildren?: boolean;
  
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
  onReset,
  onAddAnother,
  onKeepChildren,
  isSubmitted = false,
  showAdditionalActions = false,
  hasChildren = false,
  submitText = 'Guardar',
  resetText = 'Limpiar',
  addAnotherText = 'Cargar otra Persona',
  keepChildrenText = '¿Deseas mantener los datos de tus hijos para cargar tu pareja?',
  successMessage = '¡Gracias por completar el formulario!',
  submitButtonProps = {},
  resetButtonProps = {},
}) => {
  if (isSubmitted) {
    return (
      <Stack spacing={2} sx={{ textAlign: 'center', mt: 3, mb: 5 }}>
        {!showAdditionalActions && onAddAnother && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onAddAnother}
            fullWidth
          >
            {addAnotherText}
          </Button>
        )}
        
        {showAdditionalActions && onKeepChildren && (
          <>
            <Typography variant="h6">{keepChildrenText}</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => onKeepChildren(true)}
              >
                Mantener
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => onKeepChildren(false)}
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
      {onReset && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={onReset}
          {...resetButtonProps}
        >
          {resetText}
        </Button>
      )}
      
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        type="submit"
        {...submitButtonProps}
      >
        {submitText}
      </Button>
    </Box>
  );
};

export default FormActions;