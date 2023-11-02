import React from 'react'
import { Fade } from 'react-reveal'
import { styled } from 'styled-components'

function Sponsor() {
  return (
    <>
    <Container>
      <Fade bottom>
        <WhyTitle>¡MUCHAS GRACIAS!</WhyTitle>
        <ImagesContainer>
          <ImageSponsor src="/Images/garra.jpg"/> 
          <ImageSponsor src="/Images/ross.png"/> 
          <ImageSponsor src="/Images/Lussary.png"/> 
        </ImagesContainer>
      </Fade>
    </Container>
    
    
    </>
    )
}

export default Sponsor

const Container = styled.div`
  margin-top: 70px;
  text-align: center;
`;

const WhyTitle = styled.h1`
  font-size: 60px;
  font-weight: bold;

  @media (max-width: 320px) {
    font-size: 50px;
  }
`

const ImageSponsor = styled.img`
  width: auto;
  height: 175px;
  text-align: center;
  padding: 0 25px;

  @media (max-width: 665px) {
    height: 300px;
    padding: 25px 0;
  }

  @media (max-width: 500px) {
    height: 225px;
    padding: 10px 0;
  }
`


const ImagesContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;

  @media (max-width: 665px) {
    flex-direction: column;
    margin-top: 350px;
    margin-bottom: 350px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    margin-top: 250px;
    margin-bottom: 250px;
  }
`