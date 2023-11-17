import React, { useEffect, useState } from 'react'; 
import { styled } from 'styled-components';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import NavBar from '../components/NavBar/NavBar';
import CardPerson from '../components/Mismascotas/CardPersona';
import { GetRequestsEach } from '../my_methods/dogs_methods';
import { useParams } from 'react-router-dom';

const Solicitud = () => {
  const { id_pet } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [responseStatus, setResponseStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await GetRequestsEach(id_pet).then(checking => {
          setResponseData(checking.data);
          setResponseStatus(checking.response_status);
          setResponseMessage(checking.response_message);
          console.log(checking.data)
          console.log(checking.response_message)

        });
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }
    fetchData(); 
  }, []);  

  
  while(!responseData || responseStatus !== 'success' ){
    console.log(responseData)
    return (
      <Principio>
        <Lamina>
          <Flip top>
            <p>ID de pet: {id_pet}</p>

            <Titulo style={{color:'red'}}>HUBO UN ERROR EN EL PROCESAMIENTO</Titulo>
          </Flip>
        </Lamina>
      </Principio>
    );}
    return (
      <>
        <NavBar />
        <Principio>
          <Lamina>
            <Flip top>
              <p>ID de pet: {id_pet}</p>
              <Titulo>GENTE QUE QUIERE EL PERRO</Titulo>
            </Flip>
            <Hr />


          </Lamina>
        </Principio>
  
        <Grid>
        <Zoom>
          {responseData.map((petData) => (
            <Container key={petData.id_pet}>
              <CardPerson
                full_name={petData.pet.name}
                district={petData.pet.name} // ¿Aquí querías pasar algo diferente?
                telefono={petData.pet.name} // ¿Y aquí?
              />
            </Container>
          ))}
        </Zoom>
        </Grid>

      </>
    );
  }

export default Solicitud

const Principio = styled.div`
  width: 100%;
  min-height: 40vh;
  background-position: top center;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Grid = styled.div`
  width: 50%;
  margin: 0 auto 150px auto;
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    width: 100%;

  }
`;

const Container = styled.div`
  width: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(0.97);
  }
`;
