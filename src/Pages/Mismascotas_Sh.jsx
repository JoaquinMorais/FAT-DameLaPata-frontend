import React, { useEffect, useState } from 'react'; 
import { styled } from 'styled-components';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import NavBar from '../components/NavBar/NavBar';
import axios from 'axios';
import CardPets from '../components/Mismascotas/CardComponent';
import { GetPets } from '../my_methods/dogs_methods';
import { Grid } from '@mui/material';

function Mismascotas_Sh() {
  const [responseData, setResponseData] = useState(null);
  const [responseStatus, setResponseStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await GetPets().then(checking => {
          setResponseData(checking.data);
          setResponseStatus(checking.response_status);
          setResponseMessage(checking.response_message);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }

    fetchData();
  }, []);

  if (responseData && responseData.length > 0) {
    return (
      <>
        <NavBar />
        <Principio>
          <Lamina>
            <Flip top>
              <Titulo>MIS ANIMALITOS</Titulo>
            </Flip>
            <Hr />
          </Lamina>
        </Principio>
        <Grid container spacing={2}>
          {responseData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <CardPets
                imageUrl={`${item.image_path}`}
                title={`${item.name}`}
                descr={`${item.name} nació el ${item.birth_date}.`}
              />
            </Grid>
          ))}
        </Grid>
        <Lamina>
          <Flip top>
            <Titulo>MATCHEADO</Titulo>
          </Flip>
          <Hr />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <CardPets
                title='EEOOOOOOOOOOOOOOO'
                imageUrl='https://hips.hearstapps.com/hmg-prod/images/gettyimages-695480884-64f8446a4e85d.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*'
                descr='AGUANTE EL S23 GRANDE SAMSUNG'
              />
            </Grid>
          </Grid>
        </Lamina>
      </>
    );
  } else {
    return (<h1>Error 404</h1>);
  }
}

export default Mismascotas_Sh;


const Principio = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;
`;



const Lamina = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Titulo = styled.h1`
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin: 7.5px auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Hr = styled.hr`
  width: 75%;
  border-top: 3px solid black;
`;
