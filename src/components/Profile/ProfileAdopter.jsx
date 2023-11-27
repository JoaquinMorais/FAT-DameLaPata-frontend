import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import MailIcon from '@mui/icons-material/Mail';
import ConfirmDialog from '../CloseAccount/ConfirmDialog';
import SuccessDialog from '../CloseAccount/SuccessDialog';
import { GetProfile } from '../../my_methods/session_methods';
import InputAdornment from '@mui/material/InputAdornment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FormControl from '@mui/material/FormControl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

// Styled component for the background
const BackgroundImage = styled('div')({
  backgroundColor: '#303030',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  width: '100%',
  minHeight: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
});

// Styled component for the centered container
const CenteredContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '80px',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  '@media (max-width: 768px)': {
    padding: '40px',
    minHeight: '120vh',
  },
});

// Styled component for the user profile avatar container
const UserProfileAvatarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: '25px',
  '@media (max-width: 768px)': {
    marginTop: '25px',
  },
});

// Styled component for the user profile avatar
const UserProfileAvatar = styled(Avatar)({
  width: '240px !important',
  height: '240px !important',
  marginLeft: '25px',
});

// Styled component for the horizontal rule
const StyledHr = styled('hr')({
  width: '100%',
  border: 'none',
  height: '2px',
  backgroundColor: '#007bff',
  margin: '25px 0',
});

function AdopterProfile() {
  // Estado para el diálogo de confirmación
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Estado para indicar si la cuenta ha sido eliminada con éxito
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  // Estado para el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado para el ícono de edición/guardar
  const [editIcon, setEditIcon] = useState(<EditIcon />);

  // Estado para almacenar la información del usuario
  const [user, setUser] = useState({
    name: '',
    username: '',
    surname: '',
    email: '',
    location: '',
    street: '',
    district: '',
    birthdate: '',
    phone_number: '',
    document: '',
    age: '',
  });

  // Función para calcular la edad a partir de la fecha de nacimiento
  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    const timeDiff = currentDate - birthDate;
    const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  }

  // Función para alternar entre el modo de edición
  const toggleEditing = () => {
    setIsEditing(!isEditing);

    // Cambiar el ícono según el estado de edición
    if (isEditing) {
      setEditIcon(<EditIcon />);
    } else {
      // Puedes cambiar este ícono por el que desees cuando se guarde la edición
      setEditIcon(<SaveIcon />);
    }
  };

  // Función para abrir el diálogo de confirmación
  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  // Función para cerrar el diálogo de confirmación
  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  // Función para cerrar el diálogo de éxito
  const closeSuccessDialog = () => {
    setIsAccountDeleted(false);
  };

  // Función para obtener y actualizar la información del usuario
  const fetchData = async () => {
    try {
      const response = await GetProfile();
      if (response.data.status !== 200) {
        window.location.href = '/login';
        return;
      }

      const birthdate = response.data.response.birth_date;
      setUser({
        name: response.data.response.name,
        username: response.data.response.username,
        surname: response.data.response.surname,
        email: response.data.response.email,
        location: response.data.response.address.location,
        street: response.data.response.address.street,
        district: response.data.response.address.district,
        birthdate: response.data.response.birth_date,
        phone_number: response.data.response.phone_number,
        document: response.data.response.document,
        age: calculateAge(birthdate),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Efecto para cargar la información del usuario al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Estilos comunes para los campos de entrada
  const inputStyles = {
    width: '100%',
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      fontSize: '16px',
      padding: '10px',
    },
  };

  const [selectedImage, setSelectedImage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <BackgroundImage>
      <NavBar />

      <CenteredContainer maxWidth="lg">
        {/* Encabezado de bienvenida */}
        <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <strong>Bienvenido {user.name}</strong>
        </Typography>

        {/* Separador horizontal estilizado */}
        <StyledHr />

        {/* Contenedor principal de la información del perfil */}
        <Grid container spacing={2} justifyContent="center">
          {/* Avatar del usuario */}
          <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UserProfileAvatarContainer
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <label htmlFor="fileInput">
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    filter: isHovered ? 'blur(2px)' : 'none', 
                    cursor: 'pointer'
                  }}
                >
                  <UserProfileAvatar
                    alt="User Profile"
                    src={selectedImage || "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"}
                  />
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e)}
              />
              {isHovered && (
                <div
                  style={{
                    
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '-20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: 'black',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                  }}
                >
                  Cambiar Imagen
                </div>
              )}
            </UserProfileAvatarContainer>
          </Grid>


          {/* Información del usuario */}
          <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              DATOS DE USUARIO
            </Typography>
            <StyledHr />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-name"
                    label="Nombre"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentIndIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.name}
                    disabled={!isEditing}
                    onChange={(e) => {
                      setUser({ ...user, name: e.target.value });
                    }}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-surname"
                    label="Apellido"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentIndIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.surname}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-age"
                    label="Edad"
                    type="number"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.age}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-username"
                    label="Nombre de usuario"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.username}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-org"
                    label="Documento"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CorporateFareIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.document}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-street"
                    label="Calle"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SignpostIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.street}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-location"
                    label="Provincia"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.district}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-location"
                    label="Ciudad"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.district}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormControl variant="standard">
                    <TextField
                      id="input-phonenumber"
                      label="Telefono"
                      type="number"
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={user.phone_number}
                      disabled={!isEditing}
                      sx={inputStyles}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormControl variant="standard">
                    <TextField
                      id="input-email"
                      label="Correo electronico"
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={user.email}
                      disabled
                      sx={inputStyles}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={24} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: '50%',
                      height: '100%',
                      marginRight: '20px', // Ajusta el margen derecho según sea necesario
                    }}
                    onClick={toggleEditing}
                  >
                    {editIcon} Editar Perfil
                  </Button>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CenteredContainer>
      <Footer/>
    </BackgroundImage>
  );
}

export default AdopterProfile;
