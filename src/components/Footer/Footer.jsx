import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#333',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    marginLeft: '60px',
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
    marginRight: '10px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  icon: {
    fontSize: '24px',
    margin: '0 15px',
    cursor: 'pointer',
  },
  '@media (max-width: 600px)': {
    toolbar: {
      flexDirection: 'column',
      alignItems: 'center',
    },
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
        </div>
        <div className={classes.iconContainer}>
          <FaFacebook className={classes.icon} onClick={redirectToFacebook} />
          <FaTwitter className={classes.icon} onClick={redirectToTwitter} />
          <FaInstagram className={classes.icon} onClick={redirectToInstagram} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
