import React, { act, useState } from 'react'
import Navbar from '../component/Navbar'
import Logs from '../component/Logs'
import ProfileCard from '../component/ProfileCard'
import CreateStaff from '../component/CreateStaff'
import Staff from '../component/Staff'
import VisitorCard from "../component/VisitorCard"
import useAuth from '../context/AuthContext'
import { Link } from 'react-router-dom'
function Admin() {
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
            <div className='flex'>
                <div className='w-80 fixed bg-slate-900 text-xl text-gray-800 border-r flex flex-col gap-2 border-gray-500 min-h-screen py-4 px-4'>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-[#272A39]  ${styleActivePage("profile")}`}
                        onClick={() => setActivePage("profile")}
                    >
                        <span className='text-xl flex items-center text-white'><ion-icon name="person-circle-outline"></ion-icon></span>
                        <span>{user?.name}</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-[#272A39]  ${styleActivePage("logs")}`}
                        onClick={() => setActivePage("logs")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="newspaper-outline"></ion-icon></span>
                        <span>Logs</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-[#272A39]  ${styleActivePage("visitor")}`}
                        onClick={() => setActivePage("visitor")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="people-circle"></ion-icon></span>
                        <span>Visitor</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-[#272A39]  ${styleActivePage("create-staff")}`}
                        onClick={() => setActivePage("create-staff")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="person-add"></ion-icon></span>
                        <span>Create Staff</span>
                    </p>
                    <p
                        className={`cursor-pointer py-2 px-4 text-white flex items-center gap-2 rounded-lg hover:bg-[#272A39]  ${styleActivePage("staff")}`}
                        onClick={() => setActivePage("staff")}>
                        <span className='text-xl flex items-center text-white' ><ion-icon name="people-circle"></ion-icon></span>
                        <span>Staff</span>
                    </p>
                    <button
                        className='bg-rose-500 absolute bottom-0 left-0 w-full  text-white font-semibold px-4 py-2 hover:bg-rose-600' onClick={handleLogout}>
                        <Link className='flex items-center gap-2' to='/login'>
                        <ion-icon name="log-out"></ion-icon>
                        <span>Logout</span></Link></button>

                </div>
                <div className='w-full ml-80'>
                    {activePage === "logs" && <Logs />}
                    {activePage === "profile" && <ProfileCard />}
                    {activePage === "visitor" && <VisitorCard />}
                    {activePage === "create-staff" && <CreateStaff />}
                    {activePage === "staff" && <Staff />}
                </div>
            </div>
        </div>
    )
}

export default Admin

