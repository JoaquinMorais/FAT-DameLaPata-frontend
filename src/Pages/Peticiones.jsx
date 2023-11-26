import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import NavBar from '../components/NavBar/NavBar';
import CardsPets from '../components/Dogs/Cards/CardsPets';
import { getUserDogs } from '../my_methods/salo_methods';
import Footer from '../components/Footer/Footer';

const Peticiones = () => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
          console.log("begin")
          const response = await getUserDogs();
          setResponseData(response.data.response);
          setIsLoading(false)
        } catch (error) {
          console.error('Error al realizar la solicitud:', error.message);
      }
      }
      
      fetchData();
    
  }, []);
  

  const filterByState = (stateId) => {
    return responseData.filter((item) => item.id_state === stateId);
  };

  return (
    <>
      <NavBar />

      <Section>
        <Container>
          <Flip top>
            <Title>SOLICITADOS</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      {isLoading ? (
        "a, no"
      ):(
        <Grid>
        {filterByState(3).map((item) => (
          <CardContainer key={item.pet.id_pet}>
            <Zoom>
              <CardsPets
                id_pet={item.pet.id_pet}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
                canCancel={true}
              />
            </Zoom>
          </CardContainer>
        ))}
      </Grid>
      )}
      <Section>
        <Container>
          <Flip top>
            <Title>CON ¡MATCH!</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      {isLoading ? (
        "a"
      ):(
        <Grid>
        {filterByState(2).map((item) => (
          <CardContainer key={item.pet.id_pet}>
            <Zoom>
              <CardsPets
                id_pet={item.pet.id_pet}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
              />
            </Zoom>
          </CardContainer>
        ))}
      </Grid>
      )}

      <Section>
        <Container>
          <Flip top>
            <Title>Rechazados</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      {isLoading ? (
        "a"
      ):(
        <Grid>
        {filterByState(4).map((item) => (
          <CardContainer key={item.pet.id_pet}>
            <Zoom>
              <CardsPets
                id_pet={item.pet.id_pet}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
              />
            </Zoom>
          </CardContainer>
        ))}
      </Grid>
      )}
      <Footer/>
    </>
  );
};

export default Peticiones;

const Section = styled.div`
  width: 100%;
  height: 40vh;
  background-position: top center;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin: 7.5px auto;
  text-align: center;
  @media (max-width: 360px) {
    font-size: 30px;
  }
`;
const Hr = styled.hr`
  width: 75%;
  border-top: 3px solid black;
`;
const Grid = styled.div`
  width: 80%;
  margin: -50px auto 150px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;
const CardContainer = styled.div`
  width: 100%;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(0.97);
  }
`;
