import { useState } from 'react'
import './App.css'
import AppRouter from './components/appRouter'
import ProductsPage from './pages/productPage'
import Footer from './pages/footer'
import ProductPreview from './pages/productPreview'

function App() {


  return (
    <>
    < AppRouter />
    
    <Footer />
  
    </>
  )
}

export default App
