import React, { useEffect, useState } from 'react'
import api from '../api/api'
function AppointmentEmployee() {
  const [error, setError] = useState("")
  const [appointments, setAppointments] = useState([])
  const [nav, setNav] = useState([])
  const [navbarActive, setNavbarActive] = useState("appointments")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const fetchAppointment = async () => {
    try {
      setError("")
      setSuccess("")
      setLoading(true)
      const res = await api.get('/api/users/employee/allAppointments');
      const fetchedAppointments = res.data.appointemnt || []
      setAppointments(fetchedAppointments)
      setNav(fetchedAppointments)
    } catch (err) {
      setSuccess("")
      setError(err?.response?.data?.message || 'Unable to fetch appointments.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAppointment()
  }, [])

  const handleResponse = async (appointmentId, status) => {
    try {
      setLoading(true)
      setError("")
      const res = await api.post('/api/users/employee/appoitments/response', { appointmentId, status })
      setSuccess(res.data.message)
      await fetchAppointment()
    } catch (err) {
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }
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
        {/* sidebar  */}
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
        {appointments.length === 0 && <p className='text-gray-800 bg-gray-50 border border-gray-300 py-2 rounded-2xl text-center h-150 flex items-center justify-center text-lg'>No Appointments</p>}
        {totalApproved.length === 0 && navbarActive === "approved" && <p className='text-gray-800 bg-gray-50 border border-gray-300 py-2 rounded-2xl text-center h-150 flex items-center justify-center text-lg'>No Approved Appointments</p>}
        {totalRejected.length === 0 && navbarActive === "rejected" && <p className='text-gray-800 bg-gray-50 border border-gray-300 py-2 rounded-2xl text-center h-150 flex items-center justify-center text-lg'>No Rejected Appointments</p>}
        {/* appointments card */}
        {nav.map((appointemnt) => (
          <div key={appointemnt._id} className='bg-white transistion-all duration-150 rounded-2xl shadow-md hover:shadow-xl relative px-8 py-5 border border-gray-300'>
            <div className='flex flex-col justify-between gap-2'>
              <p className='text-xl font-bold  text-gray-800'>{appointemnt.visitorId?.name}</p>
              <p className='flex gap-2 text-lg items-center text-gray-800'>
                <ion-icon name="mail-outline"></ion-icon>
                <span>{appointemnt.visitorId?.email}</span>
              </p>
              <p className='text-lg text-gray-700 flex items-center gap-2'>
                <ion-icon name="calendar-clear-outline"></ion-icon>
                <span>{appointemnt.date ? new Date(appointemnt.date).toLocaleDateString() : "No Date"}</span>
              </p>
              <p className='text-lg text-gray-700 flex items-center gap-2'>
                <ion-icon name="time-outline"></ion-icon>
                <span>{appointemnt.date ? new Date(appointemnt.date).toLocaleTimeString() : "No Date"}</span>
              </p>
            </div>
            <div className='flex items-center '>
              <p className='text-gray-900 text-lg font-semibold tracking-wide'>Purpose:</p>
              <p className=' text-lg  px-4 py-2 text-gray-700'>{appointemnt.message}</p>
            </div>
            {/* status response */}
            {appointemnt.status === "pending" ? (
              <div className='flex justify-between gap-10 mt-2'>
                <button
                  disabled={loading}
                  onClick={() => {
                    handleResponse(appointemnt._id, "approved")
                  }}
                  className='bg-[#00C660] py-3 px-4 flex items-center gap-2 w-full justify-center rounded-2xl font-semibold text-white hover:transform hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-xl'
                >
                  <ion-icon
                    className="text-xl"
                    name="checkmark-circle-outline"></ion-icon>
                  <span>{loading ? "Approving..." : "Approve"}</span>
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    handleResponse(appointemnt._id, "rejected")
                  }}
                  className='bg-[#FD2843] py-3 px-4 flex items-center gap-2 w-full justify-center rounded-2xl font-semibold text-white hover:transform hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-xl'
                >
                  <ion-icon
                    className="text-xl"
                    name="close-circle-outline"></ion-icon>
                  <span>{loading ? "Rejecting..." : "Reject"}</span>
                </button>
              </div>
            ) : (
              <p className={`${styleStatus(appointemnt.status)} text-md bg-green-600 w-fit  px-5 py-1 rounded-2xl absolute  top-5 right-5`}>
                <span className='uppercase tracking-wider'>{appointemnt.status}</span>
              </p>
            )
            }
          </div>
        ))}
        {success && <p className='text-green-600 bg-green-100 border border-green-600 py-2 rounded-2xl text-center text-lg'>{success}</p>}
        {error && <p className='text-rose-600 bg-rose-100 border border-rose-600 py-2 rounded-2xl text-center text-lg'>{error}</p>}
      </div>
    </div>
  )
}

export default AppointmentEmployee
