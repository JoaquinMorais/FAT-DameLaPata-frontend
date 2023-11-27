import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CartaInd from './CartaInd';
import styled from 'styled-components';

const StyledTitle = styled.div`
    h1{
      text-align: center;
      font-family: 'Raleway', sans-serif;
      font-weight: 600;
      color: #333;
      font-size: 3rem;
      margin-bottom: 20px;
    }
`
const Wrap = styled.div`
    background-color: #efefef;
    padding: 30px;
`

const StyledPagination = styled.div`

`

export default function CardTeam() {

  return (
    <Wrap>
      <StyledTitle><h1>Integrantes del Equipo</h1></StyledTitle>
      <div className="container">
        <div className="swiperContainer">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
              delay: 30000,
              disableOnInteraction: false
            }}
            pagination={{
              el: ".pagination",
              clickable: true,
            }}
            navigation={true}
            slidesPerView={4}
            slidesPerGroup={4}
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
            
          <SwiperSlide><CartaInd name={'Yaco Ivan Babiachuk'} rol={'Frontend Developer'} img={'https://i.postimg.cc/bvhQJWs5/yaco.jpg'}link='https://www.linkedin.com/in/babiachuk-yaco-627bb92a0/'/></SwiperSlide>
          <SwiperSlide><CartaInd name={'Maximo Tomas Blazquez'} rol={'Quality Assurance'} img={'https://i.postimg.cc/PJ9DkFg2/facha.jpg'} link='https://www.linkedin.com/in/blazquez-m%C3%A1ximo-481154288/'/></SwiperSlide>
          <SwiperSlide><CartaInd name={'Alejo Diaz Broilo'} rol={'Full Stack Developer'} img={'https://i.postimg.cc/MTZV0B0b/alejo.jpg'} link='https://www.linkedin.com/in/alejo-luis-diaz-broilo-25178029b/'/></SwiperSlide>
          <SwiperSlide><CartaInd name={'Mateo Emanuel Fernandez'} rol={'Scrum Master'}img={'https://i.postimg.cc/Kz9L0YJX/fercho.jpg'} /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Marco Fini Minue'} rol={'Frontend Developer'} img={'https://i.postimg.cc/c4P7qrZ0/yo.jpg'} link='https://www.linkedin.com/in/marco-fini-minu%C3%A9-b35289275/'/></SwiperSlide>
          <SwiperSlide><CartaInd name={'Juan Pablo Genaro'} rol={'Full Stack Developer'} img={'https://i.postimg.cc/Fz7S8QBY/chad.jpg'} link='https://www.linkedin.com/in/juan-pablo-genaro-369a2329b/' /></SwiperSlide>
          <SwiperSlide><CartaInd name={'Joaquin Morais'} rol={'Team Leader'} img={'https://i.postimg.cc/mZ5CMtPC/mora.jpg'} link='https://www.linkedin.com/in/joaqu%C3%ADn-morais-5a4642220/'/></SwiperSlide>
          <SwiperSlide><CartaInd name={'Agustin Jose Salonia'} rol={'Frontend Developer'} img={'https://i.postimg.cc/3R6Ny0tw/salo.jpg'} link='https://www.linkedin.com/in/agus-salonia-4b573221b/'/></SwiperSlide>
          </Swiper>
        </div>
        <StyledPagination>
        <div className="pagination" style={{display:'flex', justifyContent:'center'}}/>
        </StyledPagination>
      </div>
    </Wrap>
  );
}


