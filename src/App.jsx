import { useState } from 'react'
import './App.css'
import {  Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Visitor from './pages/Visitor'
import Employee from './pages/Employee'
import Admin from './pages/Admin'
import Security from './pages/Security'
function App() {

  return (
      <Routes>
        <Route path='/' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/users/visitor' element={<Visitor />} />
        <Route path='/users/employee' element={<Employee/>}/>
        <Route path='/users/admin' element={<Admin/>}/>
        <Route path='/users/security' element={<Security />} />
      </Routes>
  )
}

export default App
