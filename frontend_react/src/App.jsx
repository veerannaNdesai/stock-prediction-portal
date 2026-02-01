import { useState } from 'react'
import Home from './components/Home'
import './assets/style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import AuthProvider from './components/AuthProvider'
import Dashboard from './components/Dashboard'
import PrivateRouter from './components/PrivateRouter'
import PublicRouter from './PublicRouter'



function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<PublicRouter><Register /></PublicRouter>} />
            <Route path='/login' element={<PublicRouter><Login /></PublicRouter>} />
            <Route path='/dashboard' element={<PrivateRouter><Dashboard /></PrivateRouter>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
