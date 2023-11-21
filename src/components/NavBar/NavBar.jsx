import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// Importa la función FetchNavbarItems
import { FetchNavbarItems } from '../../my_methods/session_methods';

// Componente principal
function Navbar() {
  // Estado para almacenar los elementos de las páginas y configuraciones
  const [pages, setPagesArray] = useState([]);
  const [settings, setSettingsArray] = useState([]);

  // Estados para manejar los menús desplegables
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // useEffect para cargar los elementos de la barra de navegación al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const navbarItems = await FetchNavbarItems();
      setPagesArray(navbarItems.pages_array);
      setSettingsArray(navbarItems.setting_array);
    };

    fetchData();
  }, []);

  // Manejadores para abrir y cerrar los menús
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Función para obtener la ruta correspondiente a una página
  function getPageLink(page) {
    switch (page) {
      case 'Inicio':
        return '/';
      case 'Adoptar':
        return '/dogs';
      case 'Quienes Somos':
        return '/about';
      case 'Publicar':
        return '/add';
      case 'Peticiones':
        return '/peticiones';
      case 'Mis Mascotas':
        return '/mis-mascotas-shelter';
      default:
        return '/';
    }
  }

  // Función para obtener la ruta correspondiente a una configuración
  function getSettingsLink(setting) {
    switch (setting) {
      case 'Mi Perfil':
      case 'Mi Refugio':
        return '/profile';
      case 'Iniciar Sesion':
      case 'Cerrar Sesion':
        return '/login';
      case 'Registrarse':
        return '/register';
      default:
        return '/';
    }
  }

  // Renderizado del componente
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FF5722 !important',
        position: 'fixed',
        zIndex: '9998',
        height: '50px',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <a href="/">
            <Imagen1 src="/Images/dame_logo.png" alt="Logo" style={{ width: '40px', marginRight: '16px' }} />
          </a>

          {/* Título de la página en desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* Tu título de página */}
          </Typography>

          {/* Menú desplegable en dispositivos móviles */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', zIndex: '9998' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* Menú de navegación en dispositivos móviles */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', zIndex: '9998' },
              }}
            >
              {pages.length > 0 &&
                pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={getPageLink(page)} // Navegar a la ruta correspondiente
                  >
                    {page}
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* Título de la página en móviles */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* Tu título de página en dispositivos móviles */}
          </Typography>

          {/* Enlaces de navegación en desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.length > 0 &&
              pages.map((page) => (
                <Link key={page} to={getPageLink(page)}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                </Link>
              ))}
          </Box>

          {/* Menú de usuario */}
          <Box sx={{ flexGrow: 0, zIndex: '9999' }}>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Reemplaza el src con tu avatar de usuario */}
                <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
              </IconButton>
            </Tooltip>

            {/* Menú de usuario desplegable */}
            <Menu
              sx={{ mt: '45px', zIndex: '9999' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.length > 0 &&
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {/* Usar Link para redirigir */}
                    <Link to={getSettingsLink(setting)}>
                      <Typography textAlign="center" color="#212529">
                        {setting}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

// Estilos adicionales
const Imagen1 = styled.img`
  width: 50px;
  display: flex;
`;

const Avatar = styled.img`
  width: 40px;
  border-radius: 100%;
`;
