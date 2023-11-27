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
  margin: '20px',
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

const ShelterProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editIcon, setEditIcon] = useState(<EditIcon />); 
  const [shelter, setShelter] = useState({
    name: '',
    username: '',
    email: '',
    location: '',
    street: '',
    district: '',
    phone_number: '',
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);

    // Cambiar el icono según el estado de edición
    if (isEditing) {
      setEditIcon(<EditIcon />);
    } else {
      // Puedes cambiar este icono por el que desees cuando se guarde la edición
      setEditIcon(<SaveIcon />);
    }
  };

  const fetchData = async () => {
    try {
      const response = await GetProfile();

      if (response.data.status !== 200) {
        window.location.href = '/login';
      }
      if (response.data.response.type !== 'shelter') {
        window.location.href = '/profile';
      }

      setShelter({
        name: response.data.response.name,
        username: response.data.response.username,
        email: response.data.response.email,
        location: response.data.response.address.district,
        street: response.data.response.address.street,
        district: response.data.response.address.location,
        phone_number: response.data.response.phone_number,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <Typography variant="h3" sx={{ textAlign: 'center', margin: '20px' }}>
            <strong>Bienvenido {shelter.name}</strong>
          </Typography>
          <StyledHr />

          <Grid container spacing={2} justifyContent="center">
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

            <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                DATOS DE USUARIO
              </Typography>
              <StyledHr />

              <Grid container spacing={2}>
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
                      value={shelter.username}
                      disabled={!isEditing}
                      onChange={(e) => {
                        setShelter({ ...shelter, username: e.target.value });
                      }}
                      sx={inputStyles}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormControl variant="standard">
                    <TextField
                      id="input-org"
                      label="Nombre de la organización"
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CorporateFareIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={shelter.name}
                      disabled={!isEditing}
                      onChange={(e) => {
                        setShelter({ ...shelter, name: e.target.value });
                      }}
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
                      value={shelter.district}
                      disabled={!isEditing}
                      onChange={(e) => {
                        setShelter({ ...shelter, name: e.target.value });
                      }}
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
                      value={shelter.district}
                      disabled={!isEditing}
                      onChange={(e) => {
                        setShelter({ ...shelter, name: e.target.value });
                      }}
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
                      value={shelter.street}
                      disabled={!isEditing}
                      onChange={(e) => {
                        setShelter({ ...shelter, name: e.target.value });
                      }}
                      sx={inputStyles}
                    />
                  </FormControl>
                </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl variant="standard">
                      <TextField
                        id="input-phonenumber"
                        label="Número de teléfono"
                        type="number"
                        variant="standard"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocalPhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={shelter.phone_number}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setShelter({ ...shelter, phone_number: e.target.value });
                        }}
                        sx={inputStyles}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl variant="standard">
                      <TextField
                        id="input-email"
                        label="Correo electrónico"
                        variant="standard"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={shelter.email}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setShelter({ ...shelter, name: e.target.value });
                        }}
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
      <Footer />
    </BackgroundImage>
  );
};

export default ShelterProfile;
