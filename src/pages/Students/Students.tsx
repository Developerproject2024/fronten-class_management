import { useEffect, useState } from 'react';
import DataTable from '../../components/Table/Table';
import { GridColDef } from '@mui/x-data-grid';
import { Remove, getFindAll } from '../../services/students.services';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from './Form';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Confirm from '../../components/Dialog/Confirm';

const Students = () => {

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertType, setOpenAlertType] = useState();
  const [openAlertMessage, setAlertMessage] = useState();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState(0);
  const [editData, setEditData] = useState<any>();
  const [openDelete, setDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<any[]>([]);
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
          <Button variant="contained" color="success" onClick={() => handleEdit(params.row)} sx={{ ml: 2 }} size="small" startIcon={<EditIcon />}>

          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row)} sx={{ ml: 2 }} size="small" startIcon={<DeleteIcon />}>

          </Button>
        </Box>
      ),
    },
  ];
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

  const handleClickOpen = () => {
    setOpen(true);
    setAction(0)
    setEditData(0)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (data: any) => {
   setDelete(true)
   setDeleteData(data)
  };
  const handleEdit = async (data: any) => {
    
    setAction(1)
    setOpen(true)
    setEditData(data)
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  const handleDataFromChild = (close: boolean, data: any) => {
    if(action === 0){
    setItems(prevItems => [...prevItems, data]);
    setOpen(close)
    showAlert('success','El Estudiante se creo correctamente')
    }else{
      updateTeacher(data)
      setOpen(close)
    }
    
  };

  const updateTeacher = (data:any) => {
    const updatedData = [...items];
    const index = items.findIndex(obj => obj.id === data.id);
    if (index !== -1) {
      updatedData[index] = data
      setItems(updatedData)
      showAlert('success','El Estudiante se actualizo correctamente')
    }
  }
  const showAlert = (type:any, message:any) => {
    setOpenAlert(true);
    setOpenAlertType(type)
    setAlertMessage(message)
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  };
  const handleDeleteAcept = async () => {
    const response = await Remove(deleteData.id)
    setItems(items.filter((row: any) => row.id !== deleteData.id))
    showAlert('error','El Estudiante se elimino correctamente')
    setDelete(false)
  }
  const handleCloseDelete = () => {
    setDelete(false)
  }
  return (
    <>
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>

        <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={handleClickOpen}>
          Crear Estudiante
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}> { action == 1 ? 'Editar Estudiante' : 'Crear Estudiante' }</DialogTitle>
          <DialogContent>
            <Form onData={handleDataFromChild} action={action} editData={editData} />
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>

      </Box>
      {items.length > 0 && (
        <DataTable rows={items} columns={columns} />
      )}
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpenAlert(false)} severity={openAlertType}>
          {openAlertMessage}
        </Alert>
      </Snackbar>
      <Confirm  openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleDeleteAcept={handleDeleteAcept}/>
    </>
  );
}

export default Students;