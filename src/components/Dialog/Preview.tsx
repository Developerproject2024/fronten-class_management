import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DataTable from '../Table/Table';
import CancelIcon from '@mui/icons-material/Cancel';
import { GridColDef } from '@mui/x-data-grid';

const DialogPreview = ({ open, handleClose, rows, title }: any) => {
    const close = () => {
        handleClose();
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 100 },
        { field: 'last_name', headerName: 'Apellido', width: 100 },
        { field: 'email', headerName: 'email', width: 200 },
    ];

    return (
        <Dialog open={open} fullWidth  >
            <DialogTitle sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white', mb:2 }}>Estudiantes en la clase de {title}</DialogTitle>
            <DialogContent>
                <DataTable rows={rows} columns={columns} />
            </DialogContent>
            <DialogActions>
                <Button onClick={close} startIcon={<CancelIcon />} color="primary" variant="contained" size="small">
                    Salir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogPreview;