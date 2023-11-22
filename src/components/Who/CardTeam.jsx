import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CartaInd from './CartaInd';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  color: #333; /* Cambia el color según tus preferencias */
  margin-bottom: 20px;
`

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
`

export default function CardTeam() {

  return (
    <div className='App'>
      <StyledTitle><h1>EQUIPO DE TRABAJO</h1></StyledTitle>
      <div className="container">
        <div className="swiperContainer">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 30000,
              disableOnInteraction: false
            }}
            pagination={{
              el: ".pagination",
              clickable: true,
            }}
            slidesPerView={4}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              "@0.50": {
                slidesPerView: 1.25,
                spaceBetween: 25,
              },
              "@1.00": {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              "@1.25": {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              "@1.50": {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              "@1.75": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            
          <SwiperSlide><CartaInd name={'Yaco Ivan Babiachuk'} img={'https://i.postimg.cc/bvhQJWs5/yaco.jpg'}/></SwiperSlide>
          <SwiperSlide><CartaInd name={'Maximo Tomas Blazquez'} img={'https://i.postimg.cc/PJ9DkFg2/facha.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Alejo Diaz Broilo'} img={'https://i.postimg.cc/MTZV0B0b/alejo.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Mateo Emanuel Fernandez'} img={'https://i.postimg.cc/Kz9L0YJX/fercho.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Marco Fini Minue'} img={'https://i.postimg.cc/c4P7qrZ0/yo.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Juan Pablo Genaro'} img={'https://i.postimg.cc/Fz7S8QBY/chad.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Joaquin Morais'} img={'https://i.postimg.cc/mZ5CMtPC/mora.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Agustin Jose Salonia'} img={'https://i.postimg.cc/3R6Ny0tw/salo.jpg'} /></SwiperSlide>
          </Swiper>
        </div>
        <StyledPagination>
        <div className="pagination" />
        </StyledPagination>
      </div>
    </div>
  );
}


