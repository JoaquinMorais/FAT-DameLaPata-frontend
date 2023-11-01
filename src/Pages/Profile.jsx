import React, { useState, useEffect } from 'react';
import AdopterProfile from '../components/Profile/ProfileAdopter';
import ProfileShelter from '../components/Profile/ProfileShelter';
import { GetProfile } from '../my_methods/session_methods';

function Profile() {
  // Estado para determinar si el usuario es un adoptante o un refugio
  const [isAdopter, setIsAdopter] = useState(true);

  // Variable para almacenar la respuesta de la solicitud de perfil
  var response = {};

  // Función para obtener y verificar el tipo de usuario (adopter o shelter)
  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await GetProfile();

        if (response.data['status'] === 200) {
          // Verifica el tipo de usuario y actualiza el estado correspondiente
          if (response.data.response['type'] === 'adopter') {
            setIsAdopter(true);
          } else {
            setIsAdopter(false);
          }
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isAdopter ? <AdopterProfile /> : <ProfileShelter />}
    </>
  );
}

export default Profile;
