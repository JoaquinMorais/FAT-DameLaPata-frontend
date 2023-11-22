import axios from './base_axios';

// Habilita las cookies para las solicitudes.
axios.defaults.withCredentials = true;

// Arrays para almacenar elementos de navegación predeterminados.
let pages_array = [];
let setting_array = [];

// Función para establecer los elementos de navegación predeterminados.
function setDefaultNavigationArrays() {
  pages_array = ['Inicio', 'Quienes Somos'];
  setting_array = ['Iniciar Sesion', 'Registrarse'];
}

// Función para obtener elementos de la barra de navegación.
export async function FetchNavbarItems() {
  try {
      setDefaultNavigationArrays();
    if (localStorage.getItem('id') !== null) {
      if (localStorage.getItem('type') === 'adopter') {
        pages_array = ['Inicio', 'Quienes Somos', 'Adoptar', 'Peticiones'];
        setting_array = ['Mi Perfil', 'Cerrar Sesion'];
      } else if (localStorage.getItem('type') === 'shelter') {
        pages_array = ['Inicio', 'Quienes Somos', 'Publicar', 'Mis Mascotas'];
        setting_array = ['Perfil del Refugio', 'Cerrar Sesion'];
      }
    }
  } catch {
    setDefaultNavigationArrays();
  }
  return {
    pages_array: pages_array,
    setting_array: setting_array,
  };
}

// Función para enviar datos de inicio de sesión.
export async function SendLogin(data_to_send) {
  let response = null;
  try {
    response = await axios.post('login', data_to_send);
    if (response.data['status'] === 200) {
      localStorage.setItem('id', response.data.response['id']);
      localStorage.setItem('type', response.data.response['type']);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return false;
}

// Función para enviar datos de registro.
export async function SendRegister(data_to_send, method) {
  let response = null;
  try {
    response = await axios.put('' + method + '/register', data_to_send);
    if (response.data['status'] === 200) {
      localStorage.setItem('id', response.data.response['id']);
      localStorage.setItem('type', response.data.response['type']);
      return {
        status: 200,
        response: 'Éxito'
      };
    } else {
      return {
        status: response.data.status,
        response: response.data.response
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    status: 401,
    response: 'Error inesperado...'
  };
}

// Función para obtener el perfil del usuario.
export async function GetProfile() {
  var cosa = await axios.post('profile', {
    address_is_required: true
  });
  return cosa;
}

// Función para cerrar sesión.
export async function LogOut() {
  try {
    axios.post('logout', []);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  localStorage.setItem('id', null);
  localStorage.setItem('type', null);
}
