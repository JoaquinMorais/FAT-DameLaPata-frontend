import React from 'react';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Jump from 'react-reveal/Jump';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import styled from 'styled-components';

const ArrowWrapper = styled.div`
  position: absolute;
  top:0;
  bottom: 500; /* Ajusta esta distancia según sea necesario */
  left: 50%;
  transform: translateX(-50%);
`;

function Tips() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://image.europafm.com/clipping/cmsimages02/2020/01/29/BE57BF60-F6B4-4D1F-AA00-1F076898EE12/58.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <h1 style={{ zIndex: 1, fontSize: '5em', fontWeight: 'bold' }}>¿Dudas de adoptar una mascota?</h1>
        <p>Averigualo aca</p>
        <Jump>
          <ArrowWrapper>
            <KeyboardDoubleArrowDownIcon sx={{ color: 'lightblue', fontSize: 40 }} />
          </ArrowWrapper>
        </Jump>
      </div>
      <Footer />
    </>
  );
}

export default Tips;
