import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { styled } from 'styled-components';
import axios from 'axios';

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 8px;
`;

const StyledCard = styled(Card)`
  width: 100%;

  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 250px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: red;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
function CardPerson({ full_name, district, telefono }) {
  const [status, setStatus] = useState('Pendiente'); 

  const handleAccept = () => {
    setStatus('Aceptada');
  };

  const handleReject = () => {
    setStatus('Rechazada');
  };

  return (
    <Content>
      <StyledCard>
        <StyledCardMedia />
        <StyledCardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ borderBottom: 1 }}>
            Nombre: {full_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Barrio: {district}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Teléfono: {telefono}
          </Typography>
        </StyledCardContent>
        <StyledCardActions>
          <Button variant="outlined" color="success" onClick={handleAccept}>
            Aceptar
          </Button>
          <Button variant="outlined" color="error" onClick={handleReject}>
            Rechazar
          </Button>
        </StyledCardActions>
        <Typography variant="body2" color="text.secondary">
          Estado: {status}
        </Typography>
      </StyledCard>
    </Content>
  );
}

export default CardPerson;
