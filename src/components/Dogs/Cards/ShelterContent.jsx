import React, {useState, useEffect} from 'react'
import { styled } from 'styled-components'
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import { useParams } from 'react-router';

function ShelterContent() {
    const { id } = useParams();
    const [responseData, setResponseData] = useState(null); 


    useEffect(() => {
        async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:5000/shelter/${id}`);
            setResponseData(response.data);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }
        }

        fetchData();
    }, []);

  /* ------------------------------------ */

    const [selectedColors, setSelectedColors] = useState([]);
    const [responseDataColors, setresponseDataColors] = useState(null);

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/shelter'); 
        setresponseDataColors(response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }

    fetchData(); 
    }, []);

  /* ------------------------------------ */

  const ifGuion = (mylist,element) => {
    if(mylist[mylist.length - 1] === element){
      return ''
    }
    return ' - '
  }



  const estado = {
  id_pet: parseInt(id),
  id_status: 4,
  }
  console.log(estado);


  return (
    <Container>
            <Fade>
              <Div1>
                <Titulo2>Nombre</Titulo2>
                <Caracteristicas>{`${responseData?.response.username}`}</Caracteristicas>
              </Div1>
            </Fade>
              
            <Fade>
              <Div2>
                <Titulo2>Ubicacion</Titulo2>
                <Caracteristicas>Provincia: </Caracteristicas>
                <Caracteristicas>Ciudad: </Caracteristicas>
                <Caracteristicas>Barrio: </Caracteristicas>
                <Caracteristicas>Calle: </Caracteristicas>
              </Div2>
            </Fade>
            <Fade>
              <Div3>
                <Titulo2>Contacto</Titulo2>
                <Caracteristicas>telefono: </Caracteristicas>
                <Caracteristicas>Gmail: </Caracteristicas>
              </Div3>
            </Fade>




            <Fade>
              <Div3>
                <Titulo2>‎ </Titulo2>
                <Caracteristicas>‎ </Caracteristicas>
              </Div3>
            </Fade>


            <Fade>
              <Div3>
                <Titulo2>‎ </Titulo2>
                <Caracteristicas>‎ </Caracteristicas>
              </Div3>
            </Fade>

   
    </Container>
  )
}

export default ShelterContent

const Container = styled.div`
    width: 100%;
    text-align: left;
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Titulo2 = styled.h2`
    color: black;
    text-transform: uppercase;
    font-style: italic;
    padding: 20px 15px 0 15px;
    margin-bottom: 10px;
`;

const Caracteristicas = styled.p`
    font-size: 18px;
    color: black;
    padding: 0px 15px 20px 15px;
    word-wrap: break-word;
`;

const Div1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Div2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Div3 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

