import React, { useState } from 'react';
import { styled } from 'styled-components';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Cards.css';
import {  useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CreateRequest } from '../../../my_methods/dogs_methods';

function CardsPets(props) {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const navigate = useNavigate();

  const handleRequestDog = () => {
    try{
        if(!loadingRequest){
          setLoadingRequest(true)
          toast.promise(
            CreateRequest(props.id_pet, 3),
            {
              pending: 'Creando peticion de adopcion... 😮',
              success: 'Peticion creada 🥳 🎉🎉🎉',
              error: 'Ocurrio un Error... 🤯'
            }
          ).then(() =>{
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          })
  
        }
    }
    catch{
      console.log("error")
    } 
  };

  const handleDeleteRequest = () => {
    try{
        if(!loadingRequest){
          setLoadingRequest(true)
          toast.promise(
            CreateRequest(props.id_pet, 4),
            {
              pending: 'Creando peticion de adopcion... 😮',
              success: 'Peticion creada 🥳 🎉🎉🎉',
              error: 'Ocurrio un Error... 🤯'
            }
          ).then(() =>{
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          })
  
        }
    }
    catch{
      console.log("error")
    } 
  };

  return (
    <Content>
      <Card sx={{ width: 250, height: 350, borderRadius: 2 }}>
        <CardMedia
          sx={{ height: 150 }}
          image={props.foto}
          title={props.titulo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ borderBottom: 1 }}>
            {props.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.descripcion}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
        {props.canCancel && ( 
          <Button
            size="small"
            sx={{ backgroundColor: 'red', color: 'white', marginTop: '15px' }}
            onClick={() => handleDeleteRequest()}

            disabled={loadingRequest}
            >
            <a style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
              {loadingRequest ? 'Cancelando...' : 'Cancelar'}
            </a>
          </Button>
        )}
        {props.canAdopt && (
          <Button
            size="small"
            sx={{ backgroundColor: 'green', color: 'white', marginTop: '15px' }}
            onClick={() => handleRequestDog()}
            disabled={loadingRequest} 
            >
            <a style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
              {loadingRequest ? 'Adoptando...' : 'Adoptar?'}
            </a>
          </Button>
        )}
        </CardActions>

      </Card>
    </Content>
  );
}
export default CardsPets;
const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 15px;
  border-radius: 8px;
`;