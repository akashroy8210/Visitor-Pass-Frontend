import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import ProfileCard from '../component/ProfileCard'
import AppointmentEmployee from '../component/AppointmentEmployee'
import Scheduled from '../component/Scheduled'
import useAuth from '../context/AuthContext'
import { Link } from 'react-router-dom'
function Employee() {
    const { logout } = useAuth()
    const user = JSON.parse(localStorage.getItem("user"))
    const [activePage, setActivePage] = useState("profile")
    const styleActivePage = (page) => {
        if (activePage === page) {
            return "bg-[#272A39]"
        }
    }
    const handleLogout = () => {
        logout()
    }
    return (
        <div className='bg-white h-screen'>
            <div className='flex '>
                <div className='w-80 fixed bg-slate-900 text-xl text-gray-800 border-r flex flex-col gap-2 border-gray-500 min-h-screen py-4 px-4'>

                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-[#272A39] ${styleActivePage("profile")} `}
                        onClick={() => setActivePage("profile")}
                    >
                        <span className='text-xl flex items-center text-white'><ion-icon name="person-circle-outline"></ion-icon></span>
                        <span>{user.name}</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white  flex items-center gap-2 rounded-lg hover:bg-[#272A39] ${styleActivePage("appointment")} `}
                        onClick={() => setActivePage("appointment")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="calendar-outline"></ion-icon></span>
                        <span>Appointment</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white  flex items-center gap-2 rounded-lg hover:bg-[#272A39] ${styleActivePage("schedule")} `}
                        onClick={() => setActivePage("schedule")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="calendar-outline"></ion-icon></span>
                        <span>Schedule</span>
                    </p>

                    <button
                        className='bg-rose-500 absolute bottom-0 left-0 w-full  text-white font-semibold px-4 py-2 hover:bg-rose-600' onClick={handleLogout}>
                        <Link className='flex items-center gap-2' to='/login'>
                            <ion-icon name="log-out"></ion-icon>
                            <span>Logout</span></Link></button>


                </div>
                <div className='w-full ml-80'>
                    {activePage === "profile" && <ProfileCard />}
                    {activePage === "appointment" && <AppointmentEmployee />}
                    {activePage === "schedule" && <Scheduled />}
                </div>
            </div>
        </div>
    )
}

export default Employee

