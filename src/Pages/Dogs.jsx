import React, { useEffect, useState } from 'react';
import Cards from '../components/Dogs/Cards/Cards';
import { styled } from 'styled-components';
import Phrase from '../components/Dogs/Phrase/Phrase';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import NavBar from '../components/NavBar/NavBar';
import Filters from '../components/Dogs/Filters/Filters';
import { GetPets, ChangePetStatusToAdopted } from '../my_methods/dogs_methods';

const Dogs = () => {
  // Estados para manejar los datos
  const [responseData, setResponseData] = useState([]);
  const [responseStatus, setResponseStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favoritePets, setFavoritePets] = useState([]);
  const [updatedPets, setUpdatedPets] = useState([]);

  // Función para cargar los datos de las mascotas
  async function fetchData() {
    try {
      await GetPets().then((checking) => {
        setResponseData(checking.data);
        setResponseStatus(checking.response_status);
        setResponseMessage(checking.response_message);
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  }

  // Efecto que se ejecuta cuando se carga el componente
  useEffect(() => {
    // Verificar el tipo de usuario
    if (localStorage.getItem('type') !== 'adopter') {
      window.location.href = '/profile';
    }

    fetchData(); // Llama a la función fetchData para obtener los datos
  }, []);

  // Función para agregar o quitar una mascota a favoritos
  const toggleFavorite = (id_pet) => {
    if (favoritePets.includes(id_pet)) {
      setFavoritePets(favoritePets.filter((id) => id !== id_pet));
    } else {
      setFavoritePets([...favoritePets, id_pet]);
    }
  
    // Cambiar el estado de la mascota al número 8 (o el estado deseado)
    ChangePetStatusToAdopted(id_pet)
      .then((response) => {
        // Manejar la respuesta, mostrar un mensaje de éxito o error si es necesario
        console.log(response.response_message);
      })
      .catch((error) => {
        // Manejar errores si los hay
        console.error('Error al cambiar el estado de la mascota:', error);
      });
  };  

  // Renderiza un spinner mientras se cargan los datos
  if (isLoading) {
    return (
      <>
        <NavBar />
        <Principio>
          <Lamina>
            <Flip top>
              <Titulo>DESCUBRÍ A TU MEJOR AMIGO</Titulo>
            </Flip>
            <Fade>
              <Subtitulo>
                <Phrase />
              </Subtitulo>
            </Fade>
          </Lamina>

          <Slide bottom>
            <Imagenes>
              <Imagen
                src="https://static.wixstatic.com/media/d33ee0_31664be5fc3541a8bb6405ff1f3e28c8~mv2.png/v1/fill/w_560,h_190,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/perritos%20asomados%202.png"
                alt=""
              />
            </Imagenes>
          </Slide>
        </Principio>
        <Grid style={{ textAlign: 'center' }}>
          No hay perros que cumplan tus requisitos
        </Grid>
      </>
    );
  }

  // Renderiza los datos de las mascotas una vez cargados
  return (
    <>
      <NavBar />
      <Principio>
        <Lamina>
          <Flip top>
            <Titulo>DESCUBRÍ A TU MEJOR AMIGO</Titulo>
          </Flip>
          <Fade>
            <Subtitulo>
              <Phrase />
            </Subtitulo>
          </Fade>
        </Lamina>

        <Slide bottom>
          <Imagenes>
            <Imagen
              src="https://static.wixstatic.com/media/d33ee0_31664be5fc3541a8bb6405ff1f3e28c8~mv2.png/v1/fill/w_560,h_190,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/perritos%20asomados%202.png"
              alt=""
            />
          </Imagenes>
        </Slide>

        <Slide bottom>
          <Filters>{/* Aquí puedes agregar los componentes de filtros */}</Filters>
        </Slide>
      </Principio>

      <Grid>
        {responseData?.map((item) => (
          <Container key={item.id}>
            <Zoom>
              <Cards
                id_pet={item.id_pet}
                foto={item.image_path}
                nombre={item.name}
                titulo={`${item.name} es un perro muy feliz :D`}
                descripcion={`${item.name} nació el ${item.birth_date}.`}
                onFavoriteToggle={() => toggleFavorite(item.id_pet)}
                isFavorite={favoritePets.includes(item.id_pet)}
              />
            </Zoom>
          </Container>
        ))}
      </Grid>
    </>
  );
};

export default Dogs;


const Principio = styled.div`
  background-image: url('https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/09/11124552/GettyImages-544673512.jpg');
  width: 100%;
  height: 100vh;
  background-position: top center;
`;

const Lamina = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, rgba(194, 55, 0, 0.75), rgba(0, 0, 0, 0.75));
`;

const Titulo = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 7.5px auto;
  text-align: center;
  @media(max-width: 360px){
    font-size: 30px;
  }
`;

const Subtitulo = styled.p`
  color: rgb(220,220,220);
  font-size: 20px;
  font-style: italic;
  margin: 7.5px auto;
  text-align: center;
  @media(max-width: 360px){
    font-size: 15px;
  }
`;

const Imagenes = styled.div`
  width: 100%;
  margin-top: -128px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(max-width: 425px){
    height: auto;
    width: 290px;
  }
`;

const Imagen = styled.img`
  @media(max-width: 570px){
    width: 500px;
    margin-top: 13px;
  }

  @media(max-width: 500px){
    width: 400px;
    margin-top: 36px;
  }

  @media(max-width: 400px){
    width: 300px;
    margin-top: 59px;
  }

  @media(max-width: 300px){
    width: 200px;
    margin-top: 82px;
  }
`;

const Grid = styled.div`
  width: 80%;
  margin: 150px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Container = styled.div`
  width: 100%;
  transition: transform 0.2s ease-in-out;
  &:hover{
    transform: scale(0.97)
  }
`;