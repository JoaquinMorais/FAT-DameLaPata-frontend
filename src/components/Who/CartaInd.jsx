import React from 'react';
import 'swiper/css';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 24px;
  padding-bottom: 20px;
  background-size: cover;
  background-position: center;
  color: white;
  font-weight: bold;
  padding: 20px;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 30%; /* Tamaño predeterminado de la imagen */
  height: auto;

`;

export default function CartaInd({ name, img, swiperInstance }) {
  return (
    <div className="swiper-slide" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      fontSize: '15px',
      paddingBottom: '20px',
      width: '100%',
    }}>
      <StyledCard>
      <StyledImage src={img} alt={name} />
      </StyledCard>
      <div className="name">{name}</div>
    </div>
  );
}
