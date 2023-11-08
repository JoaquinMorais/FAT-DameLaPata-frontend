import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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

function AdopterProfile() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    const timeDiff = currentDate - birthDate;
    const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  }

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const closeSuccessDialog = () => {
    setIsAccountDeleted(false);
  };

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

  return (
    <BackgroundImage>
      <NavBar />
      <CenteredContainer maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <strong>"Bienvenido {user.name}"</strong>
        </Typography> 

        <StyledHr />

        <Grid container spacing={2}>
          {/* Columna izquierda (foto de perfil y botón) */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UserProfileAvatarContainer>
              <UserProfileAvatar
                alt="User Profile"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              />
            </UserProfileAvatarContainer>
            <Button
              variant="contained"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? 'Guardar' : 'Editar perfil'}
            </Button>
          </Grid>

          {/* Columna derecha (datos del usuario) */}
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
              <Grid container spacing={2}>
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
