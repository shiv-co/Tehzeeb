import { useState } from 'react'
import './App.css'
import AppRouter from './components/appRouter'
import ProductsPage from './pages/productPage'
import Footer from './pages/footer'
import ProductPreview from './pages/productPreview'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
    < AppRouter />
    
    <Footer />
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

  
    </>
  )
}

export default App
