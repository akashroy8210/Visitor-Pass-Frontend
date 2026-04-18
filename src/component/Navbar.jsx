import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from "../context/AuthContext"
function Navbar() {
    const { logout } = useAuth()
    const user = JSON.parse(localStorage.getItem("user"))
    const handleLogout = () => {
        logout()
    }
    return (
        <div className='bg-slate-100 '>
            <div className='container mx-auto flex text-gray-900 justify-between py-4'>
                <h1 className='text-gray-800 text-3xl flex gap-2 font-bold'><span>{user.role}</span><span>Dashboard</span></h1>
                <button 
                className='bg-red-600 text-white font-semibold px-4 py-2 rounded'onClick={handleLogout}>
                    <Link to='/login'>Logout</Link></button>
            </div>
        </div>
    )
}

export default Navbar
