import React, { useEffect, useState } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from 'styled-components'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
/* ANIMACIONES */
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CustomizedTabs from './CustomizedTabs';



const Details = () => {
    const { id } = useParams();
    const [responseData, setResponseData] = useState(null); 
    const [imagenDesplazada, setImagenDesplazada] = useState(false);


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

    const [responseDataColors, setresponseDataColors] = useState(null); 

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

  // Obtener lista de IDs disponibles (excluyendo el ID actual)
  useEffect(() => {
    async function fetchAvailablePetIds() {
      try {
        const response = await axios.get('http://localhost:5000/adopter/match');
        const availableIds = response.data.filter((id_pet) => id_pet !== id);
        setAvailablePetIds(availableIds);
      } catch (error) {
        console.error('Error al obtener los IDs disponibles:', error.message);
      }
    }
    fetchAvailablePetIds();
  }, [id]);

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

const navigate = useNavigate();


/* ------------------------------------ */

const estado = {
  id_pet: parseInt(id),
  id_status: 4,
}
console.log(estado);

const handlePerroNoClick = async () => {
  setImagenDesplazada(true);
  try{
    const response = axios.put('http://localhost:5000/adopter/match', estado);
  }
  catch{
    alert("no");
  }
}


/* ------------------------------------ */

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setImagenDesplazada(false);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

/* ------------------------------------ */

  return (
    <>
        {
        <SwiperSlide key={responseData?.response.id_pet}>
          <Carta>
          <ImagenContainer>
              <Imagen src={`${responseData?.response.image_path}`} alt="" imagenDesplazada={imagenDesplazada} />          
                <Abajo>
                  <Texto>
                      <Flip top>
                        <Titulo>
                          <span style={{fontWeight:'bold'}}>{`${responseData?.response.name}`}</span> - {calcularEdad()}
                          </Titulo>
                      </Flip>
                    </Texto>
                  <Botones>
                  <Zoom>
                    <No>
                      <PerroNo
                        src={'https://cdn-icons-png.flaticon.com/256/9804/9804047.png'}
                        onClick={handlePerroNoClick}
                        
                      ></PerroNo>
                    </No>
                  </Zoom>
                  <Zoom>
                    <Si>
                      <PerroSi
                        src={'https://cdn-icons-png.flaticon.com/256/9804/9804062.png'}
                        // onClick={handlePerroSiClick}
                        onClick={handleClickOpen}
                      ></PerroSi>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"FELICIDADES"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Tu peticion ha sido enviada con exito 
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Continuar</Button>
                        </DialogActions>
                      </Dialog>
                    </Si>
                  </Zoom>
                </Botones>
              </Abajo>
              </ImagenContainer>
              <CustomizedTabs/>
          </Carta>
        </SwiperSlide>
        }
    </>
  )
}

export default Details

const Carta = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 30px;
    @media (max-width: 900px) {
        flex-direction: column;
        padding: 0px;
        width:100%;
    }
`;

const Imagen = styled.img`
  width: 500px;
  height: 85%;
  object-fit: cover;
  margin-left: 100px;
  border-radius: 30px;
  margin-top: 70px;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 900px) {
    height: 100vh;
    width: 100%;
    border-radius: 0;
    margin:0px;
    overflow-x:hidden;
  }
`;

const ImagenContainer = styled.div`
    position: relative;
    display: flex;
    justify-content:center;
    align-items:center;

`;



const Abajo = styled.div`
  position: absolute;
  bottom: 3.5%;
  width: 83%;
  height: 350px; 
  display: flex;
  flex-direction: column;
  padding-bottom: 5%;
  margin-left: 100px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.01));
  border-radius: 0 0 30px 30px;

  @media (max-width: 900px) {
    bottom: 0%;
    width: 100%;
    margin:0;
    border-radius: 0;
  }
`;


const Texto = styled.div`   
    position:relative;
    text-align:left;
    left:20px;
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Titulo = styled.h1`
    color: white;
    text-transform: uppercase;
    font-style: italic;
`;


const Botones = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const No = styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid red;
    background: inherit;
    margin: 0 45px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      background-color: red;
`;

const Si = styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid green;
    background: inherit;
    margin: 0 45px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      background-color: green;
`;

const PerroNo = styled.img`
    width: 100%;
    height: 100%;
    padding: 5px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.4) rotate(-10deg);
`;

const PerroSi = styled.img`
    width: 100%;
    height: 100%;
    padding: 5px;
    transition: transform 0.3s ease;  

    &:hover {
      transform: scale(1.4) rotate(-10deg);
`;
