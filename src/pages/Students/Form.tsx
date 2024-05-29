
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { create, update } from '../../services/students.services';
import { Alert, Box, Button, Snackbar, TextField, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { emailPattern } from '../../utils/regular.expressions';

function Form({ onData, action, editData} : any) {
  const [openAlert, setOpenAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  const handleInputChange = (name: any) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value, { shouldValidate: true });
      clearErrors(name);
    };
  };

  const onSubmit = async (data: any) => {
    if (action === 0) {
      createData(data)
    }
    else {
      updateData(data)
    }
  };

  const createData = async (data: any) => {
    const response: any = await create(data);
    if (response.message) {
      setOpenAlert(true);
    } else {
      onData(false, response);
    }
  };

  const updateData = async (data: any) => {
    const dataId = {
      ...data, 
      id: editData.id
    }
    const response: any = await update(dataId);
    if (response.message) {
      setOpenAlert(true);
    } else {
      onData(false, response);
    }
  };

  const sendDataToParent = () => {
    onData(false);
  };



  return (
    <Box width="400px" height="270px" mt={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="Nombre"
          type="text"
          variant="outlined"
          {...register('name', { required: 'El nombre es obligatorio' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          required
          autoFocus
          margin="normal"
          onChange={handleInputChange('name')}
          size="small"
          defaultValue={editData.name}
        />
        <TextField
          id="last_name"
          label="Apellido"
          type="text"
          variant="outlined"
          {...register('last_name', { required: 'El nombre es obligatorio' })}
          error={!!errors.name}
          helperText={errors.last_name?.message}
          fullWidth
          required
          autoFocus
          margin="normal"
          onChange={handleInputChange('last_name')}
          size="small"
          defaultValue={editData.last_name}
        />
        <TextField
          id="email"
          label="Correo Electronico"
          type="email"
          variant="outlined"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: emailPattern,
              message: 'El correo electrónico no es válido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          required
          autoFocus
          margin="normal"
          onChange={handleInputChange('email')}
          size="small"
          defaultValue={editData.email}
        />
        <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button onClick={sendDataToParent} variant="contained" size="small" startIcon={<CancelIcon />} color="error" sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" size="small" startIcon={<SaveIcon />} color="success" type="submit">
            Guardar
          </Button>
        </Box>
      </Box>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpenAlert(false)} severity="error">
          Verificar los datos enviados email ya existe
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Form;