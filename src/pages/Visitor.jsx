import React, { act, useState } from 'react'
import Navbar from '../component/Navbar'
import Logs from '../component/Logs'
import ProfileCard from '../component/ProfileCard'
import CreateAppointments from '../component/CreateAppointments'
import Appointment from '../component/Appointment'
import useAuth from '../context/AuthContext'
import { Link } from 'react-router-dom'
function Visitor() {
    const {logout}=useAuth()
    const user=JSON.parse(localStorage.getItem("user"))
    const [activePage, setActivePage] = useState("profile")
    const styelActivePage=(page)=>{
        if(activePage===page){
            return "bg-[#272A39]"
        }
    }
    const handleLogout = () => {
        logout()
    }

    return (
        <div className='bg-white h-screen'>
            <div className='flex '>
                <div className='w-80 fixed bg-slate-900 text-xl text-gray-800 border-r flex flex-col gap-2 border-gray-500 h-screen py-4 px-4'>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-slate-500 ${styelActivePage("profile")}`}
                        onClick={() => setActivePage("profile")}
                    >
                        <span className='text-xl flex items-center text-white'><ion-icon name="person-circle-outline"></ion-icon></span>
                        <span>{user.name}</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-slate-500 ${styelActivePage("logs")}`}
                        onClick={() => setActivePage("logs")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="newspaper-outline"></ion-icon></span>
                        <span>Logs</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-slate-500 ${styelActivePage("create-appointment")}`}
                        onClick={() => setActivePage("create-appointment")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="add-circle-outline"></ion-icon></span>
                        <span>Create Appointment</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-slate-500 ${styelActivePage("appointment")}`}
                        onClick={() => setActivePage("appointment")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="add-circle-outline"></ion-icon></span>
                        <span>Appointment</span>
                    </p>
                    <button
                        className='bg-rose-500 absolute bottom-0 left-0 w-full  text-white font-semibold px-4 py-2 hover:bg-rose-600' onClick={handleLogout}>
                        <Link className='flex items-center gap-2' to='/login'>
                        <ion-icon name="log-out"></ion-icon>
                        <span>Logout</span></Link></button>
                </div>
                <div className='w-full ml-80'>
                    {activePage === "profile" && <ProfileCard />}
                    {activePage === "logs" && <Logs />}
                    {activePage === "create-appointment" && <CreateAppointments />}
                    {activePage==="appointment" && (
                        <Appointment goToCreateAppointment={()=>setActivePage("create-appointment")}   />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Visitor
