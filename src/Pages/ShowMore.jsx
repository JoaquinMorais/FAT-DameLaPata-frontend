import React from 'react'
import Details from '../components/Dogs/Cards/Details';
import NavBar from '../components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';

function ShowMore() {
  return (
    <>
        <NavBar />
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        />
        <Details />
    </>
  )
}

export default ShowMore

