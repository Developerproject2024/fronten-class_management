import { useEffect, useState } from 'react';
import DataTable from '../../components/Table/Table';
import { GridColDef } from '@mui/x-data-grid';
import { Remove, getFindAll, relationClassByTeacher } from '../../services/classes.services';
import { getFindAll as getFindAllTeacher } from '../../services/teachers.services';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from './Form';
import Confirm from '../../components/Dialog/Confirm';
import DialogSelect from '../../components/Dialog/Select';

const Classes = () => {

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
  const [openSelect, setOpenSelect] = useState(false);
  const [optionSelect, setOptionSelect] = useState<any[]>([]);
  const [classId, setclassId] = useState<number>(0);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 100 },
    { field: 'description', headerName: 'Descripcion', width: 200 },
    {
      field: 'teacher', headerName: 'Profersor', width: 250,
      valueGetter: (params: any) => {
        if (params !== undefined && params !== null) {
          const usuario = params.name;
          return usuario ? `${params.name} ${params.last_name} (${params.email})` : '';
        }
        return ''
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 500,
      renderCell: (params) => (
        <Box>
          <Button variant="contained" color="success" onClick={() => handleEdit(params.row)} sx={{ ml: 2 }} size="small" startIcon={<EditIcon />}>

          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row)} sx={{ ml: 2 }} size="small" startIcon={<DeleteIcon />}>

          </Button>
          <Button variant="contained" color="primary" onClick={() => handleOpenSelect(params.row)} sx={{ ml: 2 }} size="small" startIcon={<AddIcon />}>
            Profesor
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleOpenSelect(params.row)} sx={{ ml: 2 }} size="small" startIcon={<AddIcon />}>
            estudiantes
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

  useEffect(() => {
    getFindAllTeacher()
      .then((response: any) => {
        setOptionSelect(response)

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
    if (action === 0) {
      setItems(prevItems => [...prevItems, data]);
      setOpen(close)
      showAlert('success', 'El clases se creo correctamente')
    } else {
      updateTeacher(data)
      setOpen(close)
    }

  };

  const updateTeacher = (data: any) => {
    const updatedData = [...items];
    const index = items.findIndex(obj => obj.id === data.id);
    if (index !== -1) {
      updatedData[index] = data
      setItems(updatedData)
      showAlert('success', 'El clases se actualizo correctamente')
    }
  }
  const showAlert = (type: any, message: any) => {
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
    showAlert('error', 'El clases se elimino correctamente')
    setDelete(false)
  }
  const handleCloseDelete = () => {
    setDelete(false)
  }
  const handleAssingTeacher = async (data: any) => {
    setLoading(true);
    const response = await relationClassByTeacher(classId, {
      "teacherId": data
    })

    const result: any[] = await getFindAll()
    setItems(result)
    setLoading(false);
  }



  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = (data: any) => {
    setclassId(data.id)
    setOpenSelect(true);
  };


  return (
    <>
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>

        <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={handleClickOpen}>
          Crear clases
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}> {action == 1 ? 'Editar clases' : 'Crear clases'}</DialogTitle>
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
      <Confirm openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleDeleteAcept={handleDeleteAcept} />
      <DialogSelect open={openSelect} handleClose={handleCloseSelect} opciones={optionSelect} handleAssingTeacher={handleAssingTeacher} title="Profesor" />

    </>
  );
}

export default Classes;