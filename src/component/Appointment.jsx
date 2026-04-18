import React, { use, useEffect, useState } from 'react'
import api from '../api/api'
import { QRCodeCanvas } from "qrcode.react"
function Appointment({ goToCreateAppointment }) {
    const [error, setError] = useState("")
    const [appointments, setAppointments] = useState([])
    const [nav, setNav] = useState([])
    const [navbarActive, setNavbarActive] = useState("appointments")
    const [pass, setPass] = useState([])
    const [showQr, setShowQr] = useState(false)
    const [id, setId] = useState("")
    const checkExpiredStatus = (date, status) => {
        if (new Date(date) < new Date() && status === "pending") {
            return true
        }
    }
    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                setError("")
                const res = await api.get('/api/users/visitor/allAppointments');
                const fetchedAppointments = res.data.appointemnt || []
                setAppointments(fetchedAppointments)
                setNav(fetchedAppointments)
                setPass(res.data.pass || [])
            } catch (err) {
                setError(err?.response?.data?.message || 'Unable to fetch appointments.')
            }
        }
        fetchAppointment()
    }, [])
    const getPassForAppointment = (appointmentId) => {
        return pass.find((item) => item.appointmentId === appointmentId || item.appointmentId?._id === appointmentId)
    }
    const handlePassDownload = (appointmentId) => {
        const selectedPass = getPassForAppointment(appointmentId)
        if (!selectedPass?.pdfUrl) {
            setError('Pass PDF is not available yet for this appointment.')
            return
        }
        setError("")
        window.open(selectedPass.pdfUrl, '_blank', 'noopener,noreferrer')
    }
    const styleStatus = (status) => {
        if (status === "pending") {
            return "bg-yellow-500 text-white "
        }
        if (status === "approved") {
            return "bg-green-500 text-white"
        }
        if (status === "rejected") {
            return "bg-red-500 text-white"
        }
    }
    const styleSelectedNavbar = (option) => {
        if (option === navbarActive) {
            return "bg-gray-800 text-white"
        } else {
            return "bg-white text-gray-700"
        }
    }
    const handleNewAppointment = async () => {

    }
    const totalPending = appointments.filter(appointment => appointment.status === "pending")
    const totalApproved = appointments.filter(appointment => appointment.status === "approved")
    const totalRejected = appointments.filter(appointment => appointment.status === "rejected")
    return (
        <div className='min-h-screen bg-[#F7FAFF] w-full py-10'>
            <div className='w-3/5 mx-auto flex flex-col gap-10'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl capitalize font-bold  text-gray-600'>All Appointments</h1>
                    <p className='text-gray-600'>
                        {appointments.length > 0 ? 'Last Updated: ' + new Date(appointments[0].updatedAt).toDateString() : ''}
                    </p>
                </div>
                {/* navbar  */}
                {showQr && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
                        <div className='w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-200 relative animate-[fadeIn_.2s_ease-out]'>
                            <button
                                type='button'
                                onClick={() => setShowQr(false)}
                                className='absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-2xl cursor-pointer'
                            >
                                ×
                            </button>

                            <div className='flex flex-col items-center text-center gap-4'>
                                <div className='bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium'>
                                    Visitor Pass QR
                                </div>

                                <h2 className='text-2xl font-bold text-gray-900'>Scan At Gate</h2>
                                <p className='text-gray-500 text-sm'>
                                    Show this QR code to security for check-in and check-out
                                </p>

                                <div className='bg-white p-4 rounded-2xl border border-gray-200 shadow-sm'>
                                    <QRCodeCanvas
                                        value={id || ""}
                                        size={220}
                                        bgColor="#ffffff"
                                        fgColor="#111827"
                                        level="H"
                                    />
                                </div>

                                <div className='w-full rounded-2xl bg-gray-50 border flex gap-2 border-gray-200 p-4 text-left'>
                                    <p className='text-sm text-gray-500'>Pass ID</p>
                                    <p className='text-sm font-medium text-gray-800 break-all'>
                                        {id|| ""}
                                    </p>
                                </div>

                                <button
                                    type='button'
                                    onClick={() => setShowQr(false)}
                                    className='w-full rounded-2xl bg-gray-900 py-3 text-white font-semibold cursor-pointer hover:bg-gray-800'
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className='flex  gap-5'>
                    <p
                        onClick={() => {
                            setNav(appointments)
                            setNavbarActive("appointments")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedNavbar("appointments")}`}>
                        Total Appointment: {appointments.length}</p>
                    <p
                        onClick={() => {
                            setNav(totalPending)
                            setNavbarActive("pending")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedNavbar("pending")}`}>
                        Pending :  {totalPending.length}</p>
                    <p
                        onClick={() => {
                            setNav(totalApproved)
                            setNavbarActive("approved")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedNavbar("approved")}`}>
                        Approved:  {totalApproved.length}
                    </p>
                    <p
                        onClick={() => {
                            setNav(totalRejected)
                            setNavbarActive("rejected")
                        }}
                        className={` cursor-pointer  rounded-2xl px-4 py-2 ${styleSelectedNavbar("rejected")}`}>
                        Rejected:  {totalRejected.length}
                    </p>
                </div>
                {error && <p className='text-rose-600 bg-rose-100 border border-rose-600 py-2 rounded-2xl text-center text-lg'>{error}</p>}
                {appointments.length === 0 && <p className='text-gray-800 bg-gray-50 border border-gray-300 py-2 rounded-2xl text-center h-150 flex items-center justify-center text-lg'>No Appointments</p>}
                {totalApproved.length === 0 && navbarActive === "approved" && <p className='text-gray-800 bg-gray-50 border border-gray-300 py-2 rounded-2xl text-center h-150 flex items-center justify-center text-lg'>No Approved Appointments</p>}
                {totalRejected.length === 0 && navbarActive === "rejected" && <p className='text-gray-800 bg-gray-50 border border-gray-300 py-2 rounded-2xl text-center h-150 flex items-center justify-center text-lg'>No Rejected Appointments</p>}
                {/* appointments card */}
                {nav.map((appointemnt) => {
                    const expired = checkExpiredStatus(appointemnt.date, appointemnt.status)
                    const appointmentPass = getPassForAppointment(appointemnt._id)
                    return (
                        <div className='relative' key={appointemnt._id}>
                            <div
                                className={`bg-white rounded-2xl shadow-md hover:shadow-xl  px-8 py-5 border border-gray-300
                        ${expired ? "opacity-50 pointer-events-none grayscale" : ""}
                        `}>
                                <div className='flex justify-between gap-10'>
                                    <div className='flex flex-col w-full '>
                                        <div className='flex gap-2 items-center '>
                                            <p className='text-gray-900 text-lg font-semibold'>Employe Name:</p>
                                            <p className='text-lg  text-gray-800'>{appointemnt.employeeId?.name}</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <p className='text-gray-900 text-lg font-semibold'>Employee Email:</p>
                                            <p className='  text-gray-800'>{appointemnt.employeeId?.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full items-end '>
                                        <h1 className={`${styleStatus(appointemnt.status)} px-4 py-1 rounded-full text-lg text-gray-900 font-semibold capitalize`}>{appointemnt.status}</h1>
                                        <p className='text-xl text-gray-700'>{appointemnt.date ? new Date(appointemnt.date).toLocaleDateString() : "No Date"}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-900 text-lg font-semibold tracking-wide'>Purpose:</p>
                                    <p className=' text-lg bg-gray-50 rounded-2xl px-4 py-2 text-gray-700'>{appointemnt.message}</p>
                                </div>
                                {appointemnt.status === "approved" && (
                                    <div className='flex gap-5 justify-between'>
                                        <button
                                            type='button'
                                            onClick={() => handlePassDownload(appointemnt._id)}
                                            disabled={!appointmentPass?.pdfUrl}
                                            className='bg-gray-900 text-white text-xl font-semibold tracking-wider mt-5 w-full py-3 px-2 rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
                                        >{appointmentPass?.pdfUrl ? "Download Pass" : "Pass Not Ready"}
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setShowQr(true)
                                                setId(appointmentPass._id)
                                            }}
                                            className='bg-gray-900 text-white text-xl font-semibold tracking-wider mt-5 w-full py-3 px-2 rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
                                        >Generate QR
                                        </button>

                                    </div>
                                )}
                            </div>
                            {expired && (
                                <div className=' text-gray-100 '>
                                    <button
                                        onClick={() => {
                                            goToCreateAppointment()
                                        }}
                                        className='bg-gray-900 text-lg rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 cursor-pointer'
                                    >Create New Appointment</button>
                                </div>
                            )}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Appointment
