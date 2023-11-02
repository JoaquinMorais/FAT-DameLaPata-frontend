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
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    getUserDogs()
      .then((response) => {
        setResponseData(response.data.response);
        setIsLoading(false);
  
        // Filtra perros favoritos y actualiza el estado
        const favoriteDogs = filterByState(8); // 8 es el estado para favoritos
        setFavoritePets(favoriteDogs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const filterByState = (stateId) => {
    if (responseData && responseData.response && Array.isArray(responseData.response)) {
      return responseData.response.filter((item) => item.id_state === 8);
    } else {
      return [];
    }
  };

  // if (responseData?.status === 200)
  console.log(responseData);

  return (
    <>
      <NavBar />
      <Section>
        <Container>
          <Flip top>
            <Title>CON ¡MATCH!</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      <Grid>
        {filterByState(2).map((item) => (
          <CardContainer key={item.pet.id_pet}>
            <Zoom>
              <CardsPets
                id_pet={`${item.id_pet}`}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
              />
            </Zoom>
          </CardContainer>
        ))}
      </Grid>

      <Section>
        <Container>
          <Flip top>
            <Title>SOLICITADOS</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      <Grid>
        {filterByState(3).map((item) => (
          <CardContainer key={item.pet.id_pet}>
            <Zoom>
              <CardsPets
                id_pet={`${item.id_pet}`}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
              />
            </Zoom>
          </CardContainer>
        ))}
      </Grid>

      <Section>
        <Container>
          <Flip top>
            <Title>ADOPTADOS</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      <Grid>
        {filterByState(1).map((item) => (
          <CardContainer key={item.id}>
            <Zoom>
              <CardsPets
                id_pet={`${item.id_pet}`}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
              />
            </Zoom>
          </CardContainer>
        ))}


      </Grid>
      <Section>
        <Container>
          <Flip top>
            <Title>FAVORITOS</Title>
          </Flip>
          <Hr />
        </Container>
      </Section>
      <Grid>
        {favoritePets.map((item) => (
          <CardContainer key={item.pet.id_pet}>
            <Zoom>
              <CardsPets
                id_pet={`${item.id_pet}`}
                foto={`${item.pet.image_path}`}
                nombre={`${item.pet.name}`}
                titulo={`${item.pet.name} es un perro muy feliz :D`}
                descripcion={`${item.pet.name} nació el ${item.pet.birth_date}.`}
              />
            </Zoom>
          </CardContainer>
        ))}
      </Grid>

      <Footer/>
    </>
  );
  // } else {
  //   return (
  //     <>
  //       <NavBar />
  //       <Principio>
  //         <Lamina>
  //           <Flip top>
  //             <Titulo>MIS MASCOTAS</Titulo>
  //           </Flip>
  //           <Hr />
  //         </Lamina>
  //       </Principio>
  //       <Grid style={{ textAlign: 'center' }}>
  //         No hay perros que cumplan tus requisitos
  //       </Grid>
  //     </>
  //   );
  // }
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
