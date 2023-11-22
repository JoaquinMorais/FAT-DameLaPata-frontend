import React from 'react';
import 'swiper/css';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
`;

const StyledImage = styled.img`
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #ff5722;
`;

const ImageContent = styled.div`

`

const StyledName = styled.div`

`

export default function CartaInd({ name, img, swiperInstance }) {
  return (
    <div className="swiper-slide" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingBottom: '20px',
      width: '100%',
    }}>
      <StyledCard>
        <ImageContent>
          <StyledImage src={img} alt={name} />
        </ImageContent>
       <StyledName>{name}</StyledName>
      </StyledCard>
    </div>
  );
}
