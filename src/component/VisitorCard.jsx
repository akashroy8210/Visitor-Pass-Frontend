import React, { useEffect, useState } from 'react'
import api from '../api/api'

function VisitorCard() {
    const [error, setError] = useState("")
    const [visitors, setVisitor] = useState([])
    useEffect(() => {
        const fetchvisitor = async () => {
            try {
                const res = await api.get('/api/users/admin/allVisitors');
                const fetchedvisitors = res.data.visitors || []
                setVisitor(fetchedvisitors)
            } catch (err) {
                setError(err?.response?.data?.message || 'Unable to fetch visitors.')
            }
        }
        fetchvisitor()
    }, [])
    return (
        <div className='min-h-screen bg-[#F7FAFF] w-full py-10'>
            <div className='w-3/6 mx-auto flex flex-col gap-10'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl capitalize font-bold  text-gray-600'>All Visitor</h1>
                    <p className='text-gray-600'>
                        {visitors.length > 0 ? 'Last Updated: ' + new Date(visitors[0].updatedAt).toDateString() : ''}
                    </p>
                </div>
                <div className='flex'>
                    <p
                        className=' bg-white text-gray-700 cursor-pointer  rounded-2xl px-4 py-2'>Total visitor: {visitors.length}</p>
                </div>
                {error && <p className='text-rose-600 bg-rose-100 border border-rose-600 py-2 rounded-2xl text-center text-lg'>{error}</p>}
                {visitors.map((visitor) => (
                    <div key={visitor._id} className='bg-white rounded-2xl shadow-md hover:shadow-xl flex flex-col  px-8 py-5 border border-gray-300'>
                        <div className='flex justify-between'>
                            <div className='flex flex-col w-full '>
                                <h1 className='text-2xl text-gray-900 font-bold'>{visitor.name}</h1>
                                <p className='text-xl text-gray-700'>{visitor.email}</p>
                            </div>
                            <div className='flex flex-col w-full items-end'>
                                <div className='flex gap-2 items-center '>
                                    <p className='text-gray-900 font-semibold'>ID:</p>
                                    <p className='text-lg  text-gray-800'>{visitor._id}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p className='text-gray-900 font-semibold'>POST:</p>
                                    <p className='text-xl font-semibold text-gray-800'>{visitor.role}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='mt-4 '>
                                <p className='text-gray-900 font-semibold'>Appointments: {visitor.appointments?.length || 0}</p>
                                {visitor.appointments?.length > 0 ? (
                                    <div className='mt-3 flex flex-col gap-3' >
                                        {visitor.appointments.map((appointment) => (
                                            <div key={appointment._id} className='rounded-xl border border-gray-200 bg-gray-50 px-4 py-3  '>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <p className='text-gray-800'><span className='font-semibold'>Status:</span> {appointment.status}</p>
                                                        <p className='text-gray-800'><span className='font-semibold'>Date:</span>{appointment.date ? new Date(appointment.date).toLocaleDateString() : "No Date"}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-gray-800'><span className='font-semibold'>Employee Name:</span> {appointment.employeeId?.name || "Not assigned"}</p>
                                                        <p className='text-gray-800'><span className='font-semibold'>Employee Email:</span> {appointment.employeeId?.email || "Not assigned"}</p>
                                                    </div>
                                                </div>
                                                <p className='text-gray-800'><span className='font-semibold'>Message:</span> {appointment.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-gray-500 mt-2'>No appointments found</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VisitorCard

