import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function Filters({ onNameFilter }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2} marginTop={2}>
      <Box marginRight={2}>
        <ButtonGroup variant="contained">
          <Button>Nombre</Button>
          <Button>Edad</Button>
          <Button>Tamaño</Button>
          <Button>Especie</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default Filters;
