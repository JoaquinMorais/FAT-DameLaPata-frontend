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
  import Footer from '../components/Footer/Footer';
  import { CircularProgress } from '@mui/material';



  const Dogs = () => {
    // Estados para manejar los datos
    const [responseData, setResponseData] = useState([]);
    const [responseStatus, setResponseStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [favoritePets, setFavoritePets] = useState([]);
    const [updatedPets, setUpdatedPets] = useState([]);
    const [nameOrder, setNameOrder] = useState('asc');
    const [ageOrder, setAgeOrder] = useState('desc');
    const [sizeOrder, setSizeOrder] = useState('asc');
    const [filteredData, setFilteredData] = useState([]);

    // Estado para almacenar los filtros seleccionados
    const [activeFilters, setActiveFilters] = useState({
      name: false,
      age: false,
      size: false,
      // Agrega más filtros según sea necesario
    });

    // Función para cargar los datos de las mascotas
    async function fetchData() {
      try {
        const checking = await GetPets();
        setResponseData(checking.data);
        setResponseStatus(checking.response_status);
        setResponseMessage(checking.response_message);
        setIsLoading(false);

        // Aplicar filtros después de cargar los datos inicialmente
        applyFilters();
      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }

    // Función para cambiar el orden de los filtros
    const toggleOrder = (filter) => {
      switch (filter) {
        case 'name':
          setNameOrder(nameOrder === 'asc' ? 'desc' : 'asc');
          break;
        case 'age':
          setAgeOrder(ageOrder === 'asc' ? 'desc' : 'asc');
          break;
        case 'size':
          setSizeOrder(sizeOrder === 'asc' ? 'desc' : 'asc');
          break;
        // Agrega más casos según sea necesario
        default:
          break;
      }
    };

    // Función para aplicar los filtros seleccionados
    const applyFilters = () => {
      let newData = responseData.slice(); // Copia del array original

      // Aplicar filtros en el orden deseado
      if (activeFilters.name) {
        newData = newData.sort(sortByName);
      }
      if (activeFilters.age) {
        newData = newData.sort(sortByAge);
      }
      // Agregar más filtros según sea necesario

      // Actualizar el estado de los datos filtrados
      setFilteredData(newData);
    };


     // Efecto que se ejecuta cuando se carga el componente
    useEffect(() => {
      // Verificar el tipo de usuario
      if (localStorage.getItem('type') !== 'adopter') {
        window.location.href = '/profile';
      }

      fetchData(); // Llama a la función fetchData para obtener los datos
    }, [responseData]);

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

    // Función para cambiar el orden
    const toggleNameOrder = () => {
      setNameOrder(nameOrder === 'asc' ? 'desc' : 'asc');
    };

    // Función para ordenar las mascotas por nombre
    const sortByName = (a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return nameOrder === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return nameOrder === 'asc' ? 1 : -1;
      }
      return 0;
    };

    // Función para cambiar el orden de la edad
    const toggleAgeOrder = () => {
      setAgeOrder(ageOrder === 'asc' ? 'desc' : 'asc');
    };

    // Función para calcular la edad en años a partir de la fecha de nacimiento
    const calculateAge = (birthDate) => {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    };

    // Función para ordenar las mascotas por edad
    const sortByAge = (a, b) => {
      const ageA = calculateAge(a.birth_date);
      const ageB = calculateAge(b.birth_date);
      return ageOrder === 'asc' ? ageA - ageB : ageB - ageA;
    };

    // Renderiza un spinner mientras se cargan los datos
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
              <Filters 
                onToggleOrder={() => {
                  toggleOrder('name');
                  setActiveFilters({ ...activeFilters, name: true, age: false, size: false });
                }} 
                onAgeFilter={() => {
                  toggleOrder('age');
                  setActiveFilters({ ...activeFilters, name: false, age: true, size: false });
                }} 
                onSizeFilter={() => {
                  toggleOrder('size');
                  setActiveFilters({ ...activeFilters, name: false, age: false, size: true });
                }} 
                ageOrder={ageOrder} 
                applyFilters={applyFilters}  // Pasa la función applyFilters como prop
              />
            </Slide>
          </Principio>
          {isLoading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
      >
        <CircularProgress color="primary" />
        <CircularProgress color="primary" />
        <CircularProgress color="primary" />
        <CircularProgress color="primary" />
        <CircularProgress color="primary" />

      </Grid>
    ) : (
          <Grid>
            {(filteredData.length > 0 ? filteredData : responseData)?.map((item) => (
              <Container key={item.id}>
                <Zoom>
                  <Cards
                    id_pet={item.id_pet}
                    foto={item.image_path}
                    nombre={item.name}
                    edad = {calculateAge(item.birth_date)}
                    titulo={`${item.name} es un perro muy feliz :D`}
                    descripcion={`Esta es ${item.name} tiene ${calculateAge(item.birth_date)} años. Nació el ${item.birth_date}.`}
                    onFavoriteToggle={() => toggleFavorite(item.id_pet)}
                    isFavorite={favoritePets.includes(item.id_pet)}
                  />
                </Zoom>
              </Container>
            ))}
          </Grid>
          )}
        <Footer/>

        </>
      );
    }
    

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