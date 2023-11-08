import React from 'react'
import { styled } from 'styled-components'

import Fade from 'react-reveal/Fade';

function ShelterContent() {
  return (
    <Container>
            <Fade>
              <Div1>
                <Titulo2>Nombre</Titulo2>
                <Caracteristicas>nose</Caracteristicas>
              </Div1>
            </Fade>
              
            <Fade>
              <Div2>
                <Titulo2>Localidad</Titulo2>
                <Caracteristicas>nose</Caracteristicas>
              </Div2>
            </Fade>

            <Fade>
              <Div3>
                <Titulo2>Numero de Contacto</Titulo2>
                <Caracteristicas>nose</Caracteristicas>
              </Div3>
            </Fade>

            <Fade>
              <Div3>
                <Titulo2>Numero de Contacto</Titulo2>
                <Caracteristicas>nose</Caracteristicas>
              </Div3>
            </Fade>


            <Fade>
              <Div3>
                <Titulo2>Numero de Contacto</Titulo2>
                <Caracteristicas>nose</Caracteristicas>
              </Div3>
            </Fade>


            <Fade>
              <Div3>
                <Titulo2>Numero de Contacto</Titulo2>
                <Caracteristicas>nose</Caracteristicas>
              </Div3>
            </Fade>

   
    </Container>
  )
}

export default ShelterContent

const Container = styled.div`
    width: 100%;
    text-align: left;
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Titulo2 = styled.h2`
    color: black;
    text-transform: uppercase;
    font-style: italic;
    padding: 20px 15px 0 15px;
    margin-bottom: 10px;
`;

const Caracteristicas = styled.p`
    font-size: 18px;
    color: black;
    padding: 0px 15px 20px 15px;
    word-wrap: break-word;
`;

const Div1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Div2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Div3 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

