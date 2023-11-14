import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';


function PetContent() {
    const { id } = useParams();
    const [responseData, setResponseData] = useState(null); // Agrega el estado para la respuesta de axios


    useEffect(() => {
        async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:5000/pet/${id}`);
            setResponseData(response.data);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }
        }
        
        fetchData();
    }, []);

  /* ------------------------------------ */

    const [selectedColors, setSelectedColors] = useState([]);
    const [responseDataColors, setresponseDataColors] = useState(null); // Agrega el estado para la respuesta de axios

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/pets/info/colors'); 
        setresponseDataColors(response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }
    
    fetchData(); // Llama a la función fetchData para obtener los datos
    }, []);

  /* ------------------------------------ */

  const ifGuion = (mylist,element) => {
    if(mylist[mylist.length - 1] === element){
      return ''
    }
    return ' - '
  }

  /* ------------------------------------ */

  const [availablePetIds, setAvailablePetIds] = useState([]);

  /* ------------------------------------ */

  const calcularEdad = () => {
    if (responseData?.response.birth_date) {
        const fechaNacimiento = new Date(responseData?.response.birth_date);
        const fechaHoy = new Date();
        const diferenciaMilisegundos = fechaHoy - fechaNacimiento;
        const edadPerro = Math.floor(diferenciaMilisegundos / (365.25 * 24 * 60 * 60 * 1000));
        return `${edadPerro} años`;
    }
    return '';
};

/* ------------------------------------ */


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
                <Caracteristicas>Mi nombre es <span style={{color:'red'}}>{`${responseData?.response.name}`}</span></Caracteristicas>
              </Div1>
            </Fade>
              
            <Fade>
              <Div2>
                <Titulo2>Nacimiento</Titulo2>
                <Caracteristicas>Nacii el <span style={{color:'red'}}>{`${responseData?.response.birth_date}`}</span>, osea que tengo <span style={{color:'red'}}>{calcularEdad()}</span></Caracteristicas>
              </Div2>
            </Fade>

            <Fade>
              <Div3>
                <Titulo2>Tamaño y peso</Titulo2>
                <Caracteristicas>Tengo un tamaño <span style={{color:'red'}}>{`${responseData?.response.size}`} </span>y peso <span style={{color:'red'}}> {`${responseData?.response.weight}`}kg</span></Caracteristicas>
              </Div3>
            </Fade>
            
            <Fade>
              <Div4>
                <Titulo2>Color/es</Titulo2>
                <Caracteristicas>
                  Mi color/es: 
                  <span style={{color:'red'}}> {responseData?.response.colors.map(color => (
                  <span key={color.id_color}>{color.title} {ifGuion(responseData?.response.colors,color)}</span>

                  ))}
                  </span>
                </Caracteristicas>
              </Div4>
            </Fade>

            <Fade>
              <Div5>
                <Titulo2>Caracteristica/s</Titulo2>
                <Caracteristicas>
                  Algunas de mis caracteristicas son:
                  {responseData?.response.characteristics.map(carac => (
                    <span key={carac.id_category}> <span style={{color:'red'}}>{carac.title} {ifGuion(responseData?.response.characteristics,carac)} </span></span>
                  ))}
                </Caracteristicas>
              </Div5>
            </Fade>
              
            <Fade>
              <Div6>
                <Titulo2>Vacunas</Titulo2>
                <Caracteristicas><span style={{color:'green'}}>Consultar</span></Caracteristicas>
              </Div6>
            </Fade>        
    </Container>
  )
}

export default PetContent

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

const Div4 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Div5 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Div6 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
