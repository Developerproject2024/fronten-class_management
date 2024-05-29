import { useEffect, useState } from 'react';
import DataTable from '../../components/Table/Table';
import { GridColDef } from '@mui/x-data-grid';
import { Remove, getFindAll } from '../../services/teachers.services';
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Form() {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
      <TextField label="Nombre" variant="outlined" size="small" />
      <TextField label="Apellido" variant="outlined" size="small" />
      <TextField label="Correo electrónico" variant="outlined" size="small" />
    </Box>
  );
}

const Teacher = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'last_name', headerName: 'Apellido', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button variant="contained" color="success" onClick={() => handleEdit(params.row)} sx={{ml:2}} size="small" startIcon={<EditIcon />}>
            
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row)} sx={{ml:2}} size="small" startIcon={<DeleteIcon />}>
          
          </Button>
        </Box>
      ),
    },
  ];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFindAll()
      .then((response: any) => {
        setItems(response);
        setLoading(true)
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los datos del formulario
    console.log('Datos guardados');
    setOpen(false);
  };

  const handleEdit = (data:any) => {
    // Aquí puedes agregar la lógica para guardar los datos del formulario
    console.log('Editar data', data);
   
  };

  const handleDelete = async (data:any) => {
    const response = await Remove(data.id)
    console.log('Delete Data', data, response);
    setItems(items.filter((row :any)=> row.id !== data.id))
   
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return items.length > 0 && (
    <>
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>

        <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={handleClickOpen}>
          Crear Profesor
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>Crear Profesor</DialogTitle>
          <DialogContent>
            <Form />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" size="small" startIcon={<CancelIcon />} color="error">
              Cancelar
            </Button>
            <Button onClick={handleSave} variant="contained" size="small" startIcon={<SaveIcon />} color="success">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <DataTable rows={items} columns={columns} />
    </>
  );
}

export default Teacher;