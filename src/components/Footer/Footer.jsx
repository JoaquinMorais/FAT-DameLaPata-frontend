import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importa los íconos de redes sociales

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#333',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Mover el contenido hacia los lados
    padding: '20px 0',
    marginLeft: '60px', // Agregar margen alrededor del contenido
    marginRight: '60px',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  message: {
    color: 'white',
    marginTop: '10px',
    fontSize: '17px',
    fontFamily: 'cursive',
    marginRight: '10px', // Separar el texto del contenido del icono
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '24px',
    margin: '0 15px',
    cursor: 'pointer',
  },
  '@media (max-width: 600px)': {
    messageContainer: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    iconContainer: {
      textAlign: 'center',
      marginTop: '15px',
    },
    icon: {
      margin: '5px',
      cursor: 'pointer',
    },
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
            © 2023 Fundación Ruare. Todos los derechos reservados. Aporta tu granito de arena al mundo.
          </div>
          <div className={classes.iconContainer}>
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
