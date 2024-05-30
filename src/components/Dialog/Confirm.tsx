import {  Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const Confirm = ({openDelete, handleCloseDelete, handleDeleteAcept}:any) => {
    const handleClose = () => {
        handleCloseDelete()
    }

    const itemDelete = () => {
        handleDeleteAcept()
    }
    return (
        
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white', mb:2 }}>{"Confirmar eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este dato?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} startIcon={<CancelIcon />} color="warning" variant="contained" size="small">
                        Cancelar
                    </Button>
                    <Button onClick={itemDelete}  startIcon={<DeleteIcon />} color="error" autoFocus variant="contained" size="small">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        
    );
}

export default Confirm;