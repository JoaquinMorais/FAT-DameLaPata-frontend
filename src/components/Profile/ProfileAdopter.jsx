import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from '../NavBar/NavBar';
import ConfirmDialog from '../CloseAccount/ConfirmDialog';
import SuccessDialog from '../CloseAccount/SuccessDialog';
import { GetProfile } from '../../my_methods/session_methods';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TextField from '@mui/material/TextField';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const BackgroundImage = styled.div`
  background-color: #303030;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 80px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 40px;
    min-height: 120vh;
  }
`;

const UserProfileAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    margin-top: 25px;
  }
`;

const UserProfileAvatar = styled(Avatar)`
  width: 240px !important;
  height: 240px !important;
  margin-left: 25px;
`;

const StyledHr = styled.hr`
  width: 100%;
  border: none;
  height: 2px;
  background-color: #007bff;
  margin: 20px 0;
`;

function AdopterProfile() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      // Hacer una solicitud POST al servidor Flask para cerrar la cuenta
      await axios.post(`/closeaccount/1`);
      setIsAccountDeleted(true);
      closeConfirmation();
    } catch (error) {
      console.error(error);
    }
  };

  const closeSuccessDialog = () => {
    setIsAccountDeleted(false);
  };

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

  const [user, setUser] = useState({
    name: '',
    username: '',
    surname: '',
    email: '',
    city: '',
    province: '',
    district: '',
    birthdate: '',
    phone_number: '',
    Type_document: '',
    Edad: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetProfile();
        if (response.data['status'] !== 200) {
          window.location.href = "/login";
        }

        setUser({
          name: response.data.response['name'],
          username: response.data.response['username'],
          surname: response.data.response['surname'],
          email: response.data.response['email'],
          location: response.data.response.address['district'],
          street: response.data.response.address['street'],
          district: response.data.response.address['location'],
          birthdate: response.data.response['birth_date'],
          phone_number: response.data.response['phone_number'],
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <BackgroundImage>
        <CenteredContainer maxWidth="lg">
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
              Bienvenido <strong>{user.name}</strong>
            </Typography>

            <UserProfileAvatarContainer>
              <UserProfileAvatar
                alt="User Profile"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              />
            </UserProfileAvatarContainer>

            {isConfirmationOpen && !isAccountDeleted && (
              <ConfirmDialog
                isOpen={isConfirmationOpen}
                onClose={closeConfirmation}
                onConfirm={handleDeleteAccount}
              />
            )}
            {isAccountDeleted && (
              <SuccessDialog isOpen={isAccountDeleted} onClose={closeSuccessDialog} />
            )}
          </Grid>
          <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StyledHr />
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
                    label="Numero de documento"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CorporateFareIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.Type_document}
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
                    label="Provincia/Ciudad"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={user.province}
                    disabled={!isEditing}
                    sx={inputStyles}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <StyledHr />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant="standard">
                  <TextField
                    id="input-phonenumber"
                    label="Numero de telefono"
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

            <div style={{ marginTop: '40px' }}>
              {isEditing ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Editar perfil
                </Button>
              )}
            </div>
          </Grid>
        </CenteredContainer>
      </BackgroundImage>
    </>
  );
}

export default AdopterProfile;
