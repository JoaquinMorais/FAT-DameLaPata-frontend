import axios from './base_axios';

// Variables para almacenar la respuesta y el mensaje de respuesta.
let response;
let response_message;

// Función para crear una respuesta estructurada.
function response_react(status = null, message = null, data = null) {
  return {
    response_status: status,
    response_message: message,
    data: data,
  };
}

// Función para agregar una mascota.
export async function PutDogs(values) {
  try {
    response = await axios.put('pet', values);
    response_message = 'Mascota no agregada, ocurrió un error';
    if (response.status === 200) {
      response_message = 'Mascota agregada con éxito';
    }
  } catch (error) {
    response_message = 'Ocurrió un error';
  }
  return response_react(response.status, response_message);
}

// Función para obtener todas las mascotas.
export async function GetPets() {
  try {
    response = await axios.get('pets');
    response_message = 'Error al traer a las mascotas, intente de nuevo más tarde';
    if (response.status === 200) {
      response_message = '';
    }
  } catch (error) {
    response_message = 'Ocurrió un error';
  }
  return response_react(response.status, response_message, response.data.response);
}

export async function GetRequests() {
  try {
    response = await axios.get('shelter/requests');
    response_message = 'Error al traer a las mascotas, intente de nuevo más tarde';
    if (response.status === 200) {
      response_message = '';
    }
  } catch (error) {
    response_message = 'Ocurrió un error';
  }
  return response_react(response.status, response_message, response.data.response);
}


export async function GetRequestsEach(id_pet) {
  try {
    const response = await axios.get(`shelter/requests?id_pet=${id_pet}`);
    let response_message = 'Error al traer las solicitudes de mascotas, intente de nuevo más tarde';
    if (response.status === 200) {
      response_message = '';
    }
    return response_react(response.status, response_message, response.data.response);
  } catch (error) {
    console.log(response)
    let response_message = 'Ocurrió un error';
    return response_react(500, response_message, null);
  }
}

// Función para crear una solicitud de adopción.
export async function CreateRequest(dog, state) {
  try {
    response = await axios.put('adopter/match', { 'id_pet': dog, 'id_state': state });
    console.log(response);
  } catch {
    console.log('error...');
  }
}

// Función para obtener una mascota individual por su ID.
export async function GetSinglePet(id) {
  response = await axios.get(`pet/${id}`);
  console.log(response);
  return response;
}

// Función para cambiar el estado de una mascota a 8 (o el estado que represente "adoptado" o "encontró un hogar").
export async function ChangePetStatusToAdopted(idPet) {
  try {
    const response = await axios.put(`pet/${idPet}/status`, { newStatus: 8 }); // Cambiar "8" al estado deseado
    if (response.status === 200) {
      return response_react(response.status, 'Estado de la mascota actualizado con éxito');
    } else {
      return response_react(response.status, 'Error al actualizar el estado de la mascota');
    }
  } catch (error) {
    return response_react(null, 'Ocurrió un error al actualizar el estado de la mascota', error);
  }
}
