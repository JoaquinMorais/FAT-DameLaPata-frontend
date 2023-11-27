import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import LinkedInImage from '../../images/LI-In-Bug.svg';


const Card = styled.div`
  margin-top: 10px;
  width: 250px;
  border-radius: 25px;
  background-color: #ff5722;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const CardImage = styled.img`
  position: relative;
  height: 130px;
  width: 130px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #fff;
  padding: 3px;
`;

const ImageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 19px;
  row-gap: 5px;
`;

const StyledName = styled.text`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  display: flex;
  text-align: center;
`;

const StyledBtn = styled.div`
  padding: 8px 16px;
  img{
    height:40px;
    width:40px;
    object-fit: cover;
    cursor: pointer;
  }
`;
const StyledRol =styled.text`
  font-size: 14px;
  color: #707070;
  text-align: center;
  padding: 3px;
`;

const CardContent = styled.div`
  width: 100%;
  border-radius: 25px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
`

export default function CartaInd({ name, img, rol, link, swiperInstance }) {
  const handleButtonClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div
      className="swiper-slide"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        paddingBottom: '20px',
        width: '100%',
      }}
    >
      <Card>
        <ImageContent>
          <CardImage src={img} />
        </ImageContent>
        <CardContent>
          <StyledName>{name}</StyledName>
          <StyledRol>{rol}</StyledRol>
          <StyledBtn onClick={handleButtonClick}>
            <img src={LinkedInImage} alt="" />
          </StyledBtn>
        </CardContent>
      </Card>
    </div>
  );
}
