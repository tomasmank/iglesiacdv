import React, { FormEvent, useState } from 'react';
import { Button, Box, Stack, Typography, ButtonProps } from '@mui/material';
import {FormData} from '../../interfaces/interfaces'
import { useFormContext } from '../../hooks/FormContext';
import ReCaptcha from 'react-google-recaptcha';
interface FormActionsProps {
  onSubmit: (e: FormEvent<Element>,formData: FormData, captchaToken: string) => void;
  
  isSubmitted?: boolean;
  
  submitText?: string;
  resetText?: string;
  addAnotherText?: string;
  keepChildrenText?: string;
  successMessage?: string;
  
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
      formData,
      isLoading
    } = useFormContext();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);
const validator = (e:any) =>{
  setCaptchaToken(e);
  setCaptchaError(null);
}
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
    <>
    <Box sx={{ mb: 2, display:'flex', justifyContent:'center'}}> 
    <ReCaptcha
      sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY!}
      onChange={validator}
    />
    {captchaError && (
      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
        {captchaError}
      </Typography>
    )}
  </Box>
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
      {
      <Button
        type="submit" 
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={(e) =>{if (!captchaToken) {
          setCaptchaError("Por favor, completa el reCAPTCHA para continuar.");
          return;
        }; onSubmit(e,formData, captchaToken)}}
        {...submitButtonProps}
      >
        {isLoading ? 'Enviando...' : submitText}
      </Button>}
    </Box>
    </>
  );
};

export default React.memo(FormActions) as typeof FormActions;