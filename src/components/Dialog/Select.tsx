import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const DialogSelect = ({ open, handleClose, opciones }: any) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSave = () => {
        // Aquí puedes manejar la lógica para guardar la opción seleccionada
        console.log('Opción seleccionada:', selectedOption);
        handleClose();
    };

    return (
        <Box width="4000px" height="190px" mt={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }} component="form">
                <Dialog open={open} onClose={handleClose} fullWidth     >
                    <DialogTitle>Seleccionar Opción</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth  sx={{mt:2}}>
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
                                        {opcion.name}
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
            </Box>
        </Box>
    );
};

export default DialogSelect;