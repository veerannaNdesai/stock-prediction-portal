import { useState } from 'react'
import Home from './components/Home'
import './assets/style.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
