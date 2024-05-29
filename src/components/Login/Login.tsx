
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Button, TextField, Grid, Paper, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../../Auth/AuthContext';
import { getItems } from '../../services/login.services';
import { useState } from 'react';
import IFormInput from '../../Auth/interfaces/index.interfaces'
import { emailPattern } from '../../utils/regular.expressions'

function Login() {
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<IFormInput>();

  const onSubmit = async (data: any) => {
    const response: any = await getItems(data);
    if (response.access_token) {
      localStorage.setItem('token', response.access_token)
      login();
      navigate('/home');
    }
    setError(true)
  };

  const handleInputChange = (name: keyof IFormInput) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value, { shouldValidate: true });
      clearErrors(name);
      setError(false)
    };
  };



  return (
    <Grid container component="main" sx={{ height: '80vh' }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
          margin: 'auto',
        }}
      >
        <div>
          <Typography component="h1" variant="h5" sx={{ mt: 4, pl: 5 }}>
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, p: 3 }}>
            <TextField
              id="username"
              label="Correo electrónico"
              type="email"
              variant="outlined"
              {...register('username', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: emailPattern,
                  message: 'El correo electrónico no es válido',
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
              required
              autoFocus
              margin="normal"
              onChange={handleInputChange('username')}
            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              {...register('password', { required: 'La contraseña es obligatorio' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              required
              autoFocus
              margin="normal"
              onChange={handleInputChange('password')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            {error && (
              <Alert severity="error">Por favor verifique sus credenciales de ingreso</Alert>
            )}
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;