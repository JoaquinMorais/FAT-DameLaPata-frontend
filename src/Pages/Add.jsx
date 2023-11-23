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
        'sexo', 'anal', 'chupador']; 

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
      <Container maxWidth="md"><br/><br/><br/>
        <Typography variant="h3" align="center" gutterBottom>
          Empezá a rellenar la felicidad de una persona.
        </Typography>

        <hr />
        <Subtitulo variant="subtitle1">¡Agregá una mascota a la lista de adopción!</Subtitulo>
        <hr />
        {isLoading ? (
          <Grid style={{ textAlign: 'center' }}>
            Loading...
          </Grid>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={2}>
                  {/* ... (Rest of the form fields) ... */}
                  <Grid item xs={12}>
                    <hr />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: green[500],
                        color: '#fff',
                        fontWeight: 'bold',
                        float: 'right',
                        marginTop: '20px',
                        marginBottom: '70px',
                        fontSize: '1.2rem',
                        padding: '15px 30px',
                      }}
                      type="submit"
                    >
                      PUBLICAR
                    </Button>
                  </Grid>
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
