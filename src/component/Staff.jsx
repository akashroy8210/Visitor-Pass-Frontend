import React, { useEffect, useState } from 'react'
import api from '../api/api'
function Staff() {
    const [error, setError] = useState("")
    const [staffs, setStaffs] = useState([])
    const [selectedStaff, setSelectedStaff] = useState([])
    const [activeStaff, setActiveStaff] = useState("staffs")
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await api.get('/api/users/admin/allStaff');
                const fetchedStaffs = res.data.staffs || []
                setStaffs(fetchedStaffs)
                setSelectedStaff(fetchedStaffs)
            } catch (err) {
                setError(err?.response?.data?.message || 'Unable to fetch staffs.')
            }
        }
        fetchStaff()
    }, [])
    const styleSelectedStaff = (staff) => {
        if (staff === activeStaff) {
            return "bg-gray-800 text-white"
        } else {
            return "bg-white text-gray-700"
        }
    }
    const handleRemoveStaff = async (staffId) => {
        try {
            await api.delete(`/api/users/admin/removeStaff/${staffId}`);
            setError("")
            setStaffs((prev) => prev.filter((staff) => staff._id !== staffId))
            setSelectedStaff((prev) => prev.filter((staff) => staff._id !== staffId))
        } catch (err) {
            setError(err?.response?.data?.message || 'Unable to remove staff.')
        }
    }
    const totalSecurity = staffs.filter(staff => staff.role === "Security")
    const totalEmployee = staffs.filter(staff => staff.role === "Employee")
    return (
        <div className='min-h-screen bg-[#F7FAFF] w-full py-10'>
            <div className='w-3/5 mx-auto flex flex-col gap-10'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl capitalize font-bold  text-gray-600'>All Staff</h1>
                    <p className='text-gray-600'>
                        {staffs.length > 0 ? 'Last Updated: ' + new Date(staffs[0].updatedAt).toDateString() : ''}
                    </p>
                </div>
                <div className='flex  gap-5'>
                    <p
                        onClick={() => {
                            setSelectedStaff(staffs)
                            setActiveStaff("staffs")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedStaff("staffs")}`}>Total Staff: {staffs.length}</p>
                    <p
                        onClick={() => {
                            setSelectedStaff(totalEmployee)
                            setActiveStaff("employee")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedStaff("employee")}`}>Employee:  {totalEmployee.length}</p>
                    <p
                        onClick={() => {
                            setSelectedStaff(totalSecurity)
                            setActiveStaff("security")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedStaff("security")}`}>Security:  {totalSecurity.length}</p>
                </div>
                {error && <p className='text-rose-600 bg-rose-100 border border-rose-600 py-2 rounded-2xl text-center text-lg'>{error}</p>}
                {selectedStaff.map((staff) => (
                    <div key={staff._id} className='bg-white rounded-2xl shadow-md hover:shadow-xl  px-8 py-5 border border-gray-300'>
                        <div className='flex justify-between gap-10'>
                            <div className='flex flex-col w-full '>
                                <h1 className='text-2xl text-gray-900 font-bold'>{staff.name}</h1>
                                <p className='text-xl text-gray-700'>{staff.email}</p>
                            </div>
                            <div className='flex flex-col w-full items-end'>
                                <div className='flex gap-2 items-center '>
                                    <p className='text-gray-900 font-semibold'>ID:</p>
                                    <p className='text-lg  text-gray-800'>{staff._id}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p className='text-gray-900 font-semibold'>POST:</p>
                                    <p className='text-xl font-semibold text-gray-800'>{staff.role}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className='bg-rose-50 float-end text-rose-600 border border-rose-600 px-5 mt-2 py-1 text-xl cursor-pointer flex items-center gap-2 rounded-2xl'
                            onClick={() => {
                                handleRemoveStaff(staff._id)
                            }}
                        ><ion-icon name="trash"></ion-icon>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Staff
