import React from 'react';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Jump from 'react-reveal/Jump';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Tips() {
    const titleStyles = {
        fontSize: '55px', 
        fontWeight: 'bold', 
    };
    
  const accordionTitleStyle = {
    fontSize: '35px', 
    fontWeight: 'bold', 
  };

  const accordionContentStyle = {
    fontSize: '18px',
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://image.europafm.com/clipping/cmsimages02/2020/01/29/BE57BF60-F6B4-4D1F-AA00-1F076898EE12/58.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
        <div style={{ position: 'absolute', marginLeft: '20px', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h1" fontWeight="bold" color={'black'} style={titleStyles}>¿Dudas de adoptar una mascota?</Typography>
        </AccordionSummary>
        <Jump>
          <ExpandMoreIcon />
        </Jump>
      </div>
      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{marginTop:'50px'}}>
          <Typography style={accordionTitleStyle}>¿Tengo suficiente tiempo para dedicarle al perro?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={accordionContentStyle}>
          Los perros son animales sociales que necesitan interacción y cuidados diarios. Además de proporcionarles comida y agua, requieren tiempo para paseos, ejercicio, juegos y entrenamiento. Es esencial dedicar tiempo de calidad para establecer un vínculo fuerte y satisfacer sus necesidades físicas y emocionales.
        </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{marginTop:'50px'}}>
          <Typography style={accordionTitleStyle}>¿El tamaño del perro se adapta a mi espacio?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={accordionContentStyle}>
          Considera el espacio disponible en tu hogar y si es adecuado para el tamaño y nivel de actividad del perro. Algunos perros grandes pueden necesitar más espacio para moverse y ejercitarse, mientras que razas más pequeñas pueden adaptarse bien a espacios reducidos, pero igualmente necesitan su área de descanso y actividades.  
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{marginTop:'50px'}}>
          <Typography style={accordionTitleStyle}>¿Estoy listo para los costos asociados con el cuidado del perro?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={accordionContentStyle}>
          Además de los gastos iniciales de adopción, los costos continuos incluyen alimentación, atención veterinaria regular, vacunas, desparasitación, accesorios (como juguetes y camas), seguro de salud para mascotas y posibles emergencias médicas. Estar preparado financieramente es crucial para brindarle una vida saludable al perro.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{marginTop:'50px', border:'none'}}>
          <Typography style={accordionTitleStyle}>¿Mi estilo de vida es adecuado para tener un perro?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={accordionContentStyle}>
          Algunos perros necesitan más ejercicio y estimulación mental que otros. Si llevas un estilo de vida activo, considera una raza que se adapte a tu nivel de actividad. También es importante asegurar que haya tiempo para paseos y juegos, independientemente del estilo de vida.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Footer />
    </>
  );
}

export default Tips;
