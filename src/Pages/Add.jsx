import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import {
  Field,
  FieldArray,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Footer from '../components/Footer/Footer';
import CheckBoxCategories from '../components/Add/CheckBoxCategories'; 
import NavBar from '../components/NavBar/NavBar'; 
import IsLogged, { GetProfile } from '../my_methods/session_methods';
import LoaderComp from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { PutDogs } from '../my_methods/dogs_methods';
import {
  getColors,
  getCharacteristics,
  getCategoryCharacteristics
} from '../my_methods/query_methods';
import CircularProgress from '@mui/material/CircularProgress';



// Styled component for the subtitle
const Subtitulo = styled(Typography)`
  text-align: center;
  margin: 20px 0;
`;

// Styled component for the button
const Boton = styled(Button)`
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const dropzoneStyle = {
  border: '2px dashed #f76402',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  color: '#f76402',
  cursor: 'pointer',
  marginTop: '20px',
};

function Add() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [responseDataColors, setResponseDataColors] = useState(null);
  const [responseDataCharacteristics, setResponseDataCharacteristics] = useState(null);
  const [responseDataCategoryCharacteristics, setResponseDataCategoryCharacteristics] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [colorsLoaded, setColorsLoaded] = useState(false);
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await GetProfile();
        if (user.data['status'] === 200) {
          if (user.data.response['type'] !== 'shelter') {
            window.location.href = '/';
          }
        }
      } catch (error) {
        console.log('Error al obtener los datos del usuario:', error.message);
        window.location.href = '/';
      }

      if (!colorsLoaded) {
        try {
          const colorsResponse = await getColors();
          setResponseDataColors(colorsResponse);
          setColorsLoaded(true);
        } catch (error) {
          console.error('Error al realizar la solicitud de colores:', error.message);
        }
      }

      try {
        const characteristicsResponse = await getCharacteristics();
        setResponseDataCharacteristics(characteristicsResponse);
      } catch (error) {
        console.error('Error al realizar la solicitud de características:', error.message);
      }

      try {
        const categoryCharacteristicsResponse = await getCategoryCharacteristics();
        setResponseDataCategoryCharacteristics(categoryCharacteristicsResponse);
      } catch (error) {
        console.error('Error al realizar la solicitud de categorias características:', error.message);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [colorsLoaded]);

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (event.target.checked) {
      setSelectedColors([...selectedColors, value]);
    } else {
      setSelectedColors(selectedColors.filter((color) => color !== value));
    }
  };

  const initialValues = {
    name: '',
    gender: '',
    birthdate: '',
    size: '',
    weight: '',
    image_path: null,
    characteristics: [],
    colors: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es obligatorio.')
      .test(
        'invalid-words',
        'El nombre contiene palabras inapropiadas.',
        (value) => {
          const invalidWords = ['pene', 'culo', 'teta', 'concha', 'mierda', 'caca', 'pito',
        'sexo', 'anal', 'chupador', 'hitler', 'nazi', 'pussy', 'videla', 'maduro', 'sorete']; 

          return !invalidWords.some(word => value.toLowerCase().includes(word.toLowerCase()));
        }
      ),
    gender: Yup.number().required('El género es obligatorio.'),
    birthdate: Yup.date()
      .required('La fecha de nacimiento es obligatoria.')
      .test(
        'birthdate',
        'La fecha de nacimiento debe estar entre 2000 y la fecha actual.',
        (value) => {
          const minDate = new Date('2000-01-01');
          const maxDate = new Date();
          const birthdate = new Date(value);
          return birthdate >= minDate && birthdate <= maxDate;
        }
      ),
    size: Yup.number().required('El tamaño es obligatorio.'),
    weight: Yup.number()
      .required('El peso es obligatorio.')
      .min(0, 'El peso no puede ser negativo.')
      .max(45, 'El peso no puede ser mayor a 45.')
      .positive('El peso debe ser un número positivo.'),
    image_path: Yup.mixed().required('La imagen es obligatoria.').nullable(),

    characteristics: Yup.array()
      .of(Yup.number())
      .required('Mínimo 1 característica.'),
    colors: Yup.array()
      .of(Yup.number())
      .required('Mínimo 1 color.'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values.image_path) {
      const imageBase64 = await convertImageToBase64(values.image_path);
      values.image_path = imageBase64;
    }
    
    const response = await PutDogs(values);
    
    if (response.response_status === 200) {
      navigate('/successful');
    } else {
      console.error('Error al publicar el perro:', response.response_message);
    }
    
    setSubmitting(false);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md"><br/><br/><br/> {/* Ignoren los "BR", fue mi solucion al estres */}
        <Typography variant="h3" align="center" gutterBottom>
          Empezá a rellenar la felicidad de una persona.
        </Typography>

        <hr />
        <Subtitulo variant="subtitle1">¡Agregá una mascota a la lista de adopción!</Subtitulo>
        <hr />
        {isLoading ? (
          <Grid style={{ textAlign: 'center', marginBottom: '100%' }}>
            <CircularProgress color="success" />
          </Grid>
          ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Typography variant="h5">Datos de la Mascota</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="name">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        placeholder="Firulais..."
                        fullWidth
                        variant="standard"
                      />
                    )}
                  </Field>
                  <Grid item xs={12}>
                    <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Field name="gender">
                    {({ field }) => (
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Género</InputLabel>
                        <Select {...field} label="Género">
                          <MenuItem value="">
                            <em>Quitar</em>
                          </MenuItem>
                          <MenuItem value={1}>Macho</MenuItem>
                          <MenuItem value={2}>Hembra</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                  <Grid item xs={12}>
                    <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Field name="birthdate">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Nacimiento"
                        type="date"
                        defaultValue="2000-01-01"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        // Set max and min attributes for date input
                        inputProps={{
                          max: new Date().toISOString().split('T')[0], // Current date
                          min: '2000-01-01',
                        }}
                      />
                    )}
                  </Field>
                  <Grid item xs={12}>
                    <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Field name="size">
                    {({ field }) => (
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Tamaño</InputLabel>
                        <Select {...field} label="Tamaño">
                          <MenuItem value="">
                            <em>Quitar</em>
                          </MenuItem>
                          <MenuItem value={1}>Chico</MenuItem>
                          <MenuItem value={2}>Mediano</MenuItem>
                          <MenuItem value={3}>Grande</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                  <Grid item xs={12}>
                    <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Field name="weight">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Peso"
                        placeholder="8 kg, 12 kg, 5 kg"
                        fullWidth
                        variant="standard"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 45 } }}
                      />
                    )}
                  </Field>
                  <Grid item xs={12}>
                    <ErrorMessage name="weight" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
               
              <Grid item xs={12}>
              <hr />
                <Typography variant="h5">Imagen de la Mascota</Typography>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    formik.setFieldValue('image_path', acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} style={dropzoneStyle}>
                      <input {...getInputProps()} />
                      {formik.values.image_path ? (
                        <img
                          src={URL.createObjectURL(formik.values.image_path)}
                          alt="Vista previa"
                          style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                        />
                      ) : (
                        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una foto.</p>
                      )}
                    </div>
                  )}
                </Dropzone>
                {formik.errors.image_path && formik.touched.image_path && (
                  <div style={{ color: 'red' }}>{formik.errors.image_path}</div>
                )}
              </Grid>


                <Grid item xs={12}>
                <hr />
                  <Typography variant="h4">Color de la mascota</Typography>
                  <FormGroup>
                    <Grid container spacing={2}>
                      {responseDataColors?.response.map((color) => (
                        <Grid item key={color.id_color} xs={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="colors"
                                value={color.id_color}
                                checked={formik.values.colors.includes(color.id_color)}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  if (isChecked) {
                                    formik.setFieldValue('colors', [...formik.values.colors, color.id_color]);
                                  } else {
                                    formik.setFieldValue('colors', formik.values.colors.filter((c) => c !== color.id_color));
                                  }
                                }}
                                style={{
                                  color: '#f76402',
                                }}
                              />
                            }
                            label={color.title}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <ErrorMessage name="colors" component="div" />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                <hr />
               
                {/* CARACTERISTICAS DE LAS MASCOTAS */}  
                <Typography variant="h4">Características de la mascota</Typography>
                  <FormGroup>

                   <CheckBoxCategories categoryCharacteristicsResponse={responseDataCategoryCharacteristics?.response} formik={formik} />

                    <ErrorMessage name="characteristics" component="div" />
                  </FormGroup>
                  


                </Grid>
              </Grid>
              <Grid item xs={12}>
              <hr />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: green[500], // Color de éxito
                    color: '#fff', // Color del texto
                    fontWeight: 'bold',
                    float: 'right', // Para alinear a la derecha
                    marginTop: '20px', // Ajusta el margen superior
                    marginBottom: '70px', // Ajusta el margen inferior
                    fontSize: '1.2rem', // Aumenta el tamaño de fuente (ajusta el valor según lo necesites)
                    padding: '15px 30px', // Aumenta el espacio de relleno (ajusta el valor según lo necesites)
                  }}
                  type="submit"
                >
                  PUBLICAR
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
          )}
      </Container>
      
      <Footer/>
    </>
  );
}

export default Add;