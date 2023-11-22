  import * as React from 'react';
  import Box from '@mui/material/Box';
  import Tab from '@mui/material/Tab';
  import TabContext from '@mui/lab/TabContext';
  import TabList from '@mui/lab/TabList';
  import TabPanel from '@mui/lab/TabPanel';
  import ShelterRegister from "../components/Register/RegisterShelter";
  import AdopterRegister from "../components/Register/RegisterAdopter";
  import Navbar from "../components/NavBar/NavBar";
  import { useEffect } from 'react';
  import { LogOut } from '../my_methods/session_methods';
  import Footer from '../components/Footer/Footer';
  import videofondo from '../images/videos/videofondo.mp4';
  import styled from 'styled-components';
  import { Button } from '@mui/material';

  function Register() {
    useEffect(() => {
      LogOut()
    }, []);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <>
        {/* <Navbar /> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh', // Use vh to ensure it covers the viewport height
          }}
        >
                      <BackgroundVideo autoPlay loop muted>
              <source src={videofondo} type="video/mp4" />
            </BackgroundVideo>

          <Box sx={{ width: '100%', maxWidth: '600px', typography: 'body1', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px', maxHeight: '100%' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ justifyContent: 'space-around', background: 'transparent', border: 'none' }}>
                  <StyledTab label="Adoptante" value="1" selected={value === '1'} />
                  <StyledTab label="Fundacion" value="2" selected={value === '2'} />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ height: '100%' }}><AdopterRegister /></TabPanel>
              <TabPanel value="2" sx={{ height: '100%' }}><ShelterRegister /></TabPanel>
            </TabContext>
            
          </Box>
        </div>
        <Footer/>
      </>
    );
  }

  export default Register;

  const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: blur(3px);
`;

const StyledTab = styled(Tab)`
  flex: 1;
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#4CAF50' : 'transparent')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#45a049' : 'rgba(0, 0, 0, 0.1)')};
  }
`;
