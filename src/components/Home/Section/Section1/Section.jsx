import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { styled } from 'styled-components';
import Button from '../Button';
import { Fade } from 'react-reveal';
import { Slide } from 'react-reveal';
import Jump from 'react-reveal/Jump';
import videofondo from '../../../../images/videos/videofondo.mp4';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function Section() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/user/requests');
        setResponseData(response.data);
        console.log('response Data:' + responseData)
      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }
    
    fetchData(); 
  }, []);  

  if(responseData?.status === 200){
    return (
      <>
        <Wrap>
          <BackgroundVideo autoPlay loop muted>
            <source src={videofondo} type="video/mp4" />
          </BackgroundVideo>
          <Overlay />
          <Content>
            <CenterContent>
              <Fade top>
                <Title>Dame La Pata</Title>
                <Slogan>"Rescatar, proteger y encontrar hogares amorosos para perros necesitados."</Slogan>
              </Fade>             
            </CenterContent>
            <Jump>
              <Arrow>
                <ArrowText>Más info.</ArrowText>
                <KeyboardDoubleArrowDownIcon sx={{ color: 'white', fontSize: 40, marginBottom: 5 }}></KeyboardDoubleArrowDownIcon>
              </Arrow>
            </Jump> 
          </Content>
        </Wrap>
      </>
    );
  } else {
    return (
      <>
        <Wrap>
          <BackgroundVideo autoPlay loop muted>
            <source src={videofondo} type="video/mp4" />
          </BackgroundVideo>
          <Overlay />
          <Content>
            <CenterContent>
              <Fade top>
                <Title>Dame La Pata</Title>
                <Slogan>"Rescatar, proteger y encontrar hogares amorosos para perros necesitados."</Slogan>
              </Fade>
                <Container>
                <Fade bottom>
                  <ButtonContainer>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <ButtonContainer>
                        <ButtonAdop src='/Images/pataa.jpg' />
                        <ButtonText style={{ color: 'white', fontWeight: 'bold' }}>INICIAR</ButtonText>
                      </ButtonContainer>
                    </Link>
                  </ButtonContainer>
                </Fade>
              </Container>
              
            </CenterContent>
            <Jump>
              <Arrow>
                <ArrowText>Más info.</ArrowText>
                <KeyboardDoubleArrowDownIcon sx={{ color: 'white', fontSize: 40, marginBottom: 5 }}></KeyboardDoubleArrowDownIcon>
              </Arrow>
            </Jump> 
          </Content>
        </Wrap>
      </>
    );
  }
}

export default Section;

const Title = styled.h1`
  font-size: 90px;
  color: white;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 425px) {
    font-size: 60px;
  }
`;

const Slogan = styled.h4`
  font-size: 27px;
  letter-spacing: 3px;
  text-align: center;
  font-style: italic;
  font-family: 'Patrick Hand', cursive;

  @media (max-width: 425px) {
    font-size: 20px;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 1;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  color: white;

  @media (max-width: 425px) {
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  z-index: 1;
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  width: 26%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 200px;
  height: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 425px) {
    margin: 0 auto;
  }
`;

const ButtonText = styled.h3`
  color: white;
  position: relative;
  margin-top: -55px;
  font-size: 18px;
`;

const ButtonAdop = styled.img`
  filter: drop-shadow(0px 5px 15px rgba(255, 255, 255, 0.8));
  margin-top: 50px;
  width: 150px;
  height: auto;
`;

const Arrow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
  `

const ArrowText = styled.p`
  color: white;
  margin-bottom: 0;
`