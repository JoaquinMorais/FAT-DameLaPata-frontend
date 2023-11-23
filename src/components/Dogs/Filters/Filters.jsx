import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function Filters({ onNameFilter, onToggleOrder, onAgeFilter }) {  
  const buttonStyle = { backgroundColor: 'orange', color: 'white' };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2} marginTop={2}>
      <Box marginRight={2} >
        <ButtonGroup>
          <Button onClick={onToggleOrder} style={buttonStyle}>Nombre</Button>
          <Button onClick={onAgeFilter} style={buttonStyle}>Edad</Button>
          <Button style={buttonStyle}>Tamaño</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default Filters;
