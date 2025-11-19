import { useState } from 'react' 
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Edit from './Pages/Edit'
import Create from './Pages/Create'
import User from './Pages/User'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

function App() { 

  return  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>} >
      <Route index element={<Home/>} />
      <Route path='edit/:id' element={<Edit/>} />
      <Route path='create-user' element={<Create/>} />
      <Route path='user/:id' element={<User/>} />
    </Route>
  </Routes>
  </BrowserRouter>
  <ToastContainer limit={1} />
  </>
}

export default App
