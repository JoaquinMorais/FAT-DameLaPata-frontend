import React, { useEffect, useState } from 'react'; 
import { styled } from 'styled-components';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import NavBar from '../components/NavBar/NavBar';
import CardPerson from '../components/Mismascotas/CardPersona';
import { GetRequestsEach } from '../my_methods/dogs_methods';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const Solicitud = () => {
  const { id_pet } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [responseStatus, setResponseStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await GetRequestsEach(id_pet).then(checking => {
          setResponseData(checking.data);
          setResponseStatus(checking.response_status);
          setResponseMessage(checking.response_message);
          setIsLoading(false);
        });
      }
      catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }
    fetchData(); 
  }, []);  

  
    return (
      <>
      <NavBar />
      <Principio>
        <Lamina>
        <Flip top>
              <Titulo>ESTAS PERSONAS BUSCAN ESTA MASCOTITA</Titulo>
            </Flip>
          <Contenedor >
          <Flip top>
          {!isLoading ? (
            responseData.map((item) =>
            item.requests.map((request) => (
            <CardPerson 
              key={request.adopter.id}
              full_name={`${request.adopter.name} ${request.adopter.surname}`}
              telefono={request.adopter.phone_number}
              district={request.adopter.id_address}
            />
          ))
        )
      ) : (
        <p>Loading...</p>
      )}
          </Flip>

          </Contenedor>
        </Lamina>
      </Principio>
      <Footer />
    </>

    );}

export default Solicitud

const Principio = styled.div`
  width: 100%;
  min-height: 100vh;
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

const Contenedor = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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