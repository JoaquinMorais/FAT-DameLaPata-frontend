import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SendRegister } from '../../my_methods/session_methods';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';


import data from '../../provincias.json';

const validationSchema = Yup.object({
  username: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Dirección de correo electrónico no válida').required('Campo requerido'),
  password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Campo requerido'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Campo requerido'),
  name: Yup.string().required('Campo requerido'),
  province: Yup.string().required('Campo requerido'),
  city: Yup.string().required('Campo requerido'),
  district: Yup.string().required('Campo requerido'),
  phone_number: Yup.string().required('Campo requerido'),
});

const initialValues = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  name: '',
  province: '',
  city: '',
  district: '',
  phone_number: '',
};


function ShelterRegister() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialog_message , setDialogMessage] = useState('error inesperado');
  const [dialog_state , setDialogState] = useState('error');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  async function SendShelter(values) {
    var response = await SendRegister(values, 'shelter');
    console.log('i send shelter')
    try {
      if (response.status === 200){
        setIsDialogOpen(true)
        setDialogMessage('usuario creado')
        setDialogState('success')  

        window.location.href="/profile";
      }
      else{
        setIsDialogOpen(true)
        setDialogMessage('Ha ocurrido un error: ' + response['response'])
        setDialogState('error')  
      }

    } catch (error) {
      setIsDialogOpen(true)
      setDialogMessage('Ha ocurrido un error: error interno')
      setDialogState('error')

    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      SendShelter(values)
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const provincias = data.provincias;

  const provinceOptions = data.provincias.map((provincia) => ({
    value: provincia.id,
    label: provincia.nombre,
  }));


  return (
    <form onSubmit={formik.handleSubmit} >
      <CenteredContainer >
            {isDialogOpen && (
              <Alert severity={dialog_state}>{dialog_message}</Alert>
            )}
      </CenteredContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Nombre de usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'} // Cambia el tipo de entrada según el estado showPassword
          label="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="repeatPassword"
          name="repeatPassword"
          type={showRepeatPassword ? 'text' : 'password'} // Cambia el tipo de entrada según el estado showRepeatPassword
          label="Repetir Contraseña"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
          helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle repeat password visibility"
                  onClick={() => setShowRepeatPassword((show) => !show)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="province"
            select
            name="province"
            label="Provincia"
            value={formik.values.province}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.province && Boolean(formik.errors.province)}
            helperText={formik.touched.province && formik.errors.province}
          >
            {provinceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="city"
            name="city"
            label="Ciudad"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="district"
            name="district"
            label="Barrio"
            value={formik.values.district}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.district && Boolean(formik.errors.district)}
            helperText={formik.touched.district && formik.errors.district}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="phone_number"
            name="phone_number"
            label="Número de teléfono"
            value={formik.values.phone_number}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^[0-9]*$/.test(inputValue)) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
            helperText={formik.touched.phone_number && formik.errors.phone_number}
          />
        </Grid>
        <Grid item xs={12}>
        <p style={{ marginTop: '10px', textAlign: 'center' }}><a href="/login">¿Ya tienes una cuenta? Inicia sesión.</a></p>
          <Button variant="contained" color="primary" type="submit" style={{width:'100%'}}>
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ShelterRegister;

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px !important; 
`;