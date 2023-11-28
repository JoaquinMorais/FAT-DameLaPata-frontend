import React from 'react';
import { styled } from 'styled-components';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Cards.css';

function Cards(props) {
  const handleFavoriteClick = () => {
    props.onFavoriteToggle(props.id_pet);
  };

  return (
    <Content href={`/pet/details/${props.id_pet}`}>
      <Card sx={{ width: 250, height: 350, borderRadius: 2 }} >
        <CardMedia sx={{ height: 150 }} image={props.foto} title={props.titulo$}   />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ borderBottom: 1 }}>
            {props.nombre}    ({props.edad}) 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.descripcion}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
      <Button size="small" href={`/pet/details/${props.id_pet}`} sx={{width: '60%', textAlign: 'center',fontSize: '15px', background: '#a86932', margin: 'auto'}} variant="contained">
        <a href={`/pet/details/${props.id_pet}`} style={{ color: 'white', fontWeight: 'bold' }}>Ver más</a>
      </Button>
    </CardActions>
      </Card>
    </Content>
  );
}

export default Cards;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 15px;
  border-radius: 8px;
`;