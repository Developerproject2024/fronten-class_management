import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const DialogSelect = ({ open, handleClose, opciones, handleAssingTeacher, title }: any) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSave = () => {
        if(selectedOption){
            handleAssingTeacher(selectedOption);
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth     >
            <DialogTitle>Seleccionar {title}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-label"></InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedOption}
                        onChange={handleChange}
                        size="small"
                        variant="outlined"
                    >
                        {opciones.map((opcion, index) => (
                            <MenuItem key={index} value={opcion.id}>
                                {opcion.name} {opcion.last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogSelect;