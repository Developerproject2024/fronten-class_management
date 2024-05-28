import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Modal({ open, onClose }:any) {
  console.log(open, onClose)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px', // Bordes redondeados
          padding: '16px', // Espacio interno
          maxWidth: '600px', // Ancho máximo del modal
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Título del Modal
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Contenido del modal con un diseño atractivo y bordes redondeados.
        </Typography>
        <Typography gutterBottom>
          Puedes personalizar este contenido según tus necesidades.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;