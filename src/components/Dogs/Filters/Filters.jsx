import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';

function Filters({ onColorFilter }) {
  const [showColorCheckboxes, setShowColorCheckboxes] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorCheckboxChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const applyColorFilters = () => {
    onColorFilter(selectedColors);
    setShowColorCheckboxes(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2} marginTop={2}>
      <Box marginRight={2}>
        <ButtonGroup variant="contained">
          <Button>Edad</Button>
          <Button>Tamaño</Button>
          <Button>Especie</Button>
          <Button>Peso</Button>
          <Button
            onClick={() => setShowColorCheckboxes(!showColorCheckboxes)}
          >
            Color
          </Button>
        </ButtonGroup>
      </Box>
      {showColorCheckboxes && (
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedColors.includes('red')}
                onChange={() => handleColorCheckboxChange('red')}
              />
            }
            label="Rojo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedColors.includes('blue')}
                onChange={() => handleColorCheckboxChange('blue')}
              />
            }
            label="Azul"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedColors.includes('green')}
                onChange={() => handleColorCheckboxChange('green')}
              />
            }
            label="Verde"
          />
          {/* Agregar más checkboxes según los colores en tu data */}
          <ButtonGroup variant="contained">
            <Button onClick={applyColorFilters}>Aplicar</Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
}

export default Filters;
