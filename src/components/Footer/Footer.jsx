import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importa los íconos de redes sociales

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#333',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección de la columna en pantallas más pequeñas
    alignItems: 'center', // Centra verticalmente el contenido
    padding: '20px 0', // Aumenta el espacio vertical para una mayor altura en pantallas más pequeñas
  },
  messageContainer: {
    display: 'flex', // Alinea los mensajes uno al lado del otro en pantallas grandes
    flexWrap: 'wrap', // Salto de línea automático en pantallas pequeñas
    justifyContent: 'center', // Centra horizontalmente los mensajes
  },
  message: {
    color: 'white',
    fontSize: '16px',
    fontFamily: 'cursive',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px', // Agrega margen inferior entre líneas de texto
  },
  icon: {
    fontSize: '24px',
    margin: '0 25px', // Aumenta el margen derecho en pantallas más pequeñas
    cursor: 'pointer',
  },
}));

const Footer = () => {
  const classes = useStyles();

  // Funciones para redirigir a las páginas de redes sociales
  const redirectToFacebook = () => {
    window.location.href = 'https://www.facebook.com/tu-pagina-de-facebook';
  };

  const redirectToTwitter = () => {
    window.location.href = 'https://www.twitter.com/tu-cuenta-de-twitter';
  };

  const redirectToInstagram = () => {
    window.location.href = 'https://www.instagram.com/tu-cuenta-de-instagram';
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.messageContainer}>
          <div className={classes.message}>
            © 2023 Fundación Ruare.
          </div>
          <div className={classes.message}>
            Todos los derechos reservados
          </div>
          <div className={classes.message}>
            Aporta tu granito de arena al mundo
          </div>
          <div>
            <FaFacebook className={classes.icon} onClick={redirectToFacebook} />
            <FaTwitter className={classes.icon} onClick={redirectToTwitter} /> 
            <FaInstagram className={classes.icon} onClick={redirectToInstagram} /> 
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
