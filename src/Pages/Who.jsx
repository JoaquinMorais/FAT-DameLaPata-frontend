import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardTeam from '../components/Who/CardTeam';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

function Who() {
  return (
    <>
      <NavBar />

      <Wrap>
      <Container>
        <Zoom top>
          <TitleContainer>
            <StyledTitle variant="h3">¿Quienes somos?</StyledTitle>
          </TitleContainer>
        </Zoom>
        <Fade bottom>
              <StyledText>
                Somos un grupo comprometido de estudiantes y amantes de los animales del Instituto Tecnico Salesiano Villada. Nuestro propósito es brindarles una oportunidad de encontrar un hogar responsable. Creemos firmemente que cada perro merece una segunda oportunidad y el cariño incondicional de una familia. Por ello, hemos creado esta plataforma para conectar a perros rescatados con personas que estén dispuestas a darles un hogar lleno de amor.
              </StyledText>
        </Fade>

        <StyledTitle variant="h3">Un poco de nuestra historia</StyledTitle>

            <StyledText>
              Todo comenzó a principios de este año, donde teníamos que realizar una página sin fines de lucro. Después de una lluvia de ideas, nos decidimos por hacer un proyecto que ayude y facilite la adopción de perros. Así nació: Dame La Pata
            </StyledText>
            <StyledText>
              La idea surgió al ver la triste realidad de muchos perros abandonados y maltratados en nuestra comunidad. Queríamos marcar una diferencia y contribuir a mejorar sus vidas. Así que nos pusimos manos a la obra y creamos "Dame La Pata", un espacio en línea donde los refugios y protectoras de animales pueden publicar perfiles de los perros disponibles para adopción, y las personas interesadas en adoptar pueden buscar y filtrar perros según sus preferencias y ubicación.
            </StyledText>
      </Container>
      </Wrap>
      <CardTeam />
      <Footer />
    </>
  );
}

export default Who;

// Estilos
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(https://img.freepik.com/free-vector/adopt-pet-with-man-dogs_23-2148519498.jpg?w=740&t=st=1701043977~exp=1701044577~hmac=3871a32c6f592610a463ae6cc0265703987646d4dadbee495c16fb02aefc4389);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledTitle = styled.text`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #333;
  font-size: 2rem;
  text-align: center;
`;

const StyledText = styled.text`
  font-family: 'Raleway', sans-serif;
  color: #555;
  font-size: 20px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin-top: 70px;
  width: 60%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.8); /* Color de fondo con opacidad */
  border: 1px solid #92b8c2; /* Borde sombreado */
  border-radius: 15px; /* Borde redondeado */
  padding: 20px;
  margin-bottom: 20px;
  z-index: 9997; 
`;

const TitleContainer = styled.div`
  margin-top: 5px; /* Agregar margen superior en pantallas pequeñas */
`;

