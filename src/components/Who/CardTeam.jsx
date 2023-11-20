import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import CartaInd from './CartaInd';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledCard = styled(Card)`
  margin: 20px;
`;

const StyledTitle = styled(Typography)`
  margin: 40px 0 !important;
  font-size: 32px !important;
  font-weight: bold !important;
  text-align: center;
`;

const StyledSwiperContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export default function CardTeam() {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  let swiper; // Declara una variable para la instancia de Swiper

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (!swiperInitialized) {
      const slidesPerView = isMobile ? 1 : 4;

      swiper = new Swiper('.swiper-container', {
        slidesPerView: slidesPerView, // Mostrar 1 carta por slide en móviles, 4 en otros casos
        spaceBetween: 20, // Espacio entre las cartas
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        autoplay: {
          delay: 1000,
        },
      });

      setSwiperInitialized(true);
    } else {
      swiper && swiper.update(); // Actualiza el Swiper cuando cambia el número de slides
    }
  }, [swiperInitialized, isMobile]);

  return (
    <StyledCard>
      <CardContent>
        <StyledTitle variant="h2">ESTE GRUPO ESTÁ COMPUESTO POR:</StyledTitle>
        <StyledSwiperContainer className="swiper-container">
          <div className="swiper-wrapper" >
            <CartaInd name={'Yaco Babiachuk'} img={'https://i.postimg.cc/bvhQJWs5/yaco.jpg'}/>
            <CartaInd name={'Maximo Tomas Blazquez'} img={'https://i.postimg.cc/PJ9DkFg2/facha.jpg'} />
            <CartaInd name={'Alejo Diaz Broilo'} img={'https://i.postimg.cc/MTZV0B0b/alejo.jpg'} />
            <CartaInd name={'Mateo Emanuel Fernandez'} img={'https://i.postimg.cc/Kz9L0YJX/fercho.jpg'} />
            <CartaInd name={'Marco Fini Minue'} img={'https://i.postimg.cc/c4P7qrZ0/yo.jpg'} />
            <CartaInd name={'Juan Pablo Genaro'} img={'https://i.postimg.cc/Fz7S8QBY/chad.jpg'} />
            <CartaInd name={'Joaquin Morais'} img={'https://i.postimg.cc/mZ5CMtPC/mora.jpg'} />
            <CartaInd name={'Agustin Jose Salonia'} img={'https://i.postimg.cc/3R6Ny0tw/salo.jpg'} />
          </div>
          <div className="swiper-pagination"></div>
        </StyledSwiperContainer>
      </CardContent>
    </StyledCard>
  );
}
